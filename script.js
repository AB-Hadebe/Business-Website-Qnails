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

// Contact popup toggle
document.getElementById("contactBtn").addEventListener("click", () => {
  document.getElementById("popup").classList.remove("hidden");
});

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").classList.add("hidden");
});
// ...existing code...

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
