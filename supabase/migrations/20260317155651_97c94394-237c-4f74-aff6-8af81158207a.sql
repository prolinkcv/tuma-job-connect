
-- Create enums
CREATE TYPE public.job_status AS ENUM ('open', 'urgent', 'closing-soon', 'shortlisting', 'filled');
CREATE TYPE public.job_type AS ENUM ('full-time', 'part-time', 'locum', 'contract', 'internship');
CREATE TYPE public.job_category AS ENUM ('healthcare', 'admin', 'ngo', 'internship', 'locum');
CREATE TYPE public.app_role AS ENUM ('admin');

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  facility TEXT NOT NULL,
  location TEXT NOT NULL,
  county TEXT NOT NULL,
  salary TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  job_type public.job_type NOT NULL DEFAULT 'full-time',
  category public.job_category NOT NULL DEFAULT 'healthcare',
  status public.job_status NOT NULL DEFAULT 'open',
  date_posted TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  closing_date TIMESTAMP WITH TIME ZONE,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  how_to_apply TEXT NOT NULL,
  contact_whatsapp TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create employer_submissions table
CREATE TABLE public.employer_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_name TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  salary_range TEXT,
  contact TEXT NOT NULL,
  how_to_apply TEXT NOT NULL,
  logo_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Jobs policies: anyone can read, only admins can modify
CREATE POLICY "Anyone can view jobs" ON public.jobs
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert jobs" ON public.jobs
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update jobs" ON public.jobs
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete jobs" ON public.jobs
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Employer submissions: only admins can manage
CREATE POLICY "Admins can view submissions" ON public.employer_submissions
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create submissions" ON public.employer_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update submissions" ON public.employer_submissions
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions" ON public.employer_submissions
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- User roles: only admins can view roles
CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR auth.uid() = user_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
