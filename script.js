document.addEventListener('DOMContentLoaded', () => {
    const waterLevel = document.getElementById('water-level');
    const glassCount = document.getElementById('glass-count');
    const addButton = document.getElementById('add-glass');
    const resetButton = document.getElementById('reset-counter');
    
    // Load saved count from localStorage
    let count = parseInt(localStorage.getItem('waterCount')) || 0;
    updateDisplay();
    
    // Check if we need to reset (if it's a new day)
    checkAndReset();
    
    // Set up interval to check for midnight reset
    setInterval(checkAndReset, 60000); // Check every minute
    
    addButton.addEventListener('click', () => {
        count++;
        localStorage.setItem('waterCount', count);
        updateDisplay();
    });

    resetButton.addEventListener('click', () => {
        count = 0;
        localStorage.setItem('waterCount', count);
        updateDisplay();
    });
    
    function updateDisplay() {
        glassCount.textContent = count;
        // Update the counter text based on the number of glasses
        const counterText = document.querySelector('.counter');
        if (count === 1) {
            counterText.textContent = 'You\'ve had 1 glass of water today';
        } else {
            counterText.textContent = `You've had ${count} glasses of water today`;
        }
        
        // Calculate water level (each glass fills 12.5% of the jug, reaching 100% at 8 glasses)
        const waterHeight = Math.min(count * 12.5, 100);
        waterLevel.style.height = `${waterHeight}%`;
    }
    
    function checkAndReset() {
        const now = new Date();
        const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        
        // If it's midnight in EST
        if (estTime.getHours() === 0 && estTime.getMinutes() === 0) {
            count = 0;
            localStorage.setItem('waterCount', count);
            updateDisplay();
        }
    }
}); 