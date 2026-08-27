import React, { useState } from 'react';
import { Button } from '../';

const FormOne = ({ className, title, btnText }) => {

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        alert(
          data.message ||
          'Something went wrong. Please try again.'
        );
      }

    } catch (error) {
      console.error('Form submission error:', error);

      alert(
        'Unable to submit your request. Please try again.'
      );
    }

    setIsSubmitting(false);
  };


  // -----------------------------
  // SUCCESS MESSAGE
  // -----------------------------

 if (isSuccess) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 20px',
        background: '#f5f7fb'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          background: '#ffffff',
          borderRadius: '16px',
          padding: '55px 40px',
          textAlign: 'center',
          boxShadow: '0 15px 45px rgba(15, 35, 70, 0.10)',
          border: '1px solid #e9edf5'
        }}
      >

        {/* Success Icon */}
        <div
          style={{
            width: '78px',
            height: '78px',
            margin: '0 auto 25px',
            borderRadius: '50%',
            background: '#1264ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(18, 100, 255, 0.25)'
          }}
        >
          <i
            className="fal fa-check"
            style={{
              fontSize: '42px',
              color: '#ffffff',
              lineHeight: 1
            }}
          />
        </div>

        {/* Heading */}
        <h2
          style={{
            margin: '0 0 15px',
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '1.25',
            color: '#111827'
          }}
        >
          Thank You for Contacting Indieur
        </h2>

        {/* Message */}
        <p
          style={{
            margin: '0 auto 30px',
            maxWidth: '560px',
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#667085'
          }}
        >
          Your growth requirement has been received successfully.
          Our team will review the information and contact you
          using the details provided.
        </p>

        {/* Return Home Button */}
        {/* <Button
          onclick={() => {
            window.location.href = '/';
          }}
          className="style5"
        >
          Return to Home
          <i
            className="far fa-arrow-right"
            style={{
              marginLeft: '10px'
            }}
          />
        </Button> */}

      </div>
    </div>
  );
}


  // -----------------------------
  // FORM
  // -----------------------------

  return (
    <form
      className={`form-style1 ${className || ''}`}
      action="https://api.web3forms.com/submit"
      method="POST"
      onSubmit={handleSubmit}
    >

      {/* Web3Forms Access Key */}
      <input
        type="hidden"
        name="access_key"
        value="9015df3b-8397-41eb-849c-ab499f677b46"
      />

      {/* Email Subject */}
      <input
        type="hidden"
        name="subject"
        value="New Growth Requirement Enquiry – Indieur"
      />

      {/* Sender Name */}
      <input
        type="hidden"
        name="from_name"
        value="Indieur Website – Growth Requirement Form"
      />

      {/* Spam Protection */}
      <input
        type="checkbox"
        name="botcheck"
        style={{ display: 'none' }}
      />

      <h2 className="form-title h4">
        {title}
      </h2>


      {/* Full Name */}
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Enter Full Name"
          required
        />
      </div>


      {/* Email */}
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
      </div>


      {/* Appointment Subject */}
      <div className="form-group">
        <input
          type="text"
          name="appointment_subject"
          placeholder="Appointment Subject"
          required
        />
      </div>


      {/* Appointment Date */}
      <div className="form-group">
        <input
          type="date"
          name="appointment_date"
          min={today}
          required
          style={{
            width: '100%'
          }}
        />
      </div>


      {/* Message */}
      <div className="form-group">
        <textarea
          name="message"
          placeholder="Write a short message..."
          required
        />
      </div>


      {/* Submit Button */}
      <div className="form-btn">

        <Button
          className="style5"
          type="submit"
        >
          {isSubmitting ? 'Submitting...' : btnText}

          {!isSubmitting && (
            <i className="far fa-arrow-right" />
          )}
        </Button>

      </div>

    </form>
  );
};

export default FormOne;