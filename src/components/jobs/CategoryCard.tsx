import { Link } from 'react-router-dom';
import { Heart, Building, Globe, GraduationCap, Clock, LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  count: number;
}

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Building,
  Globe,
  GraduationCap,
  Clock,
};

const CategoryCard = ({ id, name, icon, count }: CategoryCardProps) => {
  const IconComponent = iconMap[icon] || Heart;

  return (
    <Link
      to={`/jobs?category=${id}`}
      className="group flex flex-col items-center p-6 bg-card rounded-xl border border-border transition-all duration-300 hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-1"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <IconComponent className="h-7 w-7 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground text-center mb-1">{name}</h3>
      <p className="text-sm text-muted-foreground">{count} jobs</p>
    </Link>
  );
};

export default CategoryCard;
