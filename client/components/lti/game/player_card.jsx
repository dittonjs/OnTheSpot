import { Identicon } from './identicon';

export const PlayerCard = ({ player }) => {
  return (
    <div className="h-auto w-full md:w-1/2 shadow-sm rounded p-4 flex-1 bg-white">
      <div className="flex flex-row">
        <Identicon playerLoginId={player.login_id} size="4rem" />
        <h2 className="text-5xl flex-1 flex flex-col justify-center ml-2">{player.name}</h2>
      </div>
      <div className="text-base">LV: {player.userStat.level}</div>
      <hr className="mt-4" />
      <div className="text-xl">Turn: {player.userStat.timesChosen}</div>
    </div>
  );
};
