import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Tuma Job</title>
      </Helmet>
      <Layout>
        <div className="container py-12 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p>
                Tuma Job collects information you provide directly, including your name, email address, 
                and phone number when you contact us or apply for jobs through our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p>
                We use the information we collect to provide and improve our services, communicate with you 
                about job opportunities, and send you relevant updates about our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with employers 
                when you apply for jobs, and with service providers who help us operate our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at info@tumajob.co.ke.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Privacy;
