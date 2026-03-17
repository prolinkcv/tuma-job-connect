import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { counties } from '@/data/jobs';

const AdminJobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    facility: '',
    location: '',
    county: '',
    salary: '',
    salary_min: '',
    salary_max: '',
    job_type: 'full-time' as string,
    category: 'healthcare' as string,
    status: 'open' as string,
    closing_date: '',
    description: '',
    requirements: '',
    how_to_apply: '',
    contact_whatsapp: '',
    contact_email: '',
    contact_phone: '',
  });

  useEffect(() => {
    if (isEdit) {
      supabase.from('jobs').select('*').eq('id', id).single().then(({ data, error }) => {
        if (error || !data) {
          toast({ title: 'Job not found', variant: 'destructive' });
          navigate('/admin/jobs');
          return;
        }
        setForm({
          title: data.title,
          facility: data.facility,
          location: data.location,
          county: data.county,
          salary: data.salary || '',
          salary_min: data.salary_min?.toString() || '',
          salary_max: data.salary_max?.toString() || '',
          job_type: data.job_type,
          category: data.category,
          status: data.status,
          closing_date: data.closing_date ? data.closing_date.split('T')[0] : '',
          description: data.description,
          requirements: (data.requirements || []).join('\n'),
          how_to_apply: data.how_to_apply,
          contact_whatsapp: data.contact_whatsapp || '',
          contact_email: data.contact_email || '',
          contact_phone: data.contact_phone || '',
        });
      });
    }
  }, [id]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      facility: form.facility,
      location: form.location,
      county: form.county,
      salary: form.salary || null,
      salary_min: form.salary_min ? parseInt(form.salary_min) : null,
      salary_max: form.salary_max ? parseInt(form.salary_max) : null,
      job_type: form.job_type as any,
      category: form.category as any,
      status: form.status as any,
      closing_date: form.closing_date || null,
      description: form.description,
      requirements: form.requirements.split('\n').filter(Boolean),
      how_to_apply: form.how_to_apply,
      contact_whatsapp: form.contact_whatsapp || null,
      contact_email: form.contact_email || null,
      contact_phone: form.contact_phone || null,
    };

    const { error } = isEdit
      ? await supabase.from('jobs').update(payload).eq('id', id)
      : await supabase.from('jobs').insert(payload);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: isEdit ? 'Job updated' : 'Job created' });
      navigate('/admin/jobs');
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/jobs')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          {isEdit ? 'Edit Job' : 'Add New Job'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Basic Information</h2>

          <div className="space-y-2">
            <Label>Job Title *</Label>
            <Input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Facility *</Label>
              <Input value={form.facility} onChange={(e) => handleChange('facility', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Location *</Label>
              <Input value={form.location} onChange={(e) => handleChange('location', e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>County *</Label>
              <Select value={form.county} onValueChange={(v) => handleChange('county', v)}>
                <SelectTrigger><SelectValue placeholder="Select county" /></SelectTrigger>
                <SelectContent>
                  {counties.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => handleChange('category', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="admin">Admin & Office</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="locum">Locum / Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Select value={form.job_type} onValueChange={(v) => handleChange('job_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="locum">Locum</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Salary & Dates</h2>

          <div className="space-y-2">
            <Label>Salary (display text)</Label>
            <Input value={form.salary} onChange={(e) => handleChange('salary', e.target.value)} placeholder="e.g. Ksh 85,000 - 120,000" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Min Salary (Ksh)</Label>
              <Input type="number" value={form.salary_min} onChange={(e) => handleChange('salary_min', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Max Salary (Ksh)</Label>
              <Input type="number" value={form.salary_max} onChange={(e) => handleChange('salary_max', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Closing Date</Label>
              <Input type="date" value={form.closing_date} onChange={(e) => handleChange('closing_date', e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => handleChange('status', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="closing-soon">Closing Soon</SelectItem>
                <SelectItem value="shortlisting">Shortlisting</SelectItem>
                <SelectItem value="filled">Filled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Details</h2>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={5} required />
          </div>

          <div className="space-y-2">
            <Label>Requirements (one per line) *</Label>
            <Textarea value={form.requirements} onChange={(e) => handleChange('requirements', e.target.value)} rows={5} required placeholder="One requirement per line" />
          </div>

          <div className="space-y-2">
            <Label>How to Apply *</Label>
            <Textarea value={form.how_to_apply} onChange={(e) => handleChange('how_to_apply', e.target.value)} rows={3} required />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input value={form.contact_whatsapp} onChange={(e) => handleChange('contact_whatsapp', e.target.value)} placeholder="+254..." />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={form.contact_email} onChange={(e) => handleChange('contact_email', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={form.contact_phone} onChange={(e) => handleChange('contact_phone', e.target.value)} placeholder="+254..." />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Job' : 'Create Job'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/jobs')}>
            Cancel
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminJobForm;
