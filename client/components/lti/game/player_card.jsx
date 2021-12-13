import { useState } from 'react';
import { Identicon } from '../common/identicon';

export const PlayerCard = ({ player, recordAttendance, isSaving, isDone, startOver }) => {
  const [isVictorious, setIsVictorious] = useState(false);
  if (isSaving) {
    return (
      <div className="h-auto w-full shadow-sm rounded p-4 flex-1 bg-white">
        <div className="text-3xl">Saving...</div>
      </div>
    );
  }

  if (isDone) {
    return (
      <div className="h-auto w-full shadow-sm rounded p-4 flex-1 bg-white">
        <div className="text-3xl">Saved!</div>
        <div className="text-base">Do you wan't to play another round?</div>
        <button className="bg-gray-700 rounded-full p-4 text-lg text-white transition-all" onClick={startOver}>
          Play another round
        </button>
      </div>
    );
  }

  return (
    <div className="h-auto w-full shadow-sm rounded p-4 flex-1 bg-white">
      <div className="flex flex-row">
        <Identicon playerLoginId={player.login_id} size="4rem" />
        <h2 className="text-5xl flex-1 flex flex-col justify-center ml-2">{player.name}</h2>
      </div>
      <div className="text-base">LV: {player.userStat.level}</div>
      <hr className="mt-4" />
      <div className="text-xl">Turn: {player.userStat.timesChosen + 1}</div>
      <div className="flex flex-row mt-2">
        <button
          className="flex-1 bg-green-700 rounded-full p-4 text-lg text-white transition-all"
          onClick={() => setIsVictorious(true)}
        >
          Victory
        </button>
        <div className="w-2" />
        <button
          className="flex-1 bg-red-700 rounded-full p-4 text-lg text-white transition-all"
          onClick={() => recordAttendance(false, false)}
        >
          Defeat
        </button>
      </div>
      {isVictorious && (
        <>
          <div className="text-2xl mt-4">Did the player level up?</div>
          <div className="flex flex-row mt-2">
            <button
              className="flex-1 bg-gray-700 rounded-full p-4 text-lg text-white transition-all"
              onClick={() => recordAttendance(true, true)}
            >
              Yes
            </button>
            <div className="w-2" />
            <button
              className="flex-1 bg-gray-700 rounded-full p-4 text-lg text-white transition-all"
              onClick={() => recordAttendance(true, false)}
            >
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
};
