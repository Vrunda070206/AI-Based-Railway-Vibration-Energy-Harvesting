// Mock data for the railway energy harvesting system

export interface Node {
  id: string;
  name: string;
  status: 'healthy' | 'low-energy' | 'fault';
  energyStored: number;
  vibrationEvents: number;
  lastUpdated: Date;
  position: number; // Position along the track (0-100%)
  energyGenerated: number; // Total energy generated (kWh)
  reliability: number; // Reliability score (0-100)
}

export interface Alert {
  id: string;
  nodeId: string;
  nodeName: string;
  type: 'low-energy' | 'offline' | 'abnormal' | 'communication';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
}

export interface ActivityLog {
  id: string;
  nodeId: string;
  nodeName: string;
  type: 'vibration' | 'energy' | 'alert' | 'communication';
  message: string;
  timestamp: Date;
}

export interface EnergyData {
  timestamp: string;
  energy: number;
  nodeId?: string;
}

// Generate mock nodes
export const nodes: Node[] = [
  {
    id: 'N001',
    name: 'Node 001',
    status: 'healthy',
    energyStored: 87,
    vibrationEvents: 245,
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
    position: 10,
    energyGenerated: 12.4,
    reliability: 95,
  },
  {
    id: 'N002',
    name: 'Node 002',
    status: 'healthy',
    energyStored: 92,
    vibrationEvents: 312,
    lastUpdated: new Date(Date.now() - 1 * 60 * 1000),
    position: 25,
    energyGenerated: 15.8,
    reliability: 98,
  },
  {
    id: 'N003',
    name: 'Node 003',
    status: 'low-energy',
    energyStored: 34,
    vibrationEvents: 189,
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
    position: 40,
    energyGenerated: 8.2,
    reliability: 78,
  },
  {
    id: 'N004',
    name: 'Node 004',
    status: 'healthy',
    energyStored: 78,
    vibrationEvents: 278,
    lastUpdated: new Date(Date.now() - 3 * 60 * 1000),
    position: 55,
    energyGenerated: 11.6,
    reliability: 92,
  },
  {
    id: 'N005',
    name: 'Node 005',
    status: 'fault',
    energyStored: 12,
    vibrationEvents: 45,
    lastUpdated: new Date(Date.now() - 45 * 60 * 1000),
    position: 70,
    energyGenerated: 3.1,
    reliability: 45,
  },
  {
    id: 'N006',
    name: 'Node 006',
    status: 'healthy',
    energyStored: 95,
    vibrationEvents: 356,
    lastUpdated: new Date(Date.now() - 1 * 60 * 1000),
    position: 85,
    energyGenerated: 17.3,
    reliability: 97,
  },
];

// Generate mock alerts
export const alerts: Alert[] = [
  {
    id: 'A001',
    nodeId: 'N005',
    nodeName: 'Node 005',
    type: 'offline',
    severity: 'critical',
    message: 'Node offline for 45 minutes',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: 'A002',
    nodeId: 'N003',
    nodeName: 'Node 003',
    type: 'low-energy',
    severity: 'warning',
    message: 'Energy storage below 40%',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: 'A003',
    nodeId: 'N002',
    nodeName: 'Node 002',
    type: 'abnormal',
    severity: 'info',
    message: 'Unusual spike in vibration events detected',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 'A004',
    nodeId: 'N005',
    nodeName: 'Node 005',
    type: 'communication',
    severity: 'critical',
    message: 'Communication failure detected',
    timestamp: new Date(Date.now() - 50 * 60 * 1000),
  },
];

// Generate mock activity logs
export const activityLogs: ActivityLog[] = [
  {
    id: 'L001',
    nodeId: 'N002',
    nodeName: 'Node 002',
    type: 'vibration',
    message: 'Train vibration detected - High speed passenger train',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: 'L002',
    nodeId: 'N002',
    nodeName: 'Node 002',
    type: 'energy',
    message: 'Energy generated: 0.8 kWh',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: 'L003',
    nodeId: 'N001',
    nodeName: 'Node 001',
    type: 'vibration',
    message: 'Train vibration detected - Freight train',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 'L004',
    nodeId: 'N001',
    nodeName: 'Node 001',
    type: 'energy',
    message: 'Energy generated: 1.2 kWh',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 'L005',
    nodeId: 'N006',
    nodeName: 'Node 006',
    type: 'communication',
    message: 'Status update received',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: 'L006',
    nodeId: 'N003',
    nodeName: 'Node 003',
    type: 'alert',
    message: 'Low energy warning triggered',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: 'L007',
    nodeId: 'N004',
    nodeName: 'Node 004',
    type: 'vibration',
    message: 'Train vibration detected - Local passenger train',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
  },
  {
    id: 'L008',
    nodeId: 'N004',
    nodeName: 'Node 004',
    type: 'energy',
    message: 'Energy generated: 0.6 kWh',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
  },
];

// Generate time-series energy data
export const generateEnergyTimeSeries = (): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = timestamp.getHours();
    
    // Peak hours: 6-9 AM and 5-8 PM
    let baseEnergy = 5;
    if ((hour >= 6 && hour <= 9) || (hour >= 17 && hour <= 20)) {
      baseEnergy = 15;
    } else if ((hour >= 10 && hour <= 16) || (hour >= 21 && hour <= 23)) {
      baseEnergy = 10;
    }
    
    const energy = baseEnergy + Math.random() * 5;
    data.push({
      timestamp: `${hour.toString().padStart(2, '0')}:00`,
      energy: parseFloat(energy.toFixed(2)),
    });
  }
  
  return data;
};

// Generate per-node energy data
export const nodeEnergyData: EnergyData[] = nodes.map(node => ({
  timestamp: node.name,
  energy: node.energyGenerated,
  nodeId: node.id,
}));

// AI predictions
export interface AIPrediction {
  type: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

export const aiPredictions: AIPrediction[] = [
  {
    type: 'Energy Forecast (Next 24h)',
    value: 285,
    trend: 'up',
    confidence: 92,
  },
  {
    type: 'System Efficiency',
    value: 87,
    trend: 'stable',
    confidence: 95,
  },
  {
    type: 'Next Maintenance (Days)',
    value: 12,
    trend: 'down',
    confidence: 88,
  },
  {
    type: 'Failure Risk',
    value: 8,
    trend: 'down',
    confidence: 85,
  },
];
