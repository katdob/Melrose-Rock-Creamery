import React, { useEffect, useState } from 'react'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import IceCream from '../assets/ice-cream.svg'
import NewsletterPopup from '../components/NewsletterPopup.ts'
import { getAuthSession } from '../api_calls/GETAuthSession.ts'
import { postLogIn } from '../api_calls/POSTLogIn.ts'
import { postLogOut } from '../api_calls/POSTLogOut.ts'
import { postResetPassword } from '../api_calls/POSTResetPassword.ts'
import { clearUserSession, useUserSession } from '../query/userSession.ts'
import { consumeLoginPopupRequest, subscribeLoginPopupRequests } from '../auth/loginPopupRequest.ts'
import '../App.css'

function MainLayout(): React.ReactElement {
  const { data: userSession } = useUserSession()
  const [showPopup, setShowPopup] = useState<boolean>(true)
  const [showLogInPopup, setShowLogInPopup] = useState<boolean>(false)
  const [showLogOutPopup, setShowLogOutPopup] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logInError, setLogInError] = useState('')
  const [logInSuccess, setLogInSuccess] = useState('')
  const [resetPasswordMessage, setResetPasswordMessage] = useState('')
  const [logOutError, setLogOutError] = useState('')

  useEffect(() => {
    const openRequestedLoginPopup = () => {
      if (!consumeLoginPopupRequest()) return
      setLogInError('')
      setLogInSuccess('')
      setResetPasswordMessage('')
      setShowLogInPopup(true)
    }

    openRequestedLoginPopup()
    return subscribeLoginPopupRequests(openRequestedLoginPopup)
  }, [])

  useEffect(() => {
    let cancelled = false

    const hydrateSession = async () => {
      try {
        await getAuthSession()
        if (cancelled) return
      } catch {
        if (!cancelled) clearUserSession()
      }
    }

    void hydrateSession()
    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmitLogIn = async () => {
    setLogInError('')
    setLogInSuccess('')
    setIsLoggingIn(true)
    try {
      await postLogIn(email.trim(), password)
      setLogInSuccess('Log in successful.')
      window.setTimeout(() => {
        setShowLogInPopup(false)
        setEmail('')
        setPassword('')
        setLogInSuccess('')
      }, 2000)
    } catch {
      setLogInError('Log in was not successful. Please try again.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleResetPassword = async () => {
    setLogInError('')
    setLogInSuccess('')
    setResetPasswordMessage('')
    try {
      const data = await postResetPassword(email.trim())
      setResetPasswordMessage(data.message)
    } catch (err) {
      setLogInError(err instanceof Error ? err.message : 'Failed to request password reset.')
    }
  }

  const handleLogOut = async () => {
    if (!userSession?.email) {
      setLogOutError('No logged in user found.')
      return
    }

    setLogOutError('')
    setIsLoggingOut(true)
    try {
      await postLogOut(userSession.email)
      setShowLogOutPopup(false)
    } catch {
      setLogOutError('Log out was not successful. Please try again.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return React.createElement(
    React.Fragment,
    null,
    showPopup
      ? React.createElement(NewsletterPopup, { onClose: () => setShowPopup(false) })
      : null,
    showLogInPopup
      ? React.createElement(
          'div',
          { className: 'popup-overlay', role: 'dialog', 'aria-labelledby': 'login-popup-title' },
          React.createElement(
            'div',
            { className: 'popup-container login-popup-container' },
            React.createElement(
              'div',
              { className: 'popup-content login-popup-content' },
              React.createElement('h2', { id: 'login-popup-title' }, 'Log in'),
              React.createElement(
                'div',
                { className: 'popup-form-group' },
                React.createElement('label', { htmlFor: 'login-email' }, 'Email'),
                React.createElement('input', {
                  id: 'login-email',
                  type: 'email',
                  value: email,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
                }),
              ),
              React.createElement(
                'div',
                { className: 'popup-form-group' },
                React.createElement('label', { htmlFor: 'login-password' }, 'Password'),
                React.createElement('input', {
                  id: 'login-password',
                  type: 'password',
                  value: password,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
                }),
              ),
              React.createElement(
                'button',
                {
                  type: 'button',
                  className: 'login-reset-link',
                  onClick: () => void handleResetPassword(),
                  disabled: isLoggingIn,
                },
                'Click here to reset your password.',
              ),
              isLoggingIn
                ? React.createElement(
                    'div',
                    { className: 'login-loading-row' },
                    React.createElement('span', { className: 'login-spinner', 'aria-hidden': 'true' }),
                  )
                : null,
              resetPasswordMessage
                ? React.createElement('div', { className: 'add-recipe-success', role: 'status' }, resetPasswordMessage)
                : null,
              logInSuccess
                ? React.createElement('div', { className: 'add-recipe-success', role: 'status' }, logInSuccess)
                : null,
              logInError
                ? React.createElement('div', { className: 'add-recipe-error', role: 'alert' }, logInError)
                : null,
              React.createElement(
                'div',
                { className: 'login-popup-actions' },
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    className: 'popup-submit',
                    onClick: () => void handleSubmitLogIn(),
                    disabled: isLoggingIn,
                  },
                  'Submit',
                ),
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    className: 'add-ingredient-btn',
                    onClick: () => {
                      setShowLogInPopup(false)
                      setLogInError('')
                      setLogInSuccess('')
                      setResetPasswordMessage('')
                      setIsLoggingIn(false)
                    },
                    disabled: isLoggingIn,
                  },
                  'Close',
                ),
              ),
            ),
          ),
        )
      : null,
    showLogOutPopup
      ? React.createElement(
          'div',
          { className: 'popup-overlay', role: 'dialog', 'aria-labelledby': 'logout-popup-title' },
          React.createElement(
            'div',
            { className: 'popup-container login-popup-container' },
            React.createElement(
              'div',
              { className: 'popup-content login-popup-content' },
              React.createElement('h2', { id: 'logout-popup-title' }, 'Log out'),
              React.createElement('p', null, 'Do you want to log out?'),
              logOutError
                ? React.createElement('div', { className: 'add-recipe-error', role: 'alert' }, logOutError)
                : null,
              React.createElement(
                'div',
                { className: 'login-popup-actions' },
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    className: 'popup-submit',
                    onClick: () => void handleLogOut(),
                    disabled: isLoggingOut,
                  },
                  isLoggingOut ? 'Logging out...' : 'Log out',
                ),
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    className: 'add-ingredient-btn',
                    onClick: () => {
                      setShowLogOutPopup(false)
                      setLogOutError('')
                    },
                    disabled: isLoggingOut,
                  },
                  'Close',
                ),
              ),
            ),
          ),
        )
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
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'tab login-tab-btn',
          onClick: () => {
            if (userSession?.isLoggedIn) {
              setLogOutError('')
              setShowLogOutPopup(true)
            } else {
              setLogInError('')
              setLogInSuccess('')
              setResetPasswordMessage('')
              setShowLogInPopup(true)
            }
          },
        },
        userSession?.isLoggedIn ? `Logged in as ${userSession.firstName}` : 'Log in',
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

