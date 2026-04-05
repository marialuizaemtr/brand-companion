import type { CTABlock as CTABlockType } from '@/types/blog';

interface CTABlockProps {
  cta: CTABlockType;
}

export function CTABlock({ cta }: CTABlockProps) {
  return (
    <div className="bg-[hsl(var(--rosa-light))] border-l-4 border-primary rounded-2xl p-6 md:p-8 my-8">
      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
        {cta.headline}
      </h3>
      <p className="font-body text-muted-foreground mb-5">{cta.subtext}</p>
      <a
        href={cta.button_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-primary hover:bg-[hsl(var(--rosa-dark))] text-primary-foreground font-body font-bold rounded-full px-8 py-4 hover:shadow-[0_0_30px_hsl(var(--rosa)/0.4)] hover:scale-105 transition-all"
      >
        {cta.button_text}
      </a>
    </div>
  );
}
