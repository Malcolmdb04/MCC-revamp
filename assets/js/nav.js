const burgerToggle = document.getElementById('burger-toggle');
const navList = document.getElementById('nav-list');
const nav = document.querySelector('nav');

burgerToggle.addEventListener('click', function () {
  navList.classList.toggle('open');
  
  if (navList.classList.contains('open')) {
    nav.style.paddingBottom = '0';
  } else {
    nav.style.paddingBottom = '12px'; // revert to original padding-bottom
  }
});
