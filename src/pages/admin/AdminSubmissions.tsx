import { useEffect, useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type Submission = Tables<'employer_submissions'>;

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('employer_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (!error) setSubmissions(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const handleReview = async (id: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('employer_submissions')
      .update({ status, reviewed_by: user?.id, reviewed_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: `Submission ${status}` });
      fetchSubmissions();
    }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-warning text-warning-foreground',
      approved: 'bg-accent text-accent-foreground',
      rejected: 'bg-destructive text-destructive-foreground',
    };
    return <Badge className={map[status] || ''}>{status.toUpperCase()}</Badge>;
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Employer Submissions</h1>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No submissions yet</div>
      ) : (
        <div className="grid gap-4">
          {submissions.map((sub) => (
            <Card key={sub.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{sub.position}</CardTitle>
                  {statusBadge(sub.status)}
                </div>
                <p className="text-sm text-muted-foreground">{sub.facility_name} — {sub.location}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{sub.description}</p>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{sub.position}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3 text-sm">
                        <div><strong>Facility:</strong> {sub.facility_name}</div>
                        <div><strong>Location:</strong> {sub.location}</div>
                        <div><strong>Salary:</strong> {sub.salary_range || 'Not specified'}</div>
                        <div><strong>Contact:</strong> {sub.contact}</div>
                        <div><strong>Description:</strong><p className="mt-1 text-muted-foreground whitespace-pre-line">{sub.description}</p></div>
                        {sub.requirements && <div><strong>Requirements:</strong><p className="mt-1 text-muted-foreground whitespace-pre-line">{sub.requirements}</p></div>}
                        <div><strong>How to Apply:</strong><p className="mt-1 text-muted-foreground">{sub.how_to_apply}</p></div>
                        <div><strong>Submitted:</strong> {new Date(sub.submitted_at).toLocaleDateString()}</div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {sub.status === 'pending' && (
                    <>
                      <Button size="sm" variant="accent" onClick={() => handleReview(sub.id, 'approved')}>
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReview(sub.id, 'rejected')}>
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSubmissions;
