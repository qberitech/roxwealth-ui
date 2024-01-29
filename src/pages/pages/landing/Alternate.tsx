import AddressSection from 'components/modules/landing/alternate/AddressSection';
import Footer from 'components/modules/landing/alternate/Footer';
import HeroHeader from 'components/modules/landing/alternate/HeroHeader';
import TeamSection from 'components/modules/landing/default/team/TeamSection';
import OneStopSolution from 'components/modules/landing/alternate/OneStopSolution';
// import Stats from 'components/modules/landing/alternate/Stats';
// import Testimonial from 'components/modules/landing/alternate/Testimonial';
import Cta from 'components/modules/showcase/Cta';
import Blogs from 'components/modules/landing/alternate/blogs/Blogs';
import Features from 'components/modules/landing/alternate/features/Features';
import DefaultLandingNavbar from 'components/navbars/default-landing-navbar/DefaultLandingNavbar';
import useSettingsMountEffect from 'hooks/useSettingsMountEffect';
import { useEffect } from 'react';

const Alternate = () => {
  useSettingsMountEffect({
    disableNavigationType: true,
    disableHorizontalNavbarAppearance: true,
    disableVerticalNavbarAppearance: true,
    disableHorizontalNavbarShape: true
  });

  useEffect(() => {
    // Set Title as Qberi | Landing
    document.title = 'Qberi';
  }, []);

  return (
    <div className="bg-white dark__bg-1200">
      <DefaultLandingNavbar className="dark__bg-1200" />
      <HeroHeader />
      {/* <Brands /> */}
      <Features />
      {/* <Testimonial /> */}
      {/* <Gallery /> */}
      <OneStopSolution />
      {/* <Stats /> */}
      {/* <Pricing /> */}
      <Blogs />
      <AddressSection />
      <TeamSection />
      <Cta />
      <Footer />
    </div>
  );
};

export default Alternate;
