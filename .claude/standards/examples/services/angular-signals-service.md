# Golden Example: Angular Signals Service

## Complete Service Architecture Pattern

This is the **preferred service structure** for Angular 20 with signals. The `ResourceArticleService` demonstrates the ideal organization and patterns.

```typescript
import { Injectable, inject, signal, computed, resource, effect } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { getFooterLight } from "src/app/shared/footer/footer-styles";
import { ZendeskSections } from "src/app/utils/models/enums";
import { extractIdFromArticleUrl, getFormattedArticleVideoLength } from "src/app/utils/models/helpers";
import { Footer, WaveType, Youtube, YoutubeQuality, ZendeskArticle, ZendeskArticleComment } from "src/app/utils/models/models";
import { ZendeskService } from "src/app/utils/services/zendesk.service";
import { WebPage } from "src/app/utils/models/navigation";
import { FormControl } from "@angular/forms";
import { InfiniteScrollService } from "src/app/utils/directives/infinite-scroll/infinite-scroll.service";
import { AlertService } from "src/app/utils/services/alert.service";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable()
export class ResourceArticleService {

    //services (dependency injection grouped at top)
    private zendesk = inject(ZendeskService);
    private sanitizer = inject(DomSanitizer);
    private activatedRoute = inject(ActivatedRoute);
    private infiniteScroll = inject(InfiniteScrollService);
    private alert = inject(AlertService);

    // Route parameter signals (converting observables to signals)
    private $routeParams = toSignal(this.activatedRoute.paramMap);

    // Regular Signals (basic state management)
    public $paginationCursor = signal<string>(undefined);
    private commentsMap = signal<Map<string, ZendeskArticleComment[]>>(new Map());
    private currentPaginationCursor = signal<string>(undefined);
    private hasNextPage = signal<boolean>(false);

    // Resources (data loading with automatic reactivity)
    private articlesResource = resource({
      params: () => {
        const params = this.$routeParams();
        const articleUrl = params?.get('articleId');
        const articleId = articleUrl ? extractIdFromArticleUrl(articleUrl) : null;
        return { articleId };
      },
      loader: ({ params }) => {
        if (!params.articleId) return Promise.resolve(null);
        return this.zendesk.getArticle(params.articleId);
      }
    });

    private commentsResource = resource({
      params: () => ({
        articleId: this.$article()?.id,
        cursor: this.$paginationCursor()
      }),
      loader: ({ params }) => {
        if (!params.articleId) return Promise.resolve({ comments: [], meta: { has_more: false, after_cursor: undefined }, links: {} });
        return this.zendesk.listComments(params.articleId, 12, params.cursor);
      }
    });

    private attachmentsResource = resource({
      params: () => ({ articleId: this.$article()?.id }),
      loader: ({ params }) => {
        if (!params.articleId) return Promise.resolve([]);
        return this.zendesk.getArticleAttachments(params.articleId);
      }
    });

    // Resource-based Computed Signals (derived directly from resources)
    public $article = computed(() => this.articlesResource.value());
    public $isLoading = computed(() => this.articlesResource.isLoading());
    public $commentsLoading = computed(() => this.commentsResource.isLoading());
    public $articleAttachments = computed(() => this.attachmentsResource.value() || []);

    // Article Content Computed Signals (derived from article data)
    public $imageUrl = computed(() => this.extractImageUrl(this.$article()));
    public $videoUrl = computed(() => this.extractVideoUrl(this.$article()));
    public $thumbnailUrl = computed(() => this.extractThumbnailUrl(this.$article()));
    public $sanitizedArticle = computed(() => this.sanitizeArticle(this.$article()));
    public $articleFormattedVideoLength = computed(() => this.formatVideoLength(this.$article()));
    public $articleComments = computed(() => {
      const allComments = Array.from(this.commentsMap().values()).reduce((acc, val) => acc.concat(val), []);
      return allComments;
    });

    //component configs (UI configuration objects)
    readonly footer: Footer = new Footer({
      ...getFooterLight(),
      wrapper: {backgroundColor: {desktop: 'var(--color-light-tint)'}},
      bgColor: {desktop: 'var(--color-light-tint'},
      bottomBgColor: {desktop: 'var(--color-light)'},
      textColor: {desktop: 'var(--color-dark)'},
      buttons: [
        {
          title: "Customer Support",
          ngStyles: {border: "1px solid var(--color-dark)", background: "transparent", color: "var(--color-dark)"},
          page: WebPage.CUSTOMER_SUPPORT
        },
        {
          title: "Request a Demo",
          ngStyles: {color: "var(--color-light)", background: "var(--color-secondary)"},
          page: WebPage.BOOK_DEMO
        }
      ],
      iconColor: {desktop: 'var(--color-dark)'},
      topWaveOptions: {
        show: {desktop: true},
        waveSize: 'even',
        waveType: {desktop: WaveType.HALF_CIRCLE_25P},
        colors: {desktop: {bottomColor: 'var(--color-light-tint', topColor: 'var(--color-light)'}}
      },
      bottomWaveOptions: {
        show: {desktop: true},
        waveSize: 'even',
        waveType: {desktop: WaveType.HALF_CIRCLE_25P},
        colors: {desktop: {bottomColor: 'var(--color-light)', topColor: 'var(--color-light-tint'}}
      },
    });

    constructor() {
        // Effects for side effects and resource coordination

        // Watch for pagination triggers
        this.infiniteScroll.$next.subscribe(() => {
            if (this.hasNextPage()) {
                this.$paginationCursor.set(this.currentPaginationCursor());
            } else {
                this.infiniteScroll.$disable.next();
            }
        });

        // Handle comments resource changes
        effect(() => {
            const results = this.commentsResource.value();
            if (!results) return;

            const hasNextPage = results?.meta?.has_more || false;
            const cursor = results?.meta?.after_cursor || undefined;
            this.hasNextPage.set(hasNextPage);
            this.currentPaginationCursor.set(cursor);

            if (!hasNextPage) {
                this.infiniteScroll.$disable.next();
            } else {
                this.infiniteScroll.$complete.next();
            }

            if ((results?.comments || []).length) {
                this.commentsMap.update(map => {
                    const newMap = new Map(map);
                    newMap.set(cursor || "NULL", results.comments || []);
                    return newMap;
                });
            }
        });
    }

    /**************************************************** PUBLIC ***********************************************/

    /**
     * post comment
     * @param control
     */
    async postComment(control: FormControl) {
        const comment = control.value;
        control.setValue('');
        await this.zendesk.createComment(this.$article()?.id, comment);
        this.resetPagination();
    }

    /**
     * delete comment
     * @param comment
     */
    async deleteComment(comment: ZendeskArticleComment) {
        if (!(await this.alert.presentQuestionAlert('Delete Comment?', 'Are you sure you want to delete this comment?'))) return;
        await this.zendesk.deleteComment(this.$article()?.id, comment.id);
        this.resetPagination();
    }

    /**
     * is headscratcher
     * @returns
     */
    isHeadscratcher() {
        return `${this.$article()?.section_id}` === ZendeskSections.HEAD_SCRATCHER;
    }

    /**************************************************** PRIVATE **********************************************/

    /**
     * reset pagination
     */
    private resetPagination() {
        this.infiniteScroll.$enable.next();
        this.commentsMap.set(new Map());
        this.$paginationCursor.set(undefined);
        this.currentPaginationCursor.set(undefined);
    }

    /**
     * extract image url from article
     * @param article
     * @returns
     */
    private extractImageUrl(article: ZendeskArticle): string {
        if (!article) return '';
        const imageLabel = (article?.label_names || []).find((l) => l.toLowerCase().includes('image_url'));
        const imageLabelSplit = imageLabel ? imageLabel.split("#") : [];
        return imageLabelSplit.length > 0 ? imageLabelSplit[1] : '';
    }

    /**
     * extract video url from article
     * @param article
     * @returns
     */
    private extractVideoUrl(article: ZendeskArticle): string {
        if (!article) return '';
        const youtubeLabel = (article?.label_names || []).find((l) => l.toLowerCase().includes('youtube'));
        const youtubeLabelSplit = youtubeLabel ? youtubeLabel.split("#") : [];
        const youtubeId = youtubeLabelSplit.length > 0 ? youtubeLabelSplit[1] : '';
        return youtubeId ? Youtube.getVideoUrl(youtubeId) : '';
    }

    /**
     * extract thumbnail url from article
     * @param article
     * @returns
     */
    private extractThumbnailUrl(article: ZendeskArticle): string {
        if (!article) return '';
        const youtubeLabel = (article?.label_names || []).find((l) => l.toLowerCase().includes('youtube'));
        const youtubeLabelSplit = youtubeLabel ? youtubeLabel.split("#") : [];
        const youtubeId = youtubeLabelSplit.length > 0 ? youtubeLabelSplit[1] : '';
        return youtubeId ? Youtube.getVideoThumbnailUrl(youtubeId, YoutubeQuality.MAX) : '';
    }

    /**
     * sanitize article for safe HTML rendering
     * @param article
     * @returns
     */
    private sanitizeArticle(article: ZendeskArticle): SafeHtml {
        if (!article?.body) return this.sanitizer.bypassSecurityTrustHtml('');
        return this.sanitizer.bypassSecurityTrustHtml(article.body);
    }

    /**
     * format video length from article
     * @param article
     * @returns
     */
    private formatVideoLength(article: ZendeskArticle): string {
        return getFormattedArticleVideoLength(article);
    }
}
```

