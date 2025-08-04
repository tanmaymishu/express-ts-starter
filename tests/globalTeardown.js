const { exec } = require('child_process');

// Global teardown - runs ONCE after ALL tests complete
module.exports = async () => {
  try {
    // Kill any lingering Node processes related to our test
    await new Promise((resolve) => {
      exec('pkill -f "jest\\|ts-node"', (error) => {
        // Ignore errors - processes might already be closed
        resolve();
      });
    });
    
    // Wait a moment for cleanup
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('🎉 All tests completed, connections cleaned up');
  } catch (error) {
    // Silently handle any cleanup errors
  }
};