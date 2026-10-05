import React from 'react';

export const StatCard = ({ label, value, subtext, statusColor = "text-[#F4F5F7]", action, icon: Icon }) => {
  return (
    <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-4 flex flex-col justify-between transition-all hover:border-[#2e3e50] shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8994A4]">
          {label}
        </span>
        {Icon && <Icon className="w-4 h-4 text-[#8994A4]" />}
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-2">
        <div className={`text-2xl font-mono font-bold tracking-tight ${statusColor}`}>
          {value}
        </div>
        {action && <div>{action}</div>}
      </div>

      {subtext && (
        <div className="mt-2 text-xs font-mono text-[#8994A4]">
          {subtext}
        </div>
      )}
    </div>
  );
};

export default StatCard;
