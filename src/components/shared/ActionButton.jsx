import '../../styles/actionbutton.scss';

const ActionButton = ({ text, onClickHandler }) => (
  <div className="empty-list-btn-wrapper">
    <button className="btn btn-primary" onClick={onClickHandler}>
      {text}
    </button>
  </div>
);

export default ActionButton;
