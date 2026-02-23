# Production Deployment Workflow

## Push to Production

### Pre-deployment Steps

1. **Push changes to remote**
   ```bash
   git push origin develop
   ```

2. **Switch to production branch**
   ```bash
   git checkout production
   ```

3. **Merge develop into production**
   ```bash
   git merge develop
   ```
   - Fix any conflicts before proceeding

4. **Checkout production environment**
   ```bash
   amplify env checkout production
   ```

5. **Verify environment configuration**
   - Check `.env` file points to production (not localhost)
   - Check `src/environments/` folder configuration
     - Non-prod → localhost
     - Prod → production endpoints
   - Verify with `amplify env list`

6. **Verify auth configuration**
   - Ensure auth import is correctly configured in `team-provider-info.json`

7. **Test locally** (optional but recommended if many changes)
   ```bash
   npm run serve
   ```
   - Verify changes work before publishing

### Deployment

8. **Publish to production**
   ```bash
   npm run publish
   ```

9. **Push production branch to remote**
   ```bash
   git add .
   git push origin production
   ```

10. **Switch back to develop**
    ```bash
    git checkout develop
    ```

## Post-Deployment Checklist

After deployment, verify the production website:

- [ ] Test new features - confirm they work as expected
- [ ] Check auth walls - ensure they're using production environment
- [ ] Test affected pages/services that might have been impacted by the publish
- [ ] Verify any other critical functionality

---

**Safety Note:** Always switch back to `develop` branch after deployment to avoid accidental commits to production.
