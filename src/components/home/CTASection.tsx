import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-6">
            <FileText className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Need a Cover Letter Fast?
          </h2>
          
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Generate a professional, tailored cover letter in seconds. Stand out from other applicants and increase your chances of getting hired.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="xl"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              asChild
            >
              <Link to="/cover-letter">
                Generate Cover Letter - Ksh 36
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/60">
            Professionally written • Delivered instantly • Tailored to the job
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
