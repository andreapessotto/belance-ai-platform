'use client';

interface BoltBadgeProps {
  fixedPosition?: boolean;
}

export function BoltBadge({ fixedPosition = false }: BoltBadgeProps) {
  return (
    <div className={`block ${fixedPosition ? 'fixed bottom-[calc(env(safe-area-inset-bottom)+70px)] right-4 z-50' : 'mx-auto py-8'}`}>
      <a 
        href="https://www.bolt.new" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`opacity-90 hover:opacity-100 transition-opacity duration-300 group block w-fit ${fixedPosition ? '' : 'mx-auto'}`}
        aria-label="Powered by Bolt.new"
      >
        <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200 group-hover:shadow-xl transition-shadow duration-300">
          <img 
            src="/bolt logo copy copy.png" 
            alt="Powered by Bolt.new" 
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              // Fallback se l'immagine non si carica
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement!;
              parent.innerHTML = '<span class="text-xs font-bold text-gray-800 px-2 py-1">⚡ Bolt</span>';
              parent.className = 'bg-white rounded-full shadow-lg border border-gray-200 group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center min-w-[40px] min-h-[40px]';
            }}
          />
        </div>
      </a>
    </div>
  );
}