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
        badge: 'text-[#4FB286] border-[#4FB286]/30 bg-[#4FB286]/10',
        text: 'text-[#4FB286]',
        dot: 'bg-[#4FB286]'
      };
    case 'MEDIUM':
      return {
        badge: 'text-[#D6A85F] border-[#D6A85F]/30 bg-[#D6A85F]/10',
        text: 'text-[#D6A85F]',
        dot: 'bg-[#D6A85F]'
      };
    case 'HARD':
      return {
        badge: 'text-[#B85C5C] border-[#B85C5C]/30 bg-[#B85C5C]/10',
        text: 'text-[#B85C5C]',
        dot: 'bg-[#B85C5C]'
      };
    case 'INSANE':
      return {
        badge: 'text-[#C8A96B] border-[#C8A96B]/40 bg-[#C8A96B]/15',
        text: 'text-[#C8A96B]',
        dot: 'bg-[#C8A96B]'
      };
    default:
      return {
        badge: 'text-[#8D98A8] border-[#263140] bg-[#121923]',
        text: 'text-[#8D98A8]',
        dot: 'bg-[#8D98A8]'
      };
  }
}

export function getStatusStyle(status) {
  switch (status?.toUpperCase()) {
    case 'SOLVED':
    case 'COMPLETED':
      return {
        badge: 'text-[#C8A96B] border-[#C8A96B]/40 bg-[#C8A96B]/10',
        label: 'COMPLETED',
        dot: 'bg-[#C8A96B]'
      };
    case 'AVAILABLE':
      return {
        badge: 'text-[#F4F5F7] border-[#263140] bg-[#121923] hover:border-[#C8A96B]/50',
        label: 'AVAILABLE',
        dot: 'bg-[#D6A85F]'
      };
    case 'IN_PROGRESS':
      return {
        badge: 'text-[#E5D0A0] border-[#C8A96B]/40 bg-[#121923]',
        label: 'IN PROGRESS',
        dot: 'bg-[#C8A96B] animate-pulse'
      };
    case 'LOCKED':
    default:
      return {
        badge: 'text-[#566375] border-[#1C2633] bg-[#0C111A]',
        label: 'RESTRICTED',
        dot: 'bg-[#566375]'
      };
  }
}

export function getAssetUrl(path) {
  if (!path) return '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
