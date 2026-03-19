import { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  name: string;
  type: string;
  profession: string;
  items: string[];
  created_at: string;
}

const AdminTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', type: 'duties', profession: '', items: '' });
  const { toast } = useToast();

  const fetchTemplates = async () => {
    const { data, error } = await supabase.from('job_templates').select('*').order('created_at', { ascending: false });
    if (!error) setTemplates((data || []) as Template[]);
    setLoading(false);
  };

  useEffect(() => { fetchTemplates(); }, []);

  const resetForm = () => {
    setForm({ name: '', type: 'duties', profession: '', items: '' });
    setEditId(null);
  };

  const openEdit = (t: Template) => {
    setForm({ name: t.name, type: t.type, profession: t.profession, items: t.items.join('\n') });
    setEditId(t.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const items = form.items.split('\n').map(s => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
    if (!form.name || !form.profession || items.length === 0) {
      toast({ title: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    const payload = { name: form.name, type: form.type, profession: form.profession, items };

    const { error } = editId
      ? await supabase.from('job_templates').update(payload).eq('id', editId)
      : await supabase.from('job_templates').insert(payload);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: editId ? 'Template updated' : 'Template created' });
      resetForm();
      setDialogOpen(false);
      fetchTemplates();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('job_templates').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Template deleted' });
      fetchTemplates();
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Job Templates</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Template</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editId ? 'Edit Template' : 'New Template'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Template Name</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Registered Nurse" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duties">Duties & Responsibilities</SelectItem>
                      <SelectItem value="requirements">Requirements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Profession</Label>
                  <Input value={form.profession} onChange={e => setForm(f => ({ ...f, profession: e.target.value }))} placeholder="e.g. Nurse" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Items (one per line)</Label>
                <Textarea value={form.items} onChange={e => setForm(f => ({ ...f, items: e.target.value }))} rows={8} placeholder="Enter each item on a new line" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleSave}>{editId ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : templates.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No templates yet. Add your first template.</div>
      ) : (
        <div className="grid gap-4">
          {templates.map(t => (
            <Card key={t.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">{t.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">{t.type === 'duties' ? 'Duties' : 'Requirements'}</Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete template?</AlertDialogTitle>
                          <AlertDialogDescription>This will permanently remove "{t.name}".</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(t.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Profession: {t.profession} · {t.items.length} items</p>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  {t.items.slice(0, 4).map((item, i) => <li key={i}>{item}</li>)}
                  {t.items.length > 4 && <li className="text-xs">+{t.items.length - 4} more...</li>}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTemplates;
