import React from 'react';
import { Layout } from '../components/Layout';
import { ThemeProvider } from '../theme';

const LayoutContainer = ({ children, pageContext }) => {
  const [theme, setTheme] = React.useState(null);

  function toggle() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.__setPreferredTheme(newTheme);
  }

  React.useEffect(() => {
    if (theme !== window.__theme) {
      setTheme(window.__theme);
    }
    window.__onThemeChange = () => {
      setTheme(window.__theme);
    };
  }, []);

  const themeValue = React.useMemo(
    () => ({
      toggle,
      value: theme
    }),
    [theme]
  );

  return (
    <ThemeProvider value={themeValue}>
      <Layout isRoot={pageContext.isRoot}>{children}</Layout>
    </ThemeProvider>
  );
};

export default LayoutContainer;
