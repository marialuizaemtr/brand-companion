import { supabase } from '@/integrations/supabase/client';

const BUCKET = 'blog-images';

export async function uploadBlogImage(file: File, folder = 'covers'): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const allowed = ['jpg', 'jpeg', 'png', 'webp'];
  if (!allowed.includes(ext)) {
    throw new Error('Formato não suportado. Use JPG, PNG ou WebP.');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Arquivo muito grande. Máximo 5MB.');
  }

  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}
