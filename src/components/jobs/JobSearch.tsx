import { useState } from 'react';
import { Search, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface JobSearchProps {
  onSearch: (query: string, location: string, facility: string) => void;
  variant?: 'hero' | 'compact';
}

const JobSearch = ({ onSearch, variant = 'hero' }: JobSearchProps) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [facility, setFacility] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location, facility);
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" variant="accent">
          Search
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-card rounded-xl shadow-lg border border-border p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Job Title */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Job title or keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-11 h-12 text-base"
            />
          </div>

          {/* Facility */}
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Facility"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              className="pl-11 h-12 text-base"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-11 h-12 text-base"
            />
          </div>
        </div>

        <Button type="submit" variant="accent" size="xl" className="w-full mt-4">
          <Search className="h-5 w-5 mr-2" />
          Find Jobs
        </Button>
      </div>
    </form>
  );
};

export default JobSearch;
