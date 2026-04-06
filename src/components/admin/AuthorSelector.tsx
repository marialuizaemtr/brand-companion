import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAuthors, saveAuthors, type AuthorProfile } from '@/services/githubCMS';
import { ImageUploadButton } from '@/components/admin/ImageUploadButton';
import { toast } from 'sonner';

interface AuthorSelectorProps {
  authorName: string;
  authorAvatar: string;
  authorBio: string;
  onAuthorChange: (name: string, avatar: string, bio: string) => void;
  inputClass: string;
  labelClass: string;
}

export function AuthorSelector({
  authorName,
  authorAvatar,
  authorBio,
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
    if (id === '') {
      onAuthorChange('', '', '');
      return;
    }
    if (id === '__new__') {
      onAuthorChange('', '', '');
      return;
    }
    const author = authors.find((a) => a.id === id);
    if (author) {
      onAuthorChange(author.name, author.avatar_url, author.bio);
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
            ? { ...a, name: authorName.trim(), avatar_url: authorAvatar.trim(), bio: authorBio.trim() }
            : a
        );
      } else {
        const newAuthor: AuthorProfile = {
          id: uuidv4(),
          name: authorName.trim(),
          avatar_url: authorAvatar.trim(),
          bio: authorBio.trim(),
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

  return (
    <div className="border border-primary-foreground/10 rounded-xl p-4 space-y-4">
      <p className="text-primary-foreground/60 font-body text-sm font-medium">Autor(a)</p>

      {/* Author selector */}
      <div>
        <label className={labelClass}>Selecionar autor existente</label>
        <select
          value={selectedId}
          onChange={(e) => handleSelect(e.target.value)}
          className={inputClass}
        >
          <option value="">— Nenhum —</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
          <option value="__new__">+ Novo autor</option>
        </select>
      </div>

      {/* Author fields */}
      {(selectedId === '__new__' || selectedId) && selectedId !== '' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nome</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => onAuthorChange(e.target.value, authorAvatar, authorBio)}
                placeholder="Maria Luiza"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Foto do autor(a)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="url"
                  value={authorAvatar}
                  onChange={(e) => onAuthorChange(authorName, e.target.value, authorBio)}
                  placeholder="URL ou faça upload"
                  className={inputClass}
                />
                <ImageUploadButton
                  onUploaded={(url) => onAuthorChange(authorName, url, authorBio)}
                  folder="authors"
                  label="Upload"
                />
                {authorAvatar && (
                  <img
                    src={authorAvatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <label className={labelClass}>Mini bio</label>
            <textarea
              value={authorBio}
              onChange={(e) => onAuthorChange(authorName, authorAvatar, e.target.value)}
              rows={2}
              placeholder="Especialista em propriedade intelectual..."
              className={inputClass + ' resize-none'}
            />
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
