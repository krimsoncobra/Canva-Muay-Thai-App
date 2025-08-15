// Global game state
let gameState = {
    currentScreen: 'main-menu',
    selectedRounds: 3,
    playerFighter: null,
    opponentFighter: null,
    playerHealth: 100,
    opponentHealth: 100,
    currentRound: 1,
    maxRounds: 3,
    attacksInRound: 0,
    maxAttacksPerRound: 10,
    isPlayerTurn: true,
    playerStats: {
        attacks: 0,
        blocks: 0,
        counters: 0,
        moral: 0
    },
    opponentStats: {
        attacks: 0,
        blocks: 0,
        counters: 0,
        moral: 0
    },
    lastPlayerAttack: null,
    lastOpponentAttack: null,
    clinchStatus: 'distance', // 'distance', 'clinching', 'clinched'
    playerClinchControl: false,
    opponentClinchControl: false,
    consecutiveBlocks: 0,
    cornerBonus: null,
    careerMode: {
        active: false,
        fighterName: '',
        avatar: '🥊',
        specialty: null,
        record: { wins: 0, losses: 0, draws: 0 },
        defeatedOpponents: []
    }
};

// Fighter data
const fighters = {
    'samart': {
        name: 'Samart Payakaroon',
        avatar: '👑',
        description: 'The Boxing Genius',
        specialty: 'samart',
        stats: 'Technical boxing master with superior ring IQ'
    },
    'dieselnoi': {
        name: 'Dieselnoi Chor Thanasukarn',
        avatar: '🦴',
        description: 'The Sky Piercing Knee',
        specialty: 'dieselnoi',
        stats: 'Devastating knee strikes and clinch dominance'
    },
    'buakaw': {
        name: 'Buakaw Banchamek',
        avatar: '🦵',
        description: 'The White Lotus',
        specialty: 'buakaw',
        stats: 'Explosive kicks and relentless pressure'
    },
    'saenchai': {
        name: 'Saenchai',
        avatar: '🎯',
        description: 'The Fighting Genius',
        specialty: 'saenchai',
        stats: 'Creative techniques and superior timing'
    },
    'namsaknoi': {
        name: 'Namsaknoi Yudthagarngamtorn',
        avatar: '💪',
        description: 'The Emperor',
        specialty: 'namsaknoi',
        stats: 'Brutal elbow strikes and aggressive style'
    },
    'sagat': {
        name: 'Sagat Petchyindee',
        avatar: '👹',
        description: 'The Tiger King',
        specialty: 'sagat',
        stats: 'Raw power and intimidating presence'
    },
    'somrak': {
        name: 'Somrak Khamsing',
        avatar: '⚡',
        description: 'The Kicking Machine',
        specialty: 'somrak',
        stats: 'Lightning speed and defensive mastery'
    },
    'yodsanklai': {
        name: 'Yodsanklai Fairtex',
        avatar: '🔥',
        description: 'The Fire Kid',
        specialty: 'yodsanklai',
        stats: 'Technical precision and fight intelligence'
    },
    'johnwayne': {
        name: 'John Wayne Parr',
        avatar: '🤠',
        description: 'The Gunslinger',
        specialty: 'johnwayne',
        stats: 'Heart of a warrior and never-give-up attitude'
    },
    'petchboonchu': {
        name: 'Petchboonchu FA Group',
        avatar: '🤼',
        description: 'The Clinch King',
        specialty: 'petchboonchu',
        stats: 'Dominant clinch work and knee strikes'
    }
};

// Career opponents
const careerOpponents = [
    { id: 'local-fighter', name: 'Local Fighter', avatar: '🥊', description: 'Your first test', difficulty: 1 },
    { id: 'gym-champion', name: 'Gym Champion', avatar: '🏅', description: 'Tougher competition', difficulty: 2 },
    { id: 'regional-star', name: 'Regional Star', avatar: '⭐', description: 'Rising through ranks', difficulty: 3 },
    { id: 'stadium-regular', name: 'Stadium Regular', avatar: '🏟️', description: 'Lumpinee experience', difficulty: 4 },
    { id: 'title-contender', name: 'Title Contender', avatar: '🏆', description: 'Championship level', difficulty: 5 },
    { id: 'champion', name: 'Champion', avatar: '👑', description: 'The ultimate test', difficulty: 6 }
];

// Attack data
const attacks = {
    punch: { name: 'Punch', icon: '👊', damage: 3, type: 'strike' },
    kick: { name: 'Kick', icon: '🦵', damage: 3, type: 'strike' },
    elbow: { name: 'Elbow', icon: '💪', damage: 3, type: 'strike' },
    knee: { name: 'Knee', icon: '🦴', damage: 3, type: 'strike' },
    teep: { name: 'Teep', icon: '🦶', damage: 3, type: 'strike' },
    block: { name: 'Block', icon: '🛡️', damage: 0, type: 'defense' },
    slip: { name: 'Slip', icon: '🌪️', damage: 0, type: 'defense' },
    roll: { name: 'Roll', icon: '🔄', damage: 0, type: 'defense' },
    evade: { name: 'Evade', icon: '💨', damage: 0, type: 'defense' },
    check: { name: 'Check', icon: '🦵', damage: 0, type: 'defense' },
    parry: { name: 'Parry', icon: '✋', damage: 0, type: 'defense' },
    'full-plum': { name: 'Full Plum', icon: '🤼', damage: 0, type: 'clinch' },
    pummel: { name: 'Pummel', icon: '💪', damage: 0, type: 'clinch' },
    'outside-bicep': { name: 'Outside Bicep Control', icon: '🔄', damage: 0, type: 'clinch' },
    sweep: { name: 'Sweep', icon: '🌪️', damage: 1, type: 'clinch' },
    escape: { name: 'Escape', icon: '🏃', damage: 0, type: 'clinch' }
};

