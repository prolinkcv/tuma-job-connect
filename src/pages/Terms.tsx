import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Tuma Job</title>
      </Helmet>
      <Layout>
        <div className="container py-12 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using Tuma Job, you agree to be bound by these Terms and Conditions. 
                If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Use of Services</h2>
              <p>
                Tuma Job provides a platform to connect job seekers with employers. We strive to verify 
                all job listings, but we do not guarantee the accuracy or legitimacy of any posting.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">User Responsibilities</h2>
              <p>
                You agree to provide accurate information when using our services and to use our platform 
                only for lawful purposes related to job searching or recruitment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Cover Letter Service</h2>
              <p>
                Our cover letter generation service costs Ksh 36 per letter. Payment is non-refundable 
                once the cover letter has been delivered.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p>
                Tuma Job is not responsible for any employment decisions made by users or employers, 
                or for any damages arising from the use of our platform.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Terms;
