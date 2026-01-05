import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer - Tuma Job</title>
      </Helmet>
      <Layout>
        <div className="container py-12 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Disclaimer</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Job Verification</h2>
              <p>
                Tuma Job makes every effort to verify job listings before publishing them on our platform. 
                However, we cannot guarantee the authenticity, accuracy, or legitimacy of all job postings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">No Employment Guarantee</h2>
              <p>
                Using Tuma Job does not guarantee employment. We are a platform that connects job seekers 
                with potential employers, but hiring decisions are made solely by the employers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Beware of Scams</h2>
              <p>
                Be cautious of any job that requires upfront payment, asks for sensitive personal information 
                early in the process, or makes unrealistic promises. Legitimate employers do not ask for 
                money from job seekers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Report Suspicious Listings</h2>
              <p>
                If you encounter a suspicious job listing, please report it to us immediately using the 
                "Report Job" button on any job posting. Your reports help us maintain a safe platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Third-Party Links</h2>
              <p>
                Our platform may contain links to external websites. We are not responsible for the content 
                or practices of these third-party sites.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Disclaimer;