// Specialty bonuses
const specialties = {
    dieselnoi: { knees: 3 },
    buakaw: { kicks: 3, teeps: 3 },
    samart: { punches: 3 },
    namsaknoi: { elbows: 3 },
    saenchai: { all: 1, heals: 1 },
    sagat: { winning: 10 },
    somrak: { defense: 2 },
    yodsanklai: { winning: 8, losing: -2 },
    johnwayne: { heal: 10, bothHeal: 25 },
    petchboonchu: { clinch: 5 }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showScreen('main-menu');
    populateFighterSelection();
    populateCareerOpponents();
    populateAvatarSelection();
    loadCareerData();
    updateCombatRules();
});

// Screen management
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen, .fighter-selection-screen, .battle-screen, .career-setup-screen, .career-main-screen, .corner-break-screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
        screen.classList.remove('active');
    });

    // Show the selected screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
        targetScreen.classList.add('active');
        gameState.currentScreen = screenId;
    }
}

// Main menu functions
function showExhibitionFight() {
    showRoundSelection();
}

function showCareerMode() {
    if (gameState.careerMode.active) {
        showScreen('career-main');
        updateCareerDisplay();
    } else {
        showScreen('career-setup');
    }
}

function showMuayThaiGuide() {
    showScreen('muay-thai-guide');
}

// Round selection
function showRoundSelection() {
    showScreen('round-selection');
}

function selectRounds(rounds) {
    gameState.selectedRounds = rounds;
    gameState.maxRounds = rounds;
    gameState.maxAttacksPerRound = rounds === 3 ? 10 : rounds === 5 ? 10 : rounds === 8 ? 10 : rounds === 10 ? 10 : 10;
    showFighterSelection();
}

// Fighter selection
function showFighterSelection() {
    showScreen('fighter-selection');
}

function populateFighterSelection() {
    const fighterGrid = document.querySelector('#fighter-selection .fighter-grid');
    if (!fighterGrid) return;

    fighterGrid.innerHTML = '';
    
    Object.keys(fighters).forEach(fighterId => {
        const fighter = fighters[fighterId];
        const fighterCard = document.createElement('div');
        fighterCard.className = 'fighter-card';
        fighterCard.onclick = () => selectFighter(fighterId);
        
        fighterCard.innerHTML = `
            <div class="fighter-avatar">${fighter.avatar}</div>
            <h4>${fighter.name}</h4>
            <p>${fighter.description}</p>
            <div class="fighter-stats">${fighter.stats}</div>
        `;
        
        fighterGrid.appendChild(fighterCard);
    });
}

function selectFighter(fighterId) {
    gameState.playerFighter = fighters[fighterId];
    
    // Select random opponent (different from player)
    const availableOpponents = Object.keys(fighters).filter(id => id !== fighterId);
    const randomOpponentId = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
    gameState.opponentFighter = fighters[randomOpponentId];
    
    startBattle();
}

// Career mode functions
function populateAvatarSelection() {
    const avatarSelection = document.getElementById('avatar-selection');
    if (!avatarSelection) return;

    const avatars = ['🥊', '👑', '🦴', '🦵', '🎯', '💪', '👹', '⚡', '🔥', '🤠', '🤼', '🏆', '⭐', '🌟', '💎'];
    
    avatarSelection.innerHTML = '';
    avatars.forEach(avatar => {
        const option = document.createElement('div');
        option.className = 'avatar-option';
        option.textContent = avatar;
        option.onclick = () => selectAvatar(avatar);
        avatarSelection.appendChild(option);
    });
}

function selectAvatar(avatar) {
    // Remove previous selection
    document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
    
    // Select new avatar
    event.target.classList.add('selected');
    gameState.careerMode.avatar = avatar;
    
    checkCreateFighterButton();
}

function selectSpecialty(specialty) {
    // Remove previous selection
    document.querySelectorAll('.specialty-option').forEach(opt => opt.classList.remove('selected'));
    
    // Select new specialty
    event.target.classList.add('selected');
    gameState.careerMode.specialty = specialty;
    
    checkCreateFighterButton();
}

function checkCreateFighterButton() {
    const nameInput = document.getElementById('fighter-name');
    const createBtn = document.getElementById('create-fighter-btn');
    
    const hasName = nameInput && nameInput.value.trim().length > 0;
    const hasAvatar = gameState.careerMode.avatar !== '🥊';
    const hasSpecialty = gameState.careerMode.specialty !== null;
    
    if (createBtn) {
        createBtn.disabled = !(hasName && hasAvatar && hasSpecialty);
    }
}

// Add event listener for name input
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('fighter-name');
    if (nameInput) {
        nameInput.addEventListener('input', checkCreateFighterButton);
    }
});

function createCareerFighter() {
    const nameInput = document.getElementById('fighter-name');
    if (!nameInput || !nameInput.value.trim()) return;
    
    gameState.careerMode.active = true;
    gameState.careerMode.fighterName = nameInput.value.trim();
    gameState.careerMode.record = { wins: 0, losses: 0, draws: 0 };
    gameState.careerMode.defeatedOpponents = [];
    
    saveCareerData();
    showScreen('career-main');
    updateCareerDisplay();
}

function populateCareerOpponents() {
    const opponentList = document.getElementById('opponent-list');
    if (!opponentList) return;

    opponentList.innerHTML = '';
    
    careerOpponents.forEach(opponent => {
        const isDefeated = gameState.careerMode.defeatedOpponents.includes(opponent.id);
        const canFight = !isDefeated && (opponent.difficulty === 1 || 
            gameState.careerMode.defeatedOpponents.some(id => 
                careerOpponents.find(o => o.id === id)?.difficulty === opponent.difficulty - 1
            ));
        
        const opponentCard = document.createElement('div');
        opponentCard.className = `opponent-card ${isDefeated ? 'defeated' : ''}`;
        
        if (canFight && !isDefeated) {
            opponentCard.onclick = () => fightCareerOpponent(opponent);
            opponentCard.style.cursor = 'pointer';
        } else if (!canFight && !isDefeated) {
            opponentCard.style.opacity = '0.5';
            opponentCard.style.cursor = 'not-allowed';
        }
        
        opponentCard.innerHTML = `
            <div class="opponent-avatar">${opponent.avatar}</div>
            <h4>${opponent.name}</h4>
            <p>${opponent.description}</p>
            <div class="opponent-stats">Difficulty: ${opponent.difficulty}/6</div>
        `;
        
        opponentList.appendChild(opponentCard);
    });
}

