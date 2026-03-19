import { Link } from 'react-router-dom';
import { MapPin, Building, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { DbJob } from '@/hooks/useJobs';
import { getJobStatusDisplay, isJobActive } from '@/lib/jobStatus';

interface JobCardProps {
  job: DbJob;
}

const JobCard = ({ job }: JobCardProps) => {
  const status = getJobStatusDisplay(job);
  const isActive = isJobActive(job);

  return (
    <div className={`group relative bg-card rounded-xl border border-border p-5 transition-all duration-300 hover:shadow-card-hover hover:border-primary/20 ${!isActive ? 'opacity-75' : ''}`}>
      <Badge className={`absolute top-4 right-4 ${status.className}`}>
        {status.label}
      </Badge>

      <h3 className="font-semibold text-lg text-foreground mb-2 pr-24 line-clamp-2">
        {job.title}
      </h3>

      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        <Building className="h-4 w-4 flex-shrink-0" />
        <span className="text-sm truncate">{job.facility}</span>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span className="capitalize">{job.job_type.replace('-', ' ')}</span>
        </div>
      </div>

      {job.salary && (
        <p className="text-sm font-medium text-accent mb-4">{job.salary}</p>
      )}

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <Calendar className="h-3.5 w-3.5" />
        <span>Posted {new Date(job.date_posted).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>

      <Button 
        variant={isActive ? 'accent' : 'secondary'} 
        size="sm" 
        className="w-full group-hover:gap-3 transition-all"
        asChild
        disabled={!isActive}
      >
        <Link to={`/jobs/${job.id}`}>
          {isActive ? 'View & Apply' : 'View Details'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
};

export default JobCard;
