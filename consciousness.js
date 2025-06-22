// Performance optimizations and global variables
window.performanceCache = {
    lastScrollTime: 0,
    lastMouseMoveTime: 0,
    animationFrameId: null,
    isScrolling: false,
    isMouseMoving: false
};

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

// Meditation Timer System - Global (moved outside DOMContentLoaded)
window.timerInterval = null;
window.totalSeconds = 300;
window.remainingSeconds = 300;
window.isRunning = false;
window.isPaused = false;

// Cache DOM elements for better performance
window.domCache = {};

window.updateDisplay = function() {
    // Use cached elements or query once
    if (!window.domCache.minutesDisplay) {
        window.domCache.minutesDisplay = document.getElementById('minutes');
        window.domCache.secondsDisplay = document.getElementById('seconds');
        window.domCache.timerProgress = document.getElementById('timer-progress');
    }
    
    const { minutesDisplay, secondsDisplay, timerProgress } = window.domCache;
    
    if (!minutesDisplay || !secondsDisplay || !timerProgress) return;
    
    const minutes = Math.floor(window.remainingSeconds / 60);
    const seconds = window.remainingSeconds % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    const progress = ((window.totalSeconds - window.remainingSeconds) / window.totalSeconds) * 360;
    timerProgress.style.background = `conic-gradient(from 0deg, #667eea ${progress}deg, transparent ${progress}deg)`;
};

window.startTimer = function() {
    if (!window.isRunning) {
        window.isRunning = true;
        window.isPaused = false;
        
        // Cache elements
        if (!window.domCache.startBtn) window.domCache.startBtn = document.getElementById('start-timer');
        if (!window.domCache.pauseBtn) window.domCache.pauseBtn = document.getElementById('pause-timer');
        if (!window.domCache.timeCircle) window.domCache.timeCircle = document.querySelector('.time-circle');
        if (!window.domCache.meditationMessage) window.domCache.meditationMessage = document.getElementById('meditation-message');
        
        const { startBtn, pauseBtn, timeCircle, meditationMessage } = window.domCache;
        
        if (startBtn) startBtn.style.display = 'none';
        if (pauseBtn) pauseBtn.style.display = 'flex';
        if (timeCircle) timeCircle.classList.add('running');
        if (meditationMessage) meditationMessage.textContent = 'Breathe deeply and find your center...';
        
        window.timerInterval = setInterval(() => {
            window.remainingSeconds--;
            window.updateDisplay();
            
            if (window.remainingSeconds <= 0) {
                window.completeTimer();
            }
        }, 1000);
    }
};

window.pauseTimer = function() {
    if (window.isRunning && !window.isPaused) {
        window.isPaused = true;
        clearInterval(window.timerInterval);
        
        const { pauseBtn, timeCircle, meditationMessage } = window.domCache;
        
        if (pauseBtn) pauseBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Resume';
        if (meditationMessage) meditationMessage.textContent = 'Meditation paused. Take a moment to breathe...';
        if (timeCircle) timeCircle.classList.remove('running');
    } else if (window.isPaused) {
        window.isPaused = false;
        
        const { pauseBtn, timeCircle, meditationMessage } = window.domCache;
        
        if (pauseBtn) pauseBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>Pause';
        if (meditationMessage) meditationMessage.textContent = 'Continuing your meditation journey...';
        if (timeCircle) timeCircle.classList.add('running');
        
        window.timerInterval = setInterval(() => {
            window.remainingSeconds--;
            window.updateDisplay();
            
            if (window.remainingSeconds <= 0) {
                window.completeTimer();
            }
        }, 1000);
    }
};

window.resetTimer = function() {
    clearInterval(window.timerInterval);
    window.isRunning = false;
    window.isPaused = false;
    window.remainingSeconds = window.totalSeconds;
    
    const { startBtn, pauseBtn, timeCircle, meditationMessage } = window.domCache;
    
    if (startBtn) startBtn.style.display = 'flex';
    if (pauseBtn) {
        pauseBtn.style.display = 'none';
        pauseBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>Pause';
    }
    
    if (timeCircle) timeCircle.classList.remove('running');
    if (meditationMessage) meditationMessage.textContent = 'Choose your meditation duration and begin your journey inward.';
    window.updateDisplay();
};

