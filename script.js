// ================= DOM ELEMENTS =================
const scenes = {
    scene1: document.getElementById('scene1'),
    scene2: document.getElementById('scene2'),
    scene3: document.getElementById('scene3'),
    scene4: document.getElementById('scene4')
};

const buttons = {
    unlock: document.getElementById('unlockBtn'),
    next1: document.getElementById('nextBtn1'),
    next2: document.getElementById('nextBtn2'),
    yes: document.getElementById('yesBtn'),
    no: document.getElementById('noBtn'),
    replay: document.getElementById('replayBtn'),
    soundToggle: document.getElementById('soundToggle')
};

const elements = {
    newMonthGreeting: document.getElementById('newMonthGreeting'),
    typewriter: document.getElementById('typewriter'),
    wishesContainer: document.querySelector('.wishes-container'),
    finalMessage: document.getElementById('finalMessage'),
    celebrationText: document.getElementById('celebrationText'),
    confettiContainer: document.getElementById('confettiContainer'),
    celebrationSound: document.getElementById('celebrationSound'),
    soundIcon: document.querySelector('.sound-icon')
};

// ================= CONFIGURATION =================
// Edit these values to personalize the experience
const CONFIG = {
    herName: "My Love",          // Change to her name/nickname
    myName: "Yours Always",      // Change to your name/nickname
    currentMonth: new Date().toLocaleString('default', { month: 'long' }),
    
    // Scene 2: Typewriter messages (array of strings)
    typewriterMessages: [
        // This will be set in init() after CONFIG is defined
    ],
    
    // Scene 3: Wish cards (array of strings)
    wishes: [
        "More moments that take your breath away",
        "Success in everything you put your heart into",
        "Protection from all worries and stress",
        "Unexpected joys that make you smile",
        "Everything aligning perfectly for you",
        "Love that grows deeper each day"
    ],
    
    // Final celebration message
    celebrationMessage: ""
};

// ================= STATE VARIABLES =================
let currentScene = 'scene1';
let typewriterIndex = 0;
let charIndex = 0;
let isTyping = false;
let noClickCount = 0;
let isSoundEnabled = false;
const maxNoClicks = 3;

// ================= INITIALIZATION =================
function init() {
    // Initialize dynamic messages that depend on CONFIG values
    CONFIG.typewriterMessages = [
        `Happy New Month, my beautiful ${CONFIG.herName} ✨`,
        "May this month bring you endless joy,",
        "peace that settles deep in your soul,",
        "and victories that make you proud.",
        "You deserve every beautiful moment coming your way 💖"
    ];
    
    CONFIG.celebrationMessage = `Welcome to the best month with me. I can't wait to make every moment special with you, ${CONFIG.herName}. This is just the beginning of our beautiful story.`;
    
    // Set current month (shows February in the badge)
    document.querySelector('.month-badge').textContent = CONFIG.currentMonth;
    
    // Initialize greeting - Changed to "Happy New Month"
    elements.newMonthGreeting.textContent = `Happy New Month, ${CONFIG.herName}`;
    
    // Set up event listeners
    setupEventListeners();
    
    // Start with sound off
    toggleSound(false);
    
    // Initialize typewriter
    setTimeout(() => {
        if (currentScene === 'scene2') {
            typeNextMessage();
        }
    }, 1000);
}

// ================= EVENT LISTENERS =================
function setupEventListeners() {
    // Scene navigation
    buttons.unlock.addEventListener('click', () => switchScene('scene2'));
    buttons.next1.addEventListener('click', () => switchScene('scene3'));
    buttons.next2.addEventListener('click', () => switchScene('scene4'));
    
    // Valentine question buttons
    buttons.yes.addEventListener('click', handleYesClick);
    buttons.no.addEventListener('click', handleNoClick);
    
    // Replay button
    buttons.replay.addEventListener('click', resetExperience);
    
    // Sound toggle
    buttons.soundToggle.addEventListener('click', () => {
        toggleSound(!isSoundEnabled);
    });
    
    // Enable sound on first user interaction
    document.addEventListener('click', () => {
        if (!isSoundEnabled) {
            toggleSound(true);
        }
    }, { once: true });
}

// ================= RESET EXPERIENCE =================
function resetExperience() {
    // Reset state variables
    currentScene = 'scene1';
    typewriterIndex = 0;
    charIndex = 0;
    isTyping = false;
    noClickCount = 0;
    
    // Hide all scenes except scene1
    Object.values(scenes).forEach(scene => {
        scene.classList.remove('active');
    });
    
    // Show scene1
    scenes.scene1.classList.add('active');
    
    // Reset DOM elements
    elements.typewriter.innerHTML = '';
    elements.wishesContainer.innerHTML = '';
    elements.finalMessage.classList.add('hidden');
    elements.confettiContainer.innerHTML = '';
    
    // Reset buttons
    buttons.yes.disabled = false;
    buttons.no.disabled = false;
    buttons.no.textContent = 'NO';
    buttons.no.style.opacity = '1';
    buttons.no.style.transform = 'none';
    buttons.no.style.position = 'static';
    buttons.no.style.transition = '';
    buttons.yes.classList.remove('pulse');
    
    // Reset sound if needed
    elements.celebrationSound.pause();
    elements.celebrationSound.currentTime = 0;
}

