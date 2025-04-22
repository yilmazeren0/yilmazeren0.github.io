// DOM yüklendikten sonra çalıştır
document.addEventListener('DOMContentLoaded', () => {
    // Skill level animasyonları
    animateSkillLevels();
    
    // Form gönderimi
    setupContactForm();
    
    // Smooth scroll
    setupSmoothScroll();
});

// Skill level animasyonları
function animateSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skillLevel => {
        const level = skillLevel.getAttribute('data-level');
        skillLevel.style.setProperty('--width', level);
    });
}

// İletişim formu işleme
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Burada form gönderimi simülasyonu yapıyoruz
            // Gerçek bir uygulamada, bu verileri bir API'ye göndermeniz gerekir
            alert('Mesajınız için teşekkürler! En kısa sürede size dönüş yapacağız.');
            
            // Formu temizle
            this.reset();
        });
    }
}

// Smooth scroll
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// Scroll olayını dinle ve aktif navigasyon bağlantısını güncelle
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
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