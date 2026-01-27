import { useState } from 'react'
import IceCream from './assets/ice-cream.svg'
import About from './screens/About'
import Membership from './screens/Membership'
import Contact from './screens/Contact'
import Recipes from './screens/Recipes'
import Menu from './screens/Menu'
import './App.css'

function App() {
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
        {activeTab === 'menu' && <Menu />}
        {activeTab === 'about' && <About onNavigate={setActiveTab} />}
        {activeTab === 'membership' && <Membership />}
        {activeTab === 'contact' && <Contact />}
        {activeTab === 'recipes' && <Recipes />}
      </div>
      <footer className="footer">
        <span 
          className="footer-link" 
          onClick={() => setActiveTab('contact')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setActiveTab('contact')}
        >
          Contact the MRC team
        </span>
      </footer>
    </>
  )
}

export default App
