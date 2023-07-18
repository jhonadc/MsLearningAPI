import CourseList from '../components/courses/courselist';

const DUMMY_COURSES = [
  {
    id: 'c1',
    title: 'first course',
    image:
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'this a wonderful course',
  },
  {
    id: 'c2',
    title: 'second course',
    image:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'this a second wonderful course',
  },
];
function HomePage() {
  return <CourseList courses={DUMMY_COURSES} />;
}

export default HomePage;