function fightCareerOpponent(opponent) {
    gameState.selectedRounds = 5; // Career fights are 5 rounds
    gameState.maxRounds = 5;
    gameState.maxAttacksPerRound = 10;
    
    // Set up career fighter
    gameState.playerFighter = {
        name: gameState.careerMode.fighterName,
        avatar: gameState.careerMode.avatar,
        description: 'Your Fighter',
        specialty: gameState.careerMode.specialty,
        stats: 'Career Mode Fighter'
    };
    
    // Set up opponent
    gameState.opponentFighter = {
        name: opponent.name,
        avatar: opponent.avatar,
        description: opponent.description,
        specialty: null,
        stats: `Difficulty ${opponent.difficulty}/6`
    };
    
    gameState.currentCareerOpponent = opponent;
    startBattle();
}

function updateCareerDisplay() {
    const nameElement = document.getElementById('career-fighter-name');
    const avatarElement = document.getElementById('career-avatar');
    const recordElement = document.getElementById('career-record');
    const specialtyElement = document.getElementById('career-specialty');
    
    if (nameElement) nameElement.textContent = gameState.careerMode.fighterName;
    if (avatarElement) avatarElement.textContent = gameState.careerMode.avatar;
    if (recordElement) {
        const record = gameState.careerMode.record;
        recordElement.textContent = `Record: ${record.wins}-${record.losses}-${record.draws}`;
    }
    if (specialtyElement) {
        const specialtyName = gameState.careerMode.specialty ? 
            gameState.careerMode.specialty.charAt(0).toUpperCase() + gameState.careerMode.specialty.slice(1) : 
            'None';
        specialtyElement.textContent = `Specialty: ${specialtyName}`;
    }
    
    populateCareerOpponents();
}

function resetCareer() {
    if (confirm('Are you sure you want to reset your career? This cannot be undone.')) {
        gameState.careerMode = {
            active: false,
            fighterName: '',
            avatar: '🥊',
            specialty: null,
            record: { wins: 0, losses: 0, draws: 0 },
            defeatedOpponents: []
        };
        saveCareerData();
        showScreen('career-setup');
        
        // Reset form
        const nameInput = document.getElementById('fighter-name');
        if (nameInput) nameInput.value = '';
        
        document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelectorAll('.specialty-option').forEach(opt => opt.classList.remove('selected'));
        
        checkCreateFighterButton();
    }
}

function saveCareerData() {
    try {
        localStorage.setItem('muayThaiCareer', JSON.stringify(gameState.careerMode));
    } catch (e) {
        console.log('Could not save career data');
    }
}

function loadCareerData() {
    try {
        const saved = localStorage.getItem('muayThaiCareer');
        if (saved) {
            gameState.careerMode = JSON.parse(saved);
        }
    } catch (e) {
        console.log('Could not load career data');
    }
}

// Battle system
function startBattle() {
    // Reset battle state
    gameState.playerHealth = 100;
    gameState.opponentHealth = 100;
    gameState.currentRound = 1;
    gameState.attacksInRound = 0;
    gameState.isPlayerTurn = true;
    gameState.playerStats = { attacks: 0, blocks: 0, counters: 0, moral: 0 };
    gameState.opponentStats = { attacks: 0, blocks: 0, counters: 0, moral: 0 };
    gameState.lastPlayerAttack = null;
    gameState.lastOpponentAttack = null;
    gameState.clinchStatus = 'distance';
    gameState.playerClinchControl = false;
    gameState.opponentClinchControl = false;
    gameState.consecutiveBlocks = 0;
    gameState.cornerBonus = null;
    
    showScreen('battle-screen');
    updateBattleDisplay();
    showTacticalMenu();
}

function updateBattleDisplay() {
    // Update fighter info
    document.getElementById('player-fighter-name').textContent = gameState.playerFighter.name;
    document.getElementById('player-avatar').textContent = gameState.playerFighter.avatar;
    document.getElementById('opponent-fighter-name').textContent = gameState.opponentFighter.name;
    document.getElementById('opponent-avatar').textContent = gameState.opponentFighter.avatar;
    
    // Update health bars
    updateHealthBar('player', gameState.playerHealth);
    updateHealthBar('opponent', gameState.opponentHealth);
    
    // Update round info
    document.getElementById('current-round').textContent = gameState.currentRound;
    document.getElementById('max-rounds').textContent = gameState.maxRounds;
    document.getElementById('attacks-in-round').textContent = gameState.attacksInRound;
    document.getElementById('max-attacks-per-round').textContent = gameState.maxAttacksPerRound;
    
    // Update turn indicator
    document.getElementById('turn-indicator').textContent = gameState.isPlayerTurn ? 'Your Turn' : 'Opponent\'s Turn';
    
    // Update stats
    updateStats();
    
    // Update clinch status
    updateClinchStatus();
    
    // Update attack history
    updateAttackHistory();
}

function updateHealthBar(fighter, health) {
    const healthBar = document.getElementById(`${fighter}-health-bar`);
    const healthText = document.getElementById(`${fighter}-health`);
    
    if (healthBar && healthText) {
        const percentage = Math.max(0, (health / 100) * 100);
        healthBar.style.width = percentage + '%';
        healthText.textContent = Math.max(0, health);
        
        // Update health bar color based on health
        healthBar.classList.remove('low', 'critical');
        if (health <= 30) {
            healthBar.classList.add('critical');
        } else if (health <= 50) {
            healthBar.classList.add('low');
        }
    }
}

