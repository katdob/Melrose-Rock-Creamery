import React from 'react'
import { Link } from '@tanstack/react-router'

const Membership = (): React.ReactElement => {
  return React.createElement(
    'div',
    { className: 'about' },
    React.createElement(
      'div',
      { className: 'content-scroll' },
      React.createElement(
        'p',
        null,
        'With a membership at Melrose Rock Creamery, you will gain access to all of our machines.',
      ),
      React.createElement(
        'p',
        null,
        'Before using any of the machines, you will need to be trained. Training is included in your membership. Your membership also includes access to our expert team who will help you if you need more information. Please schedule your training ',
        React.createElement('span', { className: 'highlight-link' }, 'here'),
        '.',
      ),
      React.createElement(
        'p',
        null,
        'Our ',
        React.createElement('span', { className: 'highlight-link' }, 'online catalogue'),
        ' includes the manuals for all the machines in our kitchen. You can use our search feature to search our entire catalogue for any answers you may need.',
      ),
      React.createElement(
        'p',
        null,
        'To use our kitchen, you will need to schedule time. Please include 15 minutes at the end of each timeslot to clean up. You must leave the kitchen clean and ready for the next member. You can find the schedule ',
        React.createElement('span', { className: 'highlight-link' }, 'here'),
        '.',
      ),
      React.createElement(
        'p',
        null,
        'Your membership can optionally include access to a storage unit. You can use our hand trucks to take your equipment to and from this storage unit.',
      ),
      React.createElement(
        'p',
        null,
        'At Melrose Rock Creamery, we want you to be able to make anything you dream of. To help you with this, your membership includes access to a ',
        React.createElement(
          Link,
          {
            to: '/recipe-catalogue',
            className: 'highlight-link',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          'catalogue of recipes',
        ),
        ' from our community. Many recipes are available, along with comments from our members. This means that you can find your favorite recipes, and see some protips for those recipes from people who have made that recipe before.',
      ),
    ),
  )
}

export default Membership

