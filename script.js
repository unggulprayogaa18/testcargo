document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. SPLASH SCREEN LOGIC (AVIONIC STYLE)
    // ==========================================
    const splashScreen = document.querySelector('.splash-screen');
    const percentageText = document.querySelector('.loading-percentage');
    
    if (splashScreen) {
        document.body.style.overflow = 'hidden'; // Kunci scroll halaman saat loading

        // Animasi angka persentase dari 0 ke 100
        let percentage = 0;
        const interval = setInterval(() => {
            percentage += Math.floor(Math.random() * 5) + 2; // Naik secara acak antara 2-6%
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(interval);
            }
            if (percentageText) percentageText.innerText = `${percentage}%`;
        }, 50);

        // Hilangkan splash screen setelah 3.2 detik
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Buka kunci scroll
            
            // Hapus elemen dari DOM untuk meringankan memori
            setTimeout(() => {
                splashScreen.remove();
            }, 800);
        }, 3200); 
    }

    // ==========================================
    // 2. PARALLAX HERO LOGIC (CARGO PAGE)
    // ==========================================
    const parallaxHero = document.getElementById('parallax-hero');
    const parallaxLayers = document.querySelectorAll('.parallax-layer');

    if (parallaxHero) {
        window.addEventListener('scroll', () => {
            // Dapatkan seberapa jauh user men-scroll dari atas
            let scrollPosition = window.pageYOffset;

            // Hanya jalankan parallax jika hero section masih terlihat di layar
            if (scrollPosition <= parallaxHero.offsetHeight) {
                
                parallaxLayers.forEach(layer => {
                    // Ambil kecepatan dari atribut data-speed HTML
                    let speed = layer.getAttribute('data-speed');
                    
                    // Hitung pergeseran Y (Semakin besar speed, semakin cepat elemen bergerak)
                    let yPos = -(scrollPosition * speed);

                    // Pengecualian untuk layer drone (aslinya di top: 50%, jadi butuh calc)
                    if (layer.classList.contains('layer-drone-wrapper')) {
                         // Hanya gunakan parallax di desktop, di mobile biarkan statis agar tidak keluar jalur
                         if (window.innerWidth > 768) {
                             layer.style.transform = `translateY(calc(-50% + ${yPos}px))`;
                         }
                    } 
                    // Untuk awan dan teks
                    else {
                        layer.style.transform = `translateY(${yPos}px)`;
                    }
                });
            }
        });
    }

    // ==========================================
    // 3. SCROLLYTELLING LOGIC
    // ==========================================
    const section = document.getElementById("scrolly-section");
    const texts = section ? section.querySelectorAll(".scroll-text") : [];
    const progressBar = document.querySelector(".scrolly-progress-bar");

    if (section && texts.length > 0) {
        window.addEventListener("scroll", function () {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Hitung progress scroll dari 0 sampai 1
            let progress = -sectionTop / (sectionHeight - windowHeight);
            progress = Math.max(0, Math.min(1, progress));

            if (progressBar) {
                progressBar.style.width = `${progress * 100}%`;
            }

            // Reset semua teks
            texts.forEach(text => text.classList.remove("active"));

            // Tampilkan teks berdasarkan seberapa jauh halaman di-scroll
            if (progress < 0.33) {
                if (texts[0]) texts[0].classList.add("active");
            } else if (progress >= 0.33 && progress < 0.66) {
                if (texts[1]) texts[1].classList.add("active");
            } else {
                if (texts[2]) texts[2].classList.add("active");
            }
        });
    }

    // ==========================================
    // 4. SCROLL REVEAL ANIMATION
    // ==========================================
    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Tambahkan class 'active' saat elemen masuk ke viewport layar
                    entry.target.classList.add("active");
                    // Stop mengamati setelah animasi selesai agar tidak berulang-ulang
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15, // Animasi mulai saat 15% bagian elemen terlihat
            rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum elemen benar-benar menyentuh batas bawah layar
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
// ==========================================
    // 5. MOBILE NAVBAR MENU TOGGLE
    // ==========================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            // Toggle class 'active' untuk memunculkan/menyembunyikan menu
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Tutup menu otomatis jika salah satu link diklik
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 6. WHY US SCROLLYTELLING LOGIC
    // ==========================================
    const whyUsScrolly = document.getElementById('why-us-scrolly');
    const phase1 = document.querySelector('.phase-1');
    const phase2 = document.querySelector('.phase-2');

    if (whyUsScrolly && phase1 && phase2) {
        window.addEventListener('scroll', () => {
            const rect = whyUsScrolly.getBoundingClientRect();
            
            // Hitung progress scroll di dalam section (0.0 sampai 1.0)
            // rect.top akan bernilai negatif saat kita scroll melewati elemen
            let scrollProgress = -rect.top / (rect.height - window.innerHeight);

            // Hanya eksekusi jika section sedang terlihat di layar
            if (scrollProgress >= -0.2 && scrollProgress <= 1.2) {
                // Saat scroll mencapai 50% dari section, ganti ke Fase 2
                if (scrollProgress < 0.5) {
                    phase1.classList.add('active');
                    phase2.classList.remove('active');
                } else {
                    phase1.classList.remove('active');
                    phase2.classList.add('active');
                }
            }
        });
    }

 // ==========================================
    // 7. PARTNER SCROLLYTELLING LOGIC
    // ==========================================
    const partnerScrolly = document.getElementById('partner-scrolly');
    const pPhase1 = document.querySelector('.p-phase-1');
    const pPhase2 = document.querySelector('.p-phase-2');
    // Ambil elemen background baru
    const bgPhase1 = document.querySelector('.bg-phase-1');
    const bgPhase2 = document.querySelector('.bg-phase-2');

    if (partnerScrolly && pPhase1 && pPhase2) {
        window.addEventListener('scroll', () => {
            const rect = partnerScrolly.getBoundingClientRect();
            
            // Hitung progress scroll di dalam section partner (0.0 sampai 1.0)
            let scrollProgress = -rect.top / (rect.height - window.innerHeight);

            // Eksekusi hanya jika area terlihat di viewport
            if (scrollProgress >= -0.2 && scrollProgress <= 1.2) {
                // Di bawah 50% scroll = Kiri (Phase 1)
                if (scrollProgress < 0.5) {
                    pPhase1.classList.add('active');
                    pPhase2.classList.remove('active');
                    if (bgPhase1) bgPhase1.classList.add('active');
                    if (bgPhase2) bgPhase2.classList.remove('active');
                } 
                // Di atas 50% scroll = Kanan (Phase 2)
                else {
                    pPhase1.classList.remove('active');
                    pPhase2.classList.add('active');
                    if (bgPhase1) bgPhase1.classList.remove('active');
                    if (bgPhase2) bgPhase2.classList.add('active');
                }
            }
        });
    }

    // ==========================================
    // 8. FLEET DETAILS OVERLAY (MODAL) LOGIC
    // ==========================================
    const fleetLinks = document.querySelectorAll('.fleet-card .card-link');
    
    // Buat elemen overlay modal dan suntikkan ke body
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fleet-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="fleet-modal-container">
            <button class="fleet-modal-close">&times;</button>
            <div class="fleet-modal-image-area">
                <img src="" id="modal-img" alt="Drone Image">
            </div>
            <div class="fleet-modal-content-area">
                <span class="eyebrow" id="modal-badge"></span>
                <h2 id="modal-title"></h2>
                <p class="desc" id="modal-desc"></p>
                <ul class="specs-list" id="modal-specs"></ul>
                <button class="btn btn-primary" style="width: 100%;">Download Data Sheet</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const closeBtn = modalOverlay.querySelector('.fleet-modal-close');

    // Fungsi membuka modal dan mempopulasi data
    function openModal(cardElement) {
        // Ambil data dari kartu HTML yang diklik
        const imgSrc = cardElement.querySelector('img').src;
        const badgeText = cardElement.querySelector('.card-badge').innerText;
        const title = cardElement.querySelector('h3').innerText;
        const desc = cardElement.querySelector('.card-desc').innerText;
        const specsHTML = cardElement.querySelector('.specs-list').innerHTML;

        // Masukkan data ke dalam modal
        modalOverlay.querySelector('#modal-img').src = imgSrc;
        modalOverlay.querySelector('#modal-badge').innerText = badgeText;
        modalOverlay.querySelector('#modal-title').innerText = title;
        modalOverlay.querySelector('#modal-desc').innerText = desc;
        modalOverlay.querySelector('#modal-specs').innerHTML = specsHTML;

        // Tampilkan modal & hentikan scroll di background
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Fungsi menutup modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listener untuk tombol "View Details"
    fleetLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah pindah halaman
            const card = e.target.closest('.fleet-card');
            if (card) openModal(card);
        });
    });

    // Event listener untuk tombol close, klik di luar modal, dan tombol Escape
    closeBtn.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});