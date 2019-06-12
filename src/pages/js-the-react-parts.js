import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import reactLogo from '../assets/react-logo.png';
import { LinkButton } from '../components/Button';
import { JsIcon } from '../components/js-icon';
import { Seo } from '../components/Seo';
import { LandingPageHeader } from '../components/workshop/landing-page-header';
import { useFavIcon } from '../hooks/use-favicons';
import './js-the-react-parts.scss';

/* eslint-disable no-script-url */

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "js-the-react-parts" }) {
        name
        description
        keywords
        iconFile
      }
    }
  `);

  useFavIcon({
    iconFile: workshopsJson.iconFile,
    contentId: 'js-the-react-parts',
  });

  return (
    <LandingPageHeader>
      <Seo
        title={workshopsJson.name}
        description={workshopsJson.description}
        keywords={workshopsJson.keywords}
      />
      <div id="js-the-react-parts-landing">
        <div className="logo-section">
          <div className="icon-container">
            <div className="js-icon" id="js-icon">
              <JsIcon />
            </div>
            <div className="react-icon-container">
              <div className="react-icon-inner-container">
                <img src={reactLogo} className="react-icon" alt="react logo" />
              </div>
            </div>
          </div>
        </div>
        <div className="landing-title-container">
          <h1 className="landing-title">
            <span className="javascript-text">JavaScript </span>
            <span className="react-text">The React Parts</span>
          </h1>
          <div className="Toolbar">
            <LinkButton
              to="/js-the-react-parts/introduction"
              color="bubble"
              size="large"
            >
              Start
            </LinkButton>
          </div>
        </div>
      </div>
    </LandingPageHeader>
  );
};

export default function JsTheReactParts() {
  return (
    <>
      <PageHeader />
      <nav className="Toolbar center">
        <Link className="link-primary" to="/workshops">
          All Workshops
        </Link>
      </nav>
    </>
  );
}
