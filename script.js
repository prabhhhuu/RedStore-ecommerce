// Collections page: search + filter
// Runs safely on every page - if these elements don't exist (Home/Contact), it just does nothing.

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".product-card");
  const noResults = document.getElementById("no-results");

  if (!products.length) {
    return;
  }

  let activeCategory = "all";

  function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visibleCount = 0;

    products.forEach(function (product) {
      const name = (product.dataset.name || "").toLowerCase();
      const category = product.dataset.category || "all";

      const matchesSearch = name.includes(searchTerm);
      const matchesCategory = activeCategory === "all" || category === activeCategory;

      if (matchesSearch && matchesCategory) {
        product.style.display = "";
        visibleCount++;
      } else {
        product.style.display = "none";
      }
    });

    if (noResults) {
      noResults.classList.toggle("hidden", visibleCount !== 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove("bg-[#ff523b]", "text-white");
        btn.classList.add("text-gray-600", "border", "border-gray-300");
      });

      button.classList.remove("text-gray-600", "border", "border-gray-300");
      button.classList.add("bg-[#ff523b]", "text-white");

      activeCategory = button.dataset.category || "all";
      applyFilters();
    });
  });
});

var closeBtn= document.getElementById("close-btn")
var advertisement = document.getElementById("advertisement")

closeBtn.addEventListener("click",function(){
  console.log("none")
  advertisement.style.display="none"
});

// Hero Slider

(function () {
  const slider = document.getElementById("hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide-img"));
  const dots = Array.from(document.querySelectorAll("#hero-dots .hero-dot"));
  const texts = Array.from(document.querySelectorAll(".hero-text-slide"));
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");

  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 4500;

  function goTo(index) {
    const total = slides.length;
    current = (index + total) % total;

    slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    texts.forEach((text, i) => text.classList.toggle("active", i === current));
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      next();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prev();
      startAutoplay();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      goTo(parseInt(dot.dataset.index, 10));
      startAutoplay();
    });
  });

  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  goTo(0);
  startAutoplay();
})();