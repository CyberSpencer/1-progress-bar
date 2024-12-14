document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector(".counter");
    const messageCounter = document.querySelector(".message-counter");
    const progressBar = document.querySelector(".progress-bar");
  
    let messages = 17358; // Initial message count
    let trees = Math.floor(messages / 1000); // Trees already planted
    const goalTrees = 100; // Goal of 100 trees planted
    let accumulatedMessages = 0; // Track partial messages
  
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
  
    function updateDisplay() {
      document.querySelector(".tree-count").textContent = trees;
      document.querySelector(".message-count").textContent = Math.floor(messages).toLocaleString();
  
      // Update progress bar and percentage
      const progressPercent = Math.min((trees / goalTrees) * 100, 100);
      progressBar.style.width = `${progressPercent}%`;
      document.querySelector(".progress-percentage").textContent = Math.round(progressPercent);
    }
  
    function simulateMessages() {
      // Get messages per hour based on time of day
      const messagesPerHour = getHourlyRate();
      // Convert to messages per second
      const messageIncrement = messagesPerHour / 3600; // 3600 seconds in an hour
      
      accumulatedMessages += messageIncrement;
      
      // Only update messages when we have at least 1 whole message
      if (accumulatedMessages >= 1) {
        messages += Math.floor(accumulatedMessages);
        accumulatedMessages = accumulatedMessages % 1; // Keep the remainder
      }
  
      // Check if a new tree has been planted
      const newTrees = Math.floor(messages / 1000);
      if (newTrees > trees) {
        trees = newTrees;
      }
  
      updateDisplay();
  
      // Update every second in real time
      setTimeout(simulateMessages, 1000);
    }
  
    // Initial update
    updateDisplay();
    simulateMessages();
  });