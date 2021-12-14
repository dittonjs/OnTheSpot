import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { UserStatTable } from './user_stat_table';

export const Instructor = () => {
  const api = useContext(ApiContext);
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const { userStats } = await api.get('/api/user_stats');
    setUsers(userStats);
  }, []);
  console.log(users);

  const updateUser = (id, userStat) => {
    const user = users.find((user) => user.id === id);
    user.userStat = { ...user.userStat, ...userStat };
    setUsers([...users]);
  };

  return (
    <div className="flex flex-col">
      <div>Instructor</div>
      <UserStatTable users={users} updateUser={updateUser} />
    </div>
  );
};
