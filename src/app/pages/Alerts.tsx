import { AlertTriangle, AlertCircle, Info, XCircle } from 'lucide-react';
import { alerts } from '../lib/mockData';

const severityConfig = {
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: XCircle,
    iconColor: 'text-red-400',
    label: 'Critical',
  },
  warning: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    icon: AlertTriangle,
    iconColor: 'text-orange-400',
    label: 'Warning',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: Info,
    iconColor: 'text-blue-400',
    label: 'Info',
  },
};

const typeConfig = {
  'low-energy': { label: 'Low Energy', color: 'text-orange-400' },
  offline: { label: 'Node Offline', color: 'text-red-400' },
  abnormal: { label: 'Abnormal Activity', color: 'text-yellow-400' },
  communication: { label: 'Communication Failure', color: 'text-purple-400' },
};

export function Alerts() {
  const criticalAlerts = alerts.filter(a => a.severity === 'critical');
  const warningAlerts = alerts.filter(a => a.severity === 'warning');
  const infoAlerts = alerts.filter(a => a.severity === 'info');

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
          Alerts & Notifications
        </h1>
        <p className="text-gray-400">System alerts and monitoring notifications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-xl p-6 shadow-lg shadow-red-500/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-red-400">{criticalAlerts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-6 shadow-lg shadow-orange-500/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/50">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Warning</p>
              <p className="text-2xl font-bold text-orange-400">{warningAlerts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6 shadow-lg shadow-blue-500/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Info</p>
              <p className="text-2xl font-bold text-blue-400">{infoAlerts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <div className="bg-gray-900/50 border border-red-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-400">
              <XCircle className="w-5 h-5" />
              Critical Alerts ({criticalAlerts.length})
            </h2>
            <div className="space-y-3">
              {criticalAlerts.map((alert) => {
                const config = severityConfig[alert.severity];
                const Icon = config.icon;
                const typeInfo = typeConfig[alert.type];

                return (
                  <div
                    key={alert.id}
                    className={`${config.bg} ${config.border} border rounded-lg p-4 flex items-start gap-4 hover:scale-[1.02] transition-transform`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${config.bg} ${config.border} border flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{alert.nodeName}</span>
                          <span className={`text-xs px-2 py-1 rounded-full bg-gray-800/50 ${typeInfo.color}`}>
                            {typeInfo.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {alert.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{alert.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Warning Alerts */}
        {warningAlerts.length > 0 && (
          <div className="bg-gray-900/50 border border-orange-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-orange-400">
              <AlertTriangle className="w-5 h-5" />
              Warning Alerts ({warningAlerts.length})
            </h2>
            <div className="space-y-3">
              {warningAlerts.map((alert) => {
                const config = severityConfig[alert.severity];
                const Icon = config.icon;
                const typeInfo = typeConfig[alert.type];

                return (
                  <div
                    key={alert.id}
                    className={`${config.bg} ${config.border} border rounded-lg p-4 flex items-start gap-4 hover:scale-[1.02] transition-transform`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${config.bg} ${config.border} border flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{alert.nodeName}</span>
                          <span className={`text-xs px-2 py-1 rounded-full bg-gray-800/50 ${typeInfo.color}`}>
                            {typeInfo.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {alert.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{alert.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Alerts */}
        {infoAlerts.length > 0 && (
          <div className="bg-gray-900/50 border border-blue-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
              <Info className="w-5 h-5" />
              Information ({infoAlerts.length})
            </h2>
            <div className="space-y-3">
              {infoAlerts.map((alert) => {
                const config = severityConfig[alert.severity];
                const Icon = config.icon;
                const typeInfo = typeConfig[alert.type];

                return (
                  <div
                    key={alert.id}
                    className={`${config.bg} ${config.border} border rounded-lg p-4 flex items-start gap-4 hover:scale-[1.02] transition-transform`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${config.bg} ${config.border} border flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{alert.nodeName}</span>
                          <span className={`text-xs px-2 py-1 rounded-full bg-gray-800/50 ${typeInfo.color}`}>
                            {typeInfo.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {alert.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{alert.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Alert Timeline */}
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-purple-400" />
          Alert Timeline
        </h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-blue-500"></div>
          <div className="space-y-6">
            {alerts.map((alert, index) => {
              const config = severityConfig[alert.severity];
              const Icon = config.icon;

              return (
                <div key={alert.id} className="relative pl-16">
                  <div className={`absolute left-3 w-6 h-6 rounded-full ${config.bg} ${config.border} border-2 flex items-center justify-center`}>
                    <Icon className={`w-3 h-3 ${config.iconColor}`} />
                  </div>
                  <div className={`${config.bg} ${config.border} border rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{alert.nodeName}</span>
                      <span className="text-xs text-gray-400">
                        {alert.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{alert.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
