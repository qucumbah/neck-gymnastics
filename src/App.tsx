import React, { useEffect, useState } from 'react';
import './App.css';

import SettingsMode from './SettingsMode';
import ExerciseMode from './ExerciseMode';

function App() {
  const [mode, setMode] = useState<'exercise' | 'settings' | 'no-wake-lock'>('settings');

  useEffect(() => {
    // Navigator types are hopelessly outdated
    const anyNavigator = navigator as any;
    if (!('wakeLock' in anyNavigator)) {
      setMode('no-wake-lock');
      return;
    }

    anyNavigator.wakeLock.request('screen')
      .then(() => setMode('settings'))
      .catch(() => setMode('no-wake-lock'));
  }, []);

  const [totalReps, setTotalReps] = useState(10);
  const [secsPerRep, setSecsPerRep] = useState(10);

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

  const getMode = () => {
    switch (mode) {
      case 'settings': return getSettingsMode();
      case 'exercise': return getExerciseMode();
      case 'no-wake-lock': return <div className="flex-column">Failed to aquire wake lock. Try to reload your page</div>;
    }
  };

  return (
    <div className="App">
      {getMode()}
    </div>
  );
}

export default App;
