import Footer from "components/modules/landing/alternate/Footer";
import DefaultLandingNavbar from "components/navbars/default-landing-navbar/DefaultLandingNavbar";

const About = () => {
  return (
    <>
      <DefaultLandingNavbar />
      <div className="wrapper m-7">
        <div className="section section-about-us p-5">
          <div className="about-description flex flex-col text-3xl">
            <h2 className="title">About Us</h2>

            <p className="about-content">
              Qberi is a multinational organization with offices in the United
              States, India, South Africa, Germany, and the United Kingdom. Our
              Services encompass various international activities, including but
              not limited to investments, operations, and joint ventures. These
              activities may be subject to specific agreements and regulations
              governing each respective jurisdiction.
            </p>

            <p className="about-content">
              Our Services are provided on an "as is" and "as available" basis.
              We reserve the right to modify, suspend, or discontinue our
              Services at any time without notice and without any liability to
              you.
            </p>

            <p className="about-content">
              We may update these Terms from time to time. If we make material
              changes, we will provide notice to you either by email or by
              posting a notice on our website. Your continued use of our
              Services constitutes your acceptance of any changes.
            </p>

            <p className="about-content">
              If you have any questions or concerns regarding these Terms,
              please contact us at
              <a href="mailto:support@qberi.com">
                <strong> support@qberi.com</strong>
              </a>
            </p>

            <p className="about-content">Last Updated: Jan 25, 2024</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
