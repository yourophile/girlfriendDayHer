// DOM Elements
const landingPage = document.getElementById('landingPage');
const surprisePage = document.getElementById('surprisePage');
const clickableHeart = document.getElementById('clickableHeart');
const enterButton = document.getElementById('enterButton');
const backButton = document.getElementById('backButton');
const loveMeter = document.getElementById('loveMeter');
const surpriseHeart = document.getElementById('surpriseHeart');
const notes = document.querySelectorAll('.note');
const messages = document.querySelectorAll('.message');
const galleryItems = document.querySelectorAll('.gallery-item');

// Audio context for sound effects (optional)
let audioContext;
let oscillator;

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    createParticleSystem();
    addInteractiveEffects();
    initializeQuiz();
    initializeMemoryGame();
    initializeLetterGenerator();
    initializeLoveCounter();
    initializePageNavigation();
    initializePuzzleGame(); // Initialize puzzle game
    initializeMobileOptimizations(); // Add mobile optimizations
});

function initializePage() {
    // Animate love meter
    setTimeout(() => {
        animateLoveMeter();
    }, 2000);

    // Add click effects to notes
    notes.forEach((note, index) => {
        note.addEventListener('click', () => {
            createHeartBurst(note);
            showNoteMessage(index);
        });
    });

    // Add hover effects to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            createSparkleEffect(item);
        });
    });
}

function animateLoveMeter() {
    const percentage = document.querySelector('.meter-percentage');
    let currentValue = 0;
    const targetValue = 100;
    const duration = 3000;
    const increment = targetValue / (duration / 16);

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        percentage.textContent = Math.floor(currentValue) + '%';
    }, 16);
}

function createParticleSystem() {
    // Create floating particles
    setInterval(() => {
        createParticle();
    }, 2000);
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.backgroundColor = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

function addInteractiveEffects() {
    // Clickable heart effect - goes to surprise page
    clickableHeart.addEventListener('click', () => {
        createHeartBurst(clickableHeart);
        playHeartSound();
        setTimeout(() => {
            showSurprise();
        }, 1000);
    });

    // Enter button effect - goes to memory game (3rd page)
    enterButton.addEventListener('click', () => {
        createButtonEffect(enterButton);
        setTimeout(() => {
            showMemoryPage();
        }, 500);
    });

    // Surprise heart interaction - shows puzzle game
    surpriseHeart.addEventListener('click', () => {
        createHeartExplosion(surpriseHeart);
        playHeartSound();
        showPuzzleGame();
    });

    // Add mouse trail effect
    document.addEventListener('mousemove', (e) => {
        createMouseTrail(e.clientX, e.clientY);
    });
}

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.transition = 'all 1s ease-out';

        document.body.appendChild(heart);

        const angle = (i * 45) * Math.PI / 180;
        const distance = 100;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;

        setTimeout(() => {
            heart.style.left = targetX + 'px';
            heart.style.top = targetY + 'px';
            heart.style.opacity = '0';
            heart.style.transform = 'scale(0.5)';
        }, 50);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

function createHeartExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.transition = 'all 1.5s ease-out';

        document.body.appendChild(heart);

        const angle = (i * 30) * Math.PI / 180;
        const distance = 150;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;

        setTimeout(() => {
            heart.style.left = targetX + 'px';
            heart.style.top = targetY + 'px';
            heart.style.opacity = '0';
            heart.style.transform = 'scale(0.3) rotate(360deg)';
        }, 50);

        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}

function createButtonEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = '15px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.transition = 'all 0.8s ease-out';

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0.5) translateY(-20px)';
        }, 50);

        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

function createMouseTrail(x, y) {
    if (Math.random() > 0.9) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '999';
        trail.style.transition = 'all 0.5s ease-out';

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0.5)';
        }, 50);

        setTimeout(() => {
            trail.remove();
        }, 500);
    }
}

function showNoteMessage(index) {
    const messages = [
        "You're absolutely amazing! 🌟",
        "I'm so grateful for you! 💖",
        "You make my world complete! ✨"
    ];
    
    showNotification(messages[index]);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    notification.style.color = '#333';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '25px';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '10000';
    notification.style.transition = 'all 0.3s ease';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
    }, 2000);

    setTimeout(() => {
        notification.remove();
    }, 2300);
}

