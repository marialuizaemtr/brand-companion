import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '@/services/githubCMS';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!token.trim()) return;
    setLoading(true);
    const valid = await validateToken(token.trim());
    setLoading(false);

    if (valid) {
      sessionStorage.setItem('gh_token', token.trim());
      navigate('/admin/dashboard');
    } else {
      toast.error('Token inválido ou sem permissão no repositório.');
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl p-8">
        <h1 className="font-heading text-2xl text-primary-foreground mb-2 text-center">
          Admin <span className="text-primary">Permarke</span>
        </h1>
        <p className="text-primary-foreground/50 font-body text-sm text-center mb-8">
          Cole seu GitHub Personal Access Token para acessar o painel.
        </p>

        <input
          type="password"
          placeholder="ghp_xxxxxxxxxxxx"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="w-full bg-foreground border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={handleLogin}
          disabled={loading || !token.trim()}
          className="w-full bg-primary text-primary-foreground font-body font-semibold py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Verificando...' : 'Entrar'}
        </button>

        <p className="text-primary-foreground/30 font-body text-xs mt-6 text-center leading-relaxed">
          Gere um token em{' '}
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener"
            className="text-primary hover:underline"
          >
            github.com → Settings → Developer settings → Personal access tokens
          </a>{' '}
          com permissão <code className="text-primary/60">repo</code>.
        </p>
      </div>
    </div>
  );
}
