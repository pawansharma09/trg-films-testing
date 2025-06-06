// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Mobile menu functionality
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileNav.classList.toggle('active');
  
  // Animate hamburger menu
  const spans = mobileMenu.querySelectorAll('span');
  if (mobileNav.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'rotate(0) translate(0, 0)';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'rotate(0) translate(0, 0)';
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileNav.classList.remove('active');
  
  // Reset hamburger menu
  const spans = mobileMenu.querySelectorAll('span');
  spans[0].style.transform = 'rotate(0) translate(0, 0)';
  spans[1].style.opacity = '1';
  spans[2].style.transform = 'rotate(0) translate(0, 0)';
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const mobileNav = document.getElementById('mobileNav');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileNav.classList.contains('active') && 
      !mobileNav.contains(event.target) && 
      !mobileMenu.contains(event.target)) {
    closeMobileMenu();
  }
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(26, 26, 26, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Form submission handler with better UX
function handleSubmit(event) {
  event.preventDefault();

  // Get form elements
  const form = event.target;
  const submitBtn = form.querySelector(".submit-btn");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  
  // Hide any existing messages
  successMessage.style.display = "none";
  errorMessage.style.display = "none";

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Basic validation
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    errorMessage.textContent = "Please fill in all required fields.";
    errorMessage.style.display = "block";
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errorMessage.textContent = "Please enter a valid email address.";
    errorMessage.style.display = "block";
    return;
  }

  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate form submission with realistic delay
  setTimeout(() => {
    // Show success message
    successMessage.style.display = "block";
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Reset form
    form.reset();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
    
  }, 1500);
}

// Enhanced hover effects with better performance
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll(".portfolio-item, .service-card, .client-card");
  
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Testimonials auto-scroll (optional enhancement)
function initTestimonialsCarousel() {
  const testimonials = document.querySelectorAll('.testimonial');
  if (testimonials.length > 1) {
    let currentIndex = 0;
    
    setInterval(() => {
      testimonials[currentIndex].style.opacity = '0.7';
      currentIndex = (currentIndex + 1) % testimonials.length;
      testimonials[currentIndex].style.opacity = '1';
    }, 5000);
  }
}

// Initialize testimonials carousel after page load
window.addEventListener('load', initTestimonialsCarousel);

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(26, 26, 26, 0.95)";
    navbar.style.boxShadow = "none";
  }
}, 16); // ~60fps

window.addEventListener("scroll", throttledScrollHandler);
