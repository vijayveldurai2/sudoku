import { useEffect } from 'react'

import './App.css'
import Board from './components/Board';

function App() {
  useEffect(() => {
    document.title = 'App';
  }, [])

  return (
    <>
      <h1>App</h1>
      <Board />
    </>
  )
}

export default App
