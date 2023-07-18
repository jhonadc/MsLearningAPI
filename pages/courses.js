import Link from 'next/link';
import { useState } from 'react';

const OverviewPage = ({ modules }) => {
  const [visibleModules, setVisibleModules] = useState(10);

  const loadMore = () => {
    setVisibleModules((prevVisibleModules) => prevVisibleModules + 10);
  };

  return (
    <div className='bg-white'>
      <div className='relative isolate pt-14 mx-10'>
        <svg
          className='absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
          aria-hidden='true'>
          <defs>
            <pattern
              id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
              width={200}
              height={200}
              x='50%'
              y={-1}
              patternUnits='userSpaceOnUse'>
              <path d='M100 200V.5M.5 .5H200' fill='none' />
            </pattern>
          </defs>
          <svg x='50%' y={-1} className='overflow-visible fill-gray-50'>
            <path
              d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z'
              strokeWidth={0}
            />
          </svg>
          <rect
            width='100%'
            height='100%'
            strokeWidth={0}
            fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
          />
        </svg>

        <div className='border-b border-cyan-700 pb-5 mb-10'>
          <h1 className='mt-10 max-w-lg text-4xl font-bold tracking-tight  sm:text-6xl text-gray-800'>
            Courses Overview
          </h1>
          <p className='mt-5 mb-1 text-2xl font-semibold leading-6 text-gray-500'>
            Etiam ullamcorper massa viverra consequat, consectetur id nulla
            tempus.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10'>
          {modules.slice(0, visibleModules).map((module) => (
            <div className=' gap 4 mb-10' key={module.uid}>
              <div className='flex items-center'>
                <img
                  className='mr-4 inline-block h-14 w-14 rounded-md'
                  src={module.icon_url}
                  alt={module.title}
                />
                <h2 className='font-bold tracking-tight text-3xl text-blue-500'>
                  {module.title}
                </h2>
              </div>
              <p className='mt-5 mb-1 text-xl font-semibold leading-6 text-gray-500'>
                {module.summary}
              </p>
              <Link href={`/detail/${module.uid}`} passHref>
                <button className='mt-2 mb-10 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800'>
                  View Details
                </button>
              </Link>
              <div className='visible lg:invisible mt-15 w-full border-t border-gray-300' />
            </div>
          ))}
        </div>
        {visibleModules < modules.length && (
          <button
            className='w-full mt-2 mb-10 rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800'
            onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
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
