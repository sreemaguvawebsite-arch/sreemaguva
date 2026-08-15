// Animation utilities

export const observeElement = (element, callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    ...options
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target)
      }
    })
  }, defaultOptions)

  observer.observe(element)
  return observer
}

export const animateCounter = (element, target, duration = 2000, suffix = '') => {
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + suffix
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current) + suffix
    }
  }, 16)

  return timer
}

export const smoothScroll = (targetId) => {
  const element = document.querySelector(targetId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Account for sticky navbar
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}
