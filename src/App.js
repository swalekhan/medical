import { useEffect, useState } from 'react';
import './App.css';

import Sidebar from './components/Layout/Sidebar';
import Playlist from './components/Playlist/Playlist';
import Song from './components/Song/Song';
import { useAppContext } from './context/Provider';

function App() {
  const { randomColor } = useAppContext()

  return (
    <div className="App container" style={{ backgroundColor: randomColor }}>
      <Sidebar />
      <Playlist />
      <Song />
    </div>
  );
}

export default App;
