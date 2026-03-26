import { useState } from 'react';
import { MapPin, X, Zap, Activity, Clock } from 'lucide-react';
import { nodes, Node } from '../lib/mockData';

export function Map() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Railway Track Map
        </h1>
        <p className="text-gray-400">Interactive visualization of energy harvesting nodes</p>
      </div>

      {/* Map Container */}
      <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Node Locations
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
              <span className="text-gray-400">Healthy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50"></span>
              <span className="text-gray-400">Low Energy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></span>
              <span className="text-gray-400">Fault</span>
            </div>
          </div>
        </div>

        {/* Railway Track Visualization */}
        <div className="relative bg-gray-950 rounded-xl p-8 min-h-[500px] border border-gray-800">
          {/* Railway Track */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2">
            {/* Track lines */}
            <div className="relative h-16">
              <div className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded"></div>
              <div className="absolute bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded"></div>
              {/* Sleepers */}
              <div className="absolute inset-0 flex justify-between">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-16 bg-gray-700"></div>
                ))}
              </div>
            </div>

            {/* Nodes */}
            {nodes.map((node) => {
              const color =
                node.status === 'healthy'
                  ? 'green'
                  : node.status === 'low-energy'
                  ? 'orange'
                  : 'red';
              const colorClass =
                node.status === 'healthy'
                  ? 'bg-green-500 shadow-green-500/50 border-green-400'
                  : node.status === 'low-energy'
                  ? 'bg-orange-500 shadow-orange-500/50 border-orange-400'
                  : 'bg-red-500 shadow-red-500/50 border-red-400';

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 ${colorClass} rounded-full border-2 flex items-center justify-center shadow-lg cursor-pointer hover:scale-125 transition-transform`}
                  style={{ left: `${node.position}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-gray-400">
                    {node.id}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Track Labels */}
          <div className="absolute left-8 top-8 text-sm text-gray-400 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>Station A</span>
          </div>
          <div className="absolute right-8 top-8 text-sm text-gray-400 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>Station B</span>
          </div>
        </div>
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 max-w-md w-full">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6 text-cyan-400" />
                {selectedNode.name}
              </h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-400">Status</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedNode.status === 'healthy'
                        ? 'bg-green-500 shadow-lg shadow-green-500/50'
                        : selectedNode.status === 'low-energy'
                        ? 'bg-orange-500 shadow-lg shadow-orange-500/50'
                        : 'bg-red-500 shadow-lg shadow-red-500/50'
                    }`}
                  />
                  <span className="font-semibold capitalize">{selectedNode.status.replace('-', ' ')}</span>
                </div>
              </div>

              {/* Energy Stored */}
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Energy Stored
                  </span>
                  <span className="font-bold text-cyan-400">{selectedNode.energyStored}%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      selectedNode.energyStored > 70
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : selectedNode.energyStored > 40
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                        : 'bg-gradient-to-r from-red-500 to-rose-500'
                    }`}
                    style={{ width: `${selectedNode.energyStored}%` }}
                  ></div>
                </div>
              </div>

              {/* Vibration Events */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-400 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Vibration Events
                </span>
                <span className="font-bold">{selectedNode.vibrationEvents}</span>
              </div>

              {/* Energy Generated */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Energy Generated
                </span>
                <span className="font-bold text-purple-400">{selectedNode.energyGenerated} kWh</span>
              </div>

              {/* Last Updated */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Last Updated
                </span>
                <span className="font-semibold">{selectedNode.lastUpdated.toLocaleTimeString()}</span>
              </div>

              {/* Reliability Score */}
              <div className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Reliability Score</span>
                  <span className="font-bold text-purple-400">{selectedNode.reliability}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{ width: `${selectedNode.reliability}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid View */}
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          All Nodes Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-4 rounded-lg border text-left transition-all hover:scale-105 ${
                node.status === 'healthy'
                  ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
                  : node.status === 'low-energy'
                  ? 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50'
                  : 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
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
              <div className="text-sm text-gray-400">
                Energy: <span className="text-gray-200 font-medium">{node.energyStored}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
