document.addEventListener("DOMContentLoaded", function() {
    
    // =========================================
    // 1. [NEW] BOOT SEQUENCE (Terminal Loading)
    // =========================================
    const terminalText = document.getElementById('terminal-text');
    const overlay = document.getElementById('boot-overlay');
    
    // Pastikan elemen ada sebelum menjalankan animasi
    if (terminalText && overlay) {
        const bootSequence = [
            "> INITIALIZING KERNEL...",
            "> LOADING SECURITY MODULES...",
            "> ESTABLISHING SECURE CONNECTION...",
            "> DECRYPTING DATA...",
            "> ACCESS GRANTED.",
            "> WELCOME, USER."
        ];

        let lineIndex = 0;
        let charIndex = 0;
        const typingSpeed = 20; // Kecepatan ngetik (ms)
        const linePause = 300;  // Jeda antar baris (ms)

        function typeBootSequence() {
            if (lineIndex < bootSequence.length) {
                if (charIndex < bootSequence[lineIndex].length) {
                    terminalText.innerHTML += bootSequence[lineIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeBootSequence, typingSpeed);
                } else {
                    // Pindah baris baru
                    terminalText.innerHTML += "<br>";
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeBootSequence, linePause);
                }
            } else {
                // Selesai ngetik, hilangkan overlay
                setTimeout(() => {
                    overlay.classList.add('fade-out');
                    // Hapus overlay dari tampilan setelah animasi fade selesai
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        // Mulai animasi elemen halaman setelah loading selesai
                        triggerPageAnimations(); 
                    }, 800);
                }, 500);
            }
        }
        
        // Mulai Boot Sequence
        typeBootSequence();
    } else {
        // Jika overlay tidak ada (misal di halaman lain), langsung trigger animasi
        triggerPageAnimations();
    }

    // =========================================
    // 2. [NEW] SCROLL REVEAL (Muncul saat Scroll)
    // =========================================
    function triggerPageAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-element');
                }
            });
        }, {
            threshold: 0.1 // Muncul ketika 10% elemen terlihat
        });

        // Cari semua elemen dengan class 'hidden-element'
        const hiddenElements = document.querySelectorAll('.hidden-element');
        hiddenElements.forEach((el) => observer.observe(el));
    }

    // =========================================
    // 3. [OLD] SPOTLIGHT MOUSE TRACKING
    // =========================================
    const cards = document.querySelectorAll(".spotlight-card");
    cards.forEach(card => {
        card.onmousemove = e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        };
    });

    // =========================================
    // 4. [OLD] SCROLL PROGRESS BAR
    // =========================================
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    });

    // =========================================
    // 5. [OLD] INITIALIZE ICONS
    // =========================================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // =========================================
    // 6. [OLD] TYPING EFFECT (Untuk Banner Utama)
    // =========================================
    const textElement = document.getElementById("typing-text");
    if (textElement) {
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

    // =========================================
    // 7. [OLD] ANIMATE SKILL BARS
    // =========================================
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

/* =========================================
   8. GLOBAL MODAL FUNCTIONS
   (Tetap di luar DOMContentLoaded agar bisa dipanggil HTML)
   ========================================= */
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
