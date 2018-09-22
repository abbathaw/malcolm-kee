import React from 'react';
import { getClassName } from '../helper';
import './List.scss';

export const List = ({
  children,
  className,
  component: Component = 'div',
  ...restProps
}) => (
  <Component className="List" {...restProps}>
    {children}
  </Component>
);

export const ListItem = ({
  children,
  className,
  component: Component = 'div',
  button,
  noGutter = false,
  ...restProps
}) => (
  <Component
    className={getClassName(
      'List--ListItem',
      button && 'button',
      noGutter && 'no-gutter',
      className
    )}
    {...restProps}
  >
    {children}
  </Component>
);

export const ListItemText = ({
  primaryText = '',
  boldPrimary = false,
  secondaryText,
  tertiaryText,
  hideOverflow = false,
}) => (
  <div
    className={getClassName(
      'List--ListItemText',
      hideOverflow && 'hide-overflow'
    )}
  >
    <p className={getClassName('primary', boldPrimary && 'bold')}>
      {primaryText}
    </p>
    {secondaryText && <p className="secondary">{secondaryText}</p>}
    {tertiaryText && <p className="tertiary">{tertiaryText}</p>}
  </div>
);

export const ListItemIcon = ({ children, className, ...restProps }) => (
  <div className="List--ListItemIcon">{children}</div>
);
