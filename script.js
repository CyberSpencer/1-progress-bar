document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector(".counter");
    const messageCounter = document.querySelector(".message-counter");
    const progressBar = document.querySelector(".progress-bar");
  
    let messages = 17358; // Initial message count
    let trees = Math.floor(messages / 1000); // Trees already planted
    const goalTrees = 100; // Goal of 100 trees planted
    let accumulatedMessages = 0; // Track partial messages
  
    function updateDisplay() {
      document.querySelector(".tree-count").textContent = trees;
      document.querySelector(".message-count").textContent = Math.floor(messages).toLocaleString();
  
      // Update progress bar and percentage
      const progressPercent = Math.min((trees / goalTrees) * 100, 100);
      progressBar.style.width = `${progressPercent}%`;
      document.querySelector(".progress-percentage").textContent = Math.round(progressPercent);
    }
  
    function simulateMessages() {
      // Calculate messages per second (250-350 per day divided by seconds in a day)
      const messagesPerSecond = Math.random() * (350 - 250 + 1) + 250;
      const messageIncrement = messagesPerSecond / (24 * 60 * 60);
      
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