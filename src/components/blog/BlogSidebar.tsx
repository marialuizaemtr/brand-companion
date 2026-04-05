import { Link } from 'react-router-dom';
import type { PostMeta } from '@/types/blog';
import { BLOG_CATEGORIES } from '@/types/blog';

interface BlogSidebarProps {
  recentPosts: PostMeta[];
  allPosts: PostMeta[];
}

export function BlogSidebar({ recentPosts, allPosts }: BlogSidebarProps) {
  const categoryCounts = BLOG_CATEGORIES.map((cat) => ({
    name: cat,
    count: allPosts.filter((p) => p.category === cat).length,
  }));

  return (
    <aside className="space-y-8">
      {/* Posts recentes */}
      <div className="bg-card rounded-2xl p-6">
        <h4 className="font-heading text-lg font-bold text-foreground mb-4">Posts Recentes</h4>
        <div className="space-y-4">
          {recentPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="flex gap-3 group"
            >
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
                />
              )}
              <div className="min-w-0">
                <p className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </p>
                <time className="text-xs text-muted-foreground font-body">
                  {new Date(post.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categorias */}
      <div className="bg-card rounded-2xl p-6">
        <h4 className="font-heading text-lg font-bold text-foreground mb-4">Categorias</h4>
        <ul className="space-y-2">
          {categoryCounts.map((cat) => (
            <li key={cat.name}>
              <Link
                to={`/blog/categoria/${cat.name.toLowerCase()}`}
                className="flex justify-between text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-xs bg-muted rounded-full px-2 py-0.5">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA fixo */}
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground sticky top-24">
        <h4 className="font-heading text-lg font-bold mb-2">Proteja sua marca agora</h4>
        <p className="font-body text-sm opacity-90 mb-4">
          Assessoria jurídica especializada para o registro da sua marca.
        </p>
        <Link
          to="/servicos"
          className="inline-block bg-foreground text-background font-body font-semibold text-sm px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          Ver serviços
        </Link>
      </div>
    </aside>
  );
}
