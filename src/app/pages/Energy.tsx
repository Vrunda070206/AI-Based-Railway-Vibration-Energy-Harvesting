import { Zap, Battery, TrendingUp } from 'lucide-react';
import { nodes, generateEnergyTimeSeries } from '../lib/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Progress } from '../components/ui/progress';

export function Energy() {
  const energyTimeSeries = generateEnergyTimeSeries();
  const totalEnergy = nodes.reduce((sum, node) => sum + node.energyGenerated, 0);
  const avgEfficiency = nodes.reduce((sum, node) => sum + node.reliability, 0) / nodes.length;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Energy Monitoring
        </h1>
        <p className="text-gray-400">Real-time energy generation and storage analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6 shadow-lg shadow-cyan-500/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Energy Today</p>
              <p className="text-2xl font-bold text-cyan-400">{totalEnergy.toFixed(2)} kWh</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span>+12% from yesterday</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 shadow-lg shadow-green-500/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50">
              <Battery className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Storage Level</p>
              <p className="text-2xl font-bold text-green-400">
                {Math.round(nodes.reduce((sum, n) => sum + n.energyStored, 0) / nodes.length)}%
              </p>
            </div>
          </div>
          <Progress 
            value={nodes.reduce((sum, n) => sum + n.energyStored, 0) / nodes.length} 
            className="h-2"
          />
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-xl p-6 shadow-lg shadow-purple-500/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">System Efficiency</p>
              <p className="text-2xl font-bold text-purple-400">{avgEfficiency.toFixed(1)}%</p>
            </div>
          </div>
          <Progress 
            value={avgEfficiency} 
            className="h-2"
          />
        </div>
      </div>

      {/* Energy Generation Chart */}
      <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          Energy Generation Timeline (24 Hours)
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={energyTimeSeries}>
            <defs>
              <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area 
              type="monotone" 
              dataKey="energy" 
              stroke="#06b6d4" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorEnergy)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Node Energy Details */}
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Battery className="w-5 h-5 text-purple-400" />
          Node Energy Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{node.name}</h3>
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

              {/* Battery Indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Energy Stored</span>
                  <span className="text-sm font-semibold">{node.energyStored}%</span>
                </div>
                <div className="relative">
                  <div className="h-8 bg-gray-700 rounded-lg overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        node.energyStored > 70
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : node.energyStored > 40
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                          : 'bg-gradient-to-r from-red-500 to-rose-500'
                      }`}
                      style={{ width: `${node.energyStored}%` }}
                    >
                      <div className="h-full w-full animate-pulse opacity-30 bg-white"></div>
                    </div>
                  </div>
                  <Battery
                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      node.energyStored > 70
                        ? 'text-green-300'
                        : node.energyStored > 40
                        ? 'text-orange-300'
                        : 'text-red-300'
                    }`}
                  />
                </div>
              </div>

              {/* Circular Progress */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Generated Today</p>
                  <p className="text-xl font-bold text-cyan-400">{node.energyGenerated} kWh</p>
                </div>
                <div className="relative w-20 h-20">
                  <svg className="transform -rotate-90 w-20 h-20">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#1e293b"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#06b6d4"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - node.reliability / 100)}`}
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">{node.reliability}%</span>
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Events</p>
                  <p className="font-semibold">{node.vibrationEvents}</p>
                </div>
                <div>
                  <p className="text-gray-400">Last Update</p>
                  <p className="font-semibold">
                    {Math.floor((Date.now() - node.lastUpdated.getTime()) / 60000)}m ago
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
