export interface PostMeta {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  cover_image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
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
