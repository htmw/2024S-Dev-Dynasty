import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import img from "../src/logo.png"

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
      <a href="#" target="_blank">
  <img 
    src={img} 
    className="logo" 
    alt="my logo"
    style={{ width: '200px', height: 'auto' }} 
  />
</a>
      </div>
      <h1>MoodSphere</h1>
      <h3>Created By DevDynasty</h3>
    </>
  )
}

export default App