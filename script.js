document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // 1) DOM Element References
    // =========================
    console.log("Progress Tracker Initialized"); // Initial test log
    
    const counter = document.querySelector(".counter");
    const messageCounter = document.querySelector(".message-counter");
    const progressBar = document.querySelector(".progress-bar");
  
    // =======================
    // 2) Configuration Setup
    // =======================
    const startDate = new Date('2024-12-14T16:00:00-05:00'); // Dec 14, 4pm ET
    const startingMessages = 17358; // The known baseline at startDate
    const goalTrees = 100;
    
    // These two variables track total messages:
    let pastMessages = 0; // Sum of all historical (pre-load) messages
    let accumulatedMessages = 0; // Real-time incremental messages after load
    let lastDisplayedTotal = startingMessages; // Track last displayed count to prevent decreases
  
    // ==================
    // 3) Helper Function
    // ==================
    function getHourlyRate(dateObj) {
        const etTime = dateObj.toLocaleString("en-US", {
            timeZone: "America/New_York",
            hour12: false,
            hour: "numeric",
        });
        const hour = parseInt(etTime, 10);
        
        if (hour >= 9 && hour < 17) {
            return Math.random() * (25 - 20) + 20; // ~20-25 messages/hour
        } else if ((hour >= 5 && hour < 9) || (hour >= 17 && hour < 21)) {
            return Math.random() * (15 - 10) + 10; // ~10-15 messages/hour
        } else {
            return Math.random() * (5 - 2) + 2; // ~2-5 messages/hour
        }
    }
  
    // =======================================
    // 4) One-Time Historical Calculation
    // =======================================
    function preCalculateHistory() {
        const now = new Date();
        if (now < startDate) return startingMessages;

        let total = startingMessages;
        const tempDate = new Date(startDate);

        // Sum up messages hour-by-hour from startDate to now
        while (tempDate < now) {
            total += getHourlyRate(tempDate);
            tempDate.setHours(tempDate.getHours() + 1);
        }

        return Math.floor(total);
    }
  
    // =========================
    // 5) Display Update Routine
    // =========================
    function updateDisplay() {
        const newTotal = pastMessages + Math.floor(accumulatedMessages);
        const totalMessages = Math.max(newTotal, lastDisplayedTotal);
        lastDisplayedTotal = totalMessages;
        
        const preciseTotal = (pastMessages + accumulatedMessages).toFixed(3);
        console.log(`Precise total: ${preciseTotal}`);
        
        const trees = Math.floor(totalMessages / 1000);
        
        document.querySelector(".tree-count").textContent = trees;
        document.querySelector(".message-count").textContent = totalMessages.toLocaleString();
    
        const progressPercent = Math.min((trees / goalTrees) * 100, 100);
        progressBar.style.width = `${progressPercent}%`;
        document.querySelector(".progress-percentage").textContent = Math.round(progressPercent);
    }
  
    // =========================================
    // 6) Simulate Live Messages After Page Load
    // =========================================
    function simulateMessages() {
        const messagesPerHour = getHourlyRate(new Date());
        const messageIncrement = messagesPerHour / 3600;
        
        accumulatedMessages += messageIncrement;
        
        // Make logs more visible with timestamps
        const now = new Date().toLocaleTimeString();
        console.log(`[${now}] Rate: ${messagesPerHour.toFixed(2)} msgs/hr`);
        console.log(`[${now}] Total: ${(pastMessages + accumulatedMessages).toFixed(3)}`);
        
        updateDisplay();
        setTimeout(simulateMessages, 1000);
    }
  
    // ===================================
    // 7) Initialization on Page Load
    // ===================================
    // (A) Calculate all historical messages once
    pastMessages = preCalculateHistory();

    // (B) Show the initial display
    updateDisplay();

    // (C) Start simulating real-time growth
    simulateMessages();
});