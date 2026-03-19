import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { isJobActive } from '@/lib/jobStatus';
import { Filter, X, EyeOff, Eye } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import JobCard from '@/components/jobs/JobCard';
import JobSearch from '@/components/jobs/JobSearch';
import AdPlaceholder from '@/components/ads/AdPlaceholder';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { categories, counties } from '@/data/jobs';
import { useJobs } from '@/hooks/useJobs';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [showExpired, setShowExpired] = useState(false);
  const { jobs, loading } = useJobs();

  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const facility = searchParams.get('facility') || '';
  const category = searchParams.get('category') || '';
  const county = searchParams.get('county') || '';
  const jobType = searchParams.get('type') || '';

  const handleSearch = (newQuery: string, newLocation: string, newFacility: string) => {
    const params = new URLSearchParams(searchParams);
    if (newQuery) params.set('q', newQuery); else params.delete('q');
    if (newLocation) params.set('location', newLocation); else params.delete('location');
    if (newFacility) params.set('facility', newFacility); else params.delete('facility');
    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') params.set(key, value); else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (!showExpired && !isJobActive(job)) return false;
      if (query) {
        const s = query.toLowerCase();
        if (!job.title.toLowerCase().includes(s) && !job.description.toLowerCase().includes(s) && !job.facility.toLowerCase().includes(s)) return false;
      }
      if (location && !job.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (facility && !job.facility.toLowerCase().includes(facility.toLowerCase())) return false;
      if (category && job.category !== category) return false;
      if (county && job.county !== county) return false;
      if (jobType && job.job_type !== jobType) return false;
      return true;
    });
  }, [jobs, query, location, facility, category, county, jobType, showExpired]);

  const hasActiveFilters = query || location || facility || category || county || jobType;

  return (
    <>
      <Helmet>
        <title>Browse Jobs - Tuma Job | Healthcare Jobs in Kenya</title>
        <meta name="description" content="Browse verified healthcare job listings in Kenya. Filter by category, location, and job type. Apply easily via WhatsApp." />
      </Helmet>
      <Layout>
        <section className="bg-gradient-to-b from-primary/5 to-background py-8 md:py-12">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Browse Jobs</h1>
              <p className="text-muted-foreground text-lg">
                Find your next opportunity from {jobs.length}+ verified listings
              </p>
            </div>
          </div>
        </section>

        <section className="py-6 border-b border-border bg-background sticky top-16 z-40">
          <div className="container">
            <div className="flex flex-col gap-4">
              <JobSearch onSearch={handleSearch} variant="compact" />
              <div className="flex items-center justify-between md:hidden">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4 mr-2" />Filters
                  {hasActiveFilters && <Badge variant="secondary" className="ml-2">Active</Badge>}
                </Button>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}><X className="h-4 w-4 mr-1" />Clear</Button>
                )}
              </div>
              <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
                <Select value={category || 'all'} onValueChange={(v) => handleFilterChange('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={county || 'all'} onValueChange={(v) => handleFilterChange('county', v)}>
                  <SelectTrigger><SelectValue placeholder="County" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Counties</SelectItem>
                    {counties.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={jobType || 'all'} onValueChange={(v) => handleFilterChange('type', v)}>
                  <SelectTrigger><SelectValue placeholder="Job Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="locum">Locum</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="hidden md:flex">
                    <X className="h-4 w-4 mr-2" />Clear Filters
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
                <Button
                  variant={showExpired ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setShowExpired(!showExpired)}
                  className="gap-2 text-xs"
                >
                  {showExpired ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  {showExpired ? 'Showing expired jobs' : 'Expired jobs hidden'}
                </Button>
              </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
              {hasActiveFilters && ' (filtered)'}
            </p>
            {loading ? (
              <div className="text-center py-16 text-muted-foreground">Loading jobs...</div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, index) => (
                  <React.Fragment key={job.id}>
                    <div className="animate-fade-in-up" style={{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }}>
                      <JobCard job={job} />
                    </div>
                    {index === 5 && (
                      <div className="md:col-span-2 lg:col-span-3">
                        <AdPlaceholder format="in-feed" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">No jobs found matching your criteria</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Jobs;
