// Expanded mock API for 15 providers with prediction status and INR costs

const providers = [
  { id: 'aws-s3', name: 'AWS S3', latency: 38, cost: 199, reliability: 99.95, prediction: 'Stable' },
  { id: 'gcp', name: 'Google Cloud Storage', latency: 41, cost: 149, reliability: 99.97, prediction: 'Improving' },
  { id: 'azure', name: 'Azure Blob Storage', latency: 44, cost: 182, reliability: 99.90, prediction: 'Degrading' },
  { id: 'do', name: 'DigitalOcean Spaces', latency: 52, cost: 99, reliability: 99.80, prediction: 'Stable' },
  { id: 'alibaba', name: 'Alibaba Cloud OSS', latency: 60, cost: 109, reliability: 99.85, prediction: 'Improving' },
  { id: 'oracle', name: 'Oracle Cloud Storage', latency: 55, cost: 89, reliability: 99.89, prediction: 'Stable' },
  { id: 'ibm', name: 'IBM Cloud Object Storage', latency: 49, cost: 149, reliability: 99.91, prediction: 'Degrading' },
  { id: 'cloudflare', name: 'Cloudflare R2', latency: 47, cost: 109, reliability: 99.96, prediction: 'Stable' },
  { id: 'wasabi', name: 'Wasabi Hot Storage', latency: 50, cost: 59, reliability: 99.94, prediction: 'Improving' },
  { id: 'backblaze', name: 'Backblaze B2', latency: 57, cost: 85, reliability: 99.93, prediction: 'Stable' },
  { id: 'linode', name: 'Linode Object Storage', latency: 59, cost: 73, reliability: 99.84, prediction: 'Stable' },
  { id: 'vultr', name: 'Vultr Object Storage', latency: 61, cost: 68, reliability: 99.80, prediction: 'Degrading' },
  { id: 'scaleway', name: 'Scaleway Object Storage', latency: 66, cost: 92, reliability: 99.82, prediction: 'Improving' },
  { id: 'ovh', name: 'OVH Cloud Storage', latency: 69, cost: 77, reliability: 99.86, prediction: 'Stable' },
  { id: 'hetzner', name: 'Hetzner Storage Box', latency: 65, cost: 80, reliability: 99.79, prediction: 'Stable' },
];

// Simulate latency for 24h
const latency24hData = Array.from({length: 24}).map((_, hour) => {
  const entry = { time: `${String(hour).padStart(2, '0')}:00` };
  providers.forEach(p => entry[p.id] = p.latency + Math.floor(Math.random()*10-5));
  return entry;
});

export default {
  getMetrics: async () => ({
    totalStorage: 78000000000,
    totalCost: providers.reduce((sum, p) => sum + p.cost, 0),
    totalProviders: providers.length,
    monthlyGrowth: 11.8,
  }),
  getProviders: async () => providers,
  getLatency24hData: async () => latency24hData,
};