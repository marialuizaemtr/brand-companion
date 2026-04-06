import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAuthors, saveAuthors, type AuthorProfile } from '@/services/githubCMS';
import { ImageUploadButton } from '@/components/admin/ImageUploadButton';
import { toast } from 'sonner';

interface AuthorSelectorProps {
  authorName: string;
  authorAvatar: string;
  authorBio: string;
  authorLinkedin: string;
  authorInstagram: string;
  authorEmail: string;
  onAuthorChange: (name: string, avatar: string, bio: string, linkedin: string, instagram: string, email: string) => void;
  inputClass: string;
  labelClass: string;
}

export function AuthorSelector({
  authorName,
  authorAvatar,
  authorBio,
  authorLinkedin,
  authorInstagram,
  authorEmail,
  onAuthorChange,
  inputClass,
  labelClass,
}: AuthorSelectorProps) {
  const [authors, setAuthors] = useState<AuthorProfile[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (id === '' || id === '__new__') {
      onAuthorChange('', '', '', '', '', '');
      return;
    }
    const author = authors.find((a) => a.id === id);
    if (author) {
      onAuthorChange(author.name, author.avatar_url, author.bio, author.linkedin_url || '', author.instagram_url || '', author.email || '');
    }
  };

  const handleSaveProfile = async () => {
    const token = sessionStorage.getItem('gh_token');
    if (!token || !authorName.trim()) {
      toast.error('Nome do autor é obrigatório');
      return;
    }
    setSaving(true);
    try {
      const existing = authors.find((a) => a.id === selectedId);
      let updated: AuthorProfile[];
      if (existing) {
        updated = authors.map((a) =>
          a.id === selectedId
            ? { ...a, name: authorName.trim(), avatar_url: authorAvatar.trim(), bio: authorBio.trim(), linkedin_url: authorLinkedin.trim(), instagram_url: authorInstagram.trim(), email: authorEmail.trim() }
            : a
        );
      } else {
        const newAuthor: AuthorProfile = {
          id: uuidv4(),
          name: authorName.trim(),
          avatar_url: authorAvatar.trim(),
          bio: authorBio.trim(),
          linkedin_url: authorLinkedin.trim(),
          instagram_url: authorInstagram.trim(),
          email: authorEmail.trim(),
        };
        updated = [...authors, newAuthor];
        setSelectedId(newAuthor.id);
      }
      await saveAuthors(updated, token);
      setAuthors(updated);
      toast.success('Perfil de autor salvo!');
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar autor');
    }
    setSaving(false);
  };

  const isNew = selectedId === '__new__' || (selectedId === '' && authorName.trim());

  const update = (field: string, value: string) => {
    const vals = { name: authorName, avatar: authorAvatar, bio: authorBio, linkedin: authorLinkedin, instagram: authorInstagram, email: authorEmail, [field]: value };
    onAuthorChange(vals.name, vals.avatar, vals.bio, vals.linkedin, vals.instagram, vals.email);
  };

  return (
    <div className="border border-primary-foreground/10 rounded-xl p-4 space-y-4">
      <p className="text-primary-foreground/60 font-body text-sm font-medium">Autor(a)</p>

      <div>
        <label className={labelClass}>Selecionar autor existente</label>
        <select value={selectedId} onChange={(e) => handleSelect(e.target.value)} className={inputClass}>
          <option value="">— Nenhum —</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
          <option value="__new__">+ Novo autor</option>
        </select>
      </div>

      {(selectedId === '__new__' || selectedId) && selectedId !== '' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nome</label>
              <input type="text" value={authorName} onChange={(e) => update('name', e.target.value)} placeholder="Maria Luiza" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Foto do autor(a)</label>
              <div className="flex gap-2 items-center">
                <input type="url" value={authorAvatar} onChange={(e) => update('avatar', e.target.value)} placeholder="URL ou faça upload" className={inputClass} />
                <ImageUploadButton onUploaded={(url) => update('avatar', url)} folder="authors" label="Upload" />
                {authorAvatar && <img src={authorAvatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />}
              </div>
            </div>
          </div>
          <div>
            <label className={labelClass}>Mini bio</label>
            <textarea value={authorBio} onChange={(e) => update('bio', e.target.value)} rows={2} placeholder="Especialista em propriedade intelectual..." className={inputClass + ' resize-none'} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>LinkedIn</label>
              <input type="url" value={authorLinkedin} onChange={(e) => update('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Instagram</label>
              <input type="url" value={authorInstagram} onChange={(e) => update('instagram', e.target.value)} placeholder="https://instagram.com/..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>E-mail</label>
              <input type="email" value={authorEmail} onChange={(e) => update('email', e.target.value)} placeholder="email@exemplo.com" className={inputClass} />
            </div>
          </div>
          <button
            onClick={handleSaveProfile}
            disabled={saving || !authorName.trim()}
            className="font-body text-xs px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Salvando...' : isNew ? 'Salvar novo perfil' : 'Atualizar perfil'}
          </button>
        </>
      )}
    </div>
  );
}
