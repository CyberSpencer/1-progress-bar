document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector(".counter");
    const messageCounter = document.querySelector(".message-counter");
    const progressBar = document.querySelector(".progress-bar");
  
    const startDate = new Date('2024-12-14T16:00:00-05:00'); // December 14th, 2024 at 4PM ET
    const startingMessages = 17358; // Initial count as of start date
    const goalTrees = 100;
    
    let pastMessages = 0;          // sum of historical messages from startDate to now
    let accumulatedMessages = 0;   // "live" increments after the page loads
    
    function getHourlyRate(dateObj) {
        const etTime = dateObj.toLocaleString("en-US", {
            timeZone: "America/New_York",
            hour12: false,
            hour: "numeric",
        });
        const hour = parseInt(etTime, 10);
        
        // Business hours (9am-5pm ET): Higher traffic
        if (hour >= 9 && hour < 17) {
            return Math.random() * (25 - 20) + 20; // ~20-25 messages per hour
        }
        // Early morning (5am-9am ET) and evening (5pm-9pm ET): Medium traffic
        else if ((hour >= 5 && hour < 9) || (hour >= 17 && hour < 21)) {
            return Math.random() * (15 - 10) + 10; // ~10-15 messages per hour
        }
        // Nighttime (9pm-5am ET): Low traffic
        else {
            return Math.random() * (5 - 2) + 2; // ~2-5 messages per hour
        }
    }

    function preCalculateHistory() {
        // Called once at load to compute total from startDate to now
        const now = new Date();
        if (now < startDate) return startingMessages;

        let total = startingMessages;
        const tempDate = new Date(startDate);

        while (tempDate < now) {
            total += getHourlyRate(tempDate);
            tempDate.setHours(tempDate.getHours() + 1);
        }

        return Math.floor(total);
    }
  
    function updateDisplay() {
        const totalMessages = pastMessages + Math.floor(accumulatedMessages);
        const trees = Math.floor(totalMessages / 1000);
        
        document.querySelector(".tree-count").textContent = trees;
        document.querySelector(".message-count").textContent = totalMessages.toLocaleString();
    
        const progressPercent = Math.min((trees / goalTrees) * 100, 100);
        progressBar.style.width = `${progressPercent}%`;
        document.querySelector(".progress-percentage").textContent = Math.round(progressPercent);
    }
  
    function simulateMessages() {
        const messagesPerHour = getHourlyRate(new Date());
        const messageIncrement = messagesPerHour / 3600; // 3600 seconds in an hour
        
        accumulatedMessages += messageIncrement;
        updateDisplay();
        setTimeout(simulateMessages, 1000);
    }
  
    // 1) Compute the past total once
    pastMessages = preCalculateHistory();

    // 2) Start the live updates
    updateDisplay();
    simulateMessages();
});