import { useState } from 'react'
import IceCream from './assets/ice-cream.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('menu')

  return (
    <>
      <div className="top-inline">
        <img 
          src={IceCream} 
          alt="Ice Cream" 
          style={{ height: '10rem', width: '10rem' }} 
        />
        <div className="header-with-underline">
          <h1>Melrose Rock Creamery</h1>
          <span className="h1-underline" aria-hidden="true" />
        </div>
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a> */}
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
        {/* <svg version="1.2" width="200" height="200">
          <use href="./assets/ice-cream.svg#ice-cream" />
        </svg> */}
      </div>
      <div className="tabs">
        <button
          type="button"
          className={`tab ${activeTab === 'menu' ? 'tab--active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button
          type="button"
          className={`tab ${activeTab === 'recipes' ? 'tab--active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          Recipes
        </button>
        <button
          type="button"
          className={`tab ${activeTab === 'about' ? 'tab--active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button
          type="button"
          className={`tab ${activeTab === 'membership' ? 'tab--active' : ''}`}
          onClick={() => setActiveTab('membership')}
        >
          Membership
        </button>
      </div>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      </div>
    </>
  )
}

export default App
