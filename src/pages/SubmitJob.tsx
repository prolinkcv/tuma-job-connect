import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building, MapPin, Send, CheckCircle, CalendarIcon, FileText, ChevronDown } from 'lucide-react';
import { z } from 'zod';
import { format } from 'date-fns';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  type: string;
  profession: string;
  items: string[];
}

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
  const [closingDate, setClosingDate] = useState<Date | undefined>();
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    supabase.from('job_templates').select('*').then(({ data }) => {
      if (data) setTemplates(data as Template[]);
    });
  }, []);

  const dutyTemplates = templates.filter(t => t.type === 'duties');
  const reqTemplates = templates.filter(t => t.type === 'requirements');

  const applyTemplate = (template: Template, field: 'description' | 'requirements') => {
    const text = template.items.map((item, i) => `${i + 1}. ${item}`).join('\n');
    if (field === 'description') {
      setDescription(prev => prev ? `${prev}\n\nDuties and Responsibilities:\n${text}` : `Duties and Responsibilities:\n${text}`);
    } else {
      setRequirements(prev => prev ? `${prev}\n${text}` : text);
    }
    toast({ title: `${template.name} template applied` });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
    // Override with state values
    raw.description = description;
    raw.requirements = requirements;

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
      closing_date: closingDate ? closingDate.toISOString() : null,
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
              <Button variant="accent" size="lg" onClick={() => { setIsSubmitted(false); setDescription(''); setRequirements(''); setClosingDate(undefined); }}>
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

                {/* Application Deadline */}
                <div className="space-y-2">
                  <Label>Application Deadline (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !closingDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {closingDate ? format(closingDate, "PPP") : "Select deadline date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={closingDate}
                        onSelect={setClosingDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Description with template picker */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Job Description & Duties *</Label>
                    {dutyTemplates.length > 0 && (
                      <Select onValueChange={(v) => {
                        const t = dutyTemplates.find(t => t.id === v);
                        if (t) applyTemplate(t, 'description');
                      }}>
                        <SelectTrigger className="w-auto h-8 gap-1 text-xs border-dashed">
                          <FileText className="h-3 w-3" />
                          <SelectValue placeholder="Use template" />
                        </SelectTrigger>
                        <SelectContent>
                          {dutyTemplates.map(t => (
                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the role, responsibilities, and what the ideal candidate looks like..."
                    rows={6}
                    required
                    maxLength={5000}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                </div>

                {/* Requirements with template picker */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requirements">Requirements (Optional)</Label>
                    {reqTemplates.length > 0 && (
                      <Select onValueChange={(v) => {
                        const t = reqTemplates.find(t => t.id === v);
                        if (t) applyTemplate(t, 'requirements');
                      }}>
                        <SelectTrigger className="w-auto h-8 gap-1 text-xs border-dashed">
                          <FileText className="h-3 w-3" />
                          <SelectValue placeholder="Use template" />
                        </SelectTrigger>
                        <SelectContent>
                          {reqTemplates.map(t => (
                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    placeholder="List qualifications, experience, and skills required..."
                    rows={4}
                    maxLength={5000}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                  />
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
