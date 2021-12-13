import { useContext, useState } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { Identicon } from '../common/identicon';
import { NumberInput } from './number_input';

export const UserStatRow = ({ user }) => {
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
    await api.put(`/api/user_stats/${userStat.id}`, {
      level: key === 'level' ? value : level,
      timesChosen: key === 'timesChosen' ? value : timesChosen,
      timesPresent: key === 'timesPresent' ? value : timesPresent,
    });
    setSaving(false);
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
        <td>User has no user stats</td>
      )}
    </tr>
  );
};
