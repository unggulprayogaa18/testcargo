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
    // 6.5 RACS OVERVIEW SCROLLYTELLING LOGIC
    // ==========================================
    const racsOverviewSection = document.getElementById('about-racs');
    const racsPhase1 = document.querySelector('.racs-block-1');
    const racsPhase2 = document.querySelector('.racs-block-2');

    if (racsOverviewSection && racsPhase1 && racsPhase2) {
        window.addEventListener('scroll', () => {
            const rect = racsOverviewSection.getBoundingClientRect();
            // Hitung persentase scroll (0.0 sampai 1.0)
            let scrollProgress = -rect.top / (rect.height - window.innerHeight);

            // Eksekusi jika section terlihat di layar
            if (scrollProgress >= -0.2 && scrollProgress <= 1.2) {
                // Di bawah 50% = Fase 1 Aktif (What is RACS)
                if (scrollProgress < 0.5) {
                    racsPhase1.classList.add('active');
                    racsPhase2.classList.remove('active');
                } 
                // Di atas 50% = Fase 2 Aktif (Cargo Concept)
                else {
                    racsPhase1.classList.remove('active');
                    racsPhase2.classList.add('active');
                }
            }
        });
    }

 // ==========================================
    // 7. PARTNER SCROLLYTELLING LOGIC (Simplified for RevOPS Only)
    // ==========================================
    const partnerScrolly = document.getElementById('partner-scrolly');
    const pPhase1 = document.querySelector('.p-phase-1');
    const bgPhase1 = document.querySelector('.bg-phase-1');

    if (partnerScrolly && pPhase1) {
        window.addEventListener('scroll', () => {
            const rect = partnerScrolly.getBoundingClientRect();
            let scrollProgress = -rect.top / (rect.height - window.innerHeight);

            // Karena cuma 1 fase, kita cukup pastikan dia aktif saat masuk viewport
            if (scrollProgress >= -0.5 && scrollProgress <= 1.5) {
                pPhase1.classList.add('active');
                if (bgPhase1) bgPhase1.classList.add('active');
            }
        });
    }

   // ==========================================
    // 8. FLEET SCROLLYTELLING LOGIC (Dengan Tombol Prev & Next)
    // ==========================================
    const fleetScrolly = document.getElementById('fleet-scrolly');
    const fleetPhase1 = document.querySelector('.fleet-phase-1');
    const fleetPhase2 = document.querySelector('.fleet-phase-2');
    
    // Ambil elemen tombol
    const btnPrevPhase = document.getElementById('btn-prev-phase');
    const btnNextPhase = document.getElementById('btn-next-phase');

    if (fleetScrolly && fleetPhase1 && fleetPhase2) {
        
        // 1. Logika saat halaman di-scroll manual
        window.addEventListener('scroll', () => {
            const rect = fleetScrolly.getBoundingClientRect();
            
            // Hitung progress scroll (0.0 sampai 1.0)
            let scrollProgress = -rect.top / (rect.height - window.innerHeight);

            // Eksekusi jika section terlihat di layar
            if (scrollProgress >= -0.2 && scrollProgress <= 1.2) {
                // Di bawah 50% = Fase 1 Aktif
                if (scrollProgress < 0.5) {
                    fleetPhase1.classList.add('active');
                    fleetPhase2.classList.remove('active');
                    
                    // Update status tombol
                    if (btnPrevPhase) btnPrevPhase.disabled = true;
                    if (btnNextPhase) btnNextPhase.disabled = false;
                } 
                // Di atas 50% = Fase 2 Aktif
                else {
                    fleetPhase1.classList.remove('active');
                    fleetPhase2.classList.add('active');
                    
                    // Update status tombol
                    if (btnPrevPhase) btnPrevPhase.disabled = false;
                    if (btnNextPhase) btnNextPhase.disabled = true;
                }
            }
        });

        // 2. Logika saat tombol diklik (Otomatis men-scroll halaman)
        if (btnPrevPhase && btnNextPhase) {
            
            btnNextPhase.addEventListener('click', () => {
                // Scroll ke bawah sejauh 60% dari tinggi section agar masuk ke Fase 2
                const targetY = fleetScrolly.offsetTop + ((fleetScrolly.offsetHeight - window.innerHeight) * 0.6);
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            });

            btnPrevPhase.addEventListener('click', () => {
                // Scroll kembali ke bagian paling atas section agar masuk ke Fase 1
                const targetY = fleetScrolly.offsetTop;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            });
            
        }
    }

    // ==========================================
    // 9. FLEET MODAL / VIEW DETAILS LOGIC
    // ==========================================
    const fleetLinks = document.querySelectorAll('.card-link');
    const modalOverlay = document.getElementById('fleet-modal');
    const modalClose = document.getElementById('modal-close');

    if (fleetLinks.length > 0 && modalOverlay) {
        fleetLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Mencegah pindah halaman
                
                // Ambil data dari kartu (card) induk tempat tombol diklik
                const card = link.closest('.fleet-card');
                const title = card.querySelector('h3').innerHTML;
                const desc = card.querySelector('.card-desc').innerHTML;
                const imgSrc = card.querySelector('img').src;
                const specs = card.querySelector('.specs-list').innerHTML;

                // Masukkan data tersebut ke dalam elemen Modal
                document.getElementById('modal-title').innerHTML = title;
                document.getElementById('modal-desc').innerHTML = desc;
                document.getElementById('modal-img').src = imgSrc;
                document.getElementById('modal-specs').innerHTML = specs;

                // Tampilkan animasi pop-up modal
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Kunci scroll layar belakang
            });
        });

        // Logika untuk menutup modal
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Kembalikan scroll layar
        };

        // Tutup saat tombol X diklik
        modalClose.addEventListener('click', closeModal);

        // Tutup saat area gelap di luar modal diklik
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }


   // ==========================================
    // 10. WHY US VIDEO MODAL LOGIC
    // ==========================================
   const videoPlayButtons = document.querySelectorAll('.play-button, .open-video-modal');
    const videoModal = document.getElementById('video-modal');
    const videoModalClose = document.getElementById('video-modal-close');
    const modalVideoPlayer = document.getElementById('modal-video-player');

    if (videoPlayButtons.length > 0 && videoModal) {
        
        // Buka Modal saat tombol play diklik
        videoPlayButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Ambil link video dari atribut data-video-src
                const videoSrc = this.getAttribute('data-video-src');
                
                if (videoSrc) {
                    modalVideoPlayer.src = videoSrc;
                    videoModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Kunci scroll layar belakang
                    
                    // Mainkan video dengan sedikit delay agar animasi pop-up selesai dulu
                    setTimeout(() => {
                        modalVideoPlayer.play();
                    }, 300);
                }
            });
        });

        // Fungsi untuk menutup Modal
        const closeVideoModal = () => {
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Buka kembali scroll
            
            // Jeda sejenak sebelum menghapus link video agar animasinya mulus
            setTimeout(() => {
                modalVideoPlayer.pause();
                modalVideoPlayer.src = '';
            }, 400); 
        };

        // Tutup saat tombol X diklik
        if (videoModalClose) {
            videoModalClose.addEventListener('click', closeVideoModal);
        }

        // Tutup saat area gelap di luar video diklik
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
// ==========================================
    // 11. WHY US SCROLLYTELLING LOGIC (RevNAV & RevFleet)
    // ==========================================
    const whyUsScrolly = document.getElementById('why-us-scrolly');
    const whyPhase1 = whyUsScrolly ? whyUsScrolly.querySelector('.phase-1') : null;
    const whyPhase2 = whyUsScrolly ? whyUsScrolly.querySelector('.phase-2') : null;

    if (whyUsScrolly && whyPhase1 && whyPhase2) {
        window.addEventListener('scroll', () => {
            const rect = whyUsScrolly.getBoundingClientRect();
            
            // Hitung progress scroll dari 0.0 sampai 1.0
            let scrollProgress = -rect.top / (rect.height - window.innerHeight);

            // Eksekusi transisi jika section sedang terlihat di layar
            if (scrollProgress >= -0.2 && scrollProgress <= 1.2) {
                
                // Di bawah 50% = Fase 1 Aktif (RevNAV)
                if (scrollProgress < 0.5) {
                    whyPhase1.classList.add('active');
                    whyPhase2.classList.remove('active');
                } 
                // Di atas 50% = Fase 2 Aktif (RevFleet)
                else {
                    whyPhase1.classList.remove('active');
                    whyPhase2.classList.add('active');
                }
                
            }
        });
    }
    
});