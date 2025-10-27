// Timeline Animations
gsap.registerPlugin(ScrollTrigger);

// Make sure GSAP is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    // Initialize timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2
    });
});