// ================= SCENE MANAGEMENT =================
function switchScene(targetScene) {
    // Hide current scene
    scenes[currentScene].classList.remove('active');
    
    // Show target scene
    scenes[targetScene].classList.add('active');
    currentScene = targetScene;
    
    // Initialize scene-specific features
    switch(targetScene) {
        case 'scene2':
            setTimeout(() => {
                typewriterIndex = 0;
                charIndex = 0;
                elements.typewriter.innerHTML = '';
                typeNextMessage();
            }, 500);
            break;
            
        case 'scene3':
            setTimeout(() => createWishCards(), 500);
            break;
            
        case 'scene4':
            // Reset NO button state
            noClickCount = 0;
            buttons.no.textContent = 'NO';
            buttons.no.disabled = false;
            buttons.no.style.opacity = '1';
            buttons.no.style.transform = 'none';
            buttons.no.style.position = 'static';
            buttons.no.style.transition = '';
            break;
    }
}

// ================= TYPEWRITER EFFECT =================
function typeNextMessage() {
    if (typewriterIndex >= CONFIG.typewriterMessages.length) return;
    
    isTyping = true;
    const message = CONFIG.typewriterMessages[typewriterIndex];
    elements.typewriter.innerHTML = '';
    charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < message.length) {
            elements.typewriter.innerHTML += message.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            typewriterIndex++;
            
            // Wait a moment before typing next message or showing button
            setTimeout(() => {
                if (typewriterIndex < CONFIG.typewriterMessages.length) {
                    elements.typewriter.innerHTML += '<br><br>';
                    typeNextMessage();
                }
            }, 1000);
        }
    }, 50);
}

// ================= WISH CARDS =================
function createWishCards() {
    elements.wishesContainer.innerHTML = '';
    
    CONFIG.wishes.forEach((wish, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.innerHTML = `<p class="wish-text">${wish}</p>`;
            elements.wishesContainer.appendChild(card);
            
            // Trigger animation
            setTimeout(() => card.classList.add('visible'), 10);
        }, index * 300);
    });
}

// ================= YES BUTTON HANDLER =================
function handleYesClick() {
    // Disable buttons
    buttons.yes.disabled = true;
    buttons.no.disabled = true;
    
    // Play celebration sound
    if (isSoundEnabled) {
        elements.celebrationSound.currentTime = 0;
        elements.celebrationSound.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Create confetti
    createConfetti(150);
    
    // Create heart burst
    createHeartBurst();
    
    // Show celebration message
    setTimeout(() => {
        elements.celebrationText.textContent = CONFIG.celebrationMessage;
        elements.finalMessage.classList.remove('hidden');
        
        // Scroll to show the message
        elements.finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 2000);
}

// ================= NO BUTTON HANDLER =================
function handleNoClick() {
    noClickCount++;
    
    if (noClickCount >= maxNoClicks) {
        // After max attempts, show cute message
        buttons.no.textContent = "Okay okay 😭 I'll ask properly... try YES";
        buttons.no.disabled = true;
        buttons.no.style.opacity = '0.7';
        
        // Make YES button pulse to attract attention
        buttons.yes.classList.add('pulse');
        return;
    }
    
    // Playful responses based on click count
    const responses = [
        "Are you sure? 🥺",
        "Maybe think about it again? 💔",
        "Please? With a cherry on top? 🍒"
    ];
    
    // Update button text
    if (noClickCount <= responses.length) {
        buttons.no.textContent = responses[noClickCount - 1];
    }
    
    // Move button to random position
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = buttons.no.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply movement with transition
    buttons.no.style.position = 'absolute';
    buttons.no.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    buttons.no.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Reset position after animation
    setTimeout(() => {
        buttons.no.style.transition = '';
    }, 500);
}

// ================= ANIMATIONS =================
function createConfetti(count) {
    elements.confettiContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position
            confetti.style.left = `${Math.random() * 100}vw`;
            
            // Random color
            const colors = ['#ff3366', '#ff6b6b', '#ff69b4', '#9370db', '#87ceeb', '#ffb6c1'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random size
            const size = Math.random() * 10 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Random animation
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 1;
            confetti.style.animation = `confettiFall ${duration}s linear ${delay}s forwards`;
            
            elements.confettiContainer.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, (duration + delay) * 1000);
        }, i * 20);
    }
}

function createHeartBurst() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '20px';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'heartBurst 1s forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// ================= SOUND MANAGEMENT =================
function toggleSound(enabled) {
    isSoundEnabled = enabled;
    elements.soundIcon.textContent = enabled ? '🔊' : '🔇';
    
    if (enabled) {
        buttons.soundToggle.style.background = 'rgba(255, 105, 180, 0.2)';
        buttons.soundToggle.style.borderColor = '#ff69b4';
    } else {
        buttons.soundToggle.style.background = 'rgba(255, 255, 255, 0.1)';
        buttons.soundToggle.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
}

// ================= START THE APP =================
// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);