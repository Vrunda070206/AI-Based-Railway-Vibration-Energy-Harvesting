import { Brain, TrendingUp, TrendingDown, Minus, Zap, AlertTriangle, Clock, Activity } from 'lucide-react';
import { aiPredictions, nodes } from '../lib/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export function AIInsights() {
  const radarData = nodes.map(node => ({
    node: node.id,
    reliability: node.reliability,
    energy: node.energyStored,
    efficiency: (node.energyGenerated / 20) * 100,
  }));

  const predictionTimeline = [
    { hour: '00:00', predicted: 8, actual: 7.5 },
    { hour: '04:00', predicted: 5, actual: 5.2 },
    { hour: '08:00', predicted: 16, actual: 15.8 },
    { hour: '12:00', predicted: 12, actual: 12.5 },
    { hour: '16:00', predicted: 14, actual: 13.8 },
    { hour: '20:00', predicted: 18, actual: 17.2 },
    { hour: '24:00', predicted: 10, actual: null },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          AI Insights & Predictions
        </h1>
        <p className="text-gray-400">Machine learning powered analytics and forecasting</p>
      </div>

      {/* AI Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiPredictions.map((prediction, index) => {
          const Icon =
            prediction.trend === 'up'
              ? TrendingUp
              : prediction.trend === 'down'
              ? TrendingDown
              : Minus;
          const trendColor =
            prediction.trend === 'up'
              ? 'text-green-400'
              : prediction.trend === 'down'
              ? 'text-red-400'
              : 'text-gray-400';

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 shadow-lg shadow-purple-500/50 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <Brain className="w-8 h-8 text-purple-400" />
                <Icon className={`w-5 h-5 ${trendColor}`} />
              </div>
              <p className="text-sm text-gray-400 mb-2">{prediction.type}</p>
              <p className="text-3xl font-bold mb-2">
                {prediction.type.includes('Days') || prediction.type.includes('Risk')
                  ? prediction.value
                  : prediction.type.includes('Efficiency')
                  ? `${prediction.value}%`
                  : `${prediction.value} kWh`}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Confidence</span>
                <span className="text-cyan-400 font-semibold">{prediction.confidence}%</span>
              </div>
              <div className="mt-3 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${prediction.confidence}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prediction vs Actual Chart */}
      <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          AI Prediction Accuracy - Energy Forecast
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={predictionTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="hour" stroke="#64748b" style={{ fontSize: '12px' }} />
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
                color: '#e2e8f0',
              }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#a855f7"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#a855f7', r: 4 }}
              name="AI Predicted"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ fill: '#06b6d4', r: 4 }}
              name="Actual"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-gray-400">AI Predicted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-gray-400">Actual</span>
          </div>
        </div>
      </div>

      {/* Radar Chart - Node Performance */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-400" />
          Node Performance Analysis
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis dataKey="node" stroke="#64748b" style={{ fontSize: '12px' }} />
            <PolarRadiusAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Radar
              name="Reliability"
              dataKey="reliability"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
            />
            <Radar
              name="Energy"
              dataKey="energy"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.3}
            />
            <Radar
              name="Efficiency"
              dataKey="efficiency"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.3}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #06b6d4',
                borderRadius: '8px',
                color: '#e2e8f0',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400">Reliability</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-gray-400">Energy Storage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-gray-400">Efficiency</span>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Predictions */}
        <div className="bg-gray-900/50 border border-orange-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Maintenance Predictions
          </h2>
          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Node 005</span>
                <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">High Risk</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">Predicted failure in 3-5 days</p>
              <div className="flex items-center gap-2 text-sm text-orange-400">
                <Clock className="w-4 h-4" />
                <span>Immediate maintenance recommended</span>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Node 003</span>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">Medium Risk</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">Energy efficiency declining</p>
              <div className="flex items-center gap-2 text-sm text-yellow-400">
                <Clock className="w-4 h-4" />
                <span>Schedule maintenance within 2 weeks</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Nodes 001, 002, 004, 006</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Low Risk</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">Operating optimally</p>
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <Clock className="w-4 h-4" />
                <span>Regular checkup in 30+ days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI Optimization Suggestions
          </h2>
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <span className="font-semibold">Energy Harvesting Optimization</span>
              </div>
              <p className="text-sm text-gray-400">
                Nodes 002 and 006 show 15% higher energy generation. Consider installing similar piezoelectric configurations on other nodes.
              </p>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="font-semibold">Peak Hour Performance</span>
              </div>
              <p className="text-sm text-gray-400">
                Energy generation peaks at 8 AM and 6 PM. System efficiency can be improved by 12% with optimized energy storage during these times.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-green-400" />
                </div>
                <span className="font-semibold">Network Reliability</span>
              </div>
              <p className="text-sm text-gray-400">
                Overall system reliability at 87%. Addressing Node 005 communication issues could improve to 94%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}