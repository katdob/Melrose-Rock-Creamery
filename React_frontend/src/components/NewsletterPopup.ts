import React, { useState } from 'react';
import popupImage from '../assets/pop-up.jpg';

type NewsletterPopupProps = {
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
};

const NewsletterPopup = ({ onClose }: NewsletterPopupProps): React.ReactElement => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof FormData]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return React.createElement(
    'div',
    { className: 'popup-overlay' },
    React.createElement(
      'div',
      { className: 'popup-container' },
      React.createElement(
        'button',
        {
          className: 'popup-close',
          onClick: onClose,
          'aria-label': 'Close popup',
        },
        '×',
      ),
      React.createElement(
        'div',
        { className: 'popup-image' },
        React.createElement('img', {
          src: popupImage,
          alt: 'Delicious ice cream',
        }),
      ),
      React.createElement(
        'div',
        { className: 'popup-content' },
        submitted
          ? React.createElement(
              'div',
              { className: 'popup-success' },
              React.createElement('h2', null, 'Thank you!'),
              React.createElement('p', null, "You've been added to our newsletter."),
            )
          : React.createElement(
              React.Fragment,
              null,
              React.createElement('h2', null, 'Welcome to Melrose Rock Creamery!'),
              React.createElement('p', null, 'Please sign up for our newsletter.'),
              React.createElement(
                'form',
                { onSubmit: handleSubmit, className: 'popup-form' },
                React.createElement(
                  'div',
                  { className: 'popup-form-group' },
                  React.createElement('label', { htmlFor: 'popup-name' }, 'Name'),
                  React.createElement('input', {
                    type: 'text',
                    id: 'popup-name',
                    name: 'name',
                    value: formData.name,
                    onChange: handleChange,
                    required: true,
                    onInvalid: (e: React.InvalidEvent<HTMLInputElement>) => {
                      e.currentTarget.setCustomValidity('Please enter your name.');
                    },
                    onInput: (e: React.FormEvent<HTMLInputElement>) => {
                      e.currentTarget.setCustomValidity('');
                    },
                  }),
                ),
                React.createElement(
                  'div',
                  { className: 'popup-form-group' },
                  React.createElement('label', { htmlFor: 'popup-email' }, 'Email'),
                  React.createElement('input', {
                    type: 'email',
                    id: 'popup-email',
                    name: 'email',
                    value: formData.email,
                    onChange: handleChange,
                    required: true,
                    onInvalid: (e: React.InvalidEvent<HTMLInputElement>) => {
                      e.currentTarget.setCustomValidity('Please enter your email.');
                    },
                    onInput: (e: React.FormEvent<HTMLInputElement>) => {
                      e.currentTarget.setCustomValidity('');
                    },
                  }),
                ),
                React.createElement(
                  'button',
                  { type: 'submit', className: 'popup-submit' },
                  'Sign Up',
                ),
              ),
            ),
      ),
    ),
  );
};

export default NewsletterPopup;

