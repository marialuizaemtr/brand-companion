import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BlogCard } from '@/components/blog/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { getPostsIndex } from '@/services/githubCMS';
import { BLOG_CATEGORIES } from '@/types/blog';
import type { PostMeta } from '@/types/blog';

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    document.title = 'Blog | Permarke';
    getPostsIndex()
      .then((data) => setPosts(data.filter((p) => p.published)))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return result.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [posts, search, activeCategory]);

  const categoryCounts = useMemo(() => {
    return BLOG_CATEGORIES.map((cat) => ({
      name: cat,
      count: posts.filter((p) => p.category === cat).length,
    }));
  }, [posts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-28 sm:pt-32 pb-12 md:pb-16">
        <div className="container-narrow text-center">
          <h1 className="text-primary-foreground mb-4 text-3xl md:text-5xl">
            Blog <span className="italic text-primary">Permarke</span>
          </h1>
          <p className="text-primary-foreground/70 font-body max-w-xl mx-auto text-sm md:text-base">
            Conteúdos sobre registro de marca, propriedade intelectual e empreendedorismo feminino.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container-narrow py-8">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors ${
              !activeCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-primary/10'
            }`}
          >
            Todos
          </button>
          {categoryCounts.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
              className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors ${
                activeCategory === cat.name
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10'
              }`}
            >
              {cat.name} {cat.count > 0 && <span className="ml-1 opacity-60">({cat.count})</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Posts grid */}
      <section className="container-narrow pb-16 md:pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📝</p>
            <p className="font-heading text-xl text-foreground mb-2">Nenhum post encontrado</p>
            <p className="font-body text-muted-foreground text-sm">
              {search ? 'Tente outra busca.' : 'Em breve novos conteúdos!'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.slice(0, visibleCount).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            {visibleCount < filtered.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
                  className="bg-primary text-primary-foreground font-body font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform"
                >
                  Carregar mais
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
