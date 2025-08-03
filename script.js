// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const bookingModal = document.getElementById('bookingModal');

// Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Speed Test Functionality
function testSpeed() {
    const downloadSpeed = document.getElementById('downloadSpeed');
    const uploadSpeed = document.getElementById('uploadSpeed');
    const btnTest = document.querySelector('.btn-test');
    
    // Show loading state
    btnTest.innerHTML = '<span class="loading"></span> Testing...';
    btnTest.disabled = true;
    
    // Simulate speed test
    setTimeout(() => {
        // Generate random speeds (in real implementation, this would be actual speed test)
        const download = Math.floor(Math.random() * 50) + 10; // 10-60 Mbps
        const upload = Math.floor(Math.random() * 20) + 5; // 5-25 Mbps
        
        downloadSpeed.textContent = download;
        uploadSpeed.textContent = upload;
        
        // Reset button
        btnTest.innerHTML = '<i class="fas fa-play"></i> Start Test';
        btnTest.disabled = false;
        
        // Show recommendation based on speed
        showSpeedRecommendation(download, upload);
    }, 3000);
}

function showSpeedRecommendation(download, upload) {
    const speedResult = document.getElementById('speedResult');
    let recommendation = '';
    
    if (download < 25) {
        recommendation = `<div class="message-error">Your current speed is slow. Consider upgrading to Airtel Fiber for better performance!</div>`;
    } else if (download < 50) {
        recommendation = `<div class="message-success">Your speed is decent, but Airtel Fiber can provide even better performance!</div>`;
    } else {
        recommendation = `<div class="message-success">Great speed! Airtel Fiber can still provide more stable and faster connections.</div>`;
    }
    
    // Add recommendation below speed results
    const existingRecommendation = speedResult.nextElementSibling;
    if (existingRecommendation && existingRecommendation.classList.contains('message-error') || existingRecommendation.classList.contains('message-success')) {
        existingRecommendation.remove();
    }
    
    const recommendationDiv = document.createElement('div');
    recommendationDiv.innerHTML = recommendation;
    speedResult.parentNode.insertBefore(recommendationDiv.firstElementChild, speedResult.nextSibling);
}