function showSurprise() {
    landingPage.style.opacity = '0';
    landingPage.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        landingPage.style.display = 'none';
        surprisePage.classList.add('active');
        
        // Animate messages sequentially
        messages.forEach((message, index) => {
            setTimeout(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, 500 + index * 500);
        });
    }, 800);
}

function hideSurprise() {
    surprisePage.classList.remove('active');
    
    setTimeout(() => {
        landingPage.style.display = 'flex';
        landingPage.style.opacity = '1';
        landingPage.style.transform = 'scale(1)';
    }, 800);
}

function playHeartSound() {
    // Create a simple beep sound using Web Audio API
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        // Fallback if audio is not supported
        console.log('Audio not supported');
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && surprisePage.classList.contains('active')) {
        hideSurprise();
    }
    if (e.key === 'Enter' && !surprisePage.classList.contains('active')) {
        showSurprise();
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});

// Performance optimization - throttle mouse events
let mouseTimeout;
document.addEventListener('mousemove', (e) => {
    if (mouseTimeout) return;
    
    mouseTimeout = setTimeout(() => {
        createMouseTrail(e.clientX, e.clientY);
        mouseTimeout = null;
    }, 16);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add confetti effect on special interactions
function createConfetti() {
    const colors = ['#ff6b9d', '#f093fb', '#ffeb3b', '#4ecdc4', '#45b7d1'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.transition = 'all 3s ease-out';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.top = window.innerHeight + 'px';
            confetti.style.transform = 'rotate(360deg)';
            confetti.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Trigger confetti on special moments
surpriseHeart.addEventListener('dblclick', createConfetti);

// Love Quiz functionality
let currentQuestion = 0;
const quizQuestions = [
    "Do you know how much I love you?",
    "Are you the most beautiful person in my world?",
    "Do you make every day special?",
    "Are you my soulmate?",
    "Will you love me forever?"
];

// Reset quiz function
function resetQuiz() {
    currentQuestion = 0;
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizResult = document.getElementById('quizResult');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    
    quizQuestion.innerHTML = `<p>Click the heart to start our love quiz!</p>`;
    quizOptions.style.display = 'none';
    quizResult.style.display = 'none';
    nextQuestionBtn.style.display = 'none';
    
    // Reset options
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
        opt.style.pointerEvents = 'auto';
    });
}

function initializeQuiz() {
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizResult = document.getElementById('quizResult');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    // Initialize quiz state
    resetQuiz();

    quizQuestion.addEventListener('click', () => {
        if (currentQuestion < quizQuestions.length) {
            quizQuestion.innerHTML = `<p>${quizQuestions[currentQuestion]}</p>`;
            quizOptions.style.display = 'flex';
            quizResult.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
        }
    });

    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => {
            const isCorrect = option.dataset.correct === 'true';
            
            // Disable all options
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.style.pointerEvents = 'none';
                if (opt === option) {
                    opt.classList.add(isCorrect ? 'correct' : 'incorrect');
                }
            });

            // Show result
            quizResult.style.display = 'block';
            quizResult.textContent = isCorrect ? 
                'Correct! You know our love perfectly! 💖' : 
                'Wrong answer, but I still love you! 💕';
            quizResult.className = `quiz-result ${isCorrect ? 'correct' : 'incorrect'}`;

            nextQuestionBtn.style.display = 'block';
        });
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            // Show the next question immediately
            quizQuestion.innerHTML = `<p>${quizQuestions[currentQuestion]}</p>`;
            quizOptions.style.display = 'flex';
            quizResult.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
            
            // Reset options
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
                opt.style.pointerEvents = 'auto';
            });
        } else {
            quizQuestion.innerHTML = `<p>Quiz completed! You're perfect! 💖</p>`;
            quizOptions.style.display = 'none';
            quizResult.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
            
            // Show reset button when quiz is completed
            const resetQuizBtn = document.getElementById('resetQuizBtn');
            resetQuizBtn.style.display = 'block';
        }
    });

    // Add reset quiz button functionality
    const resetQuizBtn = document.getElementById('resetQuizBtn');
    resetQuizBtn.addEventListener('click', () => {
        resetQuiz();
        resetQuizBtn.style.display = 'none';
    });
}

