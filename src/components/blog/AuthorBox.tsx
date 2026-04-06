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
      </div>
    </div>
  );
}
