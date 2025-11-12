// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Auto-update footer year
document.getElementById("year").textContent = new Date().getFullYear();


// Highlight active nav tab
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('nav ul li a');
  function setActive() {
    links.forEach(link => link.classList.remove('active'));
    // Find the closest section in view
    let fromTop = window.scrollY + 80;
    links.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
        link.classList.add('active');
      }
    });
  }
  setActive();
  window.addEventListener('scroll', setActive);
  links.forEach(link => {
    link.addEventListener('click', function () {
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// Carousel functionality
(function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let current = 0;
  let timer;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });
  }

  function autoPlay() {
    timer = setInterval(nextSlide, 4000);
  }
  function resetTimer() {
    clearInterval(timer);
    autoPlay();
  }
  showSlide(0);
  autoPlay();
})();

// Booking form submission
// User-driven approach: show WhatsApp or Email link after booking

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookingForm');
  const bookNowBtn = document.getElementById('bookNowBtn');
  const contactRadios = document.getElementsByName('contactMethod');
  // Enable Book Now only if a contact method is selected
  contactRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      bookNowBtn.disabled = !Array.from(contactRadios).some(r => r.checked);
    });
  });
  // Add a div for contact actions if not present
  let contactActions = document.getElementById('contactActions');
  if (!contactActions) {
    contactActions = document.createElement('div');
    contactActions.id = 'contactActions';
    contactActions.className = 'mt-3';
    form.appendChild(contactActions);
  }
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const service = document.getElementById('service').value;
      const date = document.getElementById('date').value;
      // Get selected contact method
      let contactMethod = Array.from(contactRadios).find(r => r.checked)?.value;
      if (!contactMethod) {
        document.getElementById('bookingMsg').textContent = "Please select a contact method.";
        return;
      }
      let msg = `Hi, I would like to book a ${service} on ${date}. My name is ${name}. My email is ${email}.`;
      if (contactMethod === 'whatsapp') {
        window.open(`https://wa.me/+27812821259?text=${encodeURIComponent(msg)}`, '_blank');
        document.getElementById('bookingMsg').textContent = "Booking submitted! Please send your WhatsApp message.";
        contactActions.innerHTML = '';
      } else {
        // Automatically open mail client to site owner's email with user's details
        const emailSubject = encodeURIComponent(`Booking Request - ${service}`);
        const emailBody = encodeURIComponent(`Hello,\n\nI would like to book:\n\nName: ${name}\nUser Email: ${email}\nService: ${service}\nDate: ${date}\n\nThank you!`);
        window.location.href = `mailto:ntshingilanomqibelo75@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        document.getElementById('bookingMsg').textContent = "Booking details sent to site owner via email!";
        contactActions.innerHTML = '';
      }
      form.reset();
      bookNowBtn.disabled = true;
    });
  }
});

// Set min date for booking to today
function setMinBookingDate() {
    var dateInput = document.getElementById('date');
    if (dateInput) {
        var today = new Date();
        var minDate = today.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}

window.addEventListener('DOMContentLoaded', setMinBookingDate);

// Reapply min date after form reset
var bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('reset', setMinBookingDate);
}

document.addEventListener('DOMContentLoaded', function() {
    // Show gallery when button is clicked
    const viewGalleryBtn = document.getElementById('viewGalleryBtn');
    const gallerySection = document.getElementById('gallery');
    if (viewGalleryBtn && gallerySection) {
        viewGalleryBtn.addEventListener('click', function() {
            gallerySection.style.display = 'block';
            viewGalleryBtn.style.display = 'none';
            window.scrollTo({ top: gallerySection.offsetTop, behavior: 'smooth' });
        });
    }

    // Gallery tab switching
    const hairTab = document.getElementById('hairTab');
    const nailTab = document.getElementById('nailTab');
    const hairGallery = document.getElementById('hairGallery');
    const nailGallery = document.getElementById('nailGallery');
    if (hairTab && nailTab && hairGallery && nailGallery) {
        hairTab.addEventListener('click', function() {
            hairGallery.style.display = 'flex';
            nailGallery.style.display = 'none';
            hairTab.classList.add('active');
            nailTab.classList.remove('active');
        });
        nailTab.addEventListener('click', function() {
            hairGallery.style.display = 'none';
            nailGallery.style.display = 'flex';
            nailTab.classList.add('active');
            hairTab.classList.remove('active');
        });
    }
});