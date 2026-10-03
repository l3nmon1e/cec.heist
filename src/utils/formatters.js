export function formatTimer(totalSeconds) {
  if (totalSeconds <= 0) return "00:00:00";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
}

export function formatScore(num) {
  return (num || 0).toLocaleString();
}

export function getDifficultyStyle(diff) {
  switch (diff?.toUpperCase()) {
    case 'EASY':
      return {
        badge: 'text-[#4ADE80] border-[#22C55E]/40 bg-[#16A34A]/10',
        text: 'text-[#4ADE80]',
        dot: 'bg-[#22C55E]'
      };
    case 'MEDIUM':
      return {
        badge: 'text-[#FACC15] border-[#FACC15]/40 bg-[#FACC15]/10',
        text: 'text-[#FACC15]',
        dot: 'bg-[#FACC15]'
      };
    case 'HARD':
      return {
        badge: 'text-[#F87171] border-[#EF4444]/40 bg-[#EF4444]/10',
        text: 'text-[#F87171]',
        dot: 'bg-[#EF4444]'
      };
    case 'INSANE':
      return {
        badge: 'text-[#C084FC] border-[#A855F7]/40 bg-[#A855F7]/10',
        text: 'text-[#C084FC]',
        dot: 'bg-[#A855F7]'
      };
    default:
      return {
        badge: 'text-[#9CA3AF] border-[#4B5563]/40 bg-[#374151]/10',
        text: 'text-[#9CA3AF]',
        dot: 'bg-[#9CA3AF]'
      };
  }
}

export function getStatusStyle(status) {
  switch (status?.toUpperCase()) {
    case 'SOLVED':
      return {
        badge: 'text-[#4ADE80] border-[#22C55E]/50 bg-[#16A34A]/15',
        label: 'SOLVED'
      };
    case 'AVAILABLE':
      return {
        badge: 'text-[#FACC15] border-[#FACC15]/40 bg-[#FACC15]/10',
        label: 'AVAILABLE'
      };
    case 'IN_PROGRESS':
      return {
        badge: 'text-[#60A5FA] border-[#3B82F6]/40 bg-[#3B82F6]/10',
        label: 'IN PROGRESS'
      };
    case 'LOCKED':
    default:
      return {
        badge: 'text-[#737373] border-[#303030] bg-[#151515]',
        label: 'LOCKED'
      };
  }
}
