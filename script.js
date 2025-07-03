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
