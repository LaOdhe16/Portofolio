document.addEventListener("DOMContentLoaded", function() {
    
    // 1. SPOTLIGHT MOUSE TRACKING (Efek Senter)
    // Mencari semua elemen dengan class .spotlight-card
    const cards = document.querySelectorAll(".spotlight-card");
    cards.forEach(card => {
        card.onmousemove = e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // Update variabel CSS secara realtime
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        };
    });

    // 2. SCROLL PROGRESS BAR
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    });

    // 3. INITIALIZE ICONS
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 4. TYPING EFFECT
    const textElement = document.getElementById("typing-text");
    if (textElement) {
        // Sesuaikan roles ini dengan keahlian Anda
        const roles = ["Junior Cyber Security", "Penetration Tester", "Network Defender"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                textElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            let typeSpeed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // 5. ANIMATE SKILL BARS
    const skillBars = document.querySelectorAll('.skill-fill');
    skillBars.forEach(bar => { bar.style.width = '0%'; bar.style.transition = 'width 1.5s ease-out'; });

    const observerOptions = { threshold: 0.5 };
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => { skillObserver.observe(bar); });
});

/* --- MODAL FUNCTIONS (Untuk Popup Sertifikat) --- */
function openModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalContent');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');

    if(modal && modalImg && modalTitle) {
        modalImg.src = imageSrc;
        modalTitle.innerText = title;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalContent');
    if(modal) {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}