import classNames from 'classnames';
import Footer from 'components/footers/Footer';
import NavbarDual from 'components/navbars/navbar-dual/NavbarDual';
import NavbarTopHorizontal from 'components/navbars/navbar-horizontal/NavbarTopHorizontal';
import NavbarTopDefault from 'components/navbars/navbar-top/NavbarTopDefault';
import NavbarVertical from 'components/navbars/navbar-vertical/NavbarVertical';
import { useAppContext } from 'providers/AppProvider';
import { useMainLayoutContext } from 'providers/MainLayoutProvider';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

const MainLayout = () => {
  const {
    config: { navbarPosition }
  } = useAppContext();

  const { contentClass, footerClass } = useMainLayoutContext();

  // Check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const appData = localStorage.getItem('appData');
    if (appData) {
      const data = JSON.parse(appData);
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // window.location.href = '/auth/sign-in';
      }
    } else {
      setIsLoggedIn(false);
      window.location.href = '/auth/sign-in';
    }
  }, []);

  return (
    <Container fluid className="px-0">
      {/* {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
        <NavbarVertical />
      )}
      {navbarPosition === 'vertical' && <NavbarTopDefault />}
      {(navbarPosition === 'horizontal' || navbarPosition === 'combo') && (
        <NavbarTopHorizontal />
      )}
      {navbarPosition === 'dual' && <NavbarDual />}

      <div className={classNames(contentClass, 'content')}>
        <Outlet />
        <Footer className={classNames(footerClass, 'position-absolute')} />
      </div> */}
      {isLoggedIn ? (
        <>
          {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
            <NavbarVertical />
          )}
          {navbarPosition === 'vertical' && <NavbarTopDefault />}
          {(navbarPosition === 'horizontal' || navbarPosition === 'combo') && (
            <NavbarTopHorizontal />
          )}
          {navbarPosition === 'dual' && <NavbarDual />}

          <div className={classNames(contentClass, 'content')}>
            <Outlet />
            <Footer className={classNames(footerClass, 'position-absolute')} />
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default MainLayout;
