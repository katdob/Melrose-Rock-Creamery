import { useState } from 'react';
import popupImage from '../assets/pop-up.jpg';

const NewsletterPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose} aria-label="Close popup">
          ×
        </button>
        <div className="popup-image">
          <img src={popupImage} alt="Delicious ice cream" />
        </div>
        <div className="popup-content">
          {submitted ? (
            <div className="popup-success">
              <h2>Thank you!</h2>
              <p>You've been added to our newsletter.</p>
            </div>
          ) : (
            <>
              <h2>Welcome to Melrose Rock Creamery!</h2>
              <p>Please sign up for our newsletter.</p>
              <form onSubmit={handleSubmit} className="popup-form">
                <div className="popup-form-group">
                  <label htmlFor="popup-name">Name</label>
                  <input
                    type="text"
                    id="popup-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="popup-form-group">
                  <label htmlFor="popup-email">Email</label>
                  <input
                    type="email"
                    id="popup-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="popup-submit">Sign Up</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
