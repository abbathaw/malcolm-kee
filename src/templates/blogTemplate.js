import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { Icon } from '../components/Icon';
import { Button } from '../components/Button';
import './blogTemplate.scss';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div className="blog-post-container">
      <Helmet title={`${frontmatter.title} - Malcolm Kee's blog`} />
      <article className="blog-post">
        <h1>{frontmatter.title}</h1>
        <div className="blog-post--date">
          <Icon>today</Icon>
          <span>{frontmatter.date}</span>
        </div>
        <div
          className="blog-post--content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      <Button color="primary" component={Link} to="/blog" raised>
        <Icon>arrow_back</Icon>
      </Button>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
