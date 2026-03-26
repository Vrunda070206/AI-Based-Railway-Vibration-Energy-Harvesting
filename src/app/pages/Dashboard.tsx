import { Activity, CheckCircle2, AlertTriangle, Zap, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { nodes, alerts, generateEnergyTimeSeries } from '../lib/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const activeNodes = nodes.filter(n => n.status === 'healthy').length;
  const nodesWithAlerts = nodes.filter(n => n.status !== 'healthy').length;
  const totalEnergyToday = nodes.reduce((sum, node) => sum + node.energyGenerated, 0);
  const systemHealth = Math.round((activeNodes / nodes.length) * 100);

  const energyTimeSeries = generateEnergyTimeSeries();
  const recentActivity = energyTimeSeries.slice(-6);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI-Based Railway Vibration Energy Harvesting
        </h1>
        <p className="text-gray-400">Real-time monitoring and analytics dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Nodes Installed"
          value={nodes.length}
          icon={Activity}
          color="cyan"
        />
        <StatCard
          title="Active Nodes"
          value={activeNodes}
          icon={CheckCircle2}
          color="green"
          trend={{ value: 12, direction: 'up' }}
        />
        <StatCard
          title="Nodes with Alerts"
          value={nodesWithAlerts}
          icon={AlertTriangle}
          color="orange"
        />
        <StatCard
          title="Energy Today (kWh)"
          value={totalEnergyToday.toFixed(1)}
          icon={Zap}
          color="purple"
          trend={{ value: 8, direction: 'up' }}
        />
        <StatCard
          title="System Health"
          value={`${systemHealth}%`}
          icon={TrendingUp}
          color={systemHealth > 80 ? 'green' : systemHealth > 60 ? 'orange' : 'red'}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Over Time */}
        <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Energy Generated (Last 24 Hours)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={energyTimeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#64748b" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#64748b" 
                style={{ fontSize: '12px' }}
                label={{ value: 'kWh', angle: -90, position: 'insideLeft', fill: '#64748b' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #06b6d4',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 3 }}
                activeDot={{ r: 6, fill: '#22d3ee' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Energy Per Node */}
        <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Energy per Node (Today)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nodes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="id" 
                stroke="#64748b" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#64748b" 
                style={{ fontSize: '12px' }}
                label={{ value: 'kWh', angle: -90, position: 'insideLeft', fill: '#64748b' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }}
              />
              <Bar 
                dataKey="energyGenerated" 
                fill="url(#colorGreen)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Nodes Quick View */}
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          Node Status Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`p-4 rounded-lg border ${
                node.status === 'healthy'
                  ? 'bg-green-500/10 border-green-500/30'
                  : node.status === 'low-energy'
                  ? 'bg-orange-500/10 border-orange-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{node.name}</span>
                <span
                  className={`w-3 h-3 rounded-full ${
                    node.status === 'healthy'
                      ? 'bg-green-500 shadow-lg shadow-green-500/50'
                      : node.status === 'low-energy'
                      ? 'bg-orange-500 shadow-lg shadow-orange-500/50'
                      : 'bg-red-500 shadow-lg shadow-red-500/50'
                  }`}
                />
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Energy:</span>
                  <span className="font-medium">{node.energyStored}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Events:</span>
                  <span className="font-medium">{node.vibrationEvents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Generated:</span>
                  <span className="font-medium">{node.energyGenerated} kWh</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-gray-900/50 border border-red-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          Recent Alerts
        </h2>
        <div className="space-y-3">
          {alerts.slice(0, 4).map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border flex items-start gap-3 ${
                alert.severity === 'critical'
                  ? 'bg-red-500/10 border-red-500/30'
                  : alert.severity === 'warning'
                  ? 'bg-orange-500/10 border-orange-500/30'
                  : 'bg-blue-500/10 border-blue-500/30'
              }`}
            >
              <AlertTriangle
                className={`w-5 h-5 flex-shrink-0 ${
                  alert.severity === 'critical'
                    ? 'text-red-400'
                    : alert.severity === 'warning'
                    ? 'text-orange-400'
                    : 'text-blue-400'
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{alert.nodeName}</span>
                  <span className="text-xs text-gray-400">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
