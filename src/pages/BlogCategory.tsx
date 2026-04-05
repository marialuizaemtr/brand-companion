import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BlogCard } from '@/components/blog/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { getPostsIndex } from '@/services/githubCMS';
import { BLOG_CATEGORIES } from '@/types/blog';
import type { PostMeta } from '@/types/blog';

export default function BlogCategory() {
  const { cat } = useParams<{ cat: string }>();
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryName = BLOG_CATEGORIES.find((c) => c.toLowerCase() === cat?.toLowerCase()) || cat || '';

  useEffect(() => {
    document.title = `${categoryName} | Blog Permarke`;
    getPostsIndex()
      .then((data) => setPosts(data.filter((p) => p.published)))
      .finally(() => setLoading(false));
  }, [categoryName]);

  const filtered = useMemo(
    () =>
      posts
        .filter((p) => p.category.toLowerCase() === cat?.toLowerCase())
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [posts, cat],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-foreground pt-28 sm:pt-32 pb-12">
        <div className="container-narrow text-center">
          <p className="text-primary-foreground/60 font-body text-sm mb-2">Categoria</p>
          <h1 className="text-primary-foreground text-3xl md:text-5xl">{categoryName}</h1>
        </div>
      </section>

      <section className="container-narrow py-12 md:py-16">
        <Link to="/blog" className="text-primary font-body text-sm hover:underline mb-8 inline-block">
          ← Voltar ao blog
        </Link>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📂</p>
            <p className="font-heading text-xl text-foreground">
              Nenhum post nesta categoria ainda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