## Key Architecture Patterns Demonstrated

### **1. Perfect Organization Flow**
- **Services** → **Route Signals** → **State Signals** → **Resources** → **Computed Signals** → **Configs** → **Constructor** → **Public** → **Private**

### **2. Signal Classification System**
- **Regular Signals**: Basic state (`$paginationCursor`)
- **Resource-based Computed**: Derived from resources (`$isLoading`)
- **Content Computed**: Derived from data (`$imageUrl`)

### **3. Resource Pattern**
- **Params function**: Reactive parameters using signals
- **Loader function**: Async data fetching with fallbacks
- **Automatic reactivity**: Resources re-run when params change

### **4. Effect Usage**
- **Resource coordination**: Handle resource value changes
- **Side effects**: Manage pagination, infinite scroll
- **State synchronization**: Keep related signals in sync

### **5. Constructor Pattern**
- **No manual lifecycle**: No init/destroy methods
- **Automatic setup**: Effects handle all coordination
- **Subscription management**: Limited to non-signal services

### **6. Method Organization**
- **Clear separation**: Public API vs private helpers
- **Descriptive comments**: Function purpose and parameters
- **Consistent naming**: extract*, format*, sanitize* patterns

## Why This is the Golden Standard

✅ **Clear data flow** - Easy to follow signal dependencies
✅ **Automatic reactivity** - No manual subscription management
✅ **Type safety** - Full TypeScript integration
✅ **Performance optimized** - Computed signals only recalculate when needed
✅ **Maintainable** - Logical grouping and clear patterns
✅ **Testable** - Clean separation of concerns
✅ **Scalable** - Easy to extend with new signals/resources

This service handles complex requirements (route params, pagination, CRUD, real-time updates) while maintaining simplicity and readability. **Use this as the template for all Angular services.**