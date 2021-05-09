import React, { Dispatch, SetStateAction } from 'react';
import './SettingsMode.css';

type SettingsModeProps = {
  totalReps: number,
  onTotalRepsChange: Dispatch<SetStateAction<number>>,
  secsPerRep: number,
  onSecsPerRepChange: Dispatch<SetStateAction<number>>,
  onExerciseStart: () => void,
};

function SettingsMode(props: SettingsModeProps) {
  return (
    <div className="SettingsMode flex-column">
      <p className="heading">Repetitions:</p>
      <select defaultValue={props.totalReps} onChange={(event) => props.onTotalRepsChange(Number(event.target.value))}>
        {range(3, 21).map((value) => (
          <option
            key={value}
            value={value.toString()}
          >
            {value}
          </option>
        ))}
      </select>
      <p className="heading">Seconds:</p>
      <select defaultValue={props.secsPerRep} onChange={(event) => props.onSecsPerRepChange(Number(event.target.value))}>
        {range(1, 13).map((value) => (
          <option
            key={value}
            value={value.toString()}
          >
            {value}
          </option>
        ))}
      </select>
      <button onClick={props.onExerciseStart}>Start</button>
    </div>
  );
}

function range(start: number, end: number) {
  return new Array(end - start).fill(null).map((_, index) => start + index);
}

export default SettingsMode;
