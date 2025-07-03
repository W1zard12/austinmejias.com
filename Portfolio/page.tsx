"use client"

import type React from "react"

import { useEffect, useState } from "react"
import "./globals.css"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  useEffect(() => {
    // Load external stylesheets
    const loadStylesheet = (href: string) => {
      const link = document.createElement("link")
      link.href = href
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }

    loadStylesheet("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css")
    loadStylesheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css")

    // Load Bootstrap JavaScript
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    document.body.appendChild(script)

    // Handle scroll events for active section detection
    const handleScroll = () => {
      const sections = ["home", "about", "portfolio", "contact"]
      const scrollPos = window.scrollY + 100

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight

          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            setActiveSection(sectionId)
          }
        }
      })
    }

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    // Setup scroll listener and animations
    window.addEventListener("scroll", handleScroll)

    const timer = setTimeout(() => {
      const animateElements = document.querySelectorAll(".fade-in-element")
      animateElements.forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFormSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.")
      const form = e.target as HTMLFormElement
      form.reset()
      setIsFormSubmitting(false)
    }, 2000)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ]

  const skills = {
    frontend: ["HTML5 & CSS3", "JavaScript (ES6+)", "React & Vue.js", "Bootstrap & Tailwind"],
    backend: ["Node.js & Express", "Python & Django", "MongoDB & PostgreSQL", "REST APIs & GraphQL"],
  }

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform built with React and Node.js, featuring user authentication, payment processing, and admin dashboard.",
      tags: ["React", "Node.js", "MongoDB"],
      color: "primary",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tags: ["Vue.js", "Express", "Socket.io"],
      color: "success",
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with beautiful data visualizations.",
      tags: ["JavaScript", "Chart.js", "API"],
      color: "warning",
    },
  ]

  const contactInfo = [
    { icon: "fas fa-envelope", title: "Email", info: "john.doe@example.com" },
    { icon: "fas fa-phone", title: "Phone", info: "+1 (555) 123-4567" },
    { icon: "fas fa-map-marker-alt", title: "Location", info: "San Francisco, CA" },
  ]

  const socialLinks = [
    { icon: "fab fa-linkedin", href: "#" },
    { icon: "fab fa-github", href: "#" },
    { icon: "fab fa-twitter", href: "#" },
    { icon: "fab fa-instagram", href: "#" },
  ]

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <button
        className="navbar-brand fw-bold btn btn-link text-decoration-none text-white p-0"
        onClick={() => scrollToSection("home")}
        >
        John Doe
        </button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <button
            className={`nav-link btn btn-link text-decoration-none ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => scrollToSection(item.id)}
            >
            {item.label}
            </button>
          </li>
          ))}
        </ul>
        </div>
      </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 fw-bold text-white mb-4 fade-in-element">{"Hello, I'm John Doe"}</h1>
          <p className="lead text-white mb-4 fade-in-element">Full Stack Developer & UI/UX Designer</p>
          <p className="text-white mb-5 fade-in-element">
          I create beautiful and functional web experiences that make a difference.
          </p>
          <div className="fade-in-element">
          <button onClick={() => scrollToSection("portfolio")} className="btn btn-primary btn-lg me-3">
            View My Work
          </button>
          <button onClick={() => scrollToSection("contact")} className="btn btn-outline-light btn-lg">
            Get In Touch
          </button>
          </div>
        </div>
        </div>
      </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
      <div className="container">
        <div className="row">
        <div className="col-lg-8 mx-auto text-center mb-5">
          <h2 className="section-title fade-in-element">About Me</h2>
          <p className="lead fade-in-element">
          Passionate developer with 5+ years of experience creating digital solutions
          </p>
        </div>
        </div>
        <div className="row align-items-center">
        <div className="col-lg-4 mb-4">
          <div className="text-center fade-in-element">
          <img
            src="/placeholder.svg?height=300&width=300"
            alt="Profile"
            className="img-fluid rounded-circle mb-3 shadow-custom"
            style={{ maxWidth: "250px" }}
          />
          </div>
        </div>
        <div className="col-lg-8">
          <div className="fade-in-element">
          <p className="mb-4">
            {
            "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating user-friendly applications that solve real-world problems and provide exceptional user experiences."
            }
          </p>
          <p className="mb-4">
            {
            "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities."
            }
          </p>
          </div>

          <div className="row fade-in-element">
          <div className="col-md-6">
            <h5>Frontend Skills</h5>
            <ul className="list-unstyled">
            {skills.frontend.map((skill, index) => (
              <li key={index}>
              <i className="fas fa-check text-primary me-2"></i>
              {skill}
              </li>
            ))}
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Backend Skills</h5>
            <ul className="list-unstyled">
            {skills.backend.map((skill, index) => (
              <li key={index}>
              <i className="fas fa-check text-primary me-2"></i>
              {skill}
              </li>
            ))}
            </ul>
          </div>
          </div>
        </div>
        </div>
      </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-5 bg-light">
      <div className="container">
        <div className="row">
        <div className="col-lg-8 mx-auto text-center mb-5">
          <h2 className="section-title fade-in-element">My Portfolio</h2>
          <p className="lead fade-in-element">Here are some of my recent projects</p>
        </div>
        </div>
        <div className="row">
        {projects.map((project, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
          <div className="card portfolio-card h-100 fade-in-element">
            <img src="/placeholder.svg?height=250&width=400" className="card-img-top" alt={project.title} />
            <div className="card-body">
            <h5 className="card-title">{project.title}</h5>
            <p className="card-text">{project.description}</p>
            <div className="mb-3">
              {project.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className={`badge bg-${project.color} me-1`}>
                {tag}
              </span>
              ))}
            </div>
            </div>
            <div className="card-footer bg-transparent">
            <button className="btn btn-outline-primary me-2">Live Demo</button>
            <button className="btn btn-outline-secondary">GitHub</button>
            </div>
          </div>
          </div>
        ))}
        </div>
      </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
      <div className="container">
        <div className="row">
        <div className="col-lg-8 mx-auto text-center mb-5">
          <h2 className="section-title fade-in-element">Get In Touch</h2>
          <p className="lead fade-in-element">{"Let's work together on your next project"}</p>
        </div>
        </div>
        <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="row">
          {contactInfo.map((contact, index) => (
            <div key={index} className="col-md-4 mb-4">
            <div className="text-center fade-in-element">
              <div className="contact-icon mb-3">
              <i className={`${contact.icon} fa-2x text-primary`}></i>
              </div>
              <h5>{contact.title}</h5>
              <p className="text-muted">{contact.info}</p>
            </div>
            </div>
          ))}
          </div>

          <form className="mt-5 fade-in-element" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Your Name" required />
            </div>
            <div className="col-md-6 mb-3">
            <input type="email" className="form-control" placeholder="Your Email" required />
            </div>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Subject" required />
          </div>
          <div className="mb-3">
            <textarea className="form-control" rows={5} placeholder="Your Message" required></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg" disabled={isFormSubmitting}>
            {isFormSubmitting ? (
              <>
              <span className="loading"></span> Sending...
              </>
            ) : (
              "Send Message"
            )}
            </button>
          </div>
          </form>
        </div>
        </div>
      </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
        <div className="col-md-6">
          <p className="mb-0">&copy; 2024 John Doe. All rights reserved.</p>
        </div>
        <div className="col-md-6 text-md-end">
          <div className="social-links">
          {socialLinks.map((social, index) => (
            <a key={index} href={social.href} className="text-white me-3">
            <i className={`${social.icon} fa-lg`}></i>
            </a>
          ))}
          </div>
        </div>
        </div>
      </div>
      </footer>
    </div>
  )
}
