
const ButtonComponent = ({btnText, btnClick, btnStyle}) => {
  return (
    <button
      style={btnStyle}
      className="btn btn-outline-primary"
      onClick={btnClick}
    >
      {btnText}
    </button>
  );
}

export default ButtonComponent;

// when called
//   <ButtonComponent
//   btnText={'Button'}
//   btnClick={() => dispatch(toggleModal(true))}
//   //btnStyle={{ background: 'red', color: 'white' }}
//   />;