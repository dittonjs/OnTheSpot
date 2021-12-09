import { useEffect, useState, useContext, useRef } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { PlayerCard } from './player_card';

export const Game = () => {
  const api = useContext(ApiContext);

  const [selectedUser, setSelectedUser] = useState({
    id: 1705425,
    name: 'Logan Hunt',
    created_at: '2020-12-14T06:26:55-07:00',
    sortable_name: 'Hunt, Logan',
    short_name: 'Logan Hunt',
    sis_user_id: '2005158',
    integration_id: null,
    root_account: 'usu.instructure.com',
    login_id: 'A02364151',
    userStat: {
      id: 1,
      contextId: '7f7282e4eda5dd7b65bda8dd2c320677243c4d35',
      timesChosen: 1,
      timesPresent: 0,
      level: 0,
      lmsUserId: '1705425',
    },
  });
  const [isAnimating, setIsAnimating] = useState(true);
  const animatingRef = useRef(null);

  useEffect(async () => {
    animatingRef.current.addEventListener('animationend', () => {
      setIsAnimating(false);
    });
    // const { selectedUser } = await api.get('/api/user_stats/pick');
    // setSelectedUser(selectedUser);
  }, []);

  if (isAnimating) {
    return (
      <div className="flex justify-center w-screen h-screen">
        <div ref={animatingRef} className="w-96 h-96 rounded-full bg-blue border-4 grow-button" />
      </div>
    );
  }
  let content;
  if (!selectedUser) {
    content = <div>Loading...</div>;
  } else {
    content = <PlayerCard player={selectedUser} />;
  }
  console.log(selectedUser);
  return (
    <div className="flex shadow bg-blue w-screen h-screen">
      <div className="flex-col p-4 flex-1">{content}</div>
    </div>
  );
};
