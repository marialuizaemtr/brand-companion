import { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { uploadBlogImage } from '@/services/imageUpload';

interface ImageUploadButtonProps {
  onUploaded: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
}

export function ImageUploadButton({ onUploaded, folder = 'covers', label = 'Upload', className = '' }: ImageUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadBlogImage(file, folder);
      onUploaded(url);
      toast.success('Imagem enviada!');
    } catch (err: any) {
      toast.error(err.message || 'Erro no upload');
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="hidden" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={`inline-flex items-center gap-2 font-body text-sm px-4 py-2.5 border border-primary-foreground/20 text-primary-foreground rounded-lg hover:bg-primary-foreground/10 disabled:opacity-50 transition-colors ${className}`}
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {uploading ? 'Enviando...' : label}
      </button>
    </>
  );
}
