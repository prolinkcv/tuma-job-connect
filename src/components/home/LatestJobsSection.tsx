import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JobCard from '@/components/jobs/JobCard';
import { useJobs } from '@/hooks/useJobs';

const LatestJobsSection = () => {
  const { jobs, loading } = useJobs();

  const latestJobs = [...jobs]
    .sort((a, b) => new Date(b.date_posted).getTime() - new Date(a.date_posted).getTime())
    .slice(0, 6);

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Latest Jobs</h2>
            <p className="text-muted-foreground">Fresh opportunities added today</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/jobs" className="gap-2">
              View All Jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading jobs...</div>
        ) : latestJobs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No jobs available yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.map((job, index) => (
              <div
                key={job.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button variant="accent" size="lg" asChild>
            <Link to="/jobs" className="gap-2">
              Browse All Jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestJobsSection;
