import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/5512997206639?text=Olá! Vim pelo site da Permarke."
      target="_blank"
      rel="noopener"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 group"
      onMouseEnter={() => { setHovered(true); setVisible(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      {(visible || hovered) && (
        <span className="bg-foreground text-primary-foreground font-body text-sm font-medium px-4 py-2 rounded-full shadow-lg transition-all duration-300 hidden sm:inline-block">
          Chama a Permarke!
        </span>
      )}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
    </a>
  );
}
