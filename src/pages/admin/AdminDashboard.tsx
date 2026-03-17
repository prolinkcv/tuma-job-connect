import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Inbox, Eye, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalJobs: 0, openJobs: 0, totalViews: 0, pendingSubmissions: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [jobsRes, pendingRes] = await Promise.all([
        supabase.from('jobs').select('status, views'),
        supabase.from('employer_submissions').select('id').eq('status', 'pending'),
      ]);

      const jobs = jobsRes.data || [];
      setStats({
        totalJobs: jobs.length,
        openJobs: jobs.filter((j) => j.status !== 'filled').length,
        totalViews: jobs.reduce((sum, j) => sum + (j.views || 0), 0),
        pendingSubmissions: pendingRes.data?.length || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Jobs', value: stats.totalJobs, icon: Briefcase, color: 'text-primary' },
    { label: 'Open Jobs', value: stats.openJobs, icon: TrendingUp, color: 'text-accent' },
    { label: 'Total Views', value: stats.totalViews, icon: Eye, color: 'text-muted-foreground' },
    { label: 'Pending Submissions', value: stats.pendingSubmissions, icon: Inbox, color: 'text-warning' },
  ];

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Button asChild>
          <Link to="/admin/jobs/new">Add New Job</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <card.icon className={`h-5 w-5 ${card.color}`} />
                <span className="text-2xl font-bold text-foreground">{card.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
