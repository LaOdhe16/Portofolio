document.addEventListener("DOMContentLoaded", function() {
    
    // =========================================
    // 1. [UPGRADED] BOOT SEQUENCE & LOADING BAR
    // =========================================
    const bootOverlay = document.getElementById('boot-overlay');
    const bootText = document.getElementById('boot-text');
    const progressBar = document.getElementById('progress-bar');
    const lockIconContainer = document.getElementById('lock-icon');
    const randomCode = document.getElementById('random-code');

    // Cek apakah elemen boot ada (hanya jalankan jika ada overlay)
    if (bootOverlay && bootText && progressBar) {
        
        // Daftar langkah loading
        const steps = [
            { text: "ESTABLISHING CONNECTION...", percent: 20 },
            { text: "VERIFYING ENCRYPTION...", percent: 45 },
            { text: "LOADING ASSETS...", percent: 70 },
            { text: "BYPASSING FIREWALL...", percent: 90 },
            { text: "ACCESS GRANTED.", percent: 100 }
        ];

        let stepIndex = 0;

        // Fungsi Rekursif untuk Loading Step
        function nextStep() {
            if (stepIndex < steps.length) {
                const step = steps[stepIndex];
                
                // Update Text & Bar
                bootText.innerText = step.text;
                progressBar.style.width = step.percent + "%";

                // Efek Random Code Hacker
                if(randomCode) randomCode.innerText = "HEX_" + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase();

                stepIndex++;
                
                // Waktu acak antara 400ms - 800ms per step biar terlihat natural
                setTimeout(nextStep, Math.random() * 400 + 400); 
            
            } else {
                // Loading Selesai
                finishBoot();
            }
        }

        function finishBoot() {
            // Ganti Icon Gembok jadi Terbuka
            lockIconContainer.innerHTML = '<i data-lucide="unlock" class="w-16 h-16 mx-auto text-emerald-400"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            // Tambah efek visual
            lockIconContainer.classList.add('unlock-animation');
            bootText.classList.add('animate-pulse');
            bootText.style.color = "#34d399"; // Emerald-400

            // Delay sebentar, lalu Flash & Hilang
            setTimeout(() => {
                bootOverlay.classList.add('access-granted');
                bootOverlay.classList.add('fade-out');
                
                setTimeout(() => {
                    bootOverlay.style.display = 'none';
                    triggerPageAnimations(); // Jalankan animasi konten web
                }, 800);
            }, 600);
        }

        // Mulai sequence
        setTimeout(nextStep, 500);

    } else {
        // Jika tidak ada overlay, langsung tampilkan konten
        triggerPageAnimations();
    }


    // =========================================
    // 2. SCROLL REVEAL OBSERVER
    // =========================================
    function triggerPageAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-element');
                }
            });
        }, {
            threshold: 0.1
        });

        // Targetkan elemen dengan class 'hidden-element'
        const hiddenElements = document.querySelectorAll('.hidden-element');
        hiddenElements.forEach((el) => observer.observe(el));
    }


    // =========================================
    // 3. SPOTLIGHT MOUSE TRACKING
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
    // 4. SCROLL PROGRESS BAR (TOP)
    // =========================================
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        const progressBarTop = document.getElementById('scroll-progress');
        if (progressBarTop) {
            progressBarTop.style.width = scrollPercent + '%';
        }
    });


    // =========================================
    // 5. TYPING EFFECT (BANNER)
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
    // 6. SKILL BAR ANIMATION
    // =========================================
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                // Set width dari 0 ke target
                bar.style.width = targetWidth;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => { 
        bar.style.width = '0%'; // Reset dulu ke 0
        skillObserver.observe(bar); 
    });

});

// =========================================
// 7. MODAL FUNCTIONS (OUTSIDE DOM CONTENT LOADED)
// =========================================
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
