// Global variables
const isLoaded = false
let bootstrap // Declare bootstrap variable

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializePortfolio()
})

// Initialize all portfolio functionality
function initializePortfolio() {
  // Hide loading screen
  setTimeout(() => {
    hideLoadingScreen()
  }, 1500)

  // Initialize all components
  initNavigation()
  initScrollAnimations()
  initCounters()
  initProgressBars()
  initContactForm()
  initBackToTop()
  initMatrixEffect()
}

// Hide loading screen
function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")
  if (loadingScreen) {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }
}

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("mainNav")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }

      // Close mobile menu if open
      const navbarCollapse = document.getElementById("navbarNav")
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Active navigation highlighting
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  })

  // Scroll indicator click
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }
}

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".cert-card, .project-card, .timeline-item, .education-card")
  animatedElements.forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })
}

// Counter animation
function initCounters() {
  const counters = document.querySelectorAll(".stat-number")
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.getAttribute("data-target"))
        animateCounter(counter, target)
        counterObserver.unobserve(counter)
      }
    })
  })

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

function animateCounter(element, target) {
  let current = 0
  const increment = target / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 30)
}

// Progress bars animation
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar")
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target
        const width = bar.getAttribute("data-width")
        setTimeout(() => {
          bar.style.width = width + "%"
        }, 200)
        progressObserver.unobserve(bar)
      }
    })
  })

  progressBars.forEach((bar) => {
    progressObserver.observe(bar)
  })
}

// Contact form
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Simple validation
      if (!name || !email || !subject || !message) {
        showNotification("Please fill in all fields", "error")
        return
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      setTimeout(() => {
        showNotification("Message sent successfully! I'll get back to you soon.", "success")
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Matrix effect
function initMatrixEffect() {
  const matrixContainer = document.querySelector(".matrix-bg")
  if (!matrixContainer) return

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  matrixContainer.appendChild(canvas)

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")
  const font_size = 10
  const columns = canvas.width / font_size
  const drops = []

  for (let x = 0; x < columns; x++) {
    drops[x] = 1
  }

  function draw() {
    ctx.fillStyle = "rgba(10, 10, 10, 0.04)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#00ff41"
    ctx.font = font_size + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = matrix[Math.floor(Math.random() * matrix.length)]
      ctx.fillText(text, i * font_size, drops[i] * font_size)

      if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  setInterval(draw, 35)

  // Resize canvas on window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Utility functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => {
    notification.remove()
  })

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const iconClass = type === "success" ? "fa-check-circle" : "fa-exclamation-circle"

  notification.innerHTML = `
      <div class="notification-content">
          <i class="fas ${iconClass}"></i>
          <span>${message}</span>
      </div>
  `

  // Add styles
  const bgColor = type === "success" ? "#00ff41" : "#ff6600"

  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: #0a0a0a;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,255,65,0.3);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
      font-weight: 600;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu if open
    const navbarCollapse = document.querySelector(".navbar-collapse.show")
    if (navbarCollapse) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse)
      bsCollapse.hide()
    }
  }
})
