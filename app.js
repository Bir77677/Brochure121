// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav-bar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Product category interaction
    const productCards = document.querySelectorAll('.product-category-card');
    const productDetails = document.querySelectorAll('.product-detail');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const detailElement = document.getElementById(category + '-detail');
            
            if (detailElement) {
                // Hide all product details first
                productDetails.forEach(detail => {
                    detail.style.display = 'none';
                });
                
                // Show selected product detail
                detailElement.style.display = 'block';
                
                // Scroll to product details section
                const detailsSection = document.getElementById('product-details');
                const navHeight = document.querySelector('.nav-bar').offsetHeight;
                const targetPosition = detailsSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize charts
    initializeCharts();
    
    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Scroll spy for navigation
    window.addEventListener('scroll', handleScrollSpy);
    
    // Intersection Observer for animations
    initializeAnimations();
});

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const navHeight = document.querySelector('.nav-bar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize all charts
function initializeCharts() {
    // Market Size Chart
    const marketCtx = document.getElementById('marketChart');
    if (marketCtx) {
        new Chart(marketCtx, {
            type: 'doughnut',
            data: {
                labels: ['Healthy Snacks', 'Functional Beverages', 'Probiotic Foods'],
                datasets: [{
                    data: [35000, 8500, 2800],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Market Size (₹ Crores)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ₹' + context.parsed.toLocaleString() + ' Cr';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Funding Utilization Chart
    const fundingCtx = document.getElementById('fundingChart');
    if (fundingCtx) {
        new Chart(fundingCtx, {
            type: 'pie',
            data: {
                labels: ['Equipment', 'Working Capital', 'Marketing'],
                datasets: [{
                    data: [2.0, 1.0, 0.5],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Funding Utilization (₹3.5 Cr)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ₹' + context.parsed + ' Cr';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Revenue Projection Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [2.5, 6.8, 15.2],
                        backgroundColor: '#1FB8CD',
                        borderColor: '#1FB8CD',
                        borderWidth: 1
                    },
                    {
                        label: 'Profit',
                        data: [0.375, 1.5, 4.3],
                        backgroundColor: '#FFC185',
                        borderColor: '#FFC185',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '3-Year Financial Projections (₹ Crores)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ₹' + context.parsed.y + ' Cr';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value + ' Cr';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Handle contact form submission
function handleContactForm(form) {
    const formData = new FormData(form);
    const formObject = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your interest! We will contact you within 24 hours to schedule a meeting.');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Handle scroll spy for navigation
function handleScrollSpy() {
    const sections = document.querySelectorAll('.page[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.nav-bar').offsetHeight;
    
    let currentSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.id;
        }
    });
    
    // Update active navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Initialize animations and intersection observers
function initializeAnimations() {
    // Fade in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and major elements
    const elementsToAnimate = document.querySelectorAll('.card, .highlight-card, .innovation-card, .stat-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Download PDF functionality (placeholder)
function downloadPDF() {
    alert('PDF download functionality would be implemented with a PDF generation library or server-side service.');
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-category-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Add click feedback to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Utility function to format currency
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString() + ' Cr';
}

// Add loading states and error handling
function showLoading(element) {
    element.innerHTML = '<div class="loading">Loading...</div>';
}

function showError(element, message) {
    element.innerHTML = `<div class="error">${message}</div>`;
}

// Add print-specific handling
window.addEventListener('beforeprint', function() {
    // Hide interactive elements for print
    const interactiveElements = document.querySelectorAll('.btn, .nav-bar');
    interactiveElements.forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore interactive elements after print
    const interactiveElements = document.querySelectorAll('.btn, .nav-bar');
    interactiveElements.forEach(el => {
        el.style.display = '';
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Navigate with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const currentActive = document.querySelector('.nav-link.active');
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = navLinks.indexOf(currentActive);
        
        let nextIndex;
        if (e.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % navLinks.length;
        } else {
            nextIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        }
        
        navLinks[nextIndex].click();
        e.preventDefault();
    }
});

// Add responsive behavior for charts
function handleResize() {
    // Reinitialize charts on significant resize
    const charts = Chart.getChart && Chart.instances;
    if (charts) {
        Object.values(charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }
}

let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
});