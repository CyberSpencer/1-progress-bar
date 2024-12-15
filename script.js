document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector(".counter");
    const messageCounter = document.querySelector(".message-counter");
    const progressBar = document.querySelector(".progress-bar");
  
    const startDate = new Date('2024-12-15T16:00:00-05:00'); // December 15th, 2024 at 4PM ET
    const startingMessages = 17358; // Initial count as of start date
    let accumulatedMessages = 0;
    const goalTrees = 100; // Re-adding this constant as it's needed for progress calculation
    
    function getHourlyRate() {
        // Get time in Eastern Time (ET)
        const etTime = new Date().toLocaleString("en-US", {
            timeZone: "America/New_York",
            hour12: false,
            hour: "numeric"
        });
        const hour = parseInt(etTime);
        
        // Business hours (9am-5pm ET): Higher traffic
        if (hour >= 9 && hour < 17) {
            return Math.random() * (25 - 20 + 1) + 20; // 20-25 messages per hour
        }
        // Early morning (5am-9am ET) and evening (5pm-9pm ET): Medium traffic
        else if ((hour >= 5 && hour < 9) || (hour >= 17 && hour < 21)) {
            return Math.random() * (15 - 10 + 1) + 10; // 10-15 messages per hour
        }
        // Night time ET: Low traffic
        else {
            return Math.random() * (5 - 2 + 1) + 2; // 2-5 messages per hour
        }
    }

    function calculateTotalMessages() {
        const now = new Date();
        const elapsedTime = now - startDate; // milliseconds
        const elapsedDays = elapsedTime / (1000 * 60 * 60 * 24);
        const averageMessagesPerDay = 308; // Our established average
        
        return startingMessages + Math.floor(elapsedDays * averageMessagesPerDay);
    }
  
    function updateDisplay() {
        const totalMessages = calculateTotalMessages() + Math.floor(accumulatedMessages);
        const trees = Math.floor(totalMessages / 1000);
        
        document.querySelector(".tree-count").textContent = trees;
        document.querySelector(".message-count").textContent = totalMessages.toLocaleString();
    
        const progressPercent = Math.min((trees / goalTrees) * 100, 100);
        progressBar.style.width = `${progressPercent}%`;
        document.querySelector(".progress-percentage").textContent = Math.round(progressPercent);
    }
  
    function simulateMessages() {
        const messagesPerHour = getHourlyRate();
        const messageIncrement = messagesPerHour / 3600; // 3600 seconds in an hour
        
        accumulatedMessages += messageIncrement;
        
        updateDisplay();
    
        // Update every second in real time
        setTimeout(simulateMessages, 1000);
    }
  
    // Initial update
    updateDisplay();
    simulateMessages();
});