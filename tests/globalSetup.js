// Global setup - runs ONCE before ALL tests
module.exports = async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  
  // Let the app initialize its own connections
  // We don't need to manually initialize here since importing app will do it
  console.log('🚀 Test environment initialized');
};