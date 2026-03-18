import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building, MapPin, Send, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const submissionSchema = z.object({
  facility_name: z.string().trim().min(2, 'Facility name is required').max(200),
  position: z.string().trim().min(2, 'Position title is required').max(200),
  location: z.string().trim().min(2, 'Location is required').max(200),
  description: z.string().trim().min(20, 'Description must be at least 20 characters').max(5000),
  requirements: z.string().trim().max(5000).optional(),
  salary_range: z.string().trim().max(100).optional(),
  how_to_apply: z.string().trim().min(5, 'Application instructions are required').max(2000),
  contact: z.string().trim().min(5, 'Contact information is required').max(500),
});

const SubmitJob = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries()) as Record<string, string>;

    const result = submissionSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from('employer_submissions').insert({
      facility_name: result.data.facility_name,
      position: result.data.position,
      location: result.data.location,
      description: result.data.description,
      requirements: result.data.requirements || null,
      salary_range: result.data.salary_range || null,
      how_to_apply: result.data.how_to_apply,
      contact: result.data.contact,
    });

    setIsSubmitting(false);

    if (error) {
      toast({ title: 'Submission Failed', description: 'Please try again later.', variant: 'destructive' });
      return;
    }

    setIsSubmitted(true);
    toast({ title: 'Job Submitted!', description: 'Your job will be reviewed and published shortly.' });
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Job Submitted - Tuma Job</title>
        </Helmet>
        <Layout>
          <section className="py-20">
            <div className="container max-w-lg text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-accent" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Job Submitted Successfully!</h1>
              <p className="text-muted-foreground mb-8">
                Our team will review your submission and publish it within 24 hours. You'll receive a notification once it's live.
              </p>
              <Button variant="accent" size="lg" onClick={() => setIsSubmitted(false)}>
                Submit Another Job
              </Button>
            </div>
          </section>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Submit a Job - Tuma Job | Post Healthcare Jobs in Kenya</title>
        <meta name="description" content="Post your healthcare job openings on Tuma Job. Reach thousands of qualified healthcare professionals across Kenya. Free job posting." />
      </Helmet>
      <Layout>
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Building className="h-4 w-4" />
                For Employers
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Post a Job on Tuma Job
              </h1>
              <p className="text-lg text-muted-foreground">
                Reach thousands of qualified healthcare professionals across Kenya. All submissions are reviewed before publishing.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-2xl">
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="facility_name">Facility / Company Name *</Label>
                    <Input id="facility_name" name="facility_name" placeholder="e.g. Kenyatta National Hospital" required maxLength={200} />
                    {errors.facility_name && <p className="text-sm text-destructive">{errors.facility_name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Job Title / Position *</Label>
                    <Input id="position" name="position" placeholder="e.g. Registered Nurse" required maxLength={200} />
                    {errors.position && <p className="text-sm text-destructive">{errors.position}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="location" name="location" placeholder="e.g. Nairobi, Kenya" className="pl-9" required maxLength={200} />
                    </div>
                    {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary_range">Salary Range (Optional)</Label>
                    <Input id="salary_range" name="salary_range" placeholder="e.g. Ksh 80,000 - 120,000" maxLength={100} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea id="description" name="description" placeholder="Describe the role, responsibilities, and what the ideal candidate looks like..." rows={5} required maxLength={5000} />
                  {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (Optional)</Label>
                  <Textarea id="requirements" name="requirements" placeholder="List qualifications, experience, and skills required..." rows={4} maxLength={5000} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="how_to_apply">How to Apply *</Label>
                  <Textarea id="how_to_apply" name="how_to_apply" placeholder="e.g. Send CV to careers@hospital.co.ke or apply via WhatsApp..." rows={3} required maxLength={2000} />
                  {errors.how_to_apply && <p className="text-sm text-destructive">{errors.how_to_apply}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information *</Label>
                  <Input id="contact" name="contact" placeholder="e.g. Email: hr@hospital.co.ke, WhatsApp: +254700123456" required maxLength={500} />
                  {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                  <p><strong>Note:</strong> All submissions are reviewed by our team before being published. This typically takes less than 24 hours. We may contact you for verification.</p>
                </div>

                <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Job for Review
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SubmitJob;
