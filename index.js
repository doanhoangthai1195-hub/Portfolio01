document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE NAV TOGGLE ---
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      
      // Update hamburger icon
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // --- FAQ ACCORDION ---
  const faqRows = document.querySelectorAll('.faq-row');
  
  faqRows.forEach(row => {
    row.addEventListener('click', () => {
      const isCurrentlyActive = row.classList.contains('active');
      
      // Close all other FAQs
      faqRows.forEach(otherRow => {
        if (otherRow !== row) {
          otherRow.classList.remove('active');
          otherRow.querySelector('.faq-body').style.maxHeight = '0px';
        }
      });
      
      // Toggle current FAQ
      const faqBody = row.querySelector('.faq-body');
      if (isCurrentlyActive) {
        row.classList.remove('active');
        faqBody.style.maxHeight = '0px';
      } else {
        row.classList.add('active');
        // Set height dynamically based on scrollHeight
        faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
      }
    });
  });

  // --- SCROLL ANIMATIONS (REVEAL) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once visible, stop observing to prevent resetting animations
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- STICKY NAV SECTION HIGHLIGHTING ---
  const sections = document.querySelectorAll('section[id]');
  const menuLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        menuLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px' // Focus active window centered in viewport
  });

  sections.forEach(sec => navObserver.observe(sec));
  
  // --- FORM SUBMIT SIMULATION ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector('textarea').value;
      
      if (!name || !email || !message) {
        alert('Vui lòng điền đầy đủ các thông tin.');
        return;
      }
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Đang gửi...';
      
      // Simulate API call
      setTimeout(() => {
        alert(`Cảm ơn ${name}! Tin nhắn của bạn đã được gửi thành công.`);
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }
});
