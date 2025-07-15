document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize Swiper
    const heroSwiper = new Swiper('.hero-swiper', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    
    // Simulate live status check
    setTimeout(() => {
        const statusElement = document.getElementById('live-status');
        statusElement.textContent = 'OFFLINE';
        statusElement.style.background = '#6c757d';
        document.querySelector('.blink').style.background = '#6c757d';
    }, 1500);
    
    // For real YouTube API check (uncomment and add your API key)
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCB7TfccmhyWwbGuGeUwJ5BA&eventType=live&type=video&key=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const statusElement = document.getElementById('live-status');
            if (data.items.length > 0) {
                statusElement.textContent = 'LIVE';
                statusElement.style.background = '#FF0000';
                document.querySelector('.blink').style.background = 'white';
            } else {
                statusElement.textContent = 'OFFLINE';
                statusElement.style.background = '#6c757d';
                document.querySelector('.blink').style.background = '#6c757d';
            }
        });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});