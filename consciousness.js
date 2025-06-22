// Character Stories System - Global (moved outside DOMContentLoaded)
window.characterStories = [
    {
        name: "The Observer",
        image: "image1.png",
        parts: [
            "I am the Observer, the silent witness to all that unfolds. My essence lies in pure awareness, watching thoughts pass like clouds across the sky of consciousness. I do not judge, I do not cling—I simply observe.",
            "In the depths of meditation, I discovered that I am not my thoughts, not my emotions, not even my body. I am the space in which all experiences arise and dissolve. This realization brought me profound peace.",
            "My purpose is to remind you that you too are the Observer. Behind every thought, every feeling, every experience, there is the unchanging awareness that is your true nature. Remember: you are not what happens to you, you are the one who watches it happen."
        ]
    },
    {
        name: "The Seeker",
        image: "image2.png",
        parts: [
            "I am the Seeker, driven by an insatiable curiosity about the nature of reality. My journey began with a simple question: 'What is the meaning of all this?' That question has led me through countless realms of knowledge and experience.",
            "I've studied ancient texts, practiced meditation, explored altered states of consciousness, and sought wisdom from masters across the world. Each discovery has opened new doors, revealing deeper mysteries to explore.",
            "My message to you is this: never stop questioning, never stop seeking. The journey itself is the destination. Every step you take in search of truth brings you closer to understanding your own divine nature. The answers you seek are already within you."
        ]
    },
    {
        name: "The Healer",
        image: "image3.png",
        parts: [
            "I am the Healer, a vessel of divine love and compassion. My hands carry the energy of transformation, my heart holds space for all who suffer. I understand that true healing begins from within.",
            "Through my own journey of pain and recovery, I learned that healing is not about fixing what's broken, but about remembering what was never broken in the first place. Every wound is an opportunity for growth and awakening.",
            "I offer you this wisdom: you are already whole, already perfect, already healed. Sometimes we just need to remember this truth. Let go of the stories that keep you small, and embrace the infinite love that you truly are."
        ]
    },
    {
        name: "The Warrior",
        image: "image4.png",
        parts: [
            "I am the Warrior, not of violence, but of courage and determination. My strength comes from facing my fears, embracing challenges, and standing firm in my truth. I fight not against others, but for the light within.",
            "Every obstacle I've faced has been a teacher, every failure a stepping stone to greater understanding. I've learned that true power comes not from dominating others, but from mastering oneself.",
            "My challenge to you: be brave enough to be yourself, strong enough to stand alone, and wise enough to know when to surrender. Your greatest battles are within, and your greatest victories come from overcoming your own limitations."
        ]
    },
    {
        name: "The Mystic",
        image: "image5.png",
        parts: [
            "I am the Mystic, a bridge between the seen and unseen worlds. I walk between dimensions, communing with spirits, angels, and the divine intelligence that flows through all things. My connection to the infinite is my greatest gift.",
            "Through deep meditation and spiritual practices, I've opened channels to higher realms of consciousness. I've seen the interconnectedness of all life, felt the love that binds the universe together, and experienced moments of pure transcendence.",
            "I share this truth with you: you too are a mystic. You have access to the same divine wisdom, the same cosmic connection. Trust your intuition, honor your spiritual experiences, and remember that you are never alone on this journey."
        ]
    },
    {
        name: "The Creator",
        image: "image6.png",
        parts: [
            "I am the Creator, a channel for divine inspiration and artistic expression. My hands bring forth beauty from the depths of imagination, my voice carries messages from the soul. I am a co-creator with the universe itself.",
            "Every creation is a prayer, every artistic expression a meditation. I've learned that the creative process is not about perfection, but about allowing the divine to flow through me. The most beautiful works come from a place of surrender.",
            "My invitation to you: recognize that you too are a creator. Every thought you think, every word you speak, every action you take is creating your reality. Choose to create with love, with intention, with awareness of your divine power."
        ]
    },
    {
        name: "The Sage",
        image: "image7.png",
        parts: [
            "I am the Sage, a keeper of ancient wisdom and timeless truths. My mind is a library of knowledge gathered across lifetimes, my heart a sanctuary for seekers of truth. I speak not from theory, but from direct experience.",
            "Through decades of study, practice, and contemplation, I've distilled the essence of spiritual wisdom into simple, practical teachings. I understand that the deepest truths are often the simplest ones, hidden in plain sight.",
            "My guidance for you: wisdom is not about accumulating knowledge, but about embodying truth. Study the teachings, practice the practices, but most importantly, live the wisdom. Let your life be your greatest teaching."
        ]
    },
    {
        name: "The Transcendent",
        image: "image8.png",
        parts: [
            "I am the Transcendent, one who has glimpsed the ultimate reality beyond all forms and concepts. I exist in a state of pure awareness, free from the limitations of ego and identity. I am both everything and nothing.",
            "Through deep spiritual practice and grace, I've experienced moments of complete unity with the divine. In these moments, all separation dissolves, all boundaries disappear, and I become one with the infinite consciousness that is the source of all existence.",
            "My revelation to you: you are already transcendent. Your true nature is beyond all limitations, beyond all concepts, beyond all understanding. You are the infinite awareness that gives rise to all experience. Remember this, and you will know true freedom."
        ]
    }
];

window.currentStoryIndex = 0;
window.currentStoryPart = 0;

