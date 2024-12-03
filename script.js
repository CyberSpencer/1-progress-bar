document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector(".counter");
    const messageCounter = document.querySelector(".message-counter");
    const progressBar = document.querySelector(".progress-bar");
  
    let messages = 17358; // Initial message count
    let trees = Math.floor(messages / 1000); // Trees already planted
    const goalTrees = 100; // Goal of 100 trees planted
  
    function updateDisplay() {
      counter.textContent = `🌳 ${trees} Trees Planted`;
      messageCounter.textContent = `🌐 ${messages.toLocaleString()} Messages Sent`;
  
      // Update progress bar and percentage
      const progressPercent = Math.min((trees / goalTrees) * 100, 100);
      progressBar.style.width = `${progressPercent}%`;
      document.querySelector(".progress-percentage").textContent = Math.round(progressPercent);
    }
  
    function simulateMessages() {
      const dailyMessages = Math.floor(Math.random() * (350 - 250 + 1)) + 250; // Simulate 250-350 messages/day
      messages += dailyMessages;
  
      // Check if a new tree has been planted
      const newTrees = Math.floor(messages / 1000);
      if (newTrees > trees) {
        trees = newTrees;
      }
  
      updateDisplay();
  
      // Simulate next message batch in ~1 day (sped up for demo)
      const dayInMs = 24 * 60 * 60 * 1000;
      const speedUpFactor = 3600; // 1 real second = 1 virtual hour
      const simulatedDayInMs = dayInMs / speedUpFactor;
  
      setTimeout(simulateMessages, simulatedDayInMs);
    }
  
    // Initial update
    updateDisplay();
    simulateMessages();
  });