import { Link } from 'react-router-dom';

const EmptyCartBlock = ({ icon, message }) => (
  <div className="empty-cart">
    <i className={`bi bi-${icon}`} />
    <p>{message}</p>
    <p>
      Go to <Link to="/">Home</Link>
    </p>
  </div>
);

export default EmptyCartBlock;
