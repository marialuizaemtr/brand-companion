import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut } from 'lucide-react';
import { getPostsIndex, deleteFile, saveFile } from '@/services/githubCMS';
import { toast } from 'sonner';
import type { PostMeta } from '@/types/blog';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('gh_token');
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    document.title = 'Admin Dashboard | Permarke';
    loadPosts();
  }, [token, navigate]);

  const loadPosts = async () => {
    setLoading(true);
    const data = await getPostsIndex();
    setPosts(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    setLoading(false);
  };

  const togglePublish = async (post: PostMeta) => {
    if (!token) return;
    try {
      const updatedPosts = posts.map((p) =>
        p.id === post.id ? { ...p, published: !p.published, updated_at: new Date().toISOString() } : p,
      );
      await saveFile('posts-index.json', updatedPosts, token, `Toggle publish: ${post.slug}`);
      setPosts(updatedPosts);
      toast.success(post.published ? 'Post despublicado' : 'Post publicado');
    } catch {
      toast.error('Erro ao alterar status');
    }
  };

  const handleDelete = async (post: PostMeta) => {
    if (!token) return;
    setDeleting(post.id);
    try {
      await deleteFile(`posts/${post.slug}.json`, token, `Delete: ${post.slug}`);
      const updatedPosts = posts.filter((p) => p.id !== post.id);
      await saveFile('posts-index.json', updatedPosts, token, `Remove from index: ${post.slug}`);
      setPosts(updatedPosts);
      toast.success('Post deletado');
    } catch {
      toast.error('Erro ao deletar post');
    }
    setDeleting(null);
  };

  const logout = () => {
    sessionStorage.removeItem('gh_token');
    navigate('/admin/login');
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-foreground text-primary-foreground">
      {/* Top bar */}
      <header className="border-b border-primary-foreground/10 px-4 md:px-8 py-4 flex items-center justify-between">
        <h1 className="font-heading text-xl">
          Admin <span className="text-primary">Permarke</span>
        </h1>
        <div className="flex items-center gap-3">
          <Link
            to="/blog"
            className="text-primary-foreground/50 font-body text-sm hover:text-primary-foreground transition-colors"
          >
            Ver blog
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-primary-foreground/50 hover:text-primary-foreground font-body text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1a1a1a] border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Link
            to="/admin/posts/new"
            className="flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" /> Novo post
          </Link>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-primary-foreground/40 font-body text-center py-12">Carregando...</p>
        ) : (
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-primary-foreground/10 text-left">
                    <th className="px-4 py-3 text-primary-foreground/60 font-medium">Título</th>
                    <th className="px-4 py-3 text-primary-foreground/60 font-medium hidden md:table-cell">Categoria</th>
                    <th className="px-4 py-3 text-primary-foreground/60 font-medium">Status</th>
                    <th className="px-4 py-3 text-primary-foreground/60 font-medium hidden sm:table-cell">Data</th>
                    <th className="px-4 py-3 text-primary-foreground/60 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-primary-foreground/5 hover:bg-primary-foreground/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-primary-foreground font-medium max-w-[200px] truncate">
                        {post.title}
                      </td>
                      <td className="px-4 py-3 text-primary-foreground/60 hidden md:table-cell">
                        {post.category}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            post.published
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-primary-foreground/10 text-primary-foreground/40'
                          }`}
                        >
                          {post.published ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-primary-foreground/40 hidden sm:table-cell">
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/admin/posts/${post.slug}/edit`}
                            className="p-2 text-primary-foreground/40 hover:text-primary transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => togglePublish(post)}
                            className="p-2 text-primary-foreground/40 hover:text-primary transition-colors"
                            title={post.published ? 'Despublicar' : 'Publicar'}
                          >
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Deletar "${post.title}"?`)) handleDelete(post);
                            }}
                            disabled={deleting === post.id}
                            className="p-2 text-primary-foreground/40 hover:text-red-400 transition-colors disabled:opacity-30"
                            title="Deletar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-primary-foreground/30">
                        Nenhum post encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
