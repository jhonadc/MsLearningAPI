import { useRouter } from 'next/router';

const DetailPage = ({ module }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!module) {
    return <div>Error fetching module details.</div>;
  }

  const fetchedDate = module.last_modified
  const date = new Date(fetchedDate)
  const formattedDate = date.toDateString()

  return (
    <>
      <div>
        <div>
          <img src={module.icon_url} alt={module.title} />
          <h1>Title: {module.title}</h1>
        </div>
        <p>Summary: {module.summary}</p>
        <p>Duration in minutes: {module.duration_in_minutes}</p>
        <p>Rating Average: {module.rating.average}</p>
        <p>Last Modified: {formattedDate}</p>
      </div>
      <button>Back</button>
    </>
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
