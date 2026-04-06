export interface PostAuthor {
  name: string;
  avatar_url: string;
  bio: string;
  linkedin_url?: string;
  instagram_url?: string;
  email?: string;
}

export interface PostMeta {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  cover_image_url: string;
  cover_position?: string; // CSS object-position e.g. "center top", "50% 30%"
  published: boolean;
  created_at: string;
  updated_at: string;
  author?: PostAuthor;
}

export interface CTABlock {
  headline: string;
  subtext: string;
  button_text: string;
  button_url: string;
}

export interface Post extends PostMeta {
  content: string;
  video_url?: string;
  cta_block?: CTABlock;
}

export const BLOG_CATEGORIES = [
  'Marcas',
  'Contratos',
  'INPI',
  'Tendências',
  'Cases',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
