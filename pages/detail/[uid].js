import Link from 'next/link';
import { useRouter } from 'next/router';

const DetailPage = ({ module }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!module) {
    return <div>Error fetching module details.</div>;
  }

  const fetchedDate = module.last_modified;
  const date = new Date(fetchedDate);
  const formattedDate = date.toDateString();

  return (
    <div className='bg-white h-screen'>
      <div className='relative isolate pt-14 mx-20'>
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
        <div className='mb-5 mt-10 text-xl font-semibold leading-6 text-gray-500'>
          <div className='flex items-center'>
            <img
              className='mr-4 inline-block h-30 w-30 rounded-md'
              src={module.icon_url}
              alt={module.title}
            />
            <h1 className='font-bold tracking-tight text-4xl text-blue-500'>
              <span>Course:</span> {module.title}
            </h1>
          </div>
          <p className='mb-5 mt-10'>
            <span className='text-blue-500 font-bold'>Summary: </span>
            {module.summary}
          </p>
          <p className='mb-5'>
            <span className='text-blue-500 font-bold'>
              Duration in minutes:{' '}
            </span>{' '}
            {module.duration_in_minutes}
          </p>
          <p className='mb-5'>
            <span className='text-blue-500 font-bold'>Rating average: </span>
            {module.rating.average}
          </p>
          <p className='mb-5'>
            <span className='text-blue-500 font-bold'>Last Modified: </span>{' '}
            {formattedDate}
          </p>
        </div>
        <div className='mt-10'>
          <Link
            href='/courses'
            className='mb-5 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Fetch the available module UIDs from the API
  const response = await fetch(
    'https://learn.microsoft.com/api/catalog/?type=modules'
  );
  if (!response.ok) {
    throw new Error('Error fetching module UIDs');
  }
  const { modules } = await response.json();

  // Generate paths for each module UID
  const paths = modules.map((module) => ({
    params: { uid: module.uid },
  }));

  return {
    paths,
    fallback: true, // Enable fallback while the module details are being fetched
  };
}

export async function getStaticProps({ params }) {
  try {
    const moduleResponse = await fetch(
      `https://learn.microsoft.com/api/catalog/?uid=${params.uid}`
    );
    if (!moduleResponse.ok) {
      throw new Error('Error fetching module details');
    }
    const {
      modules,
      units,
      learningPaths,
      certifications,
      exams,
      courses,
      levels,
      products,
      roles,
      subjects,
    } = await moduleResponse.json();

    const module = modules[0];
    module.units = units;
    module.learningPaths = learningPaths;
    module.certifications = certifications;
    module.exams = exams;
    module.courses = courses;
    module.levels = levels || [];
    module.products = products;
    module.roles = roles;
    module.subjects = subjects;

    return {
      props: {
        module,
      },
      revalidate: 60, // Revalidate the data every 60 seconds
    };
  } catch (error) {
    return {
      props: {
        module: null,
        error: error.message,
      },
      revalidate: 60, // Revalidate the data every 60 seconds
    };
  }
}

export default DetailPage;
