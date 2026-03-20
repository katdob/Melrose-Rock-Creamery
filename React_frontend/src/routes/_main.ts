import React, { useState } from 'react'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import IceCream from '../assets/ice-cream.svg'
import NewsletterPopup from '../components/NewsletterPopup.ts'
import '../App.css'

function MainLayout(): React.ReactElement {
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
        src: IceCream,
        alt: 'Ice Cream',
        style: { height: '10rem', width: '10rem' },
      }),
      React.createElement(
        'div',
        { className: 'header-with-underline' },
        React.createElement('h1', null, 'Melrose Rock Creamery'),
        React.createElement('span', { className: 'h1-underline', 'aria-hidden': 'true' }),
      ),
    ),
    React.createElement(
      'div',
      { className: 'tabs' },
      React.createElement(
        Link,
        {
          to: '/menu',
          activeProps: { className: 'tab tab--active' },
          inactiveProps: { className: 'tab' },
        },
        'Menu',
      ),
      React.createElement(
        Link,
        {
          to: '/recipes',
          activeProps: { className: 'tab tab--active' },
          inactiveProps: { className: 'tab' },
        },
        'Recipes',
      ),
      React.createElement(
        Link,
        {
          to: '/about',
          activeProps: { className: 'tab tab--active' },
          inactiveProps: { className: 'tab' },
        },
        'About',
      ),
      React.createElement(
        Link,
        {
          to: '/membership',
          activeProps: { className: 'tab tab--active' },
          inactiveProps: { className: 'tab' },
        },
        'Membership',
      ),
    ),
    React.createElement('div', { className: 'card' }, React.createElement(Outlet, null)),
    React.createElement(
      'footer',
      { className: 'footer' },
      React.createElement(
        Link,
        { to: '/contact', className: 'footer-link' },
        'Contact the MRC team',
      ),
    ),
  )
}

export const Route = createFileRoute('/_main')({
  component: MainLayout,
})