function updateStats() {
    document.getElementById('attack-counter').textContent = gameState.playerStats.attacks;
    document.getElementById('block-counter').textContent = gameState.playerStats.blocks;
    document.getElementById('counter-counter').textContent = gameState.playerStats.counters;
    document.getElementById('player-moral').textContent = gameState.playerStats.moral;
    
    document.getElementById('opponent-attack-counter').textContent = gameState.opponentStats.attacks;
    document.getElementById('opponent-block-counter').textContent = gameState.opponentStats.blocks;
    document.getElementById('opponent-counter-counter').textContent = gameState.opponentStats.counters;
    document.getElementById('opponent-moral').textContent = gameState.opponentStats.moral;
}

function updateClinchStatus() {
    const clinchCircle = document.getElementById('clinch-status-circle');
    const clinchLabel = document.getElementById('clinch-status-label');
    
    if (clinchCircle && clinchLabel) {
        clinchCircle.classList.remove('distance', 'clinching', 'clinched');
        
        switch (gameState.clinchStatus) {
            case 'distance':
                clinchCircle.textContent = '📏';
                clinchLabel.textContent = 'Distance';
                clinchCircle.classList.add('distance');
                break;
            case 'clinching':
                clinchCircle.textContent = '🤼';
                clinchLabel.textContent = 'Clinching';
                clinchCircle.classList.add('clinching');
                break;
            case 'clinched':
                if (gameState.playerClinchControl) {
                    clinchCircle.textContent = '💪';
                    clinchLabel.textContent = 'You Control';
                } else if (gameState.opponentClinchControl) {
                    clinchCircle.textContent = '😰';
                    clinchLabel.textContent = 'Opp Controls';
                } else {
                    clinchCircle.textContent = '🤼';
                    clinchLabel.textContent = 'Neutral';
                }
                clinchCircle.classList.add('clinched');
                break;
        }
    }
}

function updateAttackHistory() {
    // Update player's last attack
    if (gameState.lastPlayerAttack) {
        const attack = attacks[gameState.lastPlayerAttack.type];
        document.getElementById('player-last-attack-icon').textContent = attack.icon;
        document.getElementById('player-last-attack-name').textContent = attack.name;
        document.getElementById('player-last-attack-power').textContent = `${gameState.lastPlayerAttack.damage} DMG`;
    }
    
    // Update opponent's last attack
    if (gameState.lastOpponentAttack) {
        const attack = attacks[gameState.lastOpponentAttack.type];
        document.getElementById('opponent-last-attack-icon').textContent = attack.icon;
        document.getElementById('opponent-last-attack-name').textContent = attack.name;
        document.getElementById('opponent-last-attack-power').textContent = `${gameState.lastOpponentAttack.damage} DMG`;
    }
}

// Menu system
function showTacticalMenu() {
    document.getElementById('tactical-menu').style.display = 'block';
    document.getElementById('attack-buttons').style.display = 'none';
    document.getElementById('defense-buttons').style.display = 'none';
    document.getElementById('clinch-buttons').style.display = 'none';
    
    // Update category button states based on clinch status
    const attackBtn = document.querySelector('.attack-category');
    const defenseBtn = document.querySelector('.defense-category');
    const clinchBtn = document.querySelector('.clinch-category');
    
    // Disable/enable buttons based on game state
    if (gameState.clinchStatus === 'clinched') {
        attackBtn.disabled = true;
        defenseBtn.disabled = true;
        clinchBtn.disabled = false;
    } else {
        attackBtn.disabled = false;
        defenseBtn.disabled = false;
        clinchBtn.disabled = gameState.clinchStatus === 'distance';
    }
}

function showAttackMenu() {
    document.getElementById('tactical-menu').style.display = 'none';
    document.getElementById('attack-buttons').style.display = 'grid';
    document.getElementById('defense-buttons').style.display = 'none';
    document.getElementById('clinch-buttons').style.display = 'none';
}

function showDefenseMenu() {
    document.getElementById('tactical-menu').style.display = 'none';
    document.getElementById('attack-buttons').style.display = 'none';
    document.getElementById('defense-buttons').style.display = 'grid';
    document.getElementById('clinch-buttons').style.display = 'none';
}

function showClinchMenu() {
    document.getElementById('tactical-menu').style.display = 'none';
    document.getElementById('attack-buttons').style.display = 'none';
    document.getElementById('defense-buttons').style.display = 'none';
    document.getElementById('clinch-buttons').style.display = 'grid';
}

// Attack selection and combat
function selectAttack(attackType) {
    if (!gameState.isPlayerTurn) return;
    
    const playerAttack = processPlayerAttack(attackType);
    gameState.lastPlayerAttack = playerAttack;
    
    // Generate opponent attack
    const opponentAttack = generateOpponentAttack();
    gameState.lastOpponentAttack = opponentAttack;
    
    // Resolve combat
    resolveCombat(playerAttack, opponentAttack);
    
    // Update display
    updateBattleDisplay();
    
    // Check for round/fight end
    checkRoundEnd();
}

function processPlayerAttack(attackType) {
    const baseAttack = attacks[attackType];
    let damage = baseAttack.damage;
    let actualType = attackType;
    
    // Apply specialty bonuses
    if (gameState.playerFighter.specialty) {
        const specialty = specialties[gameState.playerFighter.specialty];
        
        if (specialty.knees && attackType === 'knee') damage += specialty.knees;
        if (specialty.kicks && (attackType === 'kick' || attackType === 'teep')) damage += specialty.kicks;
        if (specialty.punches && attackType === 'punch') damage += specialty.punches;
        if (specialty.elbows && attackType === 'elbow') damage += specialty.elbows;
        if (specialty.all) damage += specialty.all;
        if (specialty.clinch && baseAttack.type === 'clinch') damage += specialty.clinch;
    }
    
    // Apply corner bonus
    if (gameState.cornerBonus) {
        if (gameState.cornerBonus.type === 'water' && baseAttack.type === 'strike') {
            damage += 1;
        }
    }
    
    return {
        type: actualType,
        damage: damage,
        category: baseAttack.type
    };
}

