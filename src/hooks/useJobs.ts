import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type DbJob = Tables<'jobs'>;

export const useJobs = () => {
  const [jobs, setJobs] = useState<DbJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .order('date_posted', { ascending: false });
      setJobs(data || []);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return { jobs, loading };
};

export const useJob = (id: string | undefined) => {
  const [job, setJob] = useState<DbJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    const fetchJob = async () => {
      const { data } = await supabase.from('jobs').select('*').eq('id', id).single();
      setJob(data);
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  return { job, loading };
};
