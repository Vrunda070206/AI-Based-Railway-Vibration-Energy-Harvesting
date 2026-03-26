import { ScrollText, Activity, Zap, AlertTriangle, Radio } from 'lucide-react';
import { activityLogs } from '../lib/mockData';

const typeConfig = {
  vibration: {
    icon: Activity,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
  },
  energy: {
    icon: Zap,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
  },
  alert: {
    icon: AlertTriangle,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
  },
  communication: {
    icon: Radio,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
  },
};

export function Logs() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Activity Logs
        </h1>
        <p className="text-gray-400">Real-time system activity and event logs</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-xl p-6 shadow-lg shadow-purple-500/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-600 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Vibrations</p>
              <p className="text-xl font-bold text-purple-400">
                {activityLogs.filter(l => l.type === 'vibration').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6 shadow-lg shadow-cyan-500/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Energy Events</p>
              <p className="text-xl font-bold text-cyan-400">
                {activityLogs.filter(l => l.type === 'energy').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-6 shadow-lg shadow-orange-500/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Alerts</p>
              <p className="text-xl font-bold text-orange-400">
                {activityLogs.filter(l => l.type === 'alert').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 shadow-lg shadow-green-500/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Communications</p>
              <p className="text-xl font-bold text-green-400">
                {activityLogs.filter(l => l.type === 'communication').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-cyan-400" />
          Recent Activity
        </h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500"></div>
          <div className="space-y-4">
            {activityLogs.map((log) => {
              const config = typeConfig[log.type];
              const Icon = config.icon;

              return (
                <div key={log.id} className="relative pl-16">
                  <div
                    className={`absolute left-3 w-6 h-6 rounded-full ${config.bg} ${config.border} border-2 flex items-center justify-center`}
                  >
                    <Icon className={`w-3 h-3 ${config.color}`} />
                  </div>
                  <div className={`${config.bg} ${config.border} border rounded-lg p-4 hover:scale-[1.02] transition-transform`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{log.nodeName}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
                          {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{log.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filtered Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vibration Events */}
        <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            Vibration Events
          </h2>
          <div className="space-y-3">
            {activityLogs
              .filter(l => l.type === 'vibration')
              .map((log) => (
                <div
                  key={log.id}
                  className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{log.nodeName}</span>
                    <span className="text-xs text-gray-400">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{log.message}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Energy Generation */}
        <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Energy Generation Events
          </h2>
          <div className="space-y-3">
            {activityLogs
              .filter(l => l.type === 'energy')
              .map((log) => (
                <div
                  key={log.id}
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{log.nodeName}</span>
                    <span className="text-xs text-gray-400">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{log.message}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* System Logs Table */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-green-400" />
          Complete System Log
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Timestamp</th>
                <th className="text-left py-3 px-4 text-gray-400">Node</th>
                <th className="text-left py-3 px-4 text-gray-400">Type</th>
                <th className="text-left py-3 px-4 text-gray-400">Message</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.map((log) => {
                const config = typeConfig[log.type];
                const Icon = config.icon;

                return (
                  <tr key={log.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-gray-400">
                      {log.timestamp.toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-4 font-medium">{log.nodeName}</td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center gap-2 ${config.color}`}>
                        <Icon className="w-4 h-4" />
                        <span className="capitalize">{log.type}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{log.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
