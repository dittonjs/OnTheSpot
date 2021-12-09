import { useNavigate } from 'react-router';
import { ChooseButton } from './choose_button';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center w-screen">
      <ChooseButton onClick={() => navigate('/game')} />
    </div>
  );
};
