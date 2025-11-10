// Mock API client for local development
// In production, this would connect to actual Cloud Storage API

const mockProviders = [
  { id: 1, name: 'AWS S3', status: 'active', latency: 45, cost: 0.023, reliability: 99.9, region: 'us-east-1', lat: 39.0438, lng: -77.4874 },
  { id: 2, name: 'Google Cloud Storage', status: 'active', latency: 38, cost: 0.020, reliability: 99.95, region: 'us-central1', lat: 41.8781, lng: -87.6298 },
  { id: 3, name: 'Azure Blob', status: 'warning', latency: 52, cost: 0.025, reliability: 99.8, region: 'East US', lat: 37.7749, lng: -122.4194 },
  { id: 4, name: 'DigitalOcean Spaces', status: 'active', latency: 41, cost: 0.018, reliability: 99.85, region: 'nyc3', lat: 40.7128, lng: -74.0060 },
  { id: 5, name: 'IBM Cloud Object Storage', status: 'active', latency: 48, cost: 0.022, reliability: 99.9, region: 'us-south', lat: 32.7767, lng: -96.7970 },
  { id: 6, name: 'Oracle Cloud Storage', status: 'active', latency: 44, cost: 0.025, reliability: 99.9, region: 'us-ashburn-1', lat: 39.0438, lng: -77.4874 },
  { id: 7, name: 'Alibaba Cloud OSS', status: 'active', latency: 65, cost: 0.012, reliability: 99.9, region: 'cn-hangzhou', lat: 30.2741, lng: 120.1551 },
  { id: 8, name: 'Tencent Cloud COS', status: 'active', latency: 68, cost: 0.013, reliability: 99.9, region: 'ap-guangzhou', lat: 23.1291, lng: 113.2644 },
  { id: 9, name: 'Linode Object Storage', status: 'active', latency: 39, cost: 0.005, reliability: 99.9, region: 'us-east-1', lat: 40.7128, lng: -74.0060 },
  { id: 10, name: 'Vultr Object Storage', status: 'active', latency: 42, cost: 0.006, reliability: 99.9, region: 'ewr1', lat: 40.7128, lng: -74.0060 },
  { id: 11, name: 'Backblaze B2', status: 'active', latency: 55, cost: 0.005, reliability: 99.9, region: 'us-west-002', lat: 37.7749, lng: -122.4194 },
  { id: 12, name: 'Wasabi Cloud Storage', status: 'active', latency: 47, cost: 0.0059, reliability: 99.9, region: 'us-east-1', lat: 39.0438, lng: -77.4874 },
  { id: 13, name: 'Cloudflare R2', status: 'active', latency: 35, cost: 0.015, reliability: 99.9, region: 'ENAM', lat: 39.0438, lng: -77.4874 },
  { id: 14, name: 'OVH Cloud Storage', status: 'warning', latency: 58, cost: 0.01, reliability: 99.9, region: 'GRA', lat: 48.8566, lng: 2.3522 },
  { id: 15, name: 'Scaleway Object Storage', status: 'active', latency: 49, cost: 0.01, reliability: 99.9, region: 'fr-par', lat: 48.8566, lng: 2.3522 },
  { id: 16, name: 'MinIO', status: 'active', latency: 25, cost: 0.0, reliability: 99.9, region: 'local', lat: 40.7128, lng: -74.0060 },
  { id: 17, name: 'Ceph Object Storage', status: 'active', latency: 30, cost: 0.0, reliability: 99.9, region: 'local', lat: 40.7128, lng: -74.0060 },
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
    const totalCost = mockProviders.reduce((sum, p) => sum + p.cost, 0);
    return mockProviders.map(provider => ({
      name: provider.name,
      cost: provider.cost * 100,
      percentage: Math.round((provider.cost / totalCost) * 100),
    }));
  }

  /**
   * Get AI predictions for costs and usage
   * @returns {Promise<Object>} Prediction data
   */
  async getPredictions() {
    await this.delay(600);
    const currentMonth = new Date().getMonth();
    const predictions = [];

    for (let i = 1; i <= 6; i++) {
      const month = new Date();
      month.setMonth(currentMonth + i);
      predictions.push({
        month: month.toLocaleDateString('en-US', { month: 'short' }),
        predictedCost: Math.round((mockMetrics.totalCost + (Math.random() - 0.5) * 5) * 100) / 100,
        predictedStorage: Math.round((mockMetrics.totalStorage + Math.random() * 100000000000) / 1000000000),
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99% confidence
      });
    }

    return {
      costPredictions: predictions,
      latencyTrend: 'decreasing',
      storageGrowth: 'moderate',
      recommendations: [
        'Consider migrating to lower-cost providers for archival data',
        'Optimize storage classes to reduce costs by 15-20%',
        'Implement data lifecycle policies for automatic tiering'
      ]
    };
  }

  /**
   * Get what-if analysis for different scenarios
   * @param {Object} scenario - Scenario parameters
   * @returns {Promise<Object>} Analysis results
   */
  async getWhatIfAnalysis(scenario) {
    await this.delay(800);
    const baseCost = mockMetrics.totalCost;
    const baseLatency = mockMetrics.avgLatency;

    let costImpact = 0;
    let latencyImpact = 0;
    let recommendations = [];

    if (scenario.addProvider) {
      costImpact += scenario.addProvider.cost * 10;
      latencyImpact -= 5;
      recommendations.push(`Adding ${scenario.addProvider.name} could reduce latency by ~5ms`);
    }

    if (scenario.removeProvider) {
      costImpact -= scenario.removeProvider.cost * 10;
      latencyImpact += 3;
      recommendations.push(`Removing ${scenario.removeProvider.name} would increase latency by ~3ms`);
    }

    if (scenario.usageIncrease) {
      costImpact += (scenario.usageIncrease / 100) * baseCost;
      recommendations.push(`Usage increase of ${scenario.usageIncrease}% would add $${costImpact.toFixed(2)} to monthly costs`);
    }

    return {
      currentCost: baseCost,
      projectedCost: baseCost + costImpact,
      costSavings: costImpact < 0 ? Math.abs(costImpact) : 0,
      currentLatency: baseLatency,
      projectedLatency: baseLatency + latencyImpact,
      recommendations,
      riskLevel: costImpact > baseCost * 0.2 ? 'high' : costImpact > baseCost * 0.1 ? 'medium' : 'low'
    };
  }

  /**
   * Get alerts and notifications
   * @returns {Promise<Array>} Active alerts
   */
  async getAlerts() {
    await this.delay(300);
    const alerts = [
      {
        id: 1,
        type: 'latency',
        severity: 'warning',
        message: 'Azure Blob latency exceeded 50ms threshold',
        provider: 'Azure Blob',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        acknowledged: false
      },
      {
        id: 2,
        type: 'cost',
        severity: 'info',
        message: 'Monthly cost prediction: $15.50 (8% increase expected)',
        provider: 'All Providers',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        acknowledged: true
      },
      {
        id: 3,
        type: 'predictive',
        severity: 'warning',
        message: 'Storage growth rate may exceed capacity in 2 months',
        provider: 'All Providers',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        acknowledged: false
      }
    ];

    return alerts;
  }

  /**
   * Get geographic data for map visualization
   * @returns {Promise<Array>} Provider locations
   */
  async getProviderLocations() {
    await this.delay(400);
    return mockProviders.map(provider => ({
      id: provider.id,
      name: provider.name,
      lat: provider.lat,
      lng: provider.lng,
      region: provider.region,
      status: provider.status,
      latency: provider.latency,
      cost: provider.cost
    }));
  }

  /**
   * Get performance heatmap data
   * @returns {Promise<Array>} Heatmap data points
   */
  async getPerformanceHeatmap() {
    await this.delay(500);
    const heatmapData = [];
    mockProviders.forEach(provider => {
      for (let hour = 0; hour < 24; hour++) {
        heatmapData.push({
          provider: provider.name,
          hour,
          latency: provider.latency + Math.sin(hour / 4) * 10 + (Math.random() - 0.5) * 5,
          requests: Math.floor(Math.random() * 1000) + 100
        });
      }
    });
    return heatmapData;
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
