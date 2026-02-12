import { useState } from 'react'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import IceCream from '../assets/ice-cream.svg'
import NewsletterPopup from '../components/NewsletterPopup'
import '../App.css'

function MainLayout() {
  const [showPopup, setShowPopup] = useState(true)

  return (
    <>
      {showPopup && <NewsletterPopup onClose={() => setShowPopup(false)} />}
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
        <Link to="/menu" activeProps={{ className: 'tab tab--active' }} inactiveProps={{ className: 'tab' }}>
          Menu
        </Link>
        <Link to="/recipes" activeProps={{ className: 'tab tab--active' }} inactiveProps={{ className: 'tab' }}>
          Recipes
        </Link>
        <Link to="/about" activeProps={{ className: 'tab tab--active' }} inactiveProps={{ className: 'tab' }}>
          About
        </Link>
        <Link to="/membership" activeProps={{ className: 'tab tab--active' }} inactiveProps={{ className: 'tab' }}>
          Membership
        </Link>
      </div>
      <div className="card">
        <Outlet />
      </div>
      <footer className="footer">
        <Link to="/contact" className="footer-link">
          Contact the MRC team
        </Link>
      </footer>
    </>
  )
}

export const Route = createFileRoute('/_main')({
  component: MainLayout,
})
