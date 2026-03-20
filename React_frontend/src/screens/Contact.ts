import React, { useState } from 'react'

type ContactFormData = {
  email: string
  name: string
  message: string
}

const Contact = (): React.ReactElement => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    name: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'message' && value.length > 500) return
    setFormData((prev) => ({ ...prev, [name as keyof ContactFormData]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return React.createElement(
      'div',
      { className: 'about' },
      React.createElement(
        'p',
        { className: 'confirmation-message' },
        'After your email is confirmed your message will be sent to our team. Please check your inbox.',
      ),
    )
  }

  return React.createElement(
    'div',
    { className: 'about' },
    React.createElement('h2', null, 'Contact Us'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit, className: 'contact-form' },
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('label', { htmlFor: 'name' }, 'Name'),
        React.createElement('input', {
          type: 'text',
          id: 'name',
          name: 'name',
          value: formData.name,
          onChange: handleChange,
          onInvalid: (e: any) =>
            e?.target?.setCustomValidity?.('Please enter your name'),
          onInput: (e: any) => e?.target?.setCustomValidity?.(''),
          required: true,
        }),
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('label', { htmlFor: 'email' }, 'Email'),
        React.createElement('input', {
          type: 'email',
          id: 'email',
          name: 'email',
          value: formData.email,
          onChange: handleChange,
          onInvalid: (e: any) =>
            e?.target?.setCustomValidity?.('Please enter your email'),
          onInput: (e: any) => e?.target?.setCustomValidity?.(''),
          required: true,
        }),
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          { htmlFor: 'message' },
          `Message (${formData.message.length}/500)`,
        ),
        React.createElement('textarea', {
          id: 'message',
          name: 'message',
          value: formData.message,
          onChange: handleChange,
          onInvalid: (e: any) =>
            e?.target?.setCustomValidity?.(
              'Please complete your message to our team.',
            ),
          onInput: (e: any) => e?.target?.setCustomValidity?.(''),
          maxLength: 500,
          rows: 5,
          required: true,
        }),
      ),
      React.createElement(
        'button',
        { type: 'submit', className: 'send-button' },
        'Send',
      ),
    ),
  )
}

export default Contact

