import { Identicon } from './identicon';

export const PlayerCard = ({ player }) => {
  return (
    <div className="h-auto w-full md:w-1/2 shadow-sm rounded p-4 flex-1 bg-white">
      <h2 className="text-4xl">{player.name}</h2>
      <div className="text-base">LV: {player.userStat.level}</div>
      <div className="text-base">Turn: {player.userStat.timesChosen}</div>
      <Identicon playerLoginId={player.login_id} />
    </div>
  );
};
