import React, { useState } from 'react';
import './App.css';

import SettingsMode from './SettingsMode';
import ExerciseMode from './ExerciseMode';

function App() {
  const [mode, setMode] = useState<'exercise' | 'settings'>('settings');

  const [totalReps, setTotalReps] = useState(10);
  const [secsPerRep, setSecsPerRep] = useState(5);

  const getSettingsMode = () => (
    <SettingsMode
      totalReps={totalReps}
      onTotalRepsChange={setTotalReps}
      secsPerRep={secsPerRep}
      onSecsPerRepChange={setSecsPerRep}
      onExerciseStart={() => setMode('exercise')}
    />
  );

  const getExerciseMode = () => (
    <ExerciseMode
      totalReps={totalReps}
      secsPerRep={secsPerRep}
      onExerciseStop={() => setMode('settings')}
    />
  );

  return (
    <div className="App">
      {(mode === 'settings') ? getSettingsMode() : getExerciseMode()}
    </div>
  );
}

export default App;
