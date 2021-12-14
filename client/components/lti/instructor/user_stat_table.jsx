import { useState } from 'react';
import { UserStatRow } from './user_stat_row';
import sortBy from 'lodash/sortBy';
import { SortIcon } from './sort_icon';

export const UserStatTable = ({ users, updateUser }) => {
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('ASC');

  const setSort = (attr) => {
    if (attr === sortKey) {
      if (sortDirection === 'ASC') {
        setSortDirection('DESC');
      } else {
        setSortDirection('ASC');
      }
    } else {
      setSortDirection('ASC');
      setSortKey(attr);
    }
  };

  const sortedUsers = sortBy(users, (user) => {
    if (sortKey === 'name') {
      return user.sortable_name;
    } else {
      if (user.userStat) {
        return user.userStat[sortKey];
      } else {
        return -999999;
      }
    }
  });

  if (sortDirection === 'DESC') {
    sortedUsers.reverse();
  }

  return (
    <table className="border-collapse flex-1">
      <thead>
        <tr className="border-b-2">
          <th>
            <button onClick={() => setSort('name')}>
              Name <SortIcon expectedKey="name" currentKey={sortKey} direction={sortDirection} />
            </button>
          </th>
          <th>
            <button onClick={() => setSort('level')}>
              Level <SortIcon expectedKey="level" currentKey={sortKey} direction={sortDirection} />
            </button>
          </th>
          <th>
            <button onClick={() => setSort('timesChosen')}>
              Times Chosen <SortIcon expectedKey="timesChosen" currentKey={sortKey} direction={sortDirection} />
            </button>
          </th>
          <th>
            <button onClick={() => setSort('timesPresent')}>
              Times Present <SortIcon expectedKey="timesPresent" currentKey={sortKey} direction={sortDirection} />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <UserStatRow user={user} key={user.id} updateUser={updateUser} />
        ))}
      </tbody>
    </table>
  );
};