function generateOpponentAttack() {
    let possibleAttacks = [];
    
    if (gameState.clinchStatus === 'clinched') {
        possibleAttacks = ['full-plum', 'pummel', 'outside-bicep', 'sweep', 'escape'];
    } else if (gameState.clinchStatus === 'clinching') {
        possibleAttacks = ['punch', 'elbow', 'knee', 'full-plum', 'escape'];
    } else {
        possibleAttacks = ['punch', 'kick', 'elbow', 'knee', 'teep', 'block', 'slip', 'roll', 'evade', 'check', 'parry'];
    }
    
    const attackType = possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)];
    const baseAttack = attacks[attackType];
    let damage = baseAttack.damage;
    
    // Apply opponent specialty bonuses (if any)
    if (gameState.opponentFighter.specialty) {
        const specialty = specialties[gameState.opponentFighter.specialty];
        
        if (specialty.knees && attackType === 'knee') damage += specialty.knees;
        if (specialty.kicks && (attackType === 'kick' || attackType === 'teep')) damage += specialty.kicks;
        if (specialty.punches && attackType === 'punch') damage += specialty.punches;
        if (specialty.elbows && attackType === 'elbow') damage += specialty.elbows;
        if (specialty.all) damage += specialty.all;
        if (specialty.clinch && baseAttack.type === 'clinch') damage += specialty.clinch;
    }
    
    return {
        type: attackType,
        damage: damage,
        category: baseAttack.category
    };
}

function resolveCombat(playerAttack, opponentAttack) {
    let playerDamage = 0;
    let opponentDamage = 0;
    let actionText = '';
    
    // Handle clinch transitions first
    if (playerAttack.type === 'full-plum' || opponentAttack.type === 'full-plum') {
        gameState.clinchStatus = 'clinched';
        if (playerAttack.type === 'full-plum' && opponentAttack.type !== 'full-plum') {
            gameState.playerClinchControl = true;
            gameState.opponentClinchControl = false;
        } else if (opponentAttack.type === 'full-plum' && playerAttack.type !== 'full-plum') {
            gameState.opponentClinchControl = true;
            gameState.playerClinchControl = false;
        }
    }
    
    if (playerAttack.type === 'escape' || opponentAttack.type === 'escape') {
        gameState.clinchStatus = 'distance';
        gameState.playerClinchControl = false;
        gameState.opponentClinchControl = false;
    }
    
    // Combat resolution logic
    if (playerAttack.category === 'strike' && opponentAttack.category === 'strike') {
        // Both attacking - exchange damage
        playerDamage = opponentAttack.damage;
        opponentDamage = playerAttack.damage;
        actionText = `Exchange! Both fighters land their attacks!`;
        
        // Apply specialty bonuses for exchanges
        if (gameState.playerFighter.specialty) {
            const specialty = specialties[gameState.playerFighter.specialty];
            if (specialty.winning) {
                opponentDamage += specialty.winning;
                gameState.playerStats.counters++;
            }
            if (specialty.losing) {
                playerDamage += specialty.losing;
            }
        }
        
    } else if (playerAttack.category === 'strike' && opponentAttack.category === 'defense') {
        // Player attacking, opponent defending
        const result = resolveAttackVsDefense(playerAttack, opponentAttack, true);
        playerDamage = result.attackerDamage;
        opponentDamage = result.defenderDamage;
        actionText = result.description;
        
    } else if (playerAttack.category === 'defense' && opponentAttack.category === 'strike') {
        // Player defending, opponent attacking
        const result = resolveAttackVsDefense(opponentAttack, playerAttack, false);
        playerDamage = result.defenderDamage;
        opponentDamage = result.attackerDamage;
        actionText = result.description;
        
    } else if (playerAttack.category === 'defense' && opponentAttack.category === 'defense') {
        // Both defending - healing
        let playerHeal = 1 + gameState.consecutiveBlocks;
        let opponentHeal = 1;
        
        if (playerAttack.type === 'block') {
            gameState.consecutiveBlocks++;
            playerHeal += gameState.consecutiveBlocks;
        } else {
            gameState.consecutiveBlocks = 0;
        }
        
        // Apply specialty bonuses
        if (gameState.playerFighter.specialty) {
            const specialty = specialties[gameState.playerFighter.specialty];
            if (specialty.heals) playerHeal += specialty.heals;
            if (specialty.bothHeal) {
                playerHeal += specialty.bothHeal;
                opponentHeal += specialty.bothHeal;
            }
        }
        
        gameState.playerHealth = Math.min(100, gameState.playerHealth + playerHeal);
        gameState.opponentHealth = Math.min(100, gameState.opponentHealth + opponentHeal);
        
        actionText = `Both fighters recover and reset! You heal ${playerHeal} HP, opponent heals ${opponentHeal} HP.`;
        
    } else if (playerAttack.category === 'clinch' || opponentAttack.category === 'clinch') {
        // Clinch work
        const result = resolveClinchWork(playerAttack, opponentAttack);
        playerDamage = result.playerDamage;
        opponentDamage = result.opponentDamage;
        actionText = result.description;
    }
    
    // Apply damage
    gameState.playerHealth = Math.max(0, gameState.playerHealth - playerDamage);
    gameState.opponentHealth = Math.max(0, gameState.opponentHealth - opponentDamage);
    
    // Update stats
    if (playerAttack.category === 'strike') gameState.playerStats.attacks++;
    if (playerAttack.category === 'defense') gameState.playerStats.blocks++;
    if (opponentAttack.category === 'strike') gameState.opponentStats.attacks++;
    if (opponentAttack.category === 'defense') gameState.opponentStats.blocks++;
    
    // Update moral based on damage dealt
    gameState.playerStats.moral += Math.floor(opponentDamage / 3);
    gameState.opponentStats.moral += Math.floor(playerDamage / 3);
    
    // Display action
    document.getElementById('action-text').textContent = actionText;
    
    // Increment attack counter
    gameState.attacksInRound++;
    gameState.isPlayerTurn = false;
    
    // Apply corner bonus effects
    if (gameState.cornerBonus) {
        if (gameState.cornerBonus.type === 'water' && gameState.cornerBonus.uses > 0) {
            gameState.cornerBonus.uses--;
            if (gameState.cornerBonus.uses === 0) {
                gameState.cornerBonus = null;
            }
        } else if (gameState.cornerBonus.type === 'ice' && playerAttack.category === 'defense') {
            playerDamage = Math.max(0, playerDamage - 3);
            gameState.cornerBonus = null;
        } else if (gameState.cornerBonus.type === 'enswell' && opponentAttack.type === 'punch') {
            playerDamage = Math.max(0, playerDamage - 3);
            gameState.cornerBonus = null;
        } else if (gameState.cornerBonus.type === 'motivate' && opponentDamage > playerDamage) {
            opponentDamage += 10;
            gameState.cornerBonus = null;
        }
    }
    
    // Auto-continue after a delay
    setTimeout(() => {
        gameState.isPlayerTurn = true;
        showTacticalMenu();
    }, 2000);
}

