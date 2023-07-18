function CourseItem(props) {
  return (
    <li>
      {/* card begin */}
      <div>
        <img src={props.image} alt={props.title} />
      </div>
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div>
        <button>Show Details</button>
      </div>
      {/* card end */}
    </li>
  );
}

export default CourseItem;
