import CourseItem from './courseItem';

function CourseList(props) {
  return (
    <ul>
      {props.courses.map((course) => (
        <CourseItem
          key={course.id}
          id={course.id}
          title={course.title}
          description={course.description}
          image={course.image}
        />
      ))}
    </ul>
  );
}

export default CourseList;
