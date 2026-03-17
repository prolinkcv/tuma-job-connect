import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Job = Tables<'jobs'>;

const statusColors: Record<string, string> = {
  open: 'bg-accent text-accent-foreground',
  urgent: 'bg-urgent text-urgent-foreground',
  'closing-soon': 'bg-warning text-warning-foreground',
  shortlisting: 'bg-primary text-primary-foreground',
  filled: 'bg-muted text-muted-foreground',
};

const AdminJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('date_posted', { ascending: false });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('jobs').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Job deleted' });
      fetchJobs();
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase.from('jobs').update({ status: status as Job['status'] }).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      fetchJobs();
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Jobs</h1>
        <Button asChild>
          <Link to="/admin/jobs/new" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Job
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No jobs yet</p>
          <Button asChild><Link to="/admin/jobs/new">Add your first job</Link></Button>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Facility</TableHead>
                <TableHead className="hidden lg:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.facility}</TableCell>
                  <TableCell className="hidden lg:table-cell">{job.location}</TableCell>
                  <TableCell>
                    <Select value={job.status} onValueChange={(v) => handleStatusChange(job.id, v)}>
                      <SelectTrigger className="w-[140px] h-8">
                        <Badge className={`${statusColors[job.status]} text-xs`}>
                          {job.status.toUpperCase()}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="closing-soon">Closing Soon</SelectItem>
                        <SelectItem value="shortlisting">Shortlisting</SelectItem>
                        <SelectItem value="filled">Filled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-3.5 w-3.5" />
                      {job.views}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/jobs/${job.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this job?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove "{job.title}" from the listings.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(job.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminJobs;
