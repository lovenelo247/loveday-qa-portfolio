// script.js - blue theme, with FormSubmit.co AJAX handler

(function() {
  // set current year in footer
  const yearSpan = document.getElementById('year-tag');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = `© ${currentYear} · All rights reserved`;
  }
  
  // optional small interactivity: click on any skill tag shows message
  const tags = document.querySelectorAll('.skill-tag');
  tags.forEach(tag => {
    tag.addEventListener('click', function(e) {
      // micro interaction: temporary highlight (light blue)
      this.style.backgroundColor = '#dbeafe';
      setTimeout(() => this.style.backgroundColor = '', 150);
    });
  });

  // Handle image error fallback
  const profileImg = document.getElementById('profileImg');
  if (profileImg) {
    profileImg.onerror = function() {
      this.onerror = null;
      this.src = 'https://via.placeholder.com/120x120?text=NELO'; // fallback
    };
  }

  // ---------- CONTACT FORM HANDLER (AJAX to avoid page reload) ----------
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();  // stop traditional submit

      // show sending status
      formStatus.textContent = 'Sending...';
      formStatus.style.color = '#2563eb';

      // gather form data
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = '✅ Message sent! Thank you, I’ll reply soon.';
          formStatus.style.color = '#1e3a8a';  // dark blue
          form.reset();  // clear form
        } else {
          const data = await response.json();
          if (data.errors) {
            formStatus.textContent = `❌ ${data.errors.map(e => e.message).join(', ')}`;
          } else {
            formStatus.textContent = '❌ Oops! Something went wrong. Please try again.';
          }
          formStatus.style.color = '#b91c1c';  // red for error
        }
      } catch (error) {
        formStatus.textContent = '❌ Network error. Please check your connection.';
        formStatus.style.color = '#b91c1c';
      }

      // clear status after 8 seconds (optional)
      setTimeout(() => {
        formStatus.textContent = '';
      }, 8000);
    });
  }
})();