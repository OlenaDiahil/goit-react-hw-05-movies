import { useNavigate } from 'react-router-dom';
import css from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/', { replace: true });
  }, 1500);

  return (
    <>
      <h1 className={css.NotFound}>404 Page not found!</h1>
    </>
  );
}
export default NotFound;