window.completeTimer = function() {
    clearInterval(window.timerInterval);
    window.isRunning = false;
    window.isPaused = false;
    
    const { startBtn, pauseBtn, timeCircle, meditationMessage } = window.domCache;
    
    if (startBtn) startBtn.style.display = 'flex';
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (timeCircle) timeCircle.classList.remove('running');
    
    if (meditationMessage) meditationMessage.textContent = 'Meditation complete. Take a moment to honor your practice.';
    
    if (timeCircle) {
        timeCircle.style.animation = 'pulse 1s ease-in-out 3';
        setTimeout(() => {
            timeCircle.style.animation = '';
        }, 3000);
    }
    
    setTimeout(() => {
        if (meditationMessage) meditationMessage.textContent = 'Your meditation session has ended. Carry this peace with you.';
    }, 2000);
};

window.changeDuration = function(minutes) {
    if (window.isRunning) return;
    
    const durationButtons = document.querySelectorAll('.duration-btn');
    durationButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    window.totalSeconds = minutes * 60;
    window.remainingSeconds = window.totalSeconds;
    
    const { meditationMessage } = window.domCache;
    if (meditationMessage) meditationMessage.textContent = `${minutes} minute meditation selected. Ready to begin your journey.`;
    
    window.updateDisplay();
};

// Quote Generator System - Global
window.currentCategory = 'all';
window.favoriteQuotes = [];

