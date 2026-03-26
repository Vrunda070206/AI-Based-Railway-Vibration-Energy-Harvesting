import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: 'cyan' | 'green' | 'orange' | 'red' | 'purple';
}

const colorClasses = {
  cyan: {
    bg: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
    icon: 'from-cyan-400 to-blue-600',
    shadow: 'shadow-cyan-500/50',
    text: 'text-cyan-400',
  },
  green: {
    bg: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    icon: 'from-green-400 to-emerald-600',
    shadow: 'shadow-green-500/50',
    text: 'text-green-400',
  },
  orange: {
    bg: 'from-orange-500/20 to-amber-500/20',
    border: 'border-orange-500/30',
    icon: 'from-orange-400 to-amber-600',
    shadow: 'shadow-orange-500/50',
    text: 'text-orange-400',
  },
  red: {
    bg: 'from-red-500/20 to-rose-500/20',
    border: 'border-red-500/30',
    icon: 'from-red-400 to-rose-600',
    shadow: 'shadow-red-500/50',
    text: 'text-red-400',
  },
  purple: {
    bg: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-500/30',
    icon: 'from-purple-400 to-violet-600',
    shadow: 'shadow-purple-500/50',
    text: 'text-purple-400',
  },
};

export function StatCard({ title, value, icon: Icon, trend, color = 'cyan' }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-6 shadow-lg ${colors.shadow} backdrop-blur-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2">{title}</p>
          <p className="text-3xl font-bold mb-2">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br ${colors.icon} rounded-xl flex items-center justify-center shadow-lg ${colors.shadow}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
}
