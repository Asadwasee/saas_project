import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setFormData(initialState);
    }
  };

  return (
    <section className="section-block">
      <div className="section-head">
        <p className="eyebrow">Contact</p>
        <h1>Talk to the Codecelix team</h1>
      </div>

      <div className="contact-grid">
        <div className="map-shell">
          <h3>Our Location</h3>
          <div className="map-frame">
            <iframe
              title="Codecelix map"
              src="https://www.google.com/maps?q=New%20York%20City&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form className="form-shell" onSubmit={handleSubmit} noValidate>
          <h3>Send a Message</h3>

          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            placeholder="Your name"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            placeholder="you@company.com"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="5"
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            placeholder="Tell us what you need"
          />
          {errors.message && <p className="error-text">{errors.message}</p>}

          <button className="btn btn-solid" type="submit">
            Send Message
          </button>
          {submitted && <p className="success-text">Message sent successfully.</p>}
        </form>
      </div>
    </section>
  );
}

