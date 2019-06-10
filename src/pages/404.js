import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { MainContent } from '../components/main-content';

const SqlImage = () => {
  const data = useStaticQuery(graphql`
    {
      allMysqlStaff {
        edges {
          node {
            childMysqlImage {
              childImageSharp {
                fixed(width: 100, height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  `);

  const imageData = data.allMysqlStaff.edges
    .filter(edge => edge.node.childMysqlImage !== null)
    .map(edge => edge.node.childMysqlImage.childImageSharp.fixed);

  return (
    <>
      {imageData.map((imageData, index) => (
        <Img fixed={imageData} key={index} />
      ))}
    </>
  );
};

const NotFoundPage = () => (
  <MainContent>
    <div className="text-center">
      <h1>NOT FOUND</h1>
      <div>
        <SqlImage />
        <p>The page doesn&#39;t exist... the sadness.</p>
        <nav className="Toolbar center">
          <Link to="/" className="link-primary">
            Home
          </Link>
        </nav>
      </div>
    </div>
  </MainContent>
);

export default NotFoundPage;
