const Button = (props) => {
  return (
    <button
      text={props.text}
      style={props.style}
      onClick={props.onClick}
      className={props.className}
      id={props.id}
    >
      {props.text}
    </button>
  );
};

export default Button;
