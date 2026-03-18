import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'tumajob_cookie_consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4">
      <div className="container max-w-3xl">
        <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1">
            We use cookies to improve your experience. By continuing to use this site, you agree to our{' '}
            <Link to="/cookie-policy" className="text-primary underline hover:no-underline">Cookie Policy</Link>.
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={handleReject}>
              Reject
            </Button>
            <Button variant="accent" size="sm" onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