// Memory Game functionality
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

function initializeMemoryGame() {
    const memoryCards = document.querySelectorAll('.memory-card');
    const resetBtn = document.getElementById('resetMemoryBtn');

    // Shuffle cards
    shuffleCards();

    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
                return;
            }

            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                canFlip = false;
                checkMatch();
            }
        });
    });

    resetBtn.addEventListener('click', () => {
        resetMemoryGame();
    });
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.card === card2.dataset.card;

    setTimeout(() => {
        if (match) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            createHeartBurst(card1);
            
            if (matchedPairs === 4) {
                setTimeout(() => {
                    showNotification('Perfect! You found all future events together! 💖 \n Be Honest and DM me what you got at first!!');
                }, 1200);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

function shuffleCards() {
    const memoryGame = document.getElementById('memoryGame');
    const cards = Array.from(memoryGame.children);
    
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        memoryGame.appendChild(cards[j]);
    }
}

function resetMemoryGame() {
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
    
    flippedCards = [];
    matchedPairs = 0;
    canFlip = true;
    shuffleCards();
}

// Love Letter Generator
const loveLetters = [
    "My Cutie, every moment with you feels like a beautiful dream come true. Your smile brightens my darkest days and your love gives me strength I never knew I had. I'm so grateful for you.",
    
    "To the one who makes my heart skip a beat, you are my everything. Your kindness, your beauty, your love - they all make me a better person. I promise to love you more with each passing day.",
    
    "My beautiful angel, you are the missing piece to my puzzle. Your love has transformed my world in ways I never imagined possible. Thank you for being you and for loving me.",
    
    "Dearest, you are my sunshine on cloudy days, my comfort in difficult times, and my joy in every celebration. Your love is the greatest gift I've ever received.",
    
    "My love, you are my star, my moon, my everything. Every day I fall more in love with you. You are perfect in every way and I'm so lucky to call you mine."
];

function initializeLetterGenerator() {
    const generateBtn = document.getElementById('generateLetterBtn');
    const letterDisplay = document.getElementById('generatedLetter');

    generateBtn.addEventListener('click', () => {
        const randomLetter = loveLetters[Math.floor(Math.random() * loveLetters.length)];
        
        // Animate the letter appearance
        letterDisplay.style.opacity = '0';
        letterDisplay.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            letterDisplay.textContent = randomLetter;
            letterDisplay.style.opacity = '1';
            letterDisplay.style.transform = 'translateY(0)';
            createHeartBurst(generateBtn);
        }, 300);
    });
}

// Love Counter
let loveCount = 0;
const loveMessages = [
    "That's a lot of love! 💖",
    "Infinite love for you! 💕",
    "You're counting my heartbeats! 💓",
    "Love you more than stars! ⭐",
    "My love for you is endless! 💝",
    "You're my everything! 💖",
    "Love you to the moon and back! 🌙",
    "You're my perfect match! 💕"
];

function initializeLoveCounter() {
    const countBtn = document.getElementById('countLoveBtn');
    const counterDisplay = document.getElementById('loveCounter');
    const counterMessage = document.getElementById('counterMessage');

    countBtn.addEventListener('click', () => {
        loveCount++;
        counterDisplay.textContent = loveCount;
        
        // Animate the counter
        counterDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterDisplay.style.transform = 'scale(1)';
        }, 200);

        // Show random message every 5 clicks
        if (loveCount % 5 === 0) {
            const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            counterMessage.textContent = randomMessage;
            counterMessage.style.opacity = '1';
            
            setTimeout(() => {
                counterMessage.style.opacity = '0';
            }, 2000);
        }

        // Create heart burst effect
        createHeartBurst(countBtn);
        
        // Play sound
        playHeartSound();
    });
} 

