// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = `
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    `;
    document.querySelector('nav').appendChild(burger);

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
};

// Donation handling
const donateButtons = document.querySelectorAll('.donate-button');
donateButtons.forEach(button => {
    button.addEventListener('click', function() {
        const amount = this.parentElement.querySelector('h3').textContent;
        // You would typically integrate with a payment processor here
        alert(`Thank you for choosing to donate ${amount}! This would normally redirect to a payment processor.`);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Here you would typically send this to a server
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    this.reset();
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Statistics animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-item h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent);
                let current = 0;
                const increment = value / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        target.textContent = value + '+';
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + '+';
                    }
                }, 50);
                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    animateStats();
}); 