// Coverage Check Functionality
function checkCoverage() {
    console.log('checkCoverage function called'); // Debug log
    
    const address = document.getElementById('address').value;
    const pincode = document.getElementById('pincode').value;
    const result = document.getElementById('coverageResult');
    
    console.log('Address:', address); // Debug log
    console.log('Pincode:', pincode); // Debug log
    
    if (!address || !pincode) {
        showMessage('Please enter both address and pincode', 'error');
        return;
    }
    
    // Check if pincode is 477001
    if (pincode === '477001') {
        console.log('Pincode 477001 detected - showing available service'); // Debug log
        
        // Service is available for 477001
        alert('Service is available for 477001');
        result.style.display = 'block';
        result.className = 'coverage-result available';
        result.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> Service Available!</h4>
            <p>Great news! Airtel Fiber is available at your location.</p>
            <ul>
                <li>Fiber: Available (Up to 1Gbps)</li>
                <li>Air Fiber: Available (Up to 100Mbps)</li>
                <li>Installation: 2-4 hours</li>
            </ul>
            <button class="btn-primary" onclick="openBookingModal()">Book Installation</button>
        `;
        
        // Show custom success alert
        showCustomAlert('🎉 Our service is available at your location! You can now book your installation.', 'success');
        
    } else {
        console.log('Other pincode detected - showing unavailable service'); // Debug log
        
        // Service not available for other pincodes
        result.style.display = 'block';
        result.className = 'coverage-result unavailable';
        result.innerHTML = `
            <h4><i class="fas fa-times-circle"></i> Service Not Available</h4>
            <p>Unfortunately, Airtel Fiber is not available at your location yet.</p>
            <p>Currently, we only provide service in pincode 477001. We're expanding our network to other areas soon.</p>
            <button class="btn-secondary" onclick="contactUs()">Contact Us</button>
        `;
        
        // Show custom error alert
        showCustomAlert('❌ Sorry, our service is not available at your location yet. We currently serve only pincode 477001.', 'error');
    }
}

// Make function globally accessible
window.checkCoverage = checkCoverage;

// Coverage form submission
document.addEventListener('DOMContentLoaded', function() {
    const coverageForm = document.getElementById('coverageForm');
    if (coverageForm) {
        coverageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            checkCoverage();
        });
    }
    
    // Also add click handler to the button as backup
    const coverageButton = document.querySelector('.btn-coverage');
    if (coverageButton) {
        coverageButton.addEventListener('click', function(e) {
            e.preventDefault();
            checkCoverage();
        });
    }
});

// Booking Modal Functions
// function openBookingModal() {
//     bookingModal.style.display = 'block';
//     document.body.style.overflow = 'hidden';
// }

// function closeBookingModal() {
//     bookingModal.style.display = 'none';
//     document.body.style.overflow = 'auto';
// }

// Close modal when clicking outside
// window.addEventListener('click', (e) => {
//     if (e.target === bookingModal) {
//         closeBookingModal();
//     }
// });

// Booking form submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bookingData = {
        name: document.getElementById('bookingName').value,
        phone: document.getElementById('bookingPhone').value,
        email: document.getElementById('bookingEmail').value,
        address: document.getElementById('bookingAddress').value,
        service: document.getElementById('bookingService').value,
        package: document.getElementById('bookingPackage').value,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value
    };
    
    // Validate form
    if (!bookingData.name || !bookingData.phone || !bookingData.email || !bookingData.address || 
        !bookingData.service || !bookingData.package || !bookingData.date || !bookingData.time) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    const btnBooking = document.querySelector('.btn-booking');
    btnBooking.innerHTML = '<span class="loading"></span> Processing...';
    btnBooking.disabled = true;
    
    // Send email using email service
    emailService.sendBookingForm(bookingData).then((success) => {
        if (success) {
            // Show success message
            showMessage('Booking submitted successfully! We will contact you within 24 hours.', 'success');
            
            // Close modal
            closeBookingModal();
            
            // Reset form
            this.reset();
            
            // Reset button
            btnBooking.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Booking';
            btnBooking.disabled = false;
            
            // Show thank you message
            showThankYouMessage();
            
            console.log('Booking form email sent successfully!');
        } else {
            // Show error message
            showMessage('Failed to submit booking. Please try again or call us directly.', 'error');
            
            // Reset button
            btnBooking.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Booking';
            btnBooking.disabled = false;
        }
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const contactData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.service || !contactData.message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    const btnContact = document.querySelector('.btn-contact');
    btnContact.innerHTML = '<span class="loading"></span> Sending...';
    btnContact.disabled = true;
    
    // Send email using email service
    emailService.sendContactForm(contactData).then((success) => {
        if (success) {
            // Show success message
            showMessage('Message sent successfully! We will get back to you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            btnContact.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btnContact.disabled = false;
            
            // Show thank you message
            showThankYouMessage();
            
            console.log('Contact form email sent successfully!');
        } else {
            // Show error message
            showMessage('Failed to send message. Please try again or call us directly.', 'error');
            
            // Reset button
            btnContact.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btnContact.disabled = false;
        }
    });
});

// Service Selection Functions
function selectService(service) {
    const serviceNames = {
        'fiber': 'Airtel Fiber Installation',
        'airfiber': 'Air Fiber Installation',
        'maintenance': 'Maintenance & Support'
    };
    
    showMessage(`You selected: ${serviceNames[service]}. Redirecting to booking...`, 'success');
    setTimeout(() => {
        openBookingModal();
        document.getElementById('bookingService').value = service;
    }, 1500);
}

// function selectPackage(package) {
//     const packageNames = {
//         'basic': 'Basic Installation (₹999)',
//         'premium': 'Premium Installation (₹1,499)',
//         'enterprise': 'Enterprise Installation (₹2,999)'
//     };
    
//     showMessage(`You selected: ${packageNames[package]}`, 'success');
//     setTimeout(() => {
//         openBookingModal();
//         document.getElementById('bookingPackage').value = package;
//     }, 1500);
// }



// Utility Functions
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-${type}`;
    messageDiv.textContent = message;
    
    // Remove existing messages
    document.querySelectorAll('.message-success, .message-error').forEach(msg => msg.remove());
    
    // Add new message
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function contactUs() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Show thank you message
function showThankYouMessage() {
    // Create thank you modal
    const thankYouModal = document.createElement('div');
    thankYouModal.className = 'modal';
    thankYouModal.style.display = 'flex';
    thankYouModal.innerHTML = `
        <div class="modal-content" style="text-align: center; max-width: 500px;">
            <div style="font-size: 4rem; color: #28a745; margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 style="color: #28a745; margin-bottom: 1rem;">Thank You!</h2>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Your message has been sent successfully. We will get back to you within 24 hours.</p>
            <p style="font-size: 1rem; margin-bottom: 2rem; color: #666;">For immediate assistance, please call us at <strong>+91 7400931824</strong></p>
            <button onclick="closeThankYouModal()" style="background: var(--airtel-red); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; cursor: pointer;">
                <i class="fas fa-home"></i> Back to Home
            </button>
        </div>
    `;
    
    document.body.appendChild(thankYouModal);
    
    // Auto close after 10 seconds
    setTimeout(() => {
        if (thankYouModal.parentNode) {
            closeThankYouModal();
        }
    }, 10000);
}

// Close thank you modal
function closeThankYouModal() {
    const thankYouModal = document.querySelector('.modal');
    if (thankYouModal) {
        thankYouModal.remove();
    }
}

// Custom alert function
function showCustomAlert(message, type) {
    // Create alert modal
    const alertModal = document.createElement('div');
    alertModal.className = 'modal';
    alertModal.style.display = 'flex';
    alertModal.style.zIndex = '10000';
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    const color = type === 'success' ? '#28a745' : '#dc3545';
    
    alertModal.innerHTML = `
        <div class="modal-content" style="text-align: center; max-width: 400px;">
            <div style="font-size: 3rem; color: ${color}; margin-bottom: 1rem;">
                <i class="${icon}"></i>
            </div>
            <h3 style="color: ${color}; margin-bottom: 1rem;">${type === 'success' ? 'Service Available!' : 'Service Not Available'}</h3>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.5;">${message}</p>
            <button onclick="closeCustomAlert()" style="background: ${color}; color: white; border: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; cursor: pointer;">
                OK
            </button>
        </div>
    `;
    
    document.body.appendChild(alertModal);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (alertModal.parentNode) {
            closeCustomAlert();
        }
    }, 5000);
}

// Close custom alert
function closeCustomAlert() {
    const alertModal = document.querySelector('.modal[style*="z-index: 10000"]');
    if (alertModal) {
        alertModal.remove();
    }
}

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        showMessage('Thank you for subscribing to our newsletter!', 'success');
        this.reset();
    }
});

// Animate elements on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialize date picker for booking
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('bookingDate');
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30); // Allow booking up to 30 days in advance
    
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];
});

// Phone number validation
function validatePhone(input) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(input);
}

// Email validation
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

// Add validation to phone inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#dc3545';
            showMessage('Please enter a valid 10-digit phone number', 'error');
        } else {
            this.style.borderColor = '#e9ecef';
        }
    });
});

// Add validation to email inputs
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#dc3545';
            showMessage('Please enter a valid email address', 'error');
        } else {
            this.style.borderColor = '#e9ecef';
        }
    });
});



// Add loading states to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled && !this.classList.contains('btn-test')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="loading"></span> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section--visible');
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

revealSections.forEach(section => {
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
});

// Add CSS for section animations
const style = document.createElement('style');
style.textContent = `
    .section--hidden {
        opacity: 0;
        transform: translateY(8rem);
        transition: all 1s;
    }
    
    .section--visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style); 