import { Linkedin, Instagram, Mail } from 'lucide-react';
import type { PostAuthor } from '@/types/blog';

interface AuthorBoxProps {
  author: PostAuthor;
}

export function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <div className="flex items-start gap-4 bg-muted/50 rounded-2xl p-5 md:p-6 mt-10 border border-border">
      {author.avatar_url && (
        <img
          src={author.avatar_url}
          alt={author.name}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />
      )}
      <div>
        <p className="font-heading font-bold text-foreground text-base">{author.name}</p>
        <p className="font-body text-muted-foreground text-sm mt-1 leading-relaxed">{author.bio}</p>
        <div className="flex items-center gap-3 mt-2">
          {author.linkedin_url && (
            <a href={author.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {author.instagram_url && (
            <a href={author.instagram_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {author.email && (
            <a href={`mailto:${author.email}`} className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
