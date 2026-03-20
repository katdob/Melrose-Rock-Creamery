import React from 'react'
import { Link } from '@tanstack/react-router'

const About = (): React.ReactElement => {
  return React.createElement(
    'div',
    { className: 'about' },

    React.createElement(
      'div',
      { className: 'content-scroll' },
      
      React.createElement(
        'p',
        { id: 'welcome-text' },
        'Welcome to Melrose Rock Creamery!',
      ),
      
      React.createElement(
        'p',
        { id: 'description-text' },
        "We are more than a make-believe ice cream shop. We're also your local makerspace, but for frozen treats! You can make and sell your ice cream here in a pop-up format. Or, you can make your recipes for our Super Scoopers to serve to customers. This includes milkshakes, sundaes, floats, and more.",
      ),
      
      React.createElement(
        'p', 
        { id: 'hours-text' },
        'Our tasting room is open from 10am - 2pm and 6pm - 11pm every day.'
      ),
      
      React.createElement(
        'p',
        { id: 'membership-text' },
        'To use the purely fictional facilities at Melrose Rock Creamery, you must be a member. ',
        'We charge a monthly membership fee. See the details of using our kitchen ',
        React.createElement(Link, { to: '/membership', className: 'highlight-link' }, 'here'),
        '.',
      ),
      
      React.createElement(
        'p',
        { id: 'rqa-text' },
        'We also have ',
        
        React.createElement('span', { className: 'highlight-link' }, 'rules'),
        ' and ',
        
        React.createElement('span', { className: 'highlight-link' }, 'qualifications'),
        ' that you must abide by to be a member. ',
        
        React.createElement('span', { className: 'highlight-link' }, 'Apply now'),
        '!',
      ),
    ),
  )
}

export default About

