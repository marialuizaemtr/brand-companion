import { Link } from 'react-router-dom';
import type { PostMeta } from '@/types/blog';

interface BlogCardProps {
  post: PostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  const dateStr = new Date(post.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {post.cover_image_url && (
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={post.cover_image_url}
            alt={post.title}
            loading="lazy"
            width={600}
            height={750}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5 md:p-6">
        <span className="inline-block bg-primary text-primary-foreground text-xs font-body font-semibold px-3 py-1 rounded-full mb-3">
          {post.category}
        </span>
        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground font-body text-sm line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <time className="text-xs text-muted-foreground font-body">{dateStr}</time>
          <span className="text-primary font-body text-sm font-medium group-hover:translate-x-1 transition-transform">
            Ler mais →
          </span>
        </div>
      </div>
    </Link>
  );
}
