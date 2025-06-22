document.addEventListener('DOMContentLoaded', () => {
    const dotGrid = document.querySelector('.dot-grid');
    const numDots = 2500; // 50x50 grid

    // Create the dot grid more efficiently using a single operation
    const dotsHTML = Array(numDots).fill('<div class="dot"></div>').join('');
    dotGrid.innerHTML = dotsHTML;

    // Advanced throttle function with requestAnimationFrame
    function rafThrottle(func) {
        let ticking = false;
        return function(...args) {
            if (!ticking) {
                requestAnimationFrame(() => {
                    func.apply(this, args);
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    // Parallax mouse effect with RAF throttling
    const handleMouseMove = rafThrottle((e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 30;
        const yPos = (clientY / innerHeight - 0.5) * 30;

        // Use transform3d for hardware acceleration
        dotGrid.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    });

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Custom audio controls with better error handling
    const audio = document.getElementById('background-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');

    if (audio && playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            playPauseBtn.classList.remove('play');
                            playPauseBtn.classList.add('pause');
                        })
                        .catch(e => console.log('Audio play failed:', e));
                }
            } else {
                audio.pause();
                playPauseBtn.classList.remove('pause');
                playPauseBtn.classList.add('play');
            }
        });
    }

    // Optimized typing effect
    function typeWriter(element, text, speed = 120) {
        if (!element || !text) return;
        
        element.textContent = '';
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, speed);
    }

    // Initialize typing effects with proper timing
    const initTypingEffects = () => {
        const consciousnessTitle = document.querySelector('.consciousness-title');
        if (consciousnessTitle) {
            typeWriter(consciousnessTitle, "Consciousness");
        }

        const sectionTitle = document.getElementById('section-title');
        if (sectionTitle) {
            setTimeout(() => {
                typeWriter(sectionTitle, "What is Consciousness", 100);
            }, 2000);
        }
    };

    // Use load event for better timing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTypingEffects);
    } else {
        initTypingEffects();
    }

    // Optimized scroll handling with RAF
    const nav = document.querySelector('.top-right-nav');
    let scrollTicking = false;

    const handleScroll = rafThrottle(() => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimized navigation hover effects
    const navLinks = document.querySelectorAll('.top-right-nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translate3d(0, -2px, 0)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate3d(0, 0, 0)';
        });
    });

    // Optimized click effects
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Preload critical resources
    const preloadImage = new Image();
    preloadImage.src = 'backgroundimage.webp';
});