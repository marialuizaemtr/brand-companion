import type { Post, PostMeta } from '@/types/blog';

const OWNER = import.meta.env.VITE_GITHUB_OWNER || '';
const REPO = import.meta.env.VITE_GITHUB_REPO || '';

const RAW_BASE = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/src/data`;
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents/src/data`;

// ── Public reads (no token) ──

export async function getPostsIndex(): Promise<PostMeta[]> {
  const res = await fetch(`${RAW_BASE}/posts-index.json?t=${Date.now()}`);
  if (!res.ok) return [];
  return res.json();
}

export async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${RAW_BASE}/posts/${slug}.json?t=${Date.now()}`);
  if (!res.ok) return null;
  return res.json();
}

// ── Admin writes (require token) ──

async function getFileSha(path: string, token: string): Promise<string | null> {
  const res = await fetch(`${API_BASE}/${path}`, {
    headers: { Authorization: `token ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha;
}

export async function saveFile(
  path: string,
  content: object,
  token: string,
  message: string,
): Promise<void> {
  const sha = await getFileSha(path, token);
  const body: Record<string, unknown> = {
    message,
    content: btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2)))),
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${API_BASE}/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Erro ao salvar arquivo');
  }
}

export async function deleteFile(
  path: string,
  token: string,
  message: string,
): Promise<void> {
  const sha = await getFileSha(path, token);
  if (!sha) throw new Error('Arquivo não encontrado');

  const res = await fetch(`${API_BASE}/${path}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, sha }),
  });
  if (!res.ok) throw new Error('Erro ao deletar arquivo');
}

export async function validateToken(token: string): Promise<boolean> {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
    headers: { Authorization: `token ${token}` },
  });
  return res.ok;
}

// ── Helpers ──

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