window.quotes = {
    all: [
        { text: "Once you master your mind, you master reality itself.", author: "Ancient Wisdom" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
        { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
        { text: "What you think, you become. What you feel, you attract. What you imagine, you create.", author: "Buddha" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
        { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "If you want others to be happy, practice compassion. If you want to be happy, practice compassion.", author: "Dalai Lama" }
    ],
    consciousness: [
        { text: "Consciousness is the space between experience and reaction—the part of you that watches your life unfold, yet isn't bound by it.", author: "Spiritual Wisdom" },
        { text: "The moment you become aware of the ego in yourself, that emerging awareness is the arising of consciousness.", author: "Eckhart Tolle" },
        { text: "Consciousness is not just awareness, but the ability to be aware of awareness itself.", author: "Deepak Chopra" },
        { text: "The greatest discovery of my generation is that a human being can alter his life by altering his attitudes of mind.", author: "William James" },
        { text: "Consciousness is the foundation of all existence. Without it, nothing would be known.", author: "Ancient Philosophy" },
        { text: "The mind is like water. When it's turbulent, it's difficult to see. When it's calm, everything becomes clear.", author: "Prasad Mahes" },
        { text: "Consciousness is the light that illuminates the darkness of unconsciousness.", author: "Spiritual Teaching" },
        { text: "To be conscious is to be aware of the present moment without judgment.", author: "Mindfulness Wisdom" },
        { text: "The highest form of consciousness is the awareness that you are not separate from the universe.", author: "Quantum Wisdom" },
        { text: "Consciousness is the bridge between the finite and the infinite.", author: "Mystical Wisdom" }
    ],
    love: [
        { text: "Love is not something you find. Love is something that finds you.", author: "Loretta Young" },
        { text: "The greatest happiness of life is the conviction that we are loved; loved for ourselves, or rather, loved in spite of ourselves.", author: "Victor Hugo" },
        { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
        { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
        { text: "Love is the bridge between you and everything.", author: "Rumi" },
        { text: "The only thing we never get enough of is love; and the only thing we never give enough of is love.", author: "Henry Miller" },
        { text: "Love is the master key that opens the gates of happiness.", author: "Oliver Wendell Holmes" },
        { text: "Love is the flower you've got to let grow.", author: "John Lennon" },
        { text: "Love is the greatest refreshment in life.", author: "Pablo Picasso" },
        { text: "Love is the only force capable of transforming an enemy into a friend.", author: "Martin Luther King Jr." }
    ],
    will: [
        { text: "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.", author: "Confucius" },
        { text: "Where there's a will, there's a way.", author: "English Proverb" },
        { text: "The strongest force in the universe is the human will.", author: "Ancient Wisdom" },
        { text: "Will is the character in action.", author: "Michel de Montaigne" },
        { text: "The difference between the impossible and the possible lies in determination.", author: "Tommy Lasorda" },
        { text: "Will is the key to success. Successful people strive no matter what they feel by applying their will to overcome apathy, doubt or fear.", author: "Dan Millman" },
        { text: "The human will is stronger than any material force in nature.", author: "Ancient Philosophy" },
        { text: "Will is the foundation of all achievement.", author: "Spiritual Teaching" },
        { text: "The power of the will is the greatest force in the universe.", author: "Mystical Wisdom" },
        { text: "Will is the bridge between dreams and reality.", author: "Modern Wisdom" }
    ],
    transcendence: [
        { text: "Transcendence is the highest state of consciousness, where the individual self dissolves into the universal.", author: "Spiritual Wisdom" },
        { text: "The goal of life is to transcend the limitations of the ego and realize your true nature.", author: "Ancient Teaching" },
        { text: "Transcendence is not about escaping reality, but about experiencing it more fully.", author: "Modern Philosophy" },
        { text: "In transcendence, you become one with everything and nothing at the same time.", author: "Mystical Wisdom" },
        { text: "The path to transcendence is through surrender, not control.", author: "Spiritual Master" },
        { text: "Transcendence is the realization that you are not separate from the divine.", author: "Sacred Text" },
        { text: "To transcend is to go beyond the limitations of the mind and body.", author: "Ancient Wisdom" },
        { text: "Transcendence is the ultimate freedom from all forms of bondage.", author: "Spiritual Teaching" },
        { text: "In the state of transcendence, all dualities dissolve into unity.", author: "Mystical Philosophy" },
        { text: "Transcendence is the doorway to infinite possibilities.", author: "Cosmic Wisdom" }
    ]
};

// Cache quote elements
window.quoteCache = {};

window.generateNewQuote = function() {
    // Cache elements
    if (!window.quoteCache.quoteCard) window.quoteCache.quoteCard = document.querySelector('.quote-card');
    if (!window.quoteCache.quoteText) window.quoteCache.quoteText = document.getElementById('quote-text');
    if (!window.quoteCache.quoteAuthor) window.quoteCache.quoteAuthor = document.getElementById('quote-author');
    if (!window.quoteCache.quoteMessage) window.quoteCache.quoteMessage = document.getElementById('quote-message');
    
    const { quoteCard, quoteText, quoteAuthor, quoteMessage } = window.quoteCache;
    
    if (!quoteText || !quoteAuthor) return;
    
    // Add fade out effect
    quoteCard.classList.add('fade-in');
    
    // Get quotes for current category
    const categoryQuotes = window.quotes[window.currentCategory] || window.quotes.all;
    
    // Select random quote
    const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
    const selectedQuote = categoryQuotes[randomIndex];
    
    // Update quote with animation
    setTimeout(() => {
        quoteText.textContent = `"${selectedQuote.text}"`;
        quoteAuthor.textContent = `— ${selectedQuote.author}`;
        
        // Update message
        if (quoteMessage) {
            quoteMessage.textContent = `New wisdom from ${window.currentCategory} category.`;
            setTimeout(() => {
                quoteMessage.textContent = 'Discover wisdom that resonates with your soul.';
            }, 3000);
        }
        
        // Remove animation class
        setTimeout(() => {
            quoteCard.classList.remove('fade-in');
        }, 100);
    }, 400);
};

window.setCategory = function(category) {
    window.currentCategory = category;
    
    // Update active button
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Generate new quote for category
    window.generateNewQuote();
    
    // Update message
    const { quoteMessage } = window.quoteCache;
    if (quoteMessage) {
        quoteMessage.textContent = `Exploring ${category} wisdom.`;
        setTimeout(() => {
            quoteMessage.textContent = 'Discover wisdom that resonates with your soul.';
        }, 2000);
    }
};

window.saveFavoriteQuote = function() {
    const { quoteText, quoteAuthor, quoteMessage } = window.quoteCache;
    
    if (!quoteText || !quoteAuthor) return;
    
    const currentQuote = {
        text: quoteText.textContent.replace(/^"|"$/g, ''),
        author: quoteAuthor.textContent.replace(/^— /, ''),
        category: window.currentCategory,
        timestamp: Date.now()
    };
    
    // Check if already saved
    const isAlreadySaved = window.favoriteQuotes.some(fav => 
        fav.text === currentQuote.text && fav.author === currentQuote.author
    );
    
    if (isAlreadySaved) {
        // Remove from favorites
        window.favoriteQuotes = window.favoriteQuotes.filter(fav => 
            !(fav.text === currentQuote.text && fav.author === currentQuote.author)
        );
        
        if (quoteMessage) {
            quoteMessage.textContent = 'Removed from favorites.';
            setTimeout(() => {
                quoteMessage.textContent = 'Discover wisdom that resonates with your soul.';
            }, 2000);
        }
    } else {
        // Add to favorites
        window.favoriteQuotes.push(currentQuote);
        
        if (quoteMessage) {
            quoteMessage.textContent = 'Added to favorites!';
            setTimeout(() => {
                quoteMessage.textContent = 'Discover wisdom that resonates with your soul.';
            }, 2000);
        }
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('favoriteQuotes', JSON.stringify(window.favoriteQuotes));
    } catch (error) {
        console.log('Could not save favorite quote');
    }
};

window.showFavorites = function() {
    const { quoteText, quoteAuthor, quoteMessage } = window.quoteCache;
    
    if (!quoteText || !quoteAuthor || !quoteMessage) return;
    
    if (window.favoriteQuotes.length === 0) {
        quoteMessage.textContent = 'No favorite quotes yet. Save some wisdom first!';
        setTimeout(() => {
            quoteMessage.textContent = 'Discover wisdom that resonates with your soul.';
        }, 3000);
        return;
    }
    
    // Show random favorite quote
    const randomIndex = Math.floor(Math.random() * window.favoriteQuotes.length);
    const favoriteQuote = window.favoriteQuotes[randomIndex];
    
    const { quoteCard } = window.quoteCache;
    quoteCard.classList.add('fade-in');
    
    setTimeout(() => {
        quoteText.textContent = `"${favoriteQuote.text}"`;
        quoteAuthor.textContent = `— ${favoriteQuote.author}`;
        
        quoteMessage.textContent = `Showing favorite from ${favoriteQuote.category} category.`;
        setTimeout(() => {
            quoteMessage.textContent = 'Discover wisdom that resonates with your soul.';
        }, 3000);
        
        setTimeout(() => {
            quoteCard.classList.remove('fade-in');
        }, 100);
    }, 400);
};

window.loadFavoriteQuotes = function() {
    try {
        const savedQuotes = localStorage.getItem('favoriteQuotes');
        if (savedQuotes) {
            window.favoriteQuotes = JSON.parse(savedQuotes);
        }
    } catch (error) {
        console.log('Could not load favorite quotes');
        window.favoriteQuotes = [];
    }
};

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

document.addEventListener('DOMContentLoaded', function() {
    // Performance detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
    
    // Adjust performance settings based on device capabilities
    const performanceSettings = {
        particleCount: isLowEndDevice ? 2 : (isMobile ? 3 : 5),
        particleInterval: isLowEndDevice ? 4000 : (isMobile ? 3000 : 2000),
        dotCount: isLowEndDevice ? 200 : (isMobile ? 400 : 600),
        mouseThrottle: isLowEndDevice ? 50 : (isMobile ? 32 : 16),
        scrollThrottle: isLowEndDevice ? 100 : 32
    };

    // Character selector variables
    let currentImageIndex = 0;
    let selectedCharacter = null;
    let isTransitioning = false;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const characterImages = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png'];

    // Optimized character story modal functions
    window.openCharacterStory = function() {
        const modal = document.getElementById('story-modal');
        const storyTitle = document.getElementById('story-title');
        const storyCharacterImg = document.getElementById('story-character-img');
        const storyText = document.getElementById('story-text');
        const prevBtn = document.getElementById('prev-story-btn');
        const nextBtn = document.getElementById('next-story-btn');
        const progressBar = document.getElementById('story-progress');
        
        if (!modal || !storyTitle || !storyCharacterImg || !storyText) return;
        
        const currentStory = window.characterStories[window.currentStoryIndex];
        
        storyTitle.textContent = currentStory.name;
        storyCharacterImg.src = currentStory.image;
        storyText.textContent = currentStory.parts[window.currentStoryPart];
        
        // Update navigation
        prevBtn.disabled = window.currentStoryPart === 0;
        nextBtn.disabled = window.currentStoryPart === currentStory.parts.length - 1;
        
        // Update progress
        const progress = ((window.currentStoryPart + 1) / currentStory.parts.length) * 100;
        progressBar.style.width = progress + '%';
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeCharacterStory = function() {
        const modal = document.getElementById('story-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    window.nextStoryPart = function() {
        const currentStory = window.characterStories[window.currentStoryIndex];
        if (window.currentStoryPart < currentStory.parts.length - 1) {
            window.currentStoryPart++;
            window.openCharacterStory();
        }
    };

    window.prevStoryPart = function() {
        if (window.currentStoryPart > 0) {
            window.currentStoryPart--;
            window.openCharacterStory();
        }
    };

    window.nextStory = function() {
        if (window.currentStoryIndex < window.characterStories.length - 1) {
            window.currentStoryIndex++;
            window.currentStoryPart = 0;
            window.openCharacterStory();
        }
    };

    window.prevStory = function() {
        if (window.currentStoryIndex > 0) {
            window.currentStoryIndex--;
            window.currentStoryPart = 0;
            window.openCharacterStory();
        }
    };

    // Optimized cursor system - only on desktop and if motion is preferred
    if (!isMobile && !prefersReducedMotion && !isLowEndDevice) {
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        
        if (cursor && cursorDot) {
            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;
            
            const updatePosition = ultraThrottle((e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            }, performanceSettings.mouseThrottle);
            
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
                document.addEventListener('mousemove', updatePosition, { passive: true });
            };
            
            document.addEventListener('mousemove', initCursor);

            // Optimized cursor animation with requestAnimationFrame
            function updateCursor() {
                cursorX += (mouseX - cursorX) * 0.1;
                cursorY += (mouseY - cursorY) * 0.1;
                
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
                cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                
                window.performanceCache.animationFrameId = requestAnimationFrame(updateCursor);
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
        }
    } else {
        // Ensure cursor is explicitly hidden if not on desktop
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }
    
    // Optimized Particle System
    const particlesContainer = document.querySelector('.particles');
    const createParticle = () => {
        if (prefersReducedMotion || isLowEndDevice) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 10000);
    };
    
    // Create particles periodically with reduced frequency on low-end devices
    if (!isMobile && !prefersReducedMotion && !isLowEndDevice) {
        setInterval(createParticle, performanceSettings.particleInterval);
        // Create initial particles
        for (let i = 0; i < performanceSettings.particleCount; i++) {
            setTimeout(createParticle, i * 400);
        }
    }
    
    // Optimized dot grid - much fewer dots for better performance
    const dotGrid = document.querySelector('.dot-grid');
    const numDots = performanceSettings.dotCount;
    
    // Create dots more efficiently using DocumentFragment
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        fragment.appendChild(dot);
    }
    dotGrid.appendChild(fragment);

    // Ultra-optimized throttle function
    function ultraThrottle(func, limit = 16) {
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
    if (!isMobile && !prefersReducedMotion && !isLowEndDevice) {
        const handleMouseMove = ultraThrottle((e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 10; // Reduced movement for better performance
            const yPos = (clientY / innerHeight - 0.5) * 10;
            
            dotGrid.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }, performanceSettings.mouseThrottle);
        
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Optimized audio controls
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

    // Optimized typing effect
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

    // Optimized scroll handling for navigation with better throttling
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

    const onScroll = ultraThrottle(() => {
        if (!isTicking) {
            window.requestAnimationFrame(handleScroll);
            isTicking = true;
        }
    }, performanceSettings.scrollThrottle);

    document.addEventListener('scroll', onScroll, { passive: true });

    // Optimized character selector
    const initializeCharacterSelector = () => {
        const characterImage = document.getElementById('character-image');
        if (!characterImage) return;

        // Touch support for mobile with better performance
        if (isMobile) {
            characterImage.addEventListener('touchstart', (e) => {
                isDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });
            
            document.addEventListener('touchmove', ultraThrottle((e) => {
                if (!isDragging) return;
                e.preventDefault();
                
                const deltaX = e.touches[0].clientX - startX;
                const deltaY = e.touches[0].clientY - startY;
                
                currentRotationY += deltaX * 0.2;
                currentRotationX -= deltaY * 0.15;
                
                // Limit rotation
                currentRotationY = Math.max(-45, Math.min(45, currentRotationY));
                currentRotationX = Math.max(-30, Math.min(30, currentRotationX));
                
                characterImage.style.transform = `translate3d(0, 0, 0) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
                
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, 16), { passive: false });
            
            document.addEventListener('touchend', () => {
                isDragging = false;
            });
        } else {
            // Desktop mouse support
            characterImage.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                characterImage.style.cursor = 'grabbing';
            });
            
            document.addEventListener('mousemove', ultraThrottle((e) => {
                if (!isDragging) return;
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                currentRotationY += deltaX * 0.3;
                currentRotationX -= deltaY * 0.2;
                
                // Limit rotation
                currentRotationY = Math.max(-45, Math.min(45, currentRotationY));
                currentRotationX = Math.max(-30, Math.min(30, currentRotationX));
                
                characterImage.style.transform = `translate3d(0, 0, 0) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
                
                startX = e.clientX;
                startY = e.clientY;
            }, 16), { passive: true });
            
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    characterImage.style.cursor = 'grab';
                }
            });
        }
    };
    
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
            characterImage.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
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
            
            // Add particle explosion effect only on capable devices
            if (!isMobile && !prefersReducedMotion && !isLowEndDevice) {
                for (let i = 0; i < 5; i++) {
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

    // Initialize components
    initializeCharacterSelector();

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

    // Initialize display
    setTimeout(() => {
        window.updateDisplay();
    }, 100);

    // Initialize quote generator
    setTimeout(() => {
        window.loadFavoriteQuotes();
        window.generateNewQuote();
    }, 300);
    
    // Cleanup function for performance
    window.addEventListener('beforeunload', () => {
        if (window.performanceCache.animationFrameId) {
            cancelAnimationFrame(window.performanceCache.animationFrameId);
        }
    });
});