interface AdPlaceholderProps {
  format?: 'banner' | 'sidebar' | 'in-feed';
  className?: string;
}

const sizeMap = {
  banner: 'h-24 md:h-28',
  sidebar: 'h-64',
  'in-feed': 'h-24',
};

const AdPlaceholder = ({ format = 'banner', className = '' }: AdPlaceholderProps) => {
  return (
    <div
      className={`w-full rounded-lg border border-dashed border-border bg-muted/30 flex items-center justify-center ${sizeMap[format]} ${className}`}
      aria-label="Advertisement"
    >
      <span className="text-xs text-muted-foreground/50 uppercase tracking-widest select-none">
        Advertisement
      </span>
    </div>
  );
};

export default AdPlaceholder;
