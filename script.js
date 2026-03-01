/* ============================================
   LushAura — Bold Night Fashion Brand
   JavaScript: Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== PRELOADER ==========
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 800);
    });
    // Fallback: hide after 3 seconds
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  // ========== CURSOR GLOW ==========
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursorGlow.style.left = cursorX + 'px';
    cursorGlow.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hide on mobile
  if ('ontouchstart' in window) {
    cursorGlow.style.display = 'none';
  }

  // ========== NAVBAR SCROLL ==========
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ========== MOBILE NAVIGATION ==========
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== SCROLL REVEAL ==========
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========== COLLECTION CARDS REVEAL ==========
  const collectionCards = document.querySelectorAll('.collection-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, { threshold: 0.05 });

  collectionCards.forEach(card => cardObserver.observe(card));

  // ========== 3D TILT EFFECT ==========
  const tiltCards = document.querySelectorAll('.product-card, .collection-card, .glass-card, .trend-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ========== BUTTON RIPPLE EFFECT ==========
  const buttons = document.querySelectorAll('.btn, .btn-dark, .btn-add-cart, .filter-tab');

  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ========== PROGRESS BAR ANIMATION ==========
  const progressBars = document.querySelectorAll('.progress-fill');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute('data-width');
        entry.target.style.width = target + '%';
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => progressObserver.observe(bar));

  // ========== COLLECTION FILTER ==========
  const filterTabs = document.querySelectorAll('.filter-tab');
  const filterableItems = document.querySelectorAll('.collection-card[data-category]');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      filterableItems.forEach(item => {
        item.style.transition = 'opacity 0.4s, transform 0.4s';

        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = '';
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) scale(1)';
            });
          }, 200);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ========== COUNTER ANIMATION ==========
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(current) + suffix;
        }, 25);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ========== PARALLAX EFFECT ==========
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
    });
  }

  // ========== SMOOTH PAGE TRANSITIONS ==========
  const pageLinks = document.querySelectorAll('a[href$=".html"]');
  pageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });

  // Fade in on page load
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });

  // ========== NAVBAR ACTIVE LINK ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========== WISHLIST TOGGLE ==========
  document.querySelectorAll('.collection-card-wishlist').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('liked');
      if (this.classList.contains('liked')) {
        this.innerHTML = '❤️';
        this.style.background = 'rgba(255,0,80,0.8)';
      } else {
        this.innerHTML = '🤍';
        this.style.background = 'rgba(0,0,0,0.5)';
      }
    });
  });

  // ========== ADD TO CART FEEDBACK ==========
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const originalText = this.textContent;
      this.textContent = '✓ Added!';
      this.style.background = 'var(--gradient-main)';
      this.style.color = '#0A0A0A';
      this.style.borderColor = 'transparent';
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
        this.style.color = '';
        this.style.borderColor = '';
      }, 2000);
    });
  });

  // ========== TYPING EFFECT FOR HERO TAGLINE ==========
  const tagline = document.querySelector('.hero-tagline[data-type]');
  if (tagline) {
    const text = tagline.getAttribute('data-type');
    tagline.textContent = '';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 50);
      }
    }
    setTimeout(typeChar, 1200);
  }

  // ========== GLOWING BORDER FOR RANDOM CARDS ==========
  const allCards = document.querySelectorAll('.collection-card');
  if (allCards.length > 0) {
    setInterval(() => {
      allCards.forEach(c => c.classList.remove('glow-border'));
      const randomIndex = Math.floor(Math.random() * allCards.length);
      allCards[randomIndex].classList.add('glow-border');
    }, 3000);
  }

});
