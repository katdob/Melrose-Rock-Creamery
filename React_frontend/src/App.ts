import React, { useState } from 'react'
import IceCream from './assets/ice-cream.svg'
import About from './screens/About'
import Membership from './screens/Membership'
import Contact from './screens/Contact'
import Recipes from './screens/Recipes'
import Menu from './screens/Menu'
import NewsletterPopup from './components/NewsletterPopup.ts'
import './App.css'

type Tab = 'menu' | 'recipes' | 'about' | 'membership' | 'contact'

function App(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<Tab>('menu')
  const [showPopup, setShowPopup] = useState<boolean>(true)

  return React.createElement(
    React.Fragment,
    null,
    showPopup
      ? React.createElement(NewsletterPopup, { onClose: () => setShowPopup(false) })
      : null,
    React.createElement(
      'div',
      { className: 'top-inline' },
      React.createElement('img', {
        id: 'ice-cream-cone-icon',
        src: IceCream,
        alt: 'Ice Cream',
        style: { height: '10rem', width: '10rem' },
      }),
      React.createElement(
        'div',
        { className: 'header-with-underline' },
        React.createElement('h1', { id: 'MRC-header' }, 'Melrose Rock Creamery'),
        React.createElement('span', { className: 'h1-underline', 'aria-hidden': 'true' }),
      ),
    ),
    React.createElement(
      'div',
      { className: 'tabs' },
      React.createElement(
        'button',
        {
          type: 'button',
          className: `tab ${activeTab === 'menu' ? 'tab--active' : ''}`,
          onClick: () => setActiveTab('menu'),
        },
        'Menu',
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          className: `tab ${activeTab === 'recipes' ? 'tab--active' : ''}`,
          onClick: () => setActiveTab('recipes'),
        },
        'Recipes',
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          className: `tab ${activeTab === 'about' ? 'tab--active' : ''}`,
          onClick: () => setActiveTab('about'),
        },
        'About',
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          className: `tab ${activeTab === 'membership' ? 'tab--active' : ''}`,
          onClick: () => setActiveTab('membership'),
        },
        'Membership',
      ),
    ),
    React.createElement(
      'div',
      { className: 'card' },
      activeTab === 'menu' ? React.createElement(Menu, null) : null,
      activeTab === 'about' ? React.createElement(About, { onNavigate: setActiveTab }) : null,
      activeTab === 'membership' ? React.createElement(Membership, null) : null,
      activeTab === 'contact' ? React.createElement(Contact, null) : null,
      activeTab === 'recipes' ? React.createElement(Recipes, null) : null,
    ),
    React.createElement(
      'footer',
      { className: 'footer' },
      React.createElement(
        'span',
        {
          className: 'footer-link',
          onClick: () => setActiveTab('contact'),
          role: 'button',
          tabIndex: 0,
          onKeyDown: (e: React.KeyboardEvent<HTMLSpanElement>) =>
            e.key === 'Enter' && setActiveTab('contact'),
        },
        'Contact the MRC team',
      ),
    ),
  )
}

export default App

