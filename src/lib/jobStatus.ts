import type { DbJob } from '@/hooks/useJobs';

export interface JobStatusDisplay {
  label: string;
  className: string;
  description: string;
}

export const getJobStatusDisplay = (job: DbJob): JobStatusDisplay => {
  // Position filled takes highest priority
  if (job.status === 'filled') {
    return {
      label: 'POSITION FILLED',
      className: 'bg-muted text-muted-foreground',
      description: 'This position has been filled',
    };
  }

  // Check deadline expiry
  if (job.closing_date) {
    const now = new Date();
    const deadline = new Date(job.closing_date);
    const diffMs = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return {
        label: 'JOB EXPIRED',
        className: 'bg-muted text-muted-foreground',
        description: 'Application deadline has passed',
      };
    }

    if (diffDays === 1) {
      return {
        label: 'EXPIRES TOMORROW',
        className: 'bg-urgent text-urgent-foreground animate-pulse-gentle',
        description: 'Last day to apply!',
      };
    }

    if (diffDays <= 3) {
      return {
        label: `EXPIRES IN ${diffDays} DAYS`,
        className: 'bg-urgent text-urgent-foreground animate-pulse-gentle',
        description: `Only ${diffDays} days left to apply`,
      };
    }

    if (diffDays <= 7) {
      return {
        label: `EXPIRES IN ${diffDays} DAYS`,
        className: 'bg-warning text-warning-foreground',
        description: `${diffDays} days left to apply`,
      };
    }
  }

  // Fall back to regular status
  const statusMap: Record<string, JobStatusDisplay> = {
    open: { label: 'OPEN', className: 'bg-accent text-accent-foreground', description: 'Accepting applications' },
    urgent: { label: 'URGENT', className: 'bg-urgent text-urgent-foreground animate-pulse-gentle', description: 'Hiring immediately' },
    'closing-soon': { label: 'CLOSING SOON', className: 'bg-warning text-warning-foreground', description: 'Apply quickly' },
    shortlisting: { label: 'SHORTLISTING', className: 'bg-primary text-primary-foreground', description: 'Reviewing applications' },
  };

  return statusMap[job.status] || statusMap.open;
};

export const isJobActive = (job: DbJob): boolean => {
  if (job.status === 'filled') return false;
  if (job.closing_date) {
    const diffMs = new Date(job.closing_date).getTime() - Date.now();
    if (diffMs <= 0) return false;
  }
  return true;
};
