import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, Zap, Clock, Award, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Zap,
    title: 'Auto-Generated',
    description: 'AI-powered cover letter created instantly based on your details.',
  },
  {
    icon: Award,
    title: 'Professionally Written',
    description: 'Crafted to impress employers and highlight your strengths.',
  },
  {
    icon: Clock,
    title: 'Delivered Instantly',
    description: 'Get your cover letter in seconds, ready to send.',
  },
];

const benefits = [
  'Tailored to the specific job you\'re applying for',
  'Highlights your relevant skills and experience',
  'Professional formatting that stands out',
  'Easy to customize if needed',
  'Save hours of writing time',
  'Increase your chances of getting interviews',
];

const CoverLetter = () => {
  const handleGetCoverLetter = () => {
    // TODO: Replace with actual cover letter generator link
    window.open('https://your-cover-letter-generator.com', '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Cover Letter Generator - Tuma Job | Ksh 36</title>
        <meta
          name="description"
          content="Generate a professional cover letter in seconds for just Ksh 36. AI-powered, professionally written, and delivered instantly."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 mb-8">
                <FileText className="h-10 w-10 text-accent" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Need a Cover Letter Fast?
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Generate a professional, tailored cover letter in seconds. Stand out from other applicants and increase your chances of getting hired.
              </p>

              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground text-2xl font-bold mb-8">
                Only Ksh 36
              </div>

              <Button
                variant="accent"
                size="xl"
                onClick={handleGetCoverLetter}
                className="text-lg"
              >
                Generate Your Cover Letter
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="text-center p-8 rounded-xl bg-card border border-border animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Why Get a Cover Letter?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-12">
                How It Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { step: '1', title: 'Enter Details', desc: 'Provide your name and the job you\'re applying for' },
                  { step: '2', title: 'Pay Ksh 36', desc: 'Quick and secure payment via M-Pesa' },
                  { step: '3', title: 'Get Your Letter', desc: 'Receive your cover letter instantly' },
                ].map((item, index) => (
                  <div key={item.step} className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    {index < 2 && (
                      <ArrowRight className="hidden md:block absolute top-6 -right-4 h-5 w-5 text-muted-foreground/30" />
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="accent"
                size="xl"
                onClick={handleGetCoverLetter}
              >
                Get Started - Ksh 36
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {[
                  {
                    q: 'How long does it take to get my cover letter?',
                    a: 'Your cover letter is generated instantly after payment. You\'ll receive it within seconds.',
                  },
                  {
                    q: 'Can I customize the cover letter?',
                    a: 'Yes! The cover letter is delivered as a document you can edit and customize as needed.',
                  },
                  {
                    q: 'What payment methods do you accept?',
                    a: 'We accept M-Pesa for quick and secure payments.',
                  },
                  {
                    q: 'Is the cover letter unique to me?',
                    a: 'Yes, each cover letter is generated based on your specific details and the job you\'re applying for.',
                  },
                ].map((faq, index) => (
                  <div key={index} className="bg-card rounded-lg border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CoverLetter;
