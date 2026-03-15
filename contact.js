// Form submission handler
(function() {
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      formStatus.textContent = 'Sending...';
      formStatus.style.color = '#2563eb';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = '✅ Message sent! Thank you for reaching out. I\'ll respond within 24 hours.';
          formStatus.style.color = '#1e3a8a';
          form.reset();
        } else {
          const data = await response.json();
          if (data.errors) {
            formStatus.textContent = `❌ ${data.errors.map(e => e.message).join(', ')}`;
          } else {
            formStatus.textContent = '❌ Something went wrong. Please try again or email me directly.';
          }
          formStatus.style.color = '#b91c1c';
        }
      } catch (error) {
        formStatus.textContent = '❌ Network error. Please check your connection.';
        formStatus.style.color = '#b91c1c';
      }

      // Clear status after 8 seconds
      setTimeout(() => {
        formStatus.textContent = '';
      }, 8000);
    });
  }

  // Add current year to any elements with class "current-year" (optional)
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
})();