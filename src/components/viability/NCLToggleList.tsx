import { allNCLClasses } from './nclData';

interface NCLToggleListProps {
  selectedNCLs: number[];
  onToggle: (num: number) => void;
}

export function NCLToggleList({ selectedNCLs, onToggle }: NCLToggleListProps) {
  return (
    <div className="max-h-48 overflow-y-auto pr-1 space-y-1 scrollbar-thin">
      {allNCLClasses.map((ncl) => {
        const isSelected = selectedNCLs.includes(ncl.num);
        return (
          <button
            key={ncl.num}
            type="button"
            onClick={() => onToggle(ncl.num)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
              isSelected
                ? 'bg-primary/15 border border-primary/40'
                : 'bg-primary-foreground/5 border border-primary-foreground/10 hover:border-primary-foreground/20'
            }`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
              isSelected ? 'bg-primary text-primary-foreground' : 'border border-primary-foreground/30'
            }`}>
              {isSelected && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div className="min-w-0">
              <span className="text-primary-foreground font-body text-sm">
                <span className="text-primary font-semibold">{ncl.num}</span> — {ncl.nome}
              </span>
              <p className="text-primary-foreground/40 font-body text-xs truncate">{ncl.descricao}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
