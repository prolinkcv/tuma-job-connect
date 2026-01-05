import CategoryCard from '@/components/jobs/CategoryCard';
import { categories } from '@/data/jobs';

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find opportunities that match your skills and interests
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
