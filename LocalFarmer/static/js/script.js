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
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Shopping cart functionality
        document.addEventListener('DOMContentLoaded', function() {
            const cartButtons = document.querySelectorAll('.fas.fa-shopping-cart');
            cartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
                    cartOffcanvas.show();
                });
            });
            
 // Product add to cart animation
            const addToCartButtons = document.querySelectorAll('.btn-outline-primary');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Create animation element
                    const animEl = document.createElement('div');
                    animEl.innerHTML = '<i class="fas fa-cart-plus"></i>';
                    animEl.style.cssText = `
                        position: fixed;
                        z-index: 9999;
                        color: var(--primary-color);
                        font-size: 24px;
                        pointer-events: none;
                        left: ${e.clientX}px;
                        top: ${e.clientY}px;
                        animation: cartFly 1s ease-out forwards;
                    `;
                    
                    document.body.appendChild(animEl);
                    
                    // Remove animation element after animation
                    setTimeout(() => {
                        animEl.remove();
                    }, 1000);
                    
                    // Update button text temporarily
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check me-1"></i>Added!';
                    this.classList.remove('btn-outline-primary');
                    this.classList.add('btn-success');
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('btn-success');
                        this.classList.add('btn-outline-primary');
                    }, 2000);
                });
            });
        });

 // Search functionality
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchTerm = this.value.trim();
                    if (searchTerm) {
                        // Simulate search results
                        console.log('Searching for:', searchTerm);
                        // In real implementation, this would trigger search API
                    }
                }
            });
        }
        
  // Notification system
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
            notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 5000);
        }
        
 // Form validation
const authForms = document.querySelectorAll('#authModal form');
authForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
       
        const formData = new FormData(this);
        const isLoginForm = this.closest('#loginTab') !== null;
       
        // Simulate API call
        setTimeout(() => {
            if (isLoginForm) {
                showNotification('Successfully logged in! Welcome back.', 'success');
            } else {
                showNotification('Account created successfully! Please check your email for verification.', 'success');
            }
           
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
            modal.hide();
           
            // Update UI to show logged in state
            updateAuthUI(true);
        }, 1000);
    });
});

function updateAuthUI(isLoggedIn) {
    const authButtons = document.querySelector('.d-flex.align-items-center');
    if (isLoggedIn) {
        authButtons.innerHTML = `
            <div class="position-relative me-3">
                <i class="fas fa-bell fs-5 text-muted"></i>
                <span class="notification-badge">3</span>
            </div>
            <div class="position-relative me-3">
                <i class="fas fa-shopping-cart fs-5 text-muted"></i>
                <span class="notification-badge">2</span>
            </div>
            <div class="dropdown">
                <button class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="fas fa-user me-1"></i>My Account
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i>Profile</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-shopping-bag me-2"></i>Orders</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-heart me-2"></i>Wishlist</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i>Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                </ul>
            </div>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#authModal">
                <i class="fas fa-sign-in-alt me-1"></i>Login
            </button>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#authModal">
                <i class="fas fa-user-plus me-1"></i>Sign Up
            </button>
        `;
    }
}


// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);

  // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Logout function
function logout() {
    showNotification('Successfully logged out. See you next time!', 'info');
    updateAuthUI(false);
}

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const type = input.type;
        
        // Remove existing error styling
        input.classList.remove('is-invalid');
        
        // Check if field is empty
        if (!value) {
            input.classList.add('is-invalid');
            isValid = false;
            return;
        }

   // Email validation
        if (type === 'email' && !validateEmail(value)) {
            input.classList.add('is-invalid');
            isValid = false;
            return;
        }
        
        // Password validation
        if (type === 'password' && !validatePassword(value)) {
            input.classList.add('is-invalid');
            isValid = false;
            return;
        }
        
        // Add valid styling
        input.classList.add('is-valid');
    });
    
    return isValid;
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const authInputs = document.querySelectorAll('#authModal input');
    
    authInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateForm(this.closest('form'));
        });
        
        input.addEventListener('input', function() {
            // Remove error styling on input
            this.classList.remove('is-invalid');
        });
    });
});

// Handle notification badge clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('.fa-bell')) {
        showNotification('You have 3 new notifications', 'info');
    }
    
    if (e.target.closest('.fa-shopping-cart')) {
        showNotification('You have 2 items in your cart', 'info');
    }
});

// Initialize authentication state on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in (you can modify this logic based on your needs)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateAuthUI(isLoggedIn);
});

// Save login state (optional - for demo purposes)
function saveLoginState(isLoggedIn) {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
}    