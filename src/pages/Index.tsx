import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import LatestJobsSection from '@/components/home/LatestJobsSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import WhySection from '@/components/home/WhySection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Tuma Job - Jobs Made Simple | Healthcare Jobs in Kenya</title>
        <meta
          name="description"
          content="Find verified healthcare jobs in Kenya. Browse nursing, clinical officer, and medical jobs. Updated daily with easy WhatsApp applications. Jobs Made Simple."
        />
        <meta
          name="keywords"
          content="Kenya jobs, healthcare jobs Kenya, nursing jobs, clinical officer jobs, hospital jobs Nairobi, WhatsApp jobs, daily updated jobs"
        />
        <link rel="canonical" href="https://tumajob.co.ke" />
      </Helmet>
      <Layout>
        <HeroSection />
        <LatestJobsSection />
        <CategoriesSection />
        <WhySection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
