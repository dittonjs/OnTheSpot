import { useContext } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { ChooseButton } from './choose_button';

export const Home = () => {
  const api = useContext(ApiContext);

  const onClick = async () => {
    const result = await api.get('/api/user_stats/pick');
    console.log(result);
  };

  return (
    <div className="flex justify-center w-screen p-4">
      <ChooseButton onClick={onClick} />
    </div>
  );
};
