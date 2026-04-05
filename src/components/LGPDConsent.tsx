import { Link } from 'react-router-dom';

interface LGPDConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
  /** 'light' for light backgrounds, 'dark' for dark backgrounds */
  theme?: 'light' | 'dark';
}

export function LGPDConsent({ checked, onChange, error, theme = 'light' }: LGPDConsentProps) {
  const textColor = theme === 'dark' ? 'text-primary-foreground/70' : 'text-gray-600';
  const linkColor = theme === 'dark' ? 'text-primary hover:text-primary/80' : 'text-[#E73B97] hover:text-[#C42880]';
  const borderColor = error ? 'border-red-400' : theme === 'dark' ? 'border-primary-foreground/20' : 'border-gray-300';
  const checkboxBg = theme === 'dark' ? 'bg-primary-foreground/5' : 'bg-white';

  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`mt-0.5 w-4 h-4 rounded border ${borderColor} ${checkboxBg} accent-[#E73B97] cursor-pointer flex-shrink-0`}
      />
      <label className={`font-body text-xs leading-relaxed ${textColor} cursor-pointer`} onClick={() => onChange(!checked)}>
        Li e concordo com a{' '}
        <Link
          to="/privacidade"
          target="_blank"
          className={`underline ${linkColor}`}
          onClick={(e) => e.stopPropagation()}
        >
          Política de Privacidade
        </Link>
        , e autorizo o uso dos meus dados para contato e envio de comunicações comerciais pela Permarke.
      </label>
    </div>
  );
}

export function LGPDDisclaimer({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const textColor = theme === 'dark' ? 'text-primary-foreground/40' : 'text-gray-400';
  return (
    <p className={`text-center font-body text-[11px] ${textColor}`}>
      Seus dados estão protegidos e serão utilizados apenas para fins de contato e comunicações relacionadas aos serviços da Permarke.
    </p>
  );
}
