import { useEffect, useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface NCLItem {
  id: string;
  en: string;
  pt: string;
}

interface NCLClass {
  classe: number;
  tipo: 'Produto' | 'Serviço';
  nome: string;
  itens: NCLItem[];
}

type NCLData = Record<string, NCLClass>;

export default function NCL() {
  const [data, setData] = useState<NCLData | null>(null);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'Produto' | 'Serviço'>('all');

  useEffect(() => {
    document.title = 'Classificação de Nice NCL 13ª Edição (2026) — Permarke';
    fetch('/data/ncl13-2026.json')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error);
  }, []);

  const classes = useMemo(() => {
    if (!data) return [];
    return Object.values(data).sort((a, b) => a.classe - b.classe);
  }, [data]);

  const filteredClasses = useMemo(() => {
    let result = classes;
    if (filterType !== 'all') {
      result = result.filter((c) => c.tipo === filterType);
    }
    if (selectedClass !== null) {
      result = result.filter((c) => c.classe === selectedClass);
    }
    return result;
  }, [classes, filterType, selectedClass]);

  const searchResults = useMemo(() => {
    if (!search.trim() || search.trim().length < 2) return null;
    const lower = search.toLowerCase();
    const results: { classe: NCLClass; items: NCLItem[] }[] = [];
    for (const cl of filteredClasses) {
      const matched = cl.itens.filter(
        (item) =>
          item.pt.toLowerCase().includes(lower) ||
          item.en.toLowerCase().includes(lower) ||
          item.id.includes(lower)
      );
      if (matched.length > 0) {
        results.push({ classe: cl, items: matched });
      }
    }
    return results;
  }, [search, filteredClasses]);

  const totalResults = searchResults
    ? searchResults.reduce((sum, r) => sum + r.items.length, 0)
    : null;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-background">
          <p className="text-muted-foreground font-body animate-pulse">Carregando classificação...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="bg-foreground py-10 md:py-20">
          <div className="container-narrow px-4 sm:px-6">
            <h1 className="text-primary-foreground mb-3 text-2xl sm:text-3xl md:text-4xl">
              Classificação de Nice
              <br />
              <span className="italic text-primary">NCL 13ª Edição (2026)</span>
            </h1>
            <p className="text-primary-foreground/70 font-body text-sm sm:text-lg max-w-2xl leading-relaxed">
              Consulte todas as 45 classes da Classificação Internacional de Nice para produtos e serviços.
              Base oficial utilizada pelo INPI no registro de marcas.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="sticky top-0 z-30 bg-background border-b border-border shadow-sm">
          <div className="container-narrow px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Buscar por produto, serviço ou código..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-background border border-border text-foreground font-body text-sm rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="bg-background border border-border text-foreground font-body text-sm rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="all">Todos</option>
                <option value="Produto">Produtos (1-34)</option>
                <option value="Serviço">Serviços (35-45)</option>
              </select>
            </div>
            {totalResults !== null && (
              <p className="text-muted-foreground font-body text-xs mt-2">
                {totalResults} resultado{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </section>

        {/* Class Cards Grid */}
        <section className="container-narrow px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-5 sm:grid-cols-9 md:grid-cols-9 lg:grid-cols-15 gap-1.5 sm:gap-2 mb-6 sm:mb-8">
            {classes
              .filter((c) => filterType === 'all' || c.tipo === filterType)
              .map((cl) => (
                <button
                  key={cl.classe}
                  onClick={() => setSelectedClass(selectedClass === cl.classe ? null : cl.classe)}
                  className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-md sm:rounded-lg border text-center transition-all duration-200 ${
                    selectedClass === cl.classe
                      ? 'bg-primary/10 border-primary/40 ring-1 ring-primary/30'
                      : 'bg-card border-border hover:border-primary/30 hover:bg-primary/5'
                  }`}
                >
                  <span className={`font-heading text-sm sm:text-lg font-bold ${selectedClass === cl.classe ? 'text-primary' : 'text-foreground'}`}>
                    {cl.classe}
                  </span>
                  <span className={`text-[8px] sm:text-[10px] font-body leading-tight ${cl.tipo === 'Serviço' ? 'text-primary/70' : 'text-muted-foreground'}`}>
                    {cl.tipo === 'Serviço' ? 'Srv' : 'Prd'}
                  </span>
                </button>
              ))}
          </div>

          {/* Results */}
          {searchResults ? (
            // Search mode
            <div className="space-y-4 sm:space-y-6">
              {searchResults.length === 0 ? (
                <p className="text-center text-muted-foreground font-body py-12">
                  Nenhum resultado encontrado para "{search}".
                </p>
              ) : (
                searchResults.map((r) => (
                  <ClassCard key={r.classe.classe} classe={r.classe} filteredItems={r.items} />
                ))
              )}
            </div>
          ) : (
            // Browse mode
            <div className="space-y-4 sm:space-y-6">
              {filteredClasses.map((cl) => (
                <ClassCard key={cl.classe} classe={cl} />
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-foreground py-12">
          <div className="container-narrow text-center">
            <h2 className="text-primary-foreground mb-4">
              Precisa registrar sua marca?
            </h2>
            <p className="text-primary-foreground/60 font-body mb-6 max-w-xl mx-auto">
              Identificar a classe correta é o primeiro passo. Solicite uma análise de viabilidade gratuita.
            </p>
            <a
              href="/#viabilidade"
              className="inline-block bg-primary text-primary-foreground font-body font-semibold py-3 px-8 rounded-sm hover:bg-rosa-dark transition-colors"
            >
              Solicitar análise gratuita →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ClassCard({ classe, filteredItems }: { classe: NCLClass; filteredItems?: NCLItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const items = filteredItems || classe.itens;
  const displayItems = expanded ? items : items.slice(0, 10);
  const hasMore = items.length > 10;

  return (
    <div className="bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-5 text-left hover:bg-accent/30 transition-colors"
      >
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <span className="text-primary font-heading text-2xl sm:text-3xl font-bold shrink-0">{classe.classe}</span>
          <div className="min-w-0">
            <span className="text-foreground font-heading text-sm sm:text-lg block truncate">{classe.nome}</span>
            <span className={`text-[10px] sm:text-xs font-body px-1.5 sm:px-2 py-0.5 rounded-full ${
              classe.tipo === 'Serviço' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            }`}>
              {classe.tipo} · {items.length} ite{items.length !== 1 ? 'ns' : 'm'}
              {filteredItems && ` (de ${classe.itens.length})`}
            </span>
          </div>
        </div>
        <svg className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {(expanded || filteredItems) && (
        <div className="border-t border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-5 py-2 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider w-20">Código</th>
                  <th className="text-left px-5 py-2 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">Descrição (PT)</th>
                  <th className="text-left px-5 py-2 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Description (EN)</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map((item, i) => (
                  <tr key={`${item.id}-${i}`} className="border-b border-border/50 last:border-0 hover:bg-accent/20 transition-colors">
                    <td className="px-5 py-2.5 font-mono text-xs text-muted-foreground">{item.id}</td>
                    <td className="px-5 py-2.5 font-body text-sm text-foreground">{item.pt}</td>
                    <td className="px-5 py-2.5 font-body text-sm text-muted-foreground hidden md:table-cell">{item.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {hasMore && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="w-full py-3 text-center text-primary font-body text-sm hover:bg-primary/5 transition-colors border-t border-border"
            >
              Ver todos os {items.length} itens →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
