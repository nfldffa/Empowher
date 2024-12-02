document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.custom-navbar');
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarNavWrapper = document.querySelector('.navbar-nav-wrapper');
  const navItems = document.querySelectorAll('.navbar-nav-wrapper a');
  const cards = document.querySelectorAll('.we-card');
  const totalCards = cards.length;

  let lastScrollY = window.scrollY;
  let isNavbarVisible = true;
  let currentCardIndex = 0;

  // Event listener for navbar toggle
  navbarToggle.addEventListener('click', () => {
      navbarNavWrapper.classList.toggle('active');
  });

  // Collapse navbar on item click
  navItems.forEach(item => {
      item.addEventListener('click', () => {
          navbarNavWrapper.classList.remove('active');
          hideNavbar();
      });
  });

  // Debounce function
  const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func(...args), wait);
      };
  };

  // Toggle navbar visibility on scroll
  const toggleNavbar = debounce(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && isNavbarVisible) {
          hideNavbar();
      } else if (currentScrollY < lastScrollY && !isNavbarVisible) {
          showNavbar();
      }

      lastScrollY = currentScrollY;
  }, 100);

  window.addEventListener('scroll', toggleNavbar);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              const navbarHeight = navbar.offsetHeight || 0;
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth',
              });
          } else {
              console.warn(`Element with ID ${targetId} not found.`);
          }
      });
  });

  // Carousel functionality
  function updateCarousel() {
      cards.forEach(card => card.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'prev-3', 'next-3'));
      cards[currentCardIndex].classList.add('active');

      const indices = [-3, -2, -1, 1, 2, 3].map(offset => (currentCardIndex + offset + totalCards) % totalCards);
      indices.forEach((index, i) => {
          if (i < 3) {
              cards[index].classList.add(`prev-${3 - i}`);
          } else {
              cards[index].classList.add(`next-${i - 2}`);
          }
      });
  }

  // Show and hide navbar functions
  function hideNavbar() {
      navbar.style.top = '-100px';
      isNavbarVisible = false;
  }

  function showNavbar() {
      navbar.style.top = '0';
      isNavbarVisible = true;
  }

  // Initialize carousel
  updateCarousel();

  document.querySelector('.right').addEventListener('click', () => {
      currentCardIndex = (currentCardIndex + 1) % totalCards;
      updateCarousel();
  });

  document.querySelector('.left').addEventListener('click', () => {
      currentCardIndex = (currentCardIndex - 1 + totalCards) % totalCards;
      updateCarousel();
  });
});