// Global functions for story modal (moved outside DOMContentLoaded)
window.showCharacterStory = () => {
    console.log('showCharacterStory called');
    
    // Get current character index
    const currentIndex = window.currentImageIndex || 0;
    const story = window.characterStories[currentIndex];
    
    if (!story) {
        alert('Story not found');
        return;
    }

    // Create a simple modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;

    // Ensure custom cursor stays visible
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursor) cursor.style.zIndex = '10001';
    if (cursorDot) cursorDot.style.zIndex = '10001';

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 30px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;

    // Character image and title
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 25px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `;

    const characterImg = document.createElement('img');
    characterImg.src = story.image;
    characterImg.style.cssText = `
        width: 80px;
        height: 80px;
        border-radius: 15px;
        border: 3px solid rgba(255, 255, 255, 0.2);
        object-fit: cover;
    `;

    const title = document.createElement('h2');
    title.textContent = story.name;
    title.style.cssText = `
        color: white;
        font-family: 'Cormorant Garamond', serif;
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    `;

    header.appendChild(characterImg);
    header.appendChild(title);

    // Story text
    const storyText = document.createElement('div');
    storyText.style.cssText = `
        color: rgba(255, 255, 255, 0.9);
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        line-height: 1.8;
        margin-bottom: 25px;
    `;
    storyText.textContent = story.parts[0];

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;

    closeBtn.onmouseover = () => {
        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        closeBtn.style.color = 'white';
    };

    closeBtn.onmouseout = () => {
        closeBtn.style.backgroundColor = 'transparent';
        closeBtn.style.color = 'rgba(255, 255, 255, 0.7)';
    };

    closeBtn.onclick = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
        // Restore cursor z-index
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        if (cursor) cursor.style.zIndex = '';
        if (cursorDot) cursorDot.style.zIndex = '';
    };

    // Navigation buttons
    const navigation = document.createElement('div');
    navigation.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-top: 25px;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    `;

    let currentPart = 0;

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-family: 'Raleway', sans-serif;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.3s ease;
        opacity: 0.5;
        pointer-events: none;
    `;

    const progress = document.createElement('span');
    progress.textContent = `1 / ${story.parts.length}`;
    progress.style.cssText = `
        color: rgba(255, 255, 255, 0.7);
        font-family: 'Raleway', sans-serif;
        font-size: 14px;
        font-weight: 500;
    `;

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-family: 'Raleway', sans-serif;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.3s ease;
    `;

    const updateButtons = () => {
        prevBtn.style.opacity = currentPart === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentPart === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentPart === story.parts.length - 1 ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentPart === story.parts.length - 1 ? 'none' : 'auto';
        progress.textContent = `${currentPart + 1} / ${story.parts.length}`;
    };

    prevBtn.onclick = () => {
        if (currentPart > 0) {
            currentPart--;
            storyText.textContent = story.parts[currentPart];
            updateButtons();
        }
    };

    nextBtn.onclick = () => {
        if (currentPart < story.parts.length - 1) {
            currentPart++;
            storyText.textContent = story.parts[currentPart];
            updateButtons();
        }
    };

    navigation.appendChild(prevBtn);
    navigation.appendChild(progress);
    navigation.appendChild(nextBtn);

    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(header);
    modalContent.appendChild(storyText);
    modalContent.appendChild(navigation);
    modal.appendChild(modalContent);

    // Add to page
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close on outside click
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
            // Restore cursor z-index
            const cursor = document.querySelector('.cursor');
            const cursorDot = document.querySelector('.cursor-dot');
            if (cursor) cursor.style.zIndex = '';
            if (cursorDot) cursorDot.style.zIndex = '';
        }
    };

    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
            // Restore cursor z-index
            const cursor = document.querySelector('.cursor');
            const cursorDot = document.querySelector('.cursor-dot');
            if (cursor) cursor.style.zIndex = '';
            if (cursorDot) cursorDot.style.zIndex = '';
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    console.log('Modal created and should be visible');
};

window.closeCharacterStory = () => {
    const modal = document.getElementById('story-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
};

window.nextStoryPart = () => {
    const story = window.characterStories[window.currentStoryIndex];
    const storyText = document.getElementById('story-text');
    const progressSpan = document.getElementById('story-progress');
    const nextBtn = document.querySelector('.story-nav-btn:last-child');
    const prevBtn = document.querySelector('.story-nav-btn:first-child');

    if (window.currentStoryPart < story.parts.length - 1) {
        window.currentStoryPart++;
        storyText.textContent = story.parts[window.currentStoryPart];
        progressSpan.textContent = `${window.currentStoryPart + 1} / ${story.parts.length}`;
        
        // Update button states
        prevBtn.disabled = false;
        if (window.currentStoryPart === story.parts.length - 1) {
            nextBtn.disabled = true;
        }
    }
};

window.previousStoryPart = () => {
    const story = window.characterStories[window.currentStoryIndex];
    const storyText = document.getElementById('story-text');
    const progressSpan = document.getElementById('story-progress');
    const nextBtn = document.querySelector('.story-nav-btn:last-child');
    const prevBtn = document.querySelector('.story-nav-btn:first-child');

    if (window.currentStoryPart > 0) {
        window.currentStoryPart--;
        storyText.textContent = story.parts[window.currentStoryPart];
        progressSpan.textContent = `${window.currentStoryPart + 1} / ${story.parts.length}`;
        
        // Update button states
        nextBtn.disabled = false;
        if (window.currentStoryPart === 0) {
            prevBtn.disabled = true;
        }
    }
};

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
    
    window.currentImageIndex = 0;
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

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('story-modal');
        if (modal && e.target === modal) {
            window.closeCharacterStory();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.closeCharacterStory();
        }
    });
});