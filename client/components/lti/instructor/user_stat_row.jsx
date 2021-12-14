import { useContext, useState } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { Identicon } from '../common/identicon';
import { NumberInput } from './number_input';

export const UserStatRow = ({ user, updateUser }) => {
  const { userStat, name } = user;
  const api = useContext(ApiContext);
  const [hasUserStat, setHasUserStat] = useState(!!userStat);
  const [level, setLevel] = useState(userStat ? userStat.level : 0);
  const [timesChosen, setTimesChosen] = useState(userStat ? userStat.timesChosen : 0);
  const [timesPresent, setTimesPresent] = useState(userStat ? userStat.timesPresent : 0);
  const [saving, setSaving] = useState(false);
  const updateAndSave = async (key, value) => {
    setSaving(true);
    if (key === 'level') {
      setLevel(value);
    }
    if (key === 'timesChosen') {
      setTimesChosen(value);
    }
    if (key === 'timesPresent') {
      setTimesPresent(value);
    }
    const body = {
      level: key === 'level' ? value : level,
      timesChosen: key === 'timesChosen' ? value : timesChosen,
      timesPresent: key === 'timesPresent' ? value : timesPresent,
    };
    await api.put(`/api/user_stats/${userStat.id}`, body);
    updateUser(user.id, body);
    setSaving(false);
  };

  const create = async () => {
    setSaving(true);
    const { userStat } = await api.post('/api/user_stats', { lmsUserId: user.id });
    updateUser(user.id, userStat);
    setSaving(false);
    setHasUserStat(true);
  };

  return (
    <tr>
      <td className="flex">
        <Identicon playerLoginId={user.login_id} size={64} />
        <div className="flex flex-col ml-1 justify-center text-2xl">{name}</div>
      </td>
      {hasUserStat ? (
        <>
          <td>
            <NumberInput value={level} onChange={(e) => updateAndSave('level', e.target.value)} disabled={saving} />
          </td>
          <td>
            <NumberInput
              value={timesChosen}
              onChange={(e) => updateAndSave('timesChosen', e.target.value)}
              disabled={saving}
            />
          </td>
          <td>
            <NumberInput
              value={timesPresent}
              onChange={(e) => updateAndSave('timesPresent', e.target.value)}
              disabled={saving}
            />
          </td>
        </>
      ) : (
        <td>
          User has no user stats.
          <button className="ml-2 text-green-800 font-bold" onClick={create}>Create Entry</button>
        </td>
      )}
    </tr>
  );
};
