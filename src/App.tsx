import React from 'react'
import NewMaze from './components/NewMaze'
import Maze from './components/Maze'

const App: React.FC = () => {
  const [mazeId, setMazeId] = React.useState<string | null>(() => sessionStorage.getItem('mazeId'))
  const [currentView, setCurrentView] = React.useState(() =>
    mazeId === null ? 'NEW_MAZE' : 'MAZE'
  )
  return (
    <div className='container'>
      <div className='top'>
        <button onClick={e => setCurrentView(view => (view === 'MAZE' ? 'NEW_MAZE' : 'MAZE'))}>
          {currentView === 'MAZE' ? <>New Maze &rarr;</> : <>&larr; Maze</>}
        </button>
      </div>
      {currentView === 'MAZE' && <Maze id={mazeId} />}
      {currentView !== 'MAZE' && <NewMaze setMaze={setMazeId} changeView={setCurrentView} />}
    </div>
  )
}

export default App
