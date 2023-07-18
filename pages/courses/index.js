import Link from 'next/link';

function CoursePage() {
  return (
    <>
      <h1>Course Page</h1>;
      <ul>
        <li>
          <Link href='/courses/excel'>Excel</Link>
        </li>
      </ul>
    </>
  );
}

export default CoursePage;
