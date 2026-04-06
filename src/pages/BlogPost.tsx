import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { CTABlock } from '@/components/blog/CTABlock';
import { VideoEmbed } from '@/components/blog/VideoEmbed';
import { AuthorBox } from '@/components/blog/AuthorBox';
import { Skeleton } from '@/components/ui/skeleton';
import { getPost, getPostsIndex } from '@/services/githubCMS';
import type { Post, PostMeta } from '@/types/blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    Promise.all([getPost(slug), getPostsIndex()]).then(([p, index]) => {
      setPost(p);
      setAllPosts(index.filter((i) => i.published));
      if (p) document.title = `${p.title} | Permarke`;
      setLoading(false);
    });
  }, [slug]);

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 container-narrow">
          <Skeleton className="w-full aspect-video rounded-2xl mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/3 mb-8" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 container-narrow text-center py-20">
          <p className="text-4xl mb-4">😕</p>
          <h1 className="text-2xl font-heading text-foreground mb-2">Post não encontrado</h1>
          <Link to="/blog" className="text-primary font-body hover:underline">
            ← Voltar ao blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const dateStr = new Date(post.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero cover */}
      {post.cover_image_url && (
        <section className="relative pt-20">
          <div className="aspect-[4/5] md:aspect-[2/1] w-full overflow-hidden">
            <img
              src={post.cover_image_url}
              alt={post.title}
              style={{ objectPosition: post.cover_position || 'center center' }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 container-narrow pb-8 md:pb-12">
            <span className="inline-block bg-primary text-primary-foreground text-xs font-body font-semibold px-3 py-1 rounded-full mb-3">
              {post.category}
            </span>
            <h1 className="text-primary-foreground text-2xl md:text-4xl lg:text-5xl max-w-3xl leading-tight">
              {post.title}
            </h1>
            <time className="text-primary-foreground/60 font-body text-sm mt-3 block">{dateStr}</time>
          </div>
        </section>
      )}

      {/* Breadcrumb */}
      <div className="container-narrow py-4">
        <nav className="flex items-center gap-1 text-xs font-body text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to={`/blog/categoria/${post.category.toLowerCase()}`}
            className="hover:text-primary transition-colors"
          >
            {post.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      {/* Content + Sidebar */}
      <section className="container-narrow pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {!post.cover_image_url && (
              <>
                <span className="inline-block bg-primary text-primary-foreground text-xs font-body font-semibold px-3 py-1 rounded-full mb-3">
                  {post.category}
                </span>
                <h1 className="text-foreground text-2xl md:text-4xl mb-2">{post.title}</h1>
                <time className="text-muted-foreground font-body text-sm mb-8 block">{dateStr}</time>
              </>
            )}

            {post.video_url && <VideoEmbed url={post.video_url} />}

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:font-body prose-p:text-foreground/80 prose-p:leading-relaxed
                prose-a:text-primary prose-a:underline prose-a:font-medium
                prose-blockquote:border-l-primary prose-blockquote:bg-[hsl(var(--rosa-light))] prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic
                prose-img:rounded-xl prose-img:max-w-full
                prose-li:font-body prose-li:text-foreground/80
                prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {post.cta_block && <CTABlock cta={post.cta_block} />}

            {post.author && <AuthorBox author={post.author} />}

            {/* Post navigation */}
            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ← {prevPost.title}
                </Link>
              ) : <span />}
              {nextPost ? (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="font-body text-sm text-muted-foreground hover:text-primary transition-colors text-right"
                >
                  {nextPost.title} →
                </Link>
              ) : <span />}
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <BlogSidebar recentPosts={allPosts} allPosts={allPosts} />
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            image: post.cover_image_url,
            datePublished: post.created_at,
            dateModified: post.updated_at,
            author: post.author
              ? { '@type': 'Person', name: post.author.name }
              : { '@type': 'Person', name: 'Maria Luiza' },
            publisher: {
              '@type': 'Organization',
              name: 'Permarke',
              url: 'https://permarke.com.br',
            },
          }),
        }}
      />

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
