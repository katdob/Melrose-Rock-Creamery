import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="about">
        <p className="confirmation-message">
          After your email is confirmed your message will be sent to our team. Please check your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="about">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message ({formData.message.length}/500)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            maxLength={500}
            rows={5}
            required
          />
        </div>
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Contact;
