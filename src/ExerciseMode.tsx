import React, { useEffect, useState } from 'react';

type ExerciseModeProps = {
  totalReps: number,
  secsPerRep: number,
  onExerciseStop: () => void,
};

function ExerciseMode(props: ExerciseModeProps) {
  const exercises = [
    "Растяжение боковых мышц шеи",
    "Разгибание шеи",
    "Сгибание и разгибание шеи",
    "Сгибание шеи",
    "Растяжение шеи",
    "Повороты шеи",
    "Потягивание",
    "Боковое сгибание",
    "Повороты в сторону",
    "Сгибание",
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentRep, setCurrentRep] = useState(1);
  const [millisecondsLeft, setMillisecondsLeft] = useState(props.secsPerRep * 1000);

  const [isBlinking, setIsBlinking] = useState(false);

  const [isPaused, setIsPaused] = useState(true);

  const updateCurrentExercise = () => {
    const newCurrentExerciseIndex = currentExerciseIndex + 1;
        
    if (newCurrentExerciseIndex === exercises.length) {
      setIsPaused(true);
      setCurrentExerciseIndex(0);
    } else {
      setCurrentExerciseIndex(newCurrentExerciseIndex);
    }
  };

  const updateCurrentRep = () => {
    const newCurrentRep = currentRep + 1;

    if (newCurrentRep === props.totalReps + 1) {
      setCurrentRep(1);
      updateCurrentExercise();
    } else {
      setCurrentRep(newCurrentRep);
    }
  };

  const updateMillisecondsLeft = (delta: number) => {
    const newMillisecondsLeft = Math.max(0, millisecondsLeft - delta);

    if (newMillisecondsLeft === 0) {
      setMillisecondsLeft(props.secsPerRep * 1000);
      setIsBlinking(true);
      updateCurrentRep();
    } else {
      setIsBlinking(false);
      setMillisecondsLeft(newMillisecondsLeft);
    }
  };

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  useEffect(() => {
    if (isPaused) {
      return;
    }

    const precision = 200;
    const timeoutId = setTimeout(() => {
      setLastUpdate(Date.now());
      updateMillisecondsLeft(precision);
    }, precision - (Date.now() - lastUpdate));

    return () => {
      clearTimeout(timeoutId);
    };
  });

  const getPauseModeControls = () => (
    <>
      <button onClick={() => setIsPaused(false)}>Resume</button>
      <button onClick={props.onExerciseStop}>Return to menu</button>
    </>
  );
  
  return (
    <div className={`SettingsMode flex-column ${isBlinking ? 'blinking' : ''}`}>
      <p className="heading">Exercise:</p>
      <p className="heading">{exercises[currentExerciseIndex]}</p>
      <p className="heading">Repetition:</p>
      <p className="heading">{currentRep} / {props.totalReps}</p>
      <p className="heading">Seconds left:</p>
      <p className="heading">{Math.ceil(millisecondsLeft / 1000)} / {props.secsPerRep}</p>
      {isPaused ? getPauseModeControls() : <button onClick={() => setIsPaused(true)}>Pause</button>}
    </div>
  );
}

export default ExerciseMode;
