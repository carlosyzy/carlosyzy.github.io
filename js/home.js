class HomePage {
  constructor() {
    this.init();
  }

  init() {
    this.initAnimations();
    this.initScrollReveal();
  }

  initAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.feature-item').forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      observer.observe(item);
    });
  }

  initScrollReveal() {
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const direction = scrollTop > lastScrollTop ? 'down' : 'up';

      document.querySelectorAll('.feature-item').forEach(item => {
        const rect = item.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
          if (direction === 'down') {
            item.style.transform = 'translateX(20px)';
          } else {
            item.style.transform = 'translateX(-20px)';
          }
        }
      });

      lastScrollTop = scrollTop;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.hero-section') || document.querySelector('.features-section')) {
    new HomePage();
  }
});
