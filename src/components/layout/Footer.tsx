import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold">Tuma Job</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              Jobs Made Simple. Your trusted platform for verified job opportunities in Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/submit-job" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/cover-letter" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Cover Letter Generator
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Job Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs?category=healthcare" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Healthcare Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=admin" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Admin & Office
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=ngo" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  NGO Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=internship" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Internships
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <span>info@tumajob.co.ke</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p>© {currentYear} Tuma Job. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/cookie-policy" className="hover:text-primary-foreground transition-colors">
                Cookie Policy
              </Link>
              <Link to="/disclaimer" className="hover:text-primary-foreground transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
