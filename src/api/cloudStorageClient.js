// Mock API client for local development
// In production, this would connect to actual Cloud Storage API

const mockProviders = [
  { id: 1, name: 'AWS S3', status: 'active', latency: 45, cost: 0.023, reliability: 99.9 },
  { id: 2, name: 'Google Cloud Storage', status: 'active', latency: 38, cost: 0.020, reliability: 99.95 },
  { id: 3, name: 'Azure Blob', status: 'warning', latency: 52, cost: 0.025, reliability: 99.8 },
  { id: 4, name: 'DigitalOcean Spaces', status: 'active', latency: 41, cost: 0.018, reliability: 99.85 },
];

const mockMetrics = {
  totalStorage: 1024 * 1024 * 1024 * 500, // 500 GB
  totalCost: 12.45,
  totalRequests: 145678,
  avgLatency: 44,
};

class CloudStorageClient {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.cloudstorage.com';
  }

  /**
   * Get all cloud storage providers
   * @returns {Promise<Array>} List of providers
   */
  async getProviders() {
    // Simulate API delay
    await this.delay(500);
    return mockProviders;
  }

  /**
   * Get metrics data
   * @returns {Promise<Object>} Metrics data
   */
  async getMetrics() {
    await this.delay(500);
    return mockMetrics;
  }

  /**
   * Get latency history for a provider
   * @param {number} providerId - Provider ID
   * @returns {Promise<Array>} Latency history
   */
  async getLatencyHistory(providerId) {
    await this.delay(300);
    // Generate mock latency data
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      timestamp: new Date(Date.now() - (24 - hour) * 3600000).toISOString(),
      latency: Math.floor(Math.random() * 40) + 30 + (Math.sin(hour / 4) * 10),
    }));
  }

  /**
   * Get cost breakdown by provider
   * @returns {Promise<Array>} Cost data
   */
  async getCostBreakdown() {
    await this.delay(400);
    return mockProviders.map(provider => ({
      name: provider.name,
      cost: provider.cost * 100,
      percentage: Math.floor(Math.random() * 30) + 10,
    }));
  }

  /**
   * Update provider configuration
   * @param {number} providerId - Provider ID
   * @param {Object} config - Configuration object
   * @returns {Promise<Object>} Updated provider
   */
  async updateProviderConfig(providerId, config) {
    await this.delay(600);
    const provider = mockProviders.find(p => p.id === providerId);
    if (!provider) throw new Error('Provider not found');
    return { ...provider, ...config };
  }

  /**
   * Helper method to simulate API delay
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
const cloudStorageClient = new CloudStorageClient();
export default cloudStorageClient;

// Also export the class for testing
export { CloudStorageClient };
