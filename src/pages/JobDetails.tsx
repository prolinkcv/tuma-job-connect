import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, Building, Clock, Calendar, DollarSign, MessageCircle,
  Mail, Phone, Share2, FileText, ArrowLeft, Flag, CheckCircle,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useJob } from '@/hooks/useJobs';

const statusConfig: Record<string, { label: string; className: string; description: string }> = {
  open: { label: 'OPEN', className: 'bg-accent text-accent-foreground', description: 'Accepting applications' },
  urgent: { label: 'URGENT', className: 'bg-urgent text-urgent-foreground', description: 'Hiring immediately' },
  'closing-soon': { label: 'CLOSING SOON', className: 'bg-warning text-warning-foreground', description: 'Apply quickly' },
  shortlisting: { label: 'SHORTLISTING', className: 'bg-primary text-primary-foreground', description: 'Reviewing applications' },
  filled: { label: 'FILLED', className: 'bg-muted text-muted-foreground', description: 'Position filled' },
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { job, loading } = useJob(id);

  if (loading) {
    return (
      <Layout>
        <div className="container py-16 text-center text-muted-foreground">Loading...</div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-8">This job listing may have been removed or expired.</p>
          <Button asChild><Link to="/jobs">Browse All Jobs</Link></Button>
        </div>
      </Layout>
    );
  }

  const status = statusConfig[job.status] || statusConfig.open;
  const isActive = job.status !== 'filled';

  const handleShare = () => {
    const text = `Check out this job: ${job.title} at ${job.facility} - ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleWhatsApp = () => {
    if (job.contact_whatsapp) {
      const message = `Hi, I'm interested in the ${job.title} position at ${job.facility} posted on Tuma Job.`;
      window.open(`https://wa.me/${job.contact_whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <>
      <Helmet>
        <title>{job.title} at {job.facility} - Tuma Job</title>
        <meta name="description" content={`${job.title} job at ${job.facility} in ${job.location}. ${job.salary || 'Competitive salary'}. Apply now on Tuma Job.`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: job.title,
            description: job.description,
            datePosted: job.date_posted,
            validThrough: job.closing_date,
            employmentType: job.job_type.toUpperCase().replace('-', '_'),
            hiringOrganization: { "@type": "Organization", name: job.facility },
            jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "KE" } },
          })}
        </script>
      </Helmet>
      <Layout>
        <div className="border-b border-border bg-background">
          <div className="container py-4">
            <Link to="/jobs" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />Back to Jobs
            </Link>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className={status.className}>{status.label}</Badge>
                  <span className="text-sm text-muted-foreground">{status.description}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2"><Building className="h-5 w-5" /><span className="font-medium">{job.facility}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="h-5 w-5" /><span>{job.location}, Kenya</span></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1"><Clock className="h-4 w-4" /><span className="text-sm">Job Type</span></div>
                  <p className="font-medium text-foreground capitalize">{job.job_type.replace('-', ' ')}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1"><DollarSign className="h-4 w-4" /><span className="text-sm">Salary</span></div>
                  <p className="font-medium text-foreground">{job.salary || 'Negotiable'}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1"><Calendar className="h-4 w-4" /><span className="text-sm">Posted</span></div>
                  <p className="font-medium text-foreground">{new Date(job.date_posted).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                </div>
                {job.closing_date && (
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1"><Calendar className="h-4 w-4" /><span className="text-sm">Closes</span></div>
                    <p className="font-medium text-foreground">{new Date(job.closing_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                  </div>
                )}
              </div>

              <Separator className="my-8" />

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Job Description</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {(job.requirements || []).map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">How to Apply</h2>
                <p className="text-muted-foreground leading-relaxed">{job.how_to_apply}</p>
              </div>

              <div className="text-center pt-8 border-t border-border">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Flag className="h-4 w-4 mr-2" />Report this job
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <h3 className="font-semibold text-foreground mb-4">Apply for this position</h3>
                  <div className="space-y-3 mb-6">
                    {job.contact_whatsapp && (
                      <Button variant="whatsapp" className="w-full" onClick={handleWhatsApp} disabled={!isActive}>
                        <MessageCircle className="h-4 w-4" />Apply via WhatsApp
                      </Button>
                    )}
                    {job.contact_email && (
                      <Button variant="outline" className="w-full" asChild disabled={!isActive}>
                        <a href={`mailto:${job.contact_email}?subject=Application: ${job.title}`}>
                          <Mail className="h-4 w-4" />Send Email
                        </a>
                      </Button>
                    )}
                    {job.contact_phone && (
                      <Button variant="outline" className="w-full" asChild disabled={!isActive}>
                        <a href={`tel:${job.contact_phone}`}><Phone className="h-4 w-4" />Call Now</a>
                      </Button>
                    )}
                  </div>
                  <Separator className="my-4" />
                  <Button variant="ghost" className="w-full" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />Share via WhatsApp
                  </Button>
                </div>

                <div className="bg-accent/10 rounded-xl border border-accent/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Need a Cover Letter?</h3>
                      <p className="text-sm text-muted-foreground">Only Ksh 36</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Generate a professional cover letter tailored to this position in seconds.</p>
                  <Button variant="accent" className="w-full" asChild>
                    <Link to="/cover-letter">Generate Cover Letter</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default JobDetails;
