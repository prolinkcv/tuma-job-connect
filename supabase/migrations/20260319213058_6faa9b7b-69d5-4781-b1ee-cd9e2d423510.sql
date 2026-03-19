
-- Add closing_date to employer_submissions
ALTER TABLE public.employer_submissions ADD COLUMN IF NOT EXISTS closing_date timestamp with time zone;

-- Create job templates table for duties and requirements
CREATE TABLE public.job_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('duties', 'requirements')),
  profession text NOT NULL,
  items text[] NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.job_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view templates" ON public.job_templates FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage templates" ON public.job_templates FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create custom categories table
CREATE TABLE public.custom_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories" ON public.custom_categories FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage categories" ON public.custom_categories FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed some default duty templates
INSERT INTO public.job_templates (name, type, profession, items) VALUES
('Registered Nurse', 'duties', 'Registered Nurse', ARRAY[
  'Assess, plan, implement and evaluate nursing care for patients',
  'Administer medications and treatments as prescribed',
  'Monitor and record patient vital signs and symptoms',
  'Collaborate with physicians and multidisciplinary teams',
  'Educate patients and families on health management',
  'Maintain accurate and up-to-date patient records',
  'Ensure compliance with infection control protocols',
  'Participate in quality improvement initiatives'
]),
('Clinical Officer', 'duties', 'Clinical Officer', ARRAY[
  'Diagnose and treat common medical conditions',
  'Prescribe medications and therapeutic interventions',
  'Perform minor surgical procedures',
  'Refer complex cases to specialist care',
  'Conduct patient assessments and physical examinations',
  'Maintain accurate clinical records and documentation',
  'Participate in community health outreach programs',
  'Supervise and mentor clinical officer interns'
]),
('Pharmacist', 'duties', 'Pharmacist', ARRAY[
  'Dispense medications accurately and counsel patients',
  'Review prescriptions for drug interactions and contraindications',
  'Manage pharmacy inventory and procurement',
  'Ensure compliance with pharmaceutical regulations',
  'Provide drug information to healthcare professionals',
  'Supervise pharmacy technologists and interns',
  'Conduct medication therapy management',
  'Maintain proper storage of pharmaceutical products'
]),
('Lab Technologist', 'duties', 'Laboratory Technologist', ARRAY[
  'Collect, process and analyze laboratory specimens',
  'Perform diagnostic tests including hematology, biochemistry and microbiology',
  'Calibrate and maintain laboratory equipment',
  'Ensure quality control in all laboratory procedures',
  'Record and report test results accurately',
  'Adhere to biosafety and waste management protocols',
  'Participate in proficiency testing programs',
  'Maintain laboratory inventory and supplies'
]),
('Registered Nurse', 'requirements', 'Registered Nurse', ARRAY[
  'Diploma or Degree in Nursing from a recognized institution',
  'Valid practicing license from the Nursing Council of Kenya',
  'At least 2 years of clinical experience',
  'BLS/ACLS certification preferred',
  'Strong communication and interpersonal skills',
  'Ability to work in a fast-paced environment'
]),
('Clinical Officer', 'requirements', 'Clinical Officer', ARRAY[
  'Diploma or Higher Diploma in Clinical Medicine',
  'Valid practicing license from the Clinical Officers Council',
  'At least 2 years of clinical experience',
  'Experience in emergency medicine is an advantage',
  'Good interpersonal and communication skills'
]),
('Pharmacist', 'requirements', 'Pharmacist', ARRAY[
  'Bachelor of Pharmacy degree from a recognized institution',
  'Valid practicing license from the Pharmacy and Poisons Board',
  'At least 1 year of pharmacy practice experience',
  'Knowledge of pharmaceutical supply chain management',
  'Proficiency in pharmacy information systems'
]),
('Lab Technologist', 'requirements', 'Laboratory Technologist', ARRAY[
  'Diploma or Degree in Medical Laboratory Sciences',
  'Valid registration with KMLTTB',
  'At least 2 years of laboratory experience',
  'Proficiency in laboratory information systems',
  'Knowledge of quality management systems'
]);
