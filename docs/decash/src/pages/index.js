import React from 'react';
import { Redirect } from 'react-router-dom'; // Import Redirect from react-router-dom
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          DeCash
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/"
          >
            Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

function Home() {
  // Use state to track if redirection should happen
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  React.useEffect(() => {
    // Set shouldRedirect to true after component mounts
    setShouldRedirect(true);
  }, []);

  // Render Redirect if shouldRedirect is true
  if (shouldRedirect) {
    return <Redirect to="/docs/" />;
  }

  // If not redirecting, render the normal homepage layout
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

export default Home;
