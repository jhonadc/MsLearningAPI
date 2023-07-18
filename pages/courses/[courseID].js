import { useRouter } from 'next/router';

function DetailPage() {
  const router = useRouter();

  const courseID = router.query.courseID;

  //send request to API to fetch courseID

  return <h1>Course Detail Page</h1>;
}

export default DetailPage;
