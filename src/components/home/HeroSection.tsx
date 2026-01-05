import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import JobSearch from '@/components/jobs/JobSearch';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string, location: string, facility: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    if (facility) params.set('facility', facility);
    navigate(`/jobs?${params.toString()}`);
  };

  const trustPoints = [
    'Verified Jobs',
    'Updated Daily',
    'Easy Applications',
  ];

  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
            <CheckCircle className="h-4 w-4" />
            Jobs Made Simple
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Find Your Next
            <span className="text-primary"> Healthcare Job</span>
            <br className="hidden md:block" /> in Kenya
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Browse verified job opportunities from hospitals, clinics, and healthcare facilities across Kenya. Updated daily.
          </p>

          {/* Trust Points */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-sm md:text-base">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <JobSearch onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