// Page navigation functions
function initializePageNavigation() {
    const enterButton = document.getElementById('enterButton');
    const backButton = document.getElementById('backButton');
    const memoryBackButton = document.getElementById('memoryBackButton');
    
    // Enter button goes to memory game (3rd page)
    enterButton.addEventListener('click', () => {
        showMemoryPage();
    });
    
    // Back button from surprise page goes to landing
    backButton.addEventListener('click', () => {
        hideSurprise();
    });
    
    // Back button from memory page goes to surprise page
    memoryBackButton.addEventListener('click', () => {
        hideMemoryPage();
    });
}

function showMemoryPage() {
    const landingPage = document.getElementById('landingPage');
    const surprisePage = document.getElementById('surprisePage');
    const memoryPage = document.getElementById('memoryPage');
    
    landingPage.style.display = 'none';
    surprisePage.classList.remove('active');
    memoryPage.classList.add('active');
    
    // Reset memory game when showing the page
    resetMemoryGame();
    
    // Create confetti effect
    createConfetti();
}

function hideMemoryPage() {
    const landingPage = document.getElementById('landingPage');
    const surprisePage = document.getElementById('surprisePage');
    const memoryPage = document.getElementById('memoryPage');
    
    memoryPage.classList.remove('active');
    surprisePage.classList.add('active');
} 

// Love Puzzle Game functionality
let puzzlePieces = [];
let emptyIndex = 8;
let puzzleTimer = null;
let puzzleStartTime = null;

function initializePuzzleGame() {
    const puzzleGrid = document.getElementById('puzzleGrid');
    const shuffleBtn = document.getElementById('shufflePuzzleBtn');
    
    // Create puzzle pieces
    const symbols = ['💖', '💕', '💓', '💗', '💝', '💘', '💞', '💟'];
    puzzlePieces = [...symbols, '']; // Empty piece at the end
    
    // Generate puzzle grid
    generatePuzzleGrid();
    
    // Add shuffle functionality
    shuffleBtn.addEventListener('click', () => {
        shufflePuzzle();
        startPuzzleTimer();
    });
}

function generatePuzzleGrid() {
    const puzzleGrid = document.getElementById('puzzleGrid');
    puzzleGrid.innerHTML = '';
    
    puzzlePieces.forEach((symbol, index) => {
        const piece = document.createElement('div');
        piece.className = symbol === '' ? 'puzzle-piece empty' : 'puzzle-piece';
        piece.textContent = symbol;
        piece.dataset.index = index;
        
        if (symbol !== '') {
            piece.addEventListener('click', () => movePuzzlePiece(index));
        }
        
        puzzleGrid.appendChild(piece);
    });
}

function movePuzzlePiece(index) {
    const pieces = document.querySelectorAll('.puzzle-piece');
    
    // Check if piece can move (adjacent to empty space)
    const canMove = isAdjacent(index, emptyIndex);
    
    if (canMove) {
        // Swap pieces
        const temp = puzzlePieces[index];
        puzzlePieces[index] = puzzlePieces[emptyIndex];
        puzzlePieces[emptyIndex] = temp;
        
        // Update display
        pieces[index].textContent = puzzlePieces[index];
        pieces[emptyIndex].textContent = puzzlePieces[emptyIndex];
        
        // Update classes
        pieces[index].className = puzzlePieces[index] === '' ? 'puzzle-piece empty' : 'puzzle-piece';
        pieces[emptyIndex].className = puzzlePieces[emptyIndex] === '' ? 'puzzle-piece empty' : 'puzzle-piece';
        
        // Update empty index
        emptyIndex = puzzlePieces.indexOf('');
        
        // Add click listeners
        pieces.forEach((piece, i) => {
            piece.removeEventListener('click', () => movePuzzlePiece(i));
            if (puzzlePieces[i] !== '') {
                piece.addEventListener('click', () => movePuzzlePiece(i));
            }
        });
        
        // Check if puzzle is solved
        if (isPuzzleSolved()) {
            setTimeout(() => {
                alert('🎉 Congratulations! You solved our love puzzle! 💕');
                stopPuzzleTimer();
                createConfetti();
            }, 500);
        }
    }
}

function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;
    
    return (Math.abs(row1 - row2) === 1 && col1 === col2) || 
           (Math.abs(col1 - col2) === 1 && row1 === row2);
}

