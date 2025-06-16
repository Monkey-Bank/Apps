import { Link } from 'react-router-dom';

const Links = () => {
  return (
    <div className="header">
      <Link to="/count-app">CountApp</Link>
      <Link to="/todo">Todo</Link>
      <Link to="/shopping-list">Shopping list</Link>
      <Link to="/memo-todo">Memo+Todo</Link>
      <Link to="/calculator">Calculator</Link>
      <Link to="/weather">Weather</Link>
      <Link to="/weather-extra">Weather Extra</Link>
    </div>
  );
};

export default Links;
