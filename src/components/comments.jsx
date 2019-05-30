import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { OutLink } from './OutLink';
import { Button } from './Button';
import './comments.scss';

const parseDate = dateString => new Date(dateString).toLocaleString();

export const Comments = ({ comments, articlePath }) => {
  const {
    site: {
      siteMetadata: { repositoryUrl }
    }
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          repositoryUrl
        }
      }
    }
  `);

  const hasComments = comments.length > 0;

  return (
    <section className="article-comments">
      <header className="article-comments-header">Comments</header>
      {hasComments ? (
        comments.map(({ bodyHTML, id, author, createdAt }) => (
          <div className="article-comment" key={id}>
            <div className="article-comment-avatar">
              <img src={author.avatarUrl} alt={author.login} />
            </div>
            <div>
              <div className="article-comment-author">
                <OutLink href={author.url}>
                  <span>{author.name}</span>
                </OutLink>{' '}
                on {parseDate(createdAt)}
              </div>
              <div
                className="article-comment-content"
                dangerouslySetInnerHTML={{ __html: bodyHTML }}
              />
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>There is no comment on this post yet.</p>
        </div>
      )}
      <div className="article-comments-actions">
        <Button
          color="primary"
          raised
          component={OutLink}
          href={`${repositoryUrl}/issues/new?assignees=&labels=comment&template=blog-comment.md&title=${articlePath}`}
        >
          Comment
        </Button>
      </div>
    </section>
  );
};
