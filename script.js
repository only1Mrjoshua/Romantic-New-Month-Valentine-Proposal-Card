// ================= DOM ELEMENTS =================
const scenes = {
    scene1: document.getElementById('scene1'),
    scene2: document.getElementById('scene2'),
    scene3: document.getElementById('scene3'),
    scene4: document.getElementById('scene4'),
    scene5: document.getElementById('scene5')
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
    celebrationText: document.getElementById('celebrationText'),
    confettiContainer: document.getElementById('confettiContainer'),
    celebrationSound: document.getElementById('celebrationSound'),
    soundIcon: document.querySelector('.sound-icon')
};

// ================= CONFIGURATION =================
const CONFIG = {
    herName: "Ifemi💝",
    myName: "Yours Always",
    currentMonth: new Date().toLocaleString('default', { month: 'long' }),
    typewriterMessages: [],
    wishes: [
        "More moments that take your breath away",
        "Success in everything you put your heart into",
        "Protection from all worries and stress",
        "Unexpected joys that make you smile",
        "Everything aligning perfectly for you",
        "Love that grows deeper each day"
    ],
    celebrationMessage: ""
};

// ================= STATE VARIABLES =================
let currentScene = 'scene1';
let typewriterIndex = 0;
let charIndex = 0;
let isTyping = false;
let isSoundEnabled = false;

// ================= INITIALIZATION =================
function init() {
    CONFIG.typewriterMessages = [
        `Happy New Month, ${CONFIG.herName} ✨`,
        "May this month bring you endless joy,",
        "peace that settles deep in your soul,",
        "and victories that make you proud.",
        "You deserve every beautiful moment coming your way 💖",

        "But beyond wishes…",
        "I want you to remember something important.",

        "You are stronger than the days that try to break you.",
        "Kinder than the world sometimes deserves.",
        "And more beautiful than you ever give yourself credit for.",

        "Even on the days you feel tired,",
        "or unsure,",
        "or quietly overwhelmed…",
        "you are still enough.",
        "More than enough.",

        "I hope this month reminds you of your worth.",
        "That you never have to shrink to be loved.",
        "That your heart, your laughter,",
        "and even your silence…",
        "are all precious.",

        "If this month brings challenges,",
        "I hope it also brings strength.",
        "If it brings tears,",
        "I hope it brings arms that hold you close which are mine.",
        "And if it brings joy…",
        "I hope it stays longer than expected.",

        "Thank you for being you.",
        "For existing in this world.",
        "For being someone my heart genuinely cares about.",

        "This month,",
        "and every month after…",
        "I hope you feel loved.",
        "Seen.",
        "And never alone 💕",
        "I love you so much baby💕"
    ];

    CONFIG.celebrationMessage = `Welcome to the best month with me. I can't wait to make every moment special with you, ${CONFIG.herName}. This is just the beginning of our beautiful story.`;

    document.querySelector('.month-badge').textContent = CONFIG.currentMonth;
    elements.newMonthGreeting.textContent = `Happy New Month, ${CONFIG.herName}`;
    buttons.no.disabled = true;
    buttons.no.style.cursor = 'not-allowed';

    setupEventListeners();
    toggleSound(false);

    setTimeout(() => {
        if (currentScene === 'scene2') {
            typeNextMessage();
        }
    }, 1000);
}

// ================= EVENT LISTENERS =================
function setupEventListeners() {
    buttons.unlock.addEventListener('click', () => switchScene('scene2'));
    buttons.next1.addEventListener('click', () => switchScene('scene3'));
    buttons.next2.addEventListener('click', () => switchScene('scene4'));
    buttons.yes.addEventListener('click', handleYesClick);
    buttons.no.addEventListener('click', (e) => e.preventDefault());
    buttons.replay.addEventListener('click', resetExperience);
    buttons.soundToggle.addEventListener('click', () => toggleSound(!isSoundEnabled));

    document.addEventListener('click', () => {
        if (!isSoundEnabled) toggleSound(true);
    }, { once: true });
}

// ================= RESET EXPERIENCE =================
function resetExperience() {
    currentScene = 'scene1';
    typewriterIndex = 0;
    charIndex = 0;
    isTyping = false;

    Object.values(scenes).forEach(scene => scene.classList.remove('active'));
    scenes.scene1.classList.add('active');

    elements.typewriter.innerHTML = '';
    elements.wishesContainer.innerHTML = '';
    elements.confettiContainer.innerHTML = '';

    buttons.yes.disabled = false;
    buttons.no.disabled = true;
    buttons.no.style.cursor = 'not-allowed';

    elements.celebrationSound.pause();
    elements.celebrationSound.currentTime = 0;
}

// ================= SCENE MANAGEMENT =================
function switchScene(targetScene) {
    scenes[currentScene].classList.remove('active');
    scenes[targetScene].classList.add('active');
    currentScene = targetScene;

    switch (targetScene) {
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
            buttons.no.disabled = true;
            buttons.no.style.cursor = 'not-allowed';
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

            setTimeout(() => {
                if (typewriterIndex < CONFIG.typewriterMessages.length) {
                    elements.typewriter.innerHTML += '<br><br>';
                    typeNextMessage();
                }
            }, 1500);
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
            setTimeout(() => card.classList.add('visible'), 10);
        }, index * 300);
    });
}

// ================= YES BUTTON HANDLER =================
function handleYesClick() {
    buttons.yes.disabled = true;

    if (isSoundEnabled) {
        elements.celebrationSound.currentTime = 0;
        elements.celebrationSound.play().catch(e => console.log("Audio play failed"));
    }

    createConfetti(120);
    createHeartBurst();

    setTimeout(() => {
        elements.celebrationText.textContent = CONFIG.celebrationMessage;
        switchScene('scene5');
    }, 2000);
}

// ================= ANIMATIONS =================
function createConfetti(count) {
    elements.confettiContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            const colors = ['#ff3366', '#ff6b6b', '#ff69b4', '#9370db', '#87ceeb', '#ffb6c1'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 1;
            confetti.style.animation = `confettiFall ${duration}s linear ${delay}s forwards`;
            elements.confettiContainer.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) confetti.remove();
            }, (duration + delay) * 1000);
        }, i * 15);
    }
}

function createHeartBurst() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '18px';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'heartBurst 1s forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// ================= SOUND MANAGEMENT =================
function toggleSound(enabled) {
    isSoundEnabled = enabled;
    elements.soundIcon.textContent = enabled ? '🔊' : '🔇';
    buttons.soundToggle.style.background = enabled ? 'rgba(255, 105, 180, 0.2)' : 'rgba(255, 255, 255, 0.1)';
    buttons.soundToggle.style.borderColor = enabled ? '#ff69b4' : 'rgba(255, 255, 255, 0.2)';
}

// ================= START THE APP =================
document.addEventListener('DOMContentLoaded', init);