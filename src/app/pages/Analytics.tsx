import { BarChart3, TrendingUp, Calendar, Zap } from 'lucide-react';
import { nodes, generateEnergyTimeSeries } from '../lib/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Analytics() {
  const energyTimeSeries = generateEnergyTimeSeries();
  
  const weeklyData = [
    { day: 'Mon', energy: 245, vibrations: 1234 },
    { day: 'Tue', energy: 268, vibrations: 1456 },
    { day: 'Wed', energy: 289, vibrations: 1598 },
    { day: 'Thu', energy: 256, vibrations: 1345 },
    { day: 'Fri', energy: 292, vibrations: 1623 },
    { day: 'Sat', energy: 198, vibrations: 987 },
    { day: 'Sun', energy: 176, vibrations: 823 },
  ];

  const nodeStatusData = [
    { name: 'Healthy', value: nodes.filter(n => n.status === 'healthy').length, color: '#10b981' },
    { name: 'Low Energy', value: nodes.filter(n => n.status === 'low-energy').length, color: '#f59e0b' },
    { name: 'Fault', value: nodes.filter(n => n.status === 'fault').length, color: '#ef4444' },
  ];

  const efficiencyComparison = nodes.map(node => ({
    name: node.id,
    efficiency: node.reliability,
    energy: node.energyGenerated,
  }));

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Analytics & Reports
        </h1>
        <p className="text-gray-400">Comprehensive system performance analytics</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-sm text-gray-400">Total Energy (Week)</p>
              <p className="text-2xl font-bold text-cyan-400">1,724 kWh</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Avg Efficiency</p>
              <p className="text-2xl font-bold text-green-400">87.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Total Vibrations</p>
              <p className="text-2xl font-bold text-purple-400">9,066</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-sm text-gray-400">Peak Day</p>
              <p className="text-2xl font-bold text-orange-400">Friday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy by Day */}
        <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Weekly Energy Generation
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #06b6d4',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Bar dataKey="energy" fill="url(#colorCyan)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vibration Events */}
        <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Weekly Vibration Events
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #a855f7',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Line
                type="monotone"
                dataKey="vibrations"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Node Status Distribution & Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Status Distribution */}
        <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Node Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={nodeStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {nodeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            {nodeStatusData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Node Efficiency Comparison */}
        <div className="bg-gray-900/50 border border-orange-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            Node Efficiency Comparison
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={efficiencyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #f59e0b',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Bar dataKey="efficiency" fill="url(#colorOrange)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          Detailed Performance Metrics
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Node ID</th>
                <th className="text-left py-3 px-4 text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-gray-400">Energy Stored</th>
                <th className="text-left py-3 px-4 text-gray-400">Generated (kWh)</th>
                <th className="text-left py-3 px-4 text-gray-400">Vibrations</th>
                <th className="text-left py-3 px-4 text-gray-400">Reliability</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node) => (
                <tr key={node.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium">{node.id}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        node.status === 'healthy'
                          ? 'bg-green-500/20 text-green-400'
                          : node.status === 'low-energy'
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {node.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className={`h-full ${
                            node.energyStored > 70
                              ? 'bg-green-500'
                              : node.energyStored > 40
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${node.energyStored}%` }}
                        ></div>
                      </div>
                      <span>{node.energyStored}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{node.energyGenerated}</td>
                  <td className="py-3 px-4">{node.vibrationEvents}</td>
                  <td className="py-3 px-4">
                    <span className="text-cyan-400 font-medium">{node.reliability}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
