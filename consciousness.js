document.addEventListener('DOMContentLoaded', () => {
    // Performance optimizations
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Custom Cursor System - Fixed
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!isMobile && cursor && cursorDot) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        const updatePosition = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const initCursor = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorX = e.clientX;
            cursorY = e.clientY;

            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';

            // Start the animation loop
            updateCursor();

            // Switch to the regular update function
            document.removeEventListener('mousemove', initCursor);
            document.addEventListener('mousemove', updatePosition);
        };
        
        document.addEventListener('mousemove', initCursor);

        // Smooth cursor animation
        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            
            requestAnimationFrame(updateCursor);
        }
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .character-image, .nav-arrow, .choose-omi-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorDot.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorDot.classList.remove('hover');
            });
        });
    } else {
        // Ensure cursor is explicitly hidden if not on desktop
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }
    
    // Particle System
    const particlesContainer = document.querySelector('.particles');
    const createParticle = () => {
        if (prefersReducedMotion) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    };
    
    // Create particles periodically
    if (!isMobile && !prefersReducedMotion) {
        setInterval(createParticle, 2000);
        // Create initial particles
        for (let i = 0; i < 5; i++) {
            setTimeout(createParticle, i * 400);
        }
    }
    
    // Reduced dot grid for better performance
    const dotGrid = document.querySelector('.dot-grid');
    const numDots = isMobile ? 400 : 900; // Much fewer dots for better performance
    
    // Create dots more efficiently
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        fragment.appendChild(dot);
    }
    dotGrid.appendChild(fragment);

    // Ultra-optimized throttle function
    function ultraThrottle(func, limit = 16) { // 60fps = 16ms
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimized mouse effect - only on desktop and if motion is preferred
    if (!isMobile && !prefersReducedMotion) {
        const handleMouseMove = ultraThrottle((e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 15; // Reduced movement
            const yPos = (clientY / innerHeight - 0.5) * 15;
            
            dotGrid.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }, 32); // 30fps instead of 60fps for better performance
        
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Audio controls with better performance
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
                        .catch(() => {});
                }
            } else {
                audio.pause();
                playPauseBtn.classList.remove('pause');
                playPauseBtn.classList.add('play');
            }
        });
    }

    // Simplified typing effect with better performance
    function typeWriter(element, text, speed = 80) {
        if (!element || !text) return;
        
        element.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    }

    // Initialize typing effects
    const initTypingEffects = () => {
        const consciousnessTitle = document.querySelector('.consciousness-title');
        if (consciousnessTitle) {
            typeWriter(consciousnessTitle, "Consciousness");
        }

        const sectionTitle = document.getElementById('section-title');
        if (sectionTitle) {
            setTimeout(() => {
                typeWriter(sectionTitle, "What is Consciousness", 80);
            }, 1500);
        }
    };

    // Better timing for typing effects
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTypingEffects);
    } else {
        initTypingEffects();
    }

    // Optimized scroll handling for navigation
    const nav = document.querySelector('.top-right-nav');
    let lastScrollY = window.scrollY;
    let isTicking = false;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down and past the top
            nav.classList.add('nav-hidden');
        } else {
            // Scrolling up
            nav.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
        isTicking = false;
    };

    const onScroll = () => {
        if (!isTicking) {
            window.requestAnimationFrame(handleScroll);
            isTicking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Simplified navigation effects
    const navLinks = document.querySelectorAll('.top-right-nav a');
    navLinks.forEach(link => {
        if (!isMobile) {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translate3d(0, -2px, 0)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translate3d(0, 0, 0)';
            });
        }
        
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Character Selection System - Improved 3D Rotation
    const characterImages = [
        'image1.png',
        'image2.png', 
        'image3.png',
        'image4.png',
        'image5.png',
        'image6.png',
        'image7.png',
        'image8.png'
    ];
    
    let currentImageIndex = 0;
    let selectedCharacter = null;
    let isTransitioning = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    
    // Preload images more efficiently
    const imageCache = new Map();
    characterImages.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => imageCache.set(imageSrc, img);
        img.onerror = () => {};
    });
    
    // Improved 3D Rotation for Character Image
    const characterImage = document.getElementById('character-image');
    const characterContainer = document.querySelector('.character-image-container');
    
    if (characterImage && characterContainer && !isMobile) {
        let isHovering = false;
        let animationId;
        
        // Mouse enter/leave for hover detection
        characterContainer.addEventListener('mouseenter', () => {
            isHovering = true;
        });
        
        characterContainer.addEventListener('mouseleave', () => {
            isHovering = false;
            // Reset rotation when leaving
            currentRotationX = 0;
            currentRotationY = 0;
            characterImage.style.transform = `translateZ(0) rotateX(0deg) rotateY(0deg)`;
        });
        
        // Mouse move for rotation (only when hovering)
        characterContainer.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            const rect = characterContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Calculate rotation based on mouse position
            currentRotationY = (mouseX / (rect.width / 2)) * 20; // Max 20 degrees
            currentRotationX = -(mouseY / (rect.height / 2)) * 15; // Max 15 degrees
            
            characterImage.style.transform = `translateZ(0) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        });
        
        // Mouse drag for manual rotation
        characterImage.addEventListener('mousedown', (e) => {
            if (!isHovering) return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            characterImage.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging || !isHovering) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            currentRotationY += deltaX * 0.3;
            currentRotationX -= deltaY * 0.2;
            
            // Limit rotation
            currentRotationY = Math.max(-45, Math.min(45, currentRotationY));
            currentRotationX = Math.max(-30, Math.min(30, currentRotationX));
            
            characterImage.style.transform = `translateZ(0) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
            
            startX = e.clientX;
            startY = e.clientY;
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                characterImage.style.cursor = 'grab';
            }
        });
        
        // Touch support for mobile
        characterImage.addEventListener('touchstart', (e) => {
            if (isMobile) {
                isDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging || !isMobile) return;
            e.preventDefault();
            
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            currentRotationY += deltaX * 0.2;
            currentRotationX -= deltaY * 0.15;
            
            // Limit rotation
            currentRotationY = Math.max(-45, Math.min(45, currentRotationY));
            currentRotationX = Math.max(-30, Math.min(30, currentRotationX));
            
            characterImage.style.transform = `translateZ(0) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
            
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
            }
        });
    }
    
    // Optimized image switching
    const switchImage = (newIndex) => {
        if (isTransitioning) return;
        
        const characterImage = document.getElementById('character-image');
        if (!characterImage) return;
        
        isTransitioning = true;
        currentImageIndex = newIndex;
        const newImageSrc = characterImages[currentImageIndex];
        
        // Reset rotation before switching
        currentRotationX = 0;
        currentRotationY = 0;
        
        // Use opacity for smoother transitions
        characterImage.style.opacity = '0';
        
        setTimeout(() => {
            characterImage.src = newImageSrc;
            characterImage.style.opacity = '1';
            characterImage.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
            isTransitioning = false;
        }, 150);
    };
    
    // Global functions
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
        
        const chooseBtn = document.getElementById('choose-omi-btn');
        if (chooseBtn) {
            const originalText = chooseBtn.textContent;
            chooseBtn.textContent = 'Omi Chosen!';
            chooseBtn.style.borderColor = '#00ff88';
            chooseBtn.style.boxShadow = '0 0 25px rgba(0, 255, 136, 0.7)';
            chooseBtn.style.color = '#00ff88';
            
            // Add particle explosion effect
            if (!isMobile && !prefersReducedMotion) {
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => createParticle(), i * 100);
                }
            }
            
            setTimeout(() => {
                chooseBtn.textContent = originalText;
                chooseBtn.style.borderColor = '';
                chooseBtn.style.boxShadow = '';
                chooseBtn.style.color = '';
            }, 2000);
        }
        
        // Download functionality
        const link = document.createElement('a');
        link.href = selectedImage;
        link.download = `selected-omi-${currentImageIndex + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Save to localStorage
        try {
            localStorage.setItem('selectedOmi', selectedImage);
        } catch (e) {}
    };
    
    // Load saved character
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
        } catch (e) {}
    };
    
    // Initialize on load
    window.addEventListener('load', loadSavedCharacter);

    // Preload images for better performance
    const images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png'];
    images.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Initialize other components
    initializeDotGrid();
    initializeCursor();
    initializeAudio();
    initializeCharacterSelector();
    initializeParticles();
    initializeNavVisibility();
});