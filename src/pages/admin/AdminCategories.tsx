import { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
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

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const { toast } = useToast();

  const builtInCategories = [
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'Admin & Office', slug: 'admin' },
    { name: 'NGO', slug: 'ngo' },
    { name: 'Internship', slug: 'internship' },
    { name: 'Locum / Contract', slug: 'locum' },
  ];

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('custom_categories').select('*').order('created_at', { ascending: true });
    if (!error) setCategories((data || []) as Category[]);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const resetForm = () => { setName(''); setEditId(null); };

  const handleSave = async () => {
    if (!name.trim()) {
      toast({ title: 'Name is required', variant: 'destructive' });
      return;
    }
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const payload = { name: name.trim(), slug };
    const { error } = editId
      ? await supabase.from('custom_categories').update(payload).eq('id', editId)
      : await supabase.from('custom_categories').insert(payload);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: editId ? 'Category updated' : 'Category added' });
      resetForm();
      setDialogOpen(false);
      fetchCategories();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('custom_categories').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Category deleted' });
      fetchCategories();
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Job Categories</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? 'Edit Category' : 'New Category'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Category Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Research" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleSave}>{editId ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Built-in Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {builtInCategories.map(c => (
              <Card key={c.slug}>
                <CardContent className="py-4 px-5 flex items-center justify-between">
                  <span className="font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Built-in</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Custom Categories</h2>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No custom categories yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map(c => (
                <Card key={c.id}>
                  <CardContent className="py-4 px-5 flex items-center justify-between">
                    <span className="font-medium text-foreground">{c.name}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setName(c.name); setEditId(c.id); setDialogOpen(true); }}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete category?</AlertDialogTitle>
                            <AlertDialogDescription>This will remove "{c.name}".</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(c.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
