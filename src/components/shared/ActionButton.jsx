import '../../styles/actionbutton.scss'

const ActionButton = ({ text, onClickHandler }) => (
  <button className="btn btn-primary action-button" onClick={onClickHandler}>
    {text}
  </button>
);

export default ActionButton;
