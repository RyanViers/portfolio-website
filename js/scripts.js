(function () {
  const stack = document.querySelector('.stack');
  const navMenu = document.querySelector('.navigation-list');

  // When the user clicks on the hamburger, toggle active class to show/hide burger menu
  stack.addEventListener('click', mobileMenu);

  function mobileMenu() {
    stack.classList.toggle('active');
    navMenu.classList.toggle('active');
  }

  // When the user clicks on a link in the menu, remove active class to hide burger menu
  const navLink = document.querySelectorAll('.nav-link');

  navLink.forEach((n) => n.addEventListener('click', closeMenu));

  function closeMenu() {
    stack.classList.remove('active');
    navMenu.classList.remove('active');
  }
})();
