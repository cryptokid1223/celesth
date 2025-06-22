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
                        .catch(() => {}); // Silent error handling
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
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Preload critical resources
    const preloadImage = new Image();
    preloadImage.src = 'backgroundimage.webp';

    // Character Selection System - Optimized
    const characterImages = [
        'image1.png',
        'image2.png', 
        'image3.png',
        'image4.png',
        'image5.png',
        'image6.png'
    ];
    
    let currentImageIndex = 0;
    let selectedCharacter = null;
    let imagesLoaded = 0;
    
    // Optimized image preloading with progress tracking
    const imageCache = new Map();
    characterImages.forEach((imageSrc, index) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            imageCache.set(imageSrc, img);
            imagesLoaded++;
        };
        img.onerror = () => {
            // Silent error handling for missing images
        };
    });
    
    // Optimized image navigation functions
    const switchImage = (newIndex) => {
        const characterImage = document.getElementById('character-image');
        if (!characterImage) return;
        
        characterImage.classList.add('fade-out');
        
        setTimeout(() => {
            currentImageIndex = newIndex;
            const newImageSrc = characterImages[currentImageIndex];
            characterImage.src = newImageSrc;
            characterImage.classList.remove('fade-out');
            characterImage.classList.add('fade-in');
            
            setTimeout(() => {
                characterImage.classList.remove('fade-in');
            }, 300);
        }, 150);
    };
    
    // Make functions globally available - optimized
    window.nextImage = () => {
        const newIndex = (currentImageIndex + 1) % characterImages.length;
        switchImage(newIndex);
    };
    
    window.prevImage = () => {
        const newIndex = currentImageIndex === 0 ? characterImages.length - 1 : currentImageIndex - 1;
        switchImage(newIndex);
    };
    
    window.chooseOmi = () => {
        const selectedImage = characterImages[currentImageIndex];
        selectedCharacter = selectedImage;
        
        // Visual feedback
        const chooseBtn = document.getElementById('choose-omi-btn');
        if (chooseBtn) {
            const originalText = chooseBtn.textContent;
            chooseBtn.textContent = 'Omi Chosen!';
            chooseBtn.style.borderColor = '#00ff88';
            chooseBtn.style.boxShadow = '0 0 25px rgba(0, 255, 136, 0.7)';
            chooseBtn.style.color = '#00ff88';
            
            setTimeout(() => {
                chooseBtn.textContent = originalText;
                chooseBtn.style.borderColor = '';
                chooseBtn.style.boxShadow = '';
                chooseBtn.style.color = '';
            }, 2000);
        }
        
        // Download the selected image
        downloadImage(selectedImage);
        
        // Save selection to localStorage
        try {
            localStorage.setItem('selectedOmi', selectedImage);
        } catch (e) {
            // Silent error handling
        }
    };
    
    // Optimized download function
    const downloadImage = (imageSrc) => {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = `selected-omi-${currentImageIndex + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    // Load previously selected character if available
    const loadSavedCharacter = () => {
        try {
            const savedCharacter = localStorage.getItem('selectedOmi');
            if (savedCharacter) {
                const savedIndex = characterImages.indexOf(savedCharacter);
                if (savedIndex !== -1) {
                    currentImageIndex = savedIndex;
                    const characterImage = document.getElementById('character-image');
                    if (characterImage) {
                        characterImage.src = savedCharacter;
                    }
                }
            }
        } catch (e) {
            // Silent error handling
        }
    };
    
    // Initialize character selection when page loads
    window.addEventListener('load', () => {
        loadSavedCharacter();
    });
});