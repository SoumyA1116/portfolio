// Typing effect
const typingTexts = ["I design creative visuals that speak louder than words.", "Transforming ideas into stunning designs", "Creating visual stories that leave an impact"];
let currentTextIndex = 0;
let charIndex = 0;
const typingSpeed = 80;
const erasingSpeed = 40;
const pauseDuration = 2000;
let isDeleting = false;
let timeoutId;

function typeWriter() {
    const currentText = typingTexts[currentTextIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? erasingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at the end of typing
        speed = pauseDuration;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    }

    timeoutId = setTimeout(typeWriter, speed);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initializeGSAP();
    typeWriter();
    setupSkillBars();
    initializeFloatingElements();
});

function initSmoothScroll() {
    Scrollbar.init(document.querySelector('body'), {
        damping: 0.1,
        delegateTo: document
    });
}

function initializeGSAP() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize timeline animations
    const timeline = document.querySelector('.timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timeline && timelineItems.length) {
        gsap.to(timeline, {
            height: '100%',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        });
        
        timelineItems.forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=100',
                    end: 'top center',
                    toggleActions: 'play none none reverse'
                },
                delay: index * 0.3
            });
        });
    }
    
    // Navbar animation
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });

    // Hero section animations
    const heroTL = gsap.timeline();
    heroTL
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'
        })
        .from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.4')
        .from('.hero-description', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'
        }, '-=0.6')
        .from('.hero-cta', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'
        }, '-=0.6')
        .from('.profile-container', {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=1')
        .from('.floating-elements > *', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.8');

    // Scroll animations
    gsap.from('.skill-item', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power4.out'
    });

    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power4.out'
    });
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.innerHTML = document.body.dataset.theme === 'dark' ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
});

// Back to top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Skill bars animation
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percent = bar.dataset.percent;
        const fill = bar.querySelector('.skill-bar-fill');
        fill.style.setProperty('--percent', `${percent}%`);
        
        gsap.from(fill, {
            scrollTrigger: {
                trigger: bar,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            width: 0,
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    const skillsGrid = document.querySelector('.skills-grid');
    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-item fade-in">
            <h3>${skill.name}</h3>
            <div class="skill-bar" style="--percent: ${skill.percent}%"></div>
            <span class="skill-percent">${skill.percent}%</span>
        </div>
    `).join('');
}

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Logo animation with Lottie
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-elements > *');
    
    floatingElements.forEach((el, index) => {
        const randomX = (Math.random() - 0.5) * 30;
        const randomY = (Math.random() - 0.5) * 30;
        
        gsap.set(el, {
            x: randomX,
            y: randomY,
            rotation: Math.random() * 10 - 5
        });
        
        gsap.to(el, {
            duration: 3 + Math.random() * 2,
            x: randomX - 10 + Math.random() * 20,
            y: randomY - 10 + Math.random() * 20,
            rotation: `+=${Math.random() * 15 - 7.5}`,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: Math.random()
        });
    });
    
    // Parallax effect on scroll
    gsap.to('.floating-elements', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        opacity: 0.5,
        ease: 'none'
    });
}

    // Add projects
    const projects = [
        {
            title: 'Cafe Aroma',
            description: 'Logo design for a modern coffee shop',
            image: 'assets/project1.jpg'
        },
        {
            title: 'Youth Fest 2024',
            description: 'Poster design for annual youth festival',
            image: 'assets/project2.jpg'
        },
        {
            title: 'Creative Minds Studio',
            description: 'Brochure design for creative agency',
            image: 'assets/project3.jpg'
        },
        {
            title: 'PixelArt Agency',
            description: 'Complete branding design package',
            image: 'assets/project4.jpg'
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card fade-in">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button class="view-project">View Project</button>
            </div>
        </div>
    `).join('');
}

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});