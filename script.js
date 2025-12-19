
const texts = [
    "Full Stack Developer",
    "Frontend & Backend Developer",
    "Software Engineer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    const typewriterElement = document.getElementById("typewriter");

    if (!isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1200); // wait before deleting
            return;
        }
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // next word
        }
    }

    setTimeout(typeWriter, isDeleting ? 60 : 120); // typing/delete speed
}

window.onload = typeWriter;



// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }

    // Active Section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const top = window.scrollY;
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });

            // Animate sections on scroll
            animateSection(section);
        }
    });
});

// Animate sections
function animateSection(section) {
    const id = section.getAttribute('id');
    
    if (id === 'about') {
        const title = section.querySelector('.section-title');
        const img = section.querySelector('.about-img');
        const aboutTitle = section.querySelector('.about-title');
        const text = section.querySelector('.about-text');
        const btn = section.querySelector('.about-btn');
        
        if (title) title.classList.add('animate');
        if (img) img.classList.add('animate');
        if (aboutTitle) aboutTitle.classList.add('animate');
        if (text) text.classList.add('animate');
        if (btn) btn.classList.add('animate');
    } else if (id === 'education') {
        const title = section.querySelector('.section-title');
        const heading = section.querySelector('.education-heading');
        
        if (title) title.classList.add('animate');
        if (heading) heading.classList.add('animate');
    } else if (id === 'skills' || id === 'contact') {
        const title = section.querySelector('.section-title');
        if (title) title.classList.add('animate');
    }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const menuIcon = document.getElementById('menuIcon');
const navbarNav = document.getElementById('navbarNav');

menuToggle.addEventListener('click', () => {
    navbarNav.classList.toggle('show');
    
    if (navbarNav.classList.contains('show')) {
        menuIcon.classList.remove('bx-menu');
        menuIcon.classList.add('bx-x');
    } else {
        menuIcon.classList.remove('bx-x');
        menuIcon.classList.add('bx-menu');
    }
});

// Close menu on link click
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            navbarNav.classList.remove('show');
            menuIcon.classList.remove('bx-x');
            menuIcon.classList.add('bx-menu');
        }
    });
});

// Close menu on scroll
window.addEventListener('scroll', () => {
    if (navbarNav.classList.contains('show')) {
        navbarNav.classList.remove('show');
        menuIcon.classList.remove('bx-x');
        menuIcon.classList.add('bx-menu');
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted! (This is a demo)');
    contactForm.reset();
});

// Smooth scroll for all anchor links
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

function sendEmail(){
	const templateParams = {
		name : document.querySelector("#name").value,
		email : document.querySelector("#email").value,
        mob : document.querySelector('#mob').value,
		subject : document.querySelector("#subject").value,
		message : document.querySelector("#message").value,
	}
	
	emailjs.send("service_79tu4na","template_ues99nn",templateParams)
	.then(() => alert("Email sent!!").catch(() => alert("Email not sent")));
}