function shufflePuzzle() {
    const symbols = ['💖', '💕', '💓', '💗', '💝', '💘', '💞', '💟'];
    
    // Fisher-Yates shuffle
    for (let i = symbols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
    }
    
    puzzlePieces = [...symbols, ''];
    emptyIndex = 8;
    generatePuzzleGrid();
}

function isPuzzleSolved() {
    const symbols = ['💖', '💕', '💓', '💗', '💝', '💘', '💞', '💟'];
    return puzzlePieces.slice(0, 8).every((symbol, index) => symbol === symbols[index]);
}

function startPuzzleTimer() {
    if (puzzleTimer) {
        clearInterval(puzzleTimer);
    }
    
    puzzleStartTime = Date.now();
    puzzleTimer = setInterval(updatePuzzleTimer, 1000);
}

function stopPuzzleTimer() {
    if (puzzleTimer) {
        clearInterval(puzzleTimer);
        puzzleTimer = null;
    }
}

function updatePuzzleTimer() {
    const elapsed = Math.floor((Date.now() - puzzleStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timerDisplay = document.getElementById('puzzleTimer');
    timerDisplay.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
} 

function showPuzzleGame() {
    const puzzleSection = document.getElementById('lovePuzzleSection');
    puzzleSection.style.display = 'block';
    puzzleSection.style.opacity = '0';
    puzzleSection.style.transform = 'translateY(30px)';
    
    // Animate the puzzle section into view
    setTimeout(() => {
        puzzleSection.style.transition = 'all 0.8s ease';
        puzzleSection.style.opacity = '1';
        puzzleSection.style.transform = 'translateY(0)';
    }, 100);
    
    // Scroll to puzzle section
    setTimeout(() => {
        puzzleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
} 

// Mobile and touch device optimizations
function initializeMobileOptimizations() {
    // Prevent zoom on double tap (but allow scrolling)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            // Only prevent default for double taps, not for scrolling
            if (event.target.tagName === 'BUTTON' || 
                event.target.closest('button') || 
                event.target.closest('.clickable-heart') ||
                event.target.closest('.enter-button') ||
                event.target.closest('.back-button') ||
                event.target.closest('.memory-back-button') ||
                event.target.closest('.note') ||
                event.target.closest('.gallery-item') ||
                event.target.closest('.memory-card') ||
                event.target.closest('.puzzle-piece')) {
                event.preventDefault();
            }
        }
        lastTouchEnd = now;
    }, false);
    
    // Allow normal scrolling, only prevent pull-to-refresh on specific elements
    document.addEventListener('touchmove', function (event) {
        // Only prevent default for scaling gestures, not for normal scrolling
        if (event.scale !== 1 && event.scale !== undefined) {
            event.preventDefault();
        }
    }, { passive: true }); // Changed to passive for better scroll performance
    
    // Add touch feedback for buttons
    const touchButtons = document.querySelectorAll('button, .clickable-heart, .enter-button, .back-button, .memory-back-button, .note, .gallery-item, .memory-card, .puzzle-piece');
    
    touchButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Optimize scroll performance on mobile - use passive listener
    document.addEventListener('scroll', function() {
        // Passive scroll handling for better performance
    }, { passive: true });
    
    // Add haptic feedback for mobile devices (if supported)
    function addHapticFeedback() {
        if ('vibrate' in navigator) {
            const hapticElements = document.querySelectorAll('.clickable-heart, .enter-button, .back-button, .memory-back-button, .quiz-option, .next-question-btn, .reset-memory-btn, .generate-letter-btn, .count-love-btn, .shuffle-puzzle-btn');
            
            hapticElements.forEach(element => {
                element.addEventListener('click', () => {
                    navigator.vibrate(50); // Short vibration
                });
            });
        }
    }
    
    addHapticFeedback();
    
    // Ensure scrolling works on mobile by removing any potential scroll blockers
    document.addEventListener('DOMContentLoaded', function() {
        // Force enable scrolling on mobile
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        
        // Ensure fixed position elements don't block scrolling
        const fixedElements = document.querySelectorAll('.surprise-page, .memory-page');
        fixedElements.forEach(element => {
            element.style.overflow = 'auto';
            element.style.webkitOverflowScrolling = 'touch';
        });
    });
} 
