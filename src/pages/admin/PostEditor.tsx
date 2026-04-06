import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { getPost, getPostsIndex, saveFile, slugify } from '@/services/githubCMS';
import { BLOG_CATEGORIES } from '@/types/blog';
import type { Post, PostMeta } from '@/types/blog';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { ImageUploadButton } from '@/components/admin/ImageUploadButton';
import { AuthorSelector } from '@/components/admin/AuthorSelector';
import { uploadBlogImage } from '@/services/imageUpload';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const quillModules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline'],
      [{ header: [2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'blockquote', 'image'],
      [{ align: [] }],
      ['clean'],
    ],
    handlers: {
      image: function () {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/jpeg,image/png,image/webp');
        input.click();
        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;
          try {
            const url = await uploadBlogImage(file, 'content');
            const quill = (this as any).quill;
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', url);
            quill.setSelection(range.index + 1);
          } catch (err: any) {
            alert(err.message || 'Erro no upload');
          }
        };
      },
    },
  },
};

// removed POSITION_OPTIONS — now using draggable focal point

export default function PostEditor() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('gh_token');
  const isEdit = !!slug;

  const [title, setTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [category, setCategory] = useState<string>(BLOG_CATEGORIES[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [coverPosition, setCoverPosition] = useState('center center');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [ctaOpen, setCtaOpen] = useState(false);
  const [ctaHeadline, setCtaHeadline] = useState('');
  const [ctaSubtext, setCtaSubtext] = useState('');
  const [ctaBtnText, setCtaBtnText] = useState('');
  const [ctaBtnUrl, setCtaBtnUrl] = useState('');
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [postId, setPostId] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  // Author fields
  const [authorName, setAuthorName] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [authorLinkedin, setAuthorLinkedin] = useState('');
  const [authorInstagram, setAuthorInstagram] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (isEdit && slug) {
      getPost(slug).then((p) => {
        if (!p) {
          toast.error('Post não encontrado');
          navigate('/admin/dashboard');
          return;
        }
        setTitle(p.title);
        setPostSlug(p.slug);
        setCategory(p.category);
        setTags(p.tags);
        setExcerpt(p.excerpt);
        setCoverUrl(p.cover_image_url);
        setCoverPosition(p.cover_position || 'center center');
        setContent(p.content);
        setVideoUrl(p.video_url || '');
        setPublished(p.published);
        setPostId(p.id);
        setCreatedAt(p.created_at);
        if (p.author) {
          setAuthorName(p.author.name);
          setAuthorAvatar(p.author.avatar_url);
          setAuthorBio(p.author.bio);
          setAuthorLinkedin(p.author.linkedin_url || '');
          setAuthorInstagram(p.author.instagram_url || '');
          setAuthorEmail(p.author.email || '');
        }
        if (p.cta_block) {
          setCtaOpen(true);
          setCtaHeadline(p.cta_block.headline);
          setCtaSubtext(p.cta_block.subtext);
          setCtaBtnText(p.cta_block.button_text);
          setCtaBtnUrl(p.cta_block.button_url);
        }
      });
    } else {
      setPostId(uuidv4());
      setCreatedAt(new Date().toISOString());
    }
  }, [token, slug, isEdit, navigate]);

  useEffect(() => {
    if (!isEdit) {
      setPostSlug(slugify(title));
    }
  }, [title, isEdit]);

  const addTag = (value: string) => {
    const tag = value.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput('');
  };

  const handleSave = async (publish: boolean) => {
    if (!token || !postSlug) return;
    if (!title.trim()) {
      toast.error('Título é obrigatório');
      return;
    }

    setSaving(true);
    try {
      const now = new Date().toISOString();
      const post: Post = {
        id: postId,
        title: title.trim(),
        slug: postSlug,
        excerpt: excerpt.trim(),
        category,
        tags,
        cover_image_url: coverUrl.trim(),
        cover_position: coverPosition,
        content,
        video_url: videoUrl.trim() || undefined,
        author: authorName.trim()
          ? { name: authorName.trim(), avatar_url: authorAvatar.trim(), bio: authorBio.trim(), linkedin_url: authorLinkedin.trim() || undefined, instagram_url: authorInstagram.trim() || undefined, email: authorEmail.trim() || undefined }
          : undefined,
        cta_block:
          ctaHeadline.trim()
            ? {
                headline: ctaHeadline.trim(),
                subtext: ctaSubtext.trim(),
                button_text: ctaBtnText.trim(),
                button_url: ctaBtnUrl.trim(),
              }
            : undefined,
        published: publish,
        created_at: createdAt,
        updated_at: now,
      };

      await saveFile(`posts/${postSlug}.json`, post, token, `${isEdit ? 'Update' : 'Create'}: ${postSlug}`);

      const index = await getPostsIndex();
      const meta: PostMeta = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        cover_image_url: post.cover_image_url,
        cover_position: post.cover_position,
        published: post.published,
        created_at: post.created_at,
        updated_at: post.updated_at,
        author: post.author,
      };

      const existingIdx = index.findIndex((p) => p.id === post.id);
      if (existingIdx >= 0) {
        index[existingIdx] = meta;
      } else {
        index.unshift(meta);
      }
      await saveFile('posts-index.json', index, token, `Update index: ${postSlug}`);

      toast.success(publish ? 'Post publicado!' : 'Rascunho salvo!');
      navigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar');
    }
    setSaving(false);
  };

  const inputClass =
    'w-full bg-foreground border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary';
  const labelClass = 'block text-primary-foreground/60 font-body text-sm font-medium mb-1.5';

  return (
    <div className="min-h-screen bg-foreground text-primary-foreground">
      {/* Top bar */}
      <header className="border-b border-primary-foreground/10 px-4 md:px-8 py-4 flex items-center justify-between">
        <h1 className="font-heading text-xl">
          {isEdit ? 'Editar post' : 'Novo post'}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="font-body text-sm px-4 py-2 border border-primary-foreground/20 text-primary-foreground rounded-lg hover:bg-primary-foreground/10 disabled:opacity-50 transition-colors"
          >
            Salvar rascunho
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="font-body text-sm px-5 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isEdit ? 'Atualizar' : 'Publicar'}
          </button>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="font-body text-sm px-4 py-2 text-primary-foreground/40 hover:text-primary-foreground transition-colors"
          >
            Cancelar
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* Title */}
        <div>
          <label className={labelClass}>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Como registrar sua marca no INPI"
            className={inputClass}
          />
        </div>

        {/* Slug */}
        <div>
          <label className={labelClass}>Slug</label>
          <input
            type="text"
            value={postSlug}
            onChange={(e) => setPostSlug(e.target.value)}
            className={inputClass}
          />
          <p className="text-primary-foreground/30 font-body text-xs mt-1">
            permarke.com.br/blog/{postSlug || '...'}
          </p>
        </div>

        {/* Category + Tags row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Tags</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-primary/20 text-primary text-xs font-body px-2.5 py-1 rounded-full"
                >
                  {tag}
                  <button onClick={() => setTags(tags.filter((t) => t !== tag))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }}
              placeholder="Digitar tag + Enter"
              className={inputClass}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className={labelClass}>
            Excerpt <span className="text-primary-foreground/30">({excerpt.length}/160)</span>
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value.slice(0, 160))}
            rows={3}
            placeholder="Resumo do post..."
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* Cover image */}
        <div>
          <label className={labelClass}>Imagem de capa</label>
          <div className="flex gap-4 items-start">
            <div className="flex-1 space-y-2">
              <input
                type="url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="Cole uma URL ou faça upload"
                className={inputClass}
              />
              <ImageUploadButton
                onUploaded={(url) => setCoverUrl(url)}
                folder="covers"
                label="Upload de capa"
              />
            </div>
            {coverUrl && (
              <img
                src={coverUrl}
                alt="Preview"
                className="w-24 h-16 object-cover rounded-lg border border-primary-foreground/10"
              />
            )}
          </div>

          {/* Draggable focal point selector */}
          {coverUrl && (
            <div className="mt-3">
              <label className={labelClass}>Arraste o marcador para definir o ponto focal</label>
              <div
                className="relative w-full max-w-md rounded-lg overflow-hidden border border-primary-foreground/10 cursor-crosshair select-none"
                onMouseDown={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const update = (ev: MouseEvent) => {
                    const x = Math.min(100, Math.max(0, ((ev.clientX - rect.left) / rect.width) * 100));
                    const y = Math.min(100, Math.max(0, ((ev.clientY - rect.top) / rect.height) * 100));
                    setCoverPosition(`${Math.round(x)}% ${Math.round(y)}%`);
                  };
                  update(e.nativeEvent);
                  const onMove = (ev: MouseEvent) => update(ev);
                  const onUp = () => {
                    window.removeEventListener('mousemove', onMove);
                    window.removeEventListener('mouseup', onUp);
                  };
                  window.addEventListener('mousemove', onMove);
                  window.addEventListener('mouseup', onUp);
                }}
                onTouchStart={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const update = (touch: { clientX: number; clientY: number }) => {
                    const x = Math.min(100, Math.max(0, ((touch.clientX - rect.left) / rect.width) * 100));
                    const y = Math.min(100, Math.max(0, ((touch.clientY - rect.top) / rect.height) * 100));
                    setCoverPosition(`${Math.round(x)}% ${Math.round(y)}%`);
                  };
                  update(e.touches[0]);
                  const onMove = (ev: TouchEvent) => { ev.preventDefault(); update(ev.touches[0]); };
                  const onEnd = () => {
                    window.removeEventListener('touchmove', onMove);
                    window.removeEventListener('touchend', onEnd);
                  };
                  window.addEventListener('touchmove', onMove, { passive: false });
                  window.addEventListener('touchend', onEnd);
                }}
              >
                <img src={coverUrl} alt="Focal point" className="w-full" />
                {/* Focal marker */}
                {(() => {
                  const parts = coverPosition.split(/\s+/);
                  const px = parseFloat(parts[0]) || 50;
                  const py = parseFloat(parts[1]) || 50;
                  return (
                    <div
                      className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-primary/30 pointer-events-none ring-2 ring-primary-foreground/50"
                      style={{ left: `${px}%`, top: `${py}%` }}
                    />
                  );
                })()}
              </div>
              <p className="text-primary-foreground/30 text-xs font-body mt-1">Posição: {coverPosition}</p>

              {/* Previews */}
              <div className="mt-2 grid grid-cols-2 gap-2 max-w-md">
                <div>
                  <p className="text-primary-foreground/30 text-xs font-body mb-1">Mobile (4:5)</p>
                  <div className="aspect-[4/5] rounded-lg overflow-hidden border border-primary-foreground/10">
                    <img src={coverUrl} alt="Preview mobile" style={{ objectPosition: coverPosition }} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-primary-foreground/30 text-xs font-body mb-1">Desktop (2:1)</p>
                  <div className="aspect-[2/1] rounded-lg overflow-hidden border border-primary-foreground/10">
                    <img src={coverUrl} alt="Preview desktop" style={{ objectPosition: coverPosition }} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content editor */}
        <div>
          <label className={labelClass}>Conteúdo</label>
          <div className="bg-primary-foreground rounded-lg overflow-hidden [&_.ql-toolbar]:border-none [&_.ql-toolbar]:bg-[#f5f5f5] [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:font-body [&_.ql-editor]:text-foreground">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              placeholder="Escreva o conteúdo do post..."
            />
          </div>
        </div>

        {/* Video URL */}
        <div>
          <label className={labelClass}>URL do vídeo (YouTube ou Vimeo)</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className={inputClass}
          />
        </div>

        {/* Author section */}
        <AuthorSelector
          authorName={authorName}
          authorAvatar={authorAvatar}
          authorBio={authorBio}
          authorLinkedin={authorLinkedin}
          authorInstagram={authorInstagram}
          authorEmail={authorEmail}
          onAuthorChange={(name, avatar, bio, linkedin, instagram, email) => {
            setAuthorName(name);
            setAuthorAvatar(avatar);
            setAuthorBio(bio);
            setAuthorLinkedin(linkedin);
            setAuthorInstagram(instagram);
            setAuthorEmail(email);
          }}
          inputClass={inputClass}
          labelClass={labelClass}
        />

        {/* CTA block */}
        <div className="border border-primary-foreground/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setCtaOpen(!ctaOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-primary-foreground/60 font-body text-sm font-medium hover:bg-primary-foreground/5 transition-colors"
          >
            Bloco de CTA / Lead Magnet
            {ctaOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {ctaOpen && (
            <div className="px-4 pb-4 space-y-4">
              <div>
                <label className={labelClass}>Headline</label>
                <input value={ctaHeadline} onChange={(e) => setCtaHeadline(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Subtexto</label>
                <input value={ctaSubtext} onChange={(e) => setCtaSubtext(e.target.value)} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Texto do botão</label>
                  <input value={ctaBtnText} onChange={(e) => setCtaBtnText(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>URL do botão</label>
                  <input value={ctaBtnUrl} onChange={(e) => setCtaBtnUrl(e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Publish toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPublished(!published)}
            className={`relative w-12 h-6 rounded-full transition-colors ${published ? 'bg-primary' : 'bg-primary-foreground/20'}`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-primary-foreground rounded-full transition-transform ${published ? 'left-6' : 'left-0.5'}`}
            />
          </button>
          <span className="font-body text-sm text-primary-foreground/60">
            {published ? 'Publicado' : 'Rascunho'}
          </span>
        </div>
      </div>
    </div>
  );
}
