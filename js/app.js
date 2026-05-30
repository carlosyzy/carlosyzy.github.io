class App {
  constructor() {
    this.init();
  }

  init() {
    this.bindMobileMenu();
    this.handleScroll();
  }

  bindMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');

    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !nav.contains(e.target)) {
          nav.classList.remove('active');
          menuBtn.classList.remove('active');
        }
      });
    }
  }

  handleScroll() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScrollAnimation();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScrollAnimation() {
    const elements = document.querySelectorAll('.animate-fade-in-up');

    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85;

      if (isVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
