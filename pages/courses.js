import Link from 'next/link';
import { useState } from 'react';

const OverviewPage = ({ modules }) => {
  const [visibleModules, setVisibleModules] = useState(10);

  const loadMore = () => {
    setVisibleModules((prevVisibleModules) => prevVisibleModules + 10);
  };

  return (
    <div>
      <h1>Overview Page</h1>
      {modules.slice(0, visibleModules).map((module) => (
        <div key={module.uid}>
          <h2>{module.title}</h2>
          <img src={module.icon_url} alt={module.title} />
          <p>{module.summary}</p>
          <Link href={`/detail/${module.uid}`} passHref>
            <button>View Details</button>
          </Link>
        </div>
      ))}
      {visibleModules < modules.length && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export async function getStaticProps() {
  try {
    const response = await fetch(
      'https://learn.microsoft.com/api/catalog/?type=modules'
    );
    if (!response.ok) {
      throw new Error('Error fetching modules');
    }
    const { modules } = await response.json();
    return {
      props: {
        modules,
      },
    };
  } catch (error) {
    return {
      props: {
        modules: [],
        error: error.message,
      },
    };
  }
}

export default OverviewPage;