function resolveAttackVsDefense(attack, defense, playerAttacking) {
    let attackerDamage = 0;
    let defenderDamage = attack.damage;
    let description = '';
    
    // Check for counters
    const canCounter = checkCounter(attack.type, defense.type);
    
    if (canCounter) {
        // Successful counter
        attackerDamage = Math.floor(attack.damage * 1.5); // Counter damage
        defenderDamage = 0;
        
        if (playerAttacking) {
            gameState.opponentStats.counters++;
            description = `Opponent counters your ${attacks[attack.type].name} with ${attacks[defense.type].name}! You take ${attackerDamage} damage!`;
        } else {
            gameState.playerStats.counters++;
            description = `You counter opponent's ${attacks[attack.type].name} with ${attacks[defense.type].name}! Opponent takes ${attackerDamage} damage!`;
        }
        
    } else if (defense.type === 'block') {
        // Block reduces damage
        defenderDamage = Math.max(1, Math.floor(attack.damage * 0.3));
        description = playerAttacking ? 
            `Opponent blocks your ${attacks[attack.type].name}! Reduced damage: ${defenderDamage}` :
            `You block opponent's ${attacks[attack.type].name}! Reduced damage: ${defenderDamage}`;
            
    } else if (defense.type === 'evade') {
        // Evade avoids all damage
        defenderDamage = 0;
        description = playerAttacking ?
            `Opponent evades your ${attacks[attack.type].name} completely!` :
            `You evade opponent's ${attacks[attack.type].name} completely!`;
            
    } else {
        // Defense failed
        description = playerAttacking ?
            `Your ${attacks[attack.type].name} breaks through opponent's ${attacks[defense.type].name}! ${defenderDamage} damage!` :
            `Opponent's ${attacks[attack.type].name} breaks through your ${attacks[defense.type].name}! ${defenderDamage} damage!`;
    }
    
    return {
        attackerDamage: attackerDamage,
        defenderDamage: defenderDamage,
        description: description
    };
}

function checkCounter(attackType, defenseType) {
    const counters = {
        'slip': ['punch', 'elbow'],
        'roll': ['punch', 'elbow'],
        'check': ['kick'],
        'parry': ['punch', 'teep']
    };
    
    return counters[defenseType] && counters[defenseType].includes(attackType);
}

function resolveClinchWork(playerAttack, opponentAttack) {
    let playerDamage = 0;
    let opponentDamage = 0;
    let description = '';
    
    // Handle clinch control battles
    if (playerAttack.type === 'pummel' || opponentAttack.type === 'pummel') {
        // Pummeling for control
        if (playerAttack.type === 'pummel' && opponentAttack.type !== 'pummel') {
            gameState.playerClinchControl = true;
            gameState.opponentClinchControl = false;
            description = 'You gain clinch control through superior pummeling!';
        } else if (opponentAttack.type === 'pummel' && playerAttack.type !== 'pummel') {
            gameState.opponentClinchControl = true;
            gameState.playerClinchControl = false;
            description = 'Opponent gains clinch control through pummeling!';
        } else {
            description = 'Both fighters battle for clinch control!';
        }
    }
    
    // Handle sweeps
    if (playerAttack.type === 'sweep') {
        opponentDamage = 1;
        gameState.opponentStats.moral -= 2;
        description = 'You sweep the opponent! 1 damage and moral loss!';
    } else if (opponentAttack.type === 'sweep') {
        playerDamage = 1;
        gameState.playerStats.moral -= 2;
        description = 'Opponent sweeps you! 1 damage and moral loss!';
    }
    
    // Handle knee strikes in clinch
    if (gameState.playerClinchControl && playerAttack.category === 'strike') {
        opponentDamage = playerAttack.damage + 2; // Bonus damage for control
        description = `You control the clinch and land a devastating ${attacks[playerAttack.type].name}! ${opponentDamage} damage!`;
    } else if (gameState.opponentClinchControl && opponentAttack.category === 'strike') {
        playerDamage = opponentAttack.damage + 2;
        description = `Opponent controls the clinch and lands a devastating ${attacks[opponentAttack.type].name}! ${playerDamage} damage!`;
    }
    
    return {
        playerDamage: playerDamage,
        opponentDamage: opponentDamage,
        description: description
    };
}

function checkRoundEnd() {
    if (gameState.playerHealth <= 0 || gameState.opponentHealth <= 0) {
        endFight();
        return;
    }
    
    if (gameState.attacksInRound >= gameState.maxAttacksPerRound) {
        if (gameState.currentRound < gameState.maxRounds) {
            startCornerBreak();
        } else {
            endFight();
        }
    }
}

function startCornerBreak() {
    showScreen('corner-break');
    
    // Start rest timer
    let timeLeft = 60;
    const timerElement = document.getElementById('rest-timer-value');
    
    const timer = setInterval(() => {
        timeLeft--;
        if (timerElement) timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endCornerBreak();
        }
    }, 1000);
}

