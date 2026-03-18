import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Tuma Job</title>
        <meta name="description" content="Learn how Tuma Job uses cookies and similar technologies to improve your browsing experience." />
      </Helmet>
      <Layout>
        <div className="container py-12 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">What Are Cookies</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, understand how you use our site, and improve your overall experience.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly, including authentication and security.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site so we can improve it.</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements through third-party ad networks such as Google AdSense.</li>
                <li><strong>Preference Cookies:</strong> Store your settings and preferences for future visits.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
              <p>We use Google AdSense and Google Analytics, which may place cookies on your device. These third-party services have their own privacy policies governing the use of cookies.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Managing Cookies</h2>
              <p>You can control and manage cookies through your browser settings. Please note that disabling cookies may affect the functionality of certain features on our website.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p>If you have questions about our cookie policy, contact us at <a href="mailto:info@tumajob.co.ke" className="text-primary hover:underline">info@tumajob.co.ke</a>.</p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CookiePolicy;
