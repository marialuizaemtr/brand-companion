import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '@/services/githubCMS';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    const existing = sessionStorage.getItem('gh_token');
    if (existing) {
      navigate('/admin/dashboard');
      return;
    }

    // Auto-fetch token from backend
    autoLogin();
  }, []);

  const autoLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('github-token');

      if (error || !data?.token) {
        toast.error('Não foi possível obter o token automaticamente.');
        setLoading(false);
        return;
      }

      const valid = await validateToken(data.token);
      if (valid) {
        sessionStorage.setItem('gh_token', data.token);
        toast.success('Autenticado com sucesso!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Token do backend é inválido ou sem permissão no repositório.');
        setLoading(false);
      }
    } catch {
      toast.error('Erro ao conectar com o backend.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl p-8 text-center">
        <h1 className="font-heading text-2xl text-primary-foreground mb-2">
          Admin <span className="text-primary">Permarke</span>
        </h1>

        {loading ? (
          <div className="py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-primary-foreground/50 font-body text-sm">
              Autenticando automaticamente...
            </p>
          </div>
        ) : (
          <div className="py-8">
            <p className="text-primary-foreground/50 font-body text-sm mb-4">
              Falha na autenticação automática.
            </p>
            <button
              onClick={autoLogin}
              className="bg-primary text-primary-foreground font-body font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
