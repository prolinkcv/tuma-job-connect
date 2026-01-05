import { Shield, RefreshCw, Zap, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Shield,
    title: 'Verified Jobs',
    description: 'Every job listing is reviewed and verified to protect you from scams.',
  },
  {
    icon: RefreshCw,
    title: 'Updated Daily',
    description: 'Fresh opportunities added every day from hospitals and clinics across Kenya.',
  },
  {
    icon: Zap,
    title: 'Easy Applications',
    description: 'Apply directly via WhatsApp, email, or phone with one click.',
  },
  {
    icon: FileText,
    title: 'Cover Letter Help',
    description: 'Generate a professional cover letter in seconds for just Ksh 36.',
  },
];

const WhySection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Why Tuma Job?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to connecting you with real, verified job opportunities
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button variant="accent" size="lg" asChild>
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/cover-letter">
                <FileText className="h-4 w-4 mr-2" />
                Create Cover Letter - Ksh 36
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