function selectCornerChoice(choice) {
    let bonus = null;
    let statusText = '';
    
    switch (choice) {
        case 'water':
            bonus = { type: 'water', uses: 3 };
            statusText = 'Water selected! +3 HP and +1 damage to next 3 attacks!';
            gameState.playerHealth = Math.min(100, gameState.playerHealth + 3);
            break;
        case 'ice':
            bonus = { type: 'ice' };
            statusText = 'Ice pack selected! +3 to your next defensive action!';
            gameState.playerHealth = Math.min(100, gameState.playerHealth + 3);
            break;
        case 'enswell':
            bonus = { type: 'enswell' };
            statusText = 'Enswell selected! -3 damage from opponent\'s next punch!';
            gameState.playerHealth = Math.min(100, gameState.playerHealth + 3);
            break;
        case 'motivate':
            bonus = { type: 'motivate' };
            statusText = 'Motivation selected! +10 damage when you win the next exchange!';
            gameState.playerHealth = Math.min(100, gameState.playerHealth + 3);
            break;
    }
    
    gameState.cornerBonus = bonus;
    document.getElementById('corner-status').textContent = statusText;
    
    // Disable all corner buttons
    document.querySelectorAll('.corner-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Auto-continue after showing status
    setTimeout(() => {
        endCornerBreak();
    }, 3000);
}

function endCornerBreak() {
    gameState.currentRound++;
    gameState.attacksInRound = 0;
    gameState.isPlayerTurn = true;
    
    // Opponent also heals during break
    gameState.opponentHealth = Math.min(100, gameState.opponentHealth + 5);
    
    showScreen('battle-screen');
    updateBattleDisplay();
    showTacticalMenu();
}

function endFight() {
    let result = '';
    let isWin = false;
    
    if (gameState.playerHealth <= 0 && gameState.opponentHealth <= 0) {
        result = 'DRAW! Both fighters are down!';
    } else if (gameState.playerHealth <= 0) {
        result = 'DEFEAT! You have been knocked out!';
    } else if (gameState.opponentHealth <= 0) {
        result = 'VICTORY! You knocked out your opponent!';
        isWin = true;
    } else {
        // Decision based on damage dealt and stats
        const playerScore = gameState.playerStats.attacks + gameState.playerStats.counters + gameState.playerStats.moral;
        const opponentScore = gameState.opponentStats.attacks + gameState.opponentStats.counters + gameState.opponentStats.moral;
        
        if (playerScore > opponentScore) {
            result = 'VICTORY! You win by decision!';
            isWin = true;
        } else if (opponentScore > playerScore) {
            result = 'DEFEAT! You lose by decision!';
        } else {
            result = 'DRAW! The fight is scored even!';
        }
    }
    
    // Update career record if in career mode
    if (gameState.careerMode.active && gameState.currentCareerOpponent) {
        if (isWin) {
            gameState.careerMode.record.wins++;
            gameState.careerMode.defeatedOpponents.push(gameState.currentCareerOpponent.id);
        } else if (result.includes('DRAW')) {
            gameState.careerMode.record.draws++;
        } else {
            gameState.careerMode.record.losses++;
        }
        saveCareerData();
    }
    
    document.getElementById('action-text').innerHTML = `
        <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 15px;">${result}</div>
        <div style="font-size: 1rem;">
            Final Stats:<br>
            You: ${gameState.playerStats.attacks} attacks, ${gameState.playerStats.counters} exchanges won, ${gameState.playerStats.moral} moral<br>
            Opponent: ${gameState.opponentStats.attacks} attacks, ${gameState.opponentStats.counters} exchanges won, ${gameState.opponentStats.moral} moral
        </div>
    `;
    
    // Hide tactical menu
    document.getElementById('tactical-menu').style.display = 'none';
    document.getElementById('attack-buttons').style.display = 'none';
    document.getElementById('defense-buttons').style.display = 'none';
    document.getElementById('clinch-buttons').style.display = 'none';
}

// Utility functions
function resetBattle() {
    if (confirm('Are you sure you want to start a new fight?')) {
        startBattle();
    }
}

function showRulesPopup() {
    document.getElementById('rules-popup').style.display = 'flex';
}

function closeRulesPopup() {
    document.getElementById('rules-popup').style.display = 'none';
}

function toggleRules() {
    const content = document.getElementById('rules-content');
    const toggle = document.getElementById('rules-toggle');
    
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        toggle.textContent = '▼';
        toggle.classList.remove('collapsed');
    } else {
        content.classList.add('collapsed');
        toggle.textContent = '▶';
        toggle.classList.add('collapsed');
    }
}

