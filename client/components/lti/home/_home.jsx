import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ChooseButton } from './choose_button';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl">
      <div className="w-full">
        <div className="flex justify-center relative">
          <ChooseButton onClick={() => navigate('/game')} />
          <Link to="/instructor">
            <span className="material-icons">settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