function updateCombatRules() {
    const rulesContent = `
        <div class="rules-section">
            <div class="rules-subsection-header" onclick="toggleRulesSubsection('basic-rules')">
                <span class="rules-subsection-title">🥊 Basic Combat</span>
                <span class="rules-subsection-toggle" id="basic-rules-toggle">▼</span>
            </div>
            <div class="rules-subsection-content" id="basic-rules-content">
                <ul class="rules-list">
                    <li>Each round has ${gameState.maxAttacksPerRound} total attacks (both fighters combined)</li>
                    <li>Choose from Attacks, Defense, or Clinch categories</li>
                    <li>Both fighters act simultaneously each turn</li>
                    <li>Health ranges from 0-100 HP</li>
                    <li>Fight ends by knockout or after ${gameState.maxRounds} rounds</li>
                </ul>
            </div>
        </div>
        
        <div class="rules-section">
            <div class="rules-subsection-header" onclick="toggleRulesSubsection('attack-rules')">
                <span class="rules-subsection-title">⚔️ Attack System</span>
                <span class="rules-subsection-toggle" id="attack-rules-toggle">▼</span>
            </div>
            <div class="rules-subsection-content" id="attack-rules-content">
                <ul class="rules-list">
                    <li><strong>Strikes vs Strikes:</strong> Both fighters take damage (exchange)</li>
                    <li><strong>Base Damage:</strong> All strikes deal 3 damage</li>
                    <li><strong>Specialty Bonuses:</strong> +3 damage to your fighter's specialty</li>
                    <li><strong>Teep:</strong> Push kick that can create distance</li>
                    <li><strong>Moral Points:</strong> Gained by dealing damage (1 per 3 damage)</li>
                </ul>
            </div>
        </div>
        
        <div class="rules-section">
            <div class="rules-subsection-header" onclick="toggleRulesSubsection('defense-rules')">
                <span class="rules-subsection-title">🛡️ Defense System</span>
                <span class="rules-subsection-toggle" id="defense-rules-toggle">▼</span>
            </div>
            <div class="rules-subsection-content" id="defense-rules-content">
                <ul class="rules-list">
                    <li><strong>Block:</strong> Reduces damage to 30%, heals +1 HP (+2 per consecutive block)</li>
                    <li><strong>Slip/Roll:</strong> Counters punches and elbows for 1.5x damage</li>
                    <li><strong>Check:</strong> Counters kicks for 1.5x damage</li>
                    <li><strong>Parry:</strong> Counters punches and teeps for 1.5x damage</li>
                    <li><strong>Evade:</strong> Avoids all damage but no counter</li>
                    <li><strong>Defense vs Defense:</strong> Both fighters heal HP</li>
                </ul>
            </div>
        </div>
        
        <div class="rules-section">
            <div class="rules-subsection-header" onclick="toggleRulesSubsection('clinch-rules')">
                <span class="rules-subsection-title">🤼 Clinch System</span>
                <span class="rules-subsection-toggle" id="clinch-rules-toggle">▼</span>
            </div>
            <div class="rules-subsection-content" id="clinch-rules-content">
                <ul class="rules-list">
                    <li><strong>Full Plum:</strong> Enters clinch and gains control</li>
                    <li><strong>Pummel:</strong> Battles for clinch control position</li>
                    <li><strong>Control Bonus:</strong> +2 damage to strikes when controlling clinch</li>
                    <li><strong>Sweep:</strong> 1 damage + 2 moral loss to opponent</li>
                    <li><strong>Escape:</strong> Breaks clinch and returns to distance</li>
                    <li><strong>Clinch Status:</strong> Distance → Clinching → Clinched</li>
                </ul>
            </div>
        </div>
        
        <div class="rules-section">
            <div class="rules-subsection-header" onclick="toggleRulesSubsection('corner-rules')">
                <span class="rules-subsection-title">🛑 Corner Breaks</span>
                <span class="rules-subsection-toggle" id="corner-rules-toggle">▼</span>
            </div>
            <div class="rules-subsection-content" id="corner-rules-content">
                <ul class="rules-list">
                    <li><strong>Between Rounds:</strong> 60-second rest period</li>
                    <li><strong>Base Healing:</strong> +5 HP automatically</li>
                    <li><strong>Water:</strong> +3 HP + 1 damage to next 3 attacks</li>
                    <li><strong>Ice Pack:</strong> +3 HP + 3 to next defensive action</li>
                    <li><strong>Enswell:</strong> +3 HP + reduce next punch by 3</li>
                    <li><strong>Motivate:</strong> +3 HP + 10 damage to next winning exchange</li>
                </ul>
            </div>
        </div>
    `;
    
    // Update both the collapsible rules and popup rules
    const rulesContentElement = document.getElementById('rules-content');
    const popupRulesElement = document.querySelector('.rules-popup-content');
    
    if (rulesContentElement) {
        rulesContentElement.innerHTML = rulesContent;
    }
    
    if (popupRulesElement) {
        popupRulesElement.innerHTML = rulesContent;
    }
}

function toggleRulesSubsection(sectionId) {
    const content = document.getElementById(`${sectionId}-content`);
    const toggle = document.getElementById(`${sectionId}-toggle`);
    
    if (content && toggle) {
        if (content.classList.contains('collapsed')) {
            content.classList.remove('collapsed');
            toggle.textContent = '▼';
            toggle.classList.remove('collapsed');
        } else {
            content.classList.add('collapsed');
            toggle.textContent = '▶';
            toggle.classList.add('collapsed');
        }
    }
}

// Technique detail functions
function showTechnique(techniqueId) {
    showScreen(`detail-${techniqueId}`);
}

function playVideo(videoId) {
    // Placeholder for video functionality
    alert('Video playback would be implemented here. This is a demo showing how the interface would work.');
}

function playFight(fightId) {
    // Placeholder for fight video functionality
    alert('Fight video playback would be implemented here. This is a demo showing how the interface would work.');
}

// Make sure all functions are available globally
window.showScreen = showScreen;
window.showExhibitionFight = showExhibitionFight;
window.showCareerMode = showCareerMode;
window.showMuayThaiGuide = showMuayThaiGuide;
window.showRoundSelection = showRoundSelection;
window.selectRounds = selectRounds;
window.showFighterSelection = showFighterSelection;
window.selectFighter = selectFighter;
window.selectAvatar = selectAvatar;
window.selectSpecialty = selectSpecialty;
window.createCareerFighter = createCareerFighter;
window.resetCareer = resetCareer;
window.fightCareerOpponent = fightCareerOpponent;
window.showTacticalMenu = showTacticalMenu;
window.showAttackMenu = showAttackMenu;
window.showDefenseMenu = showDefenseMenu;
window.showClinchMenu = showClinchMenu;
window.selectAttack = selectAttack;
window.selectCornerChoice = selectCornerChoice;
window.resetBattle = resetBattle;
window.showRulesPopup = showRulesPopup;
window.closeRulesPopup = closeRulesPopup;
window.toggleRules = toggleRules;
window.toggleRulesSubsection = toggleRulesSubsection;
window.showTechnique = showTechnique;
window.playVideo = playVideo;
window.playFight = playFight;