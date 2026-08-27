import React, { useState } from 'react';
import { Button } from '../';

const FormFive = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [consent, setConsent] = useState(false);
const formHandle = async (event) => {
  event.preventDefault();

  setErrorMessage('');

  // Validate consent manually
  if (!consent) {
    setErrorMessage(
      'Please agree to the consent statement before submitting the form.'
    );
    return;
  }

  setIsSubmitting(true);

  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(
      'https://api.web3forms.com/submit',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      setIsSuccess(true);
      setConsent(false);
      form.reset();
    } else {
      setErrorMessage(
        data.message || 'Something went wrong. Please try again.'
      );
    }
  } catch (error) {
    setErrorMessage(
      'Unable to send your enquiry. Please try again.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  

  if (isSuccess) {
    return (
      <div className="vs-contact-form">
        <div className="row gx-20">
          <div className="col-12 text-center">
            <i
              className="fal fa-check-circle"
              style={{ fontSize: '50px', marginBottom: '20px' }}
            />

            <h3 className="h4">
              Thank You for Contacting Indieur
            </h3>

            <p>
              Your enquiry has been received. Our team will review the
              information and contact you using the details provided.
            </p>

            <Button
              onclick={() => {
                window.location.href = '/';
              }}
            >
              Return to Home
              <i className="far fa-arrow-right" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      className="vs-contact-form"
      action="https://api.web3forms.com/submit"
      method="POST"
      onSubmit={formHandle}
    >
      {/* Web3Forms Access Key */}
      <input
        type="hidden"
        name="access_key"
        value="9015df3b-8397-41eb-849c-ab499f677b46"
      />

      <input
        type="hidden"
        name="subject"
        value="New Enquiry - Indieur Website"
      />

      <input
        type="hidden"
        name="from_name"
        value="Indieur Website Contact Form"
      />

      <div className="row gx-20">

        {/* Full Name */}
        <div className="col-md-6 form-group">
          <input
            type="text"
            name="Full Name"
            placeholder="Full name"
            required
          />
          <i className="fal fa-user" />
        </div>

        {/* Business Name */}
        <div className="col-md-6 form-group">
          <input
            type="text"
            name="Business Name"
            placeholder="Business name"
            required
          />
          <i className="fal fa-building" />
        </div>

        {/* Email */}
        <div className="col-md-6 form-group">
          <input
            type="email"
            name="Email Address"
            placeholder="Email address"
            required
          />
          <i className="fal fa-envelope" />
        </div>

        {/* Phone */}
        <div className="col-md-6 form-group">
          <input
            type="tel"
            name="Phone / WhatsApp Number"
            placeholder="Phone / WhatsApp Number"
            required
          />
          <i className="fal fa-phone-alt" />
        </div>

        {/* Website / Social */}
        <div className="col-12 form-group">
          <input
            type="text"
            name="Website or Social Profile"
            placeholder="Website or social media link"
          />
          <i className="fal fa-link" />
        </div>

        {/* Business Category */}
        <div className="col-md-6 form-group">
          <select
            name="Business Category"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select your business category
            </option>
            <option value="Ecommerce / D2C">
              Ecommerce / D2C
            </option>
            <option value="Local Business">
              Local Business
            </option>
            <option value="Healthcare">
              Healthcare
            </option>
            <option value="Automotive">
              Automotive
            </option>
            <option value="Education">
              Education
            </option>
            <option value="B2B / Manufacturing">
              B2B / Manufacturing
            </option>
            <option value="Professional Services">
              Professional Services
            </option>
            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* Primary Requirement */}
        <div className="col-md-6 form-group">
          <select
            name="Primary Requirement"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="Growth Strategy & Consulting">
              Growth Strategy & Consulting
            </option>
            <option value="Meta Ads Management">
              Meta Ads Management
            </option>
            <option value="Google Ads Management">
              Google Ads Management
            </option>
            <option value="Search Engine Optimisation">
              Search Engine Optimisation
            </option>
            <option value="Social Media & Content Marketing">
              Social Media & Content Marketing
            </option>
            <option value="WhatsApp Marketing & Automation">
              WhatsApp Marketing & Automation
            </option>
            <option value="Email, SMS & Retention Marketing">
              Email, SMS & Retention Marketing
            </option>
            <option value="Analytics, Tracking & Reporting">
              Analytics, Tracking & Reporting
            </option>
            <option value="Ecommerce Growth Management">
              Ecommerce Growth Management
            </option>
            <option value="Lead Generation & Conversion Optimisation">
              Lead Generation & Conversion Optimisation
            </option>
            <option value="Not Sure - Need a Recommendation">
              Not Sure - Need a Recommendation
            </option>
          </select>
        </div>

        {/* Current Marketing Status */}
        <div className="col-12 form-group">
          <select
            name="Current Marketing Status"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select the closest option
            </option>
            <option value="We are starting digital marketing">
              We are starting digital marketing
            </option>
            <option value="We currently manage marketing internally">
              We currently manage marketing internally
            </option>
            <option value="We are working with another agency or freelancer">
              We are working with another agency or freelancer
            </option>
            <option value="We are running Ads but need better clarity">
              We are running Ads but need better clarity
            </option>
            <option value="We need help with one specific service">
              We need help with one specific service
            </option>
            <option value="We need a coordinated growth plan">
              We need a coordinated growth plan
            </option>
          </select>
        </div>

        {/* Message */}
        <div className="col-12 form-group">
          <textarea
            name="Message"
            placeholder="Tell us about your business, current marketing activities, biggest challenge and what you would like to improve."
            required
          />
        </div>

{/* Consent */}
<div className="col-12 form-group">
  <label
    htmlFor="form-consent"
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      cursor: 'pointer',
      lineHeight: '1.6',
    }}
  >
    <input
      id="form-consent"
      type="checkbox"
      name="Form Consent"
      value="Agreed"
      checked={consent}
      onChange={(e) => setConsent(e.target.checked)}
      style={{
        appearance: 'auto',
        WebkitAppearance: 'checkbox',
        width: '18px',
        height: '18px',
        minWidth: '18px',
        margin: '3px 0 0 0',
        padding: 0,
        opacity: 1,
        visibility: 'visible',
        position: 'static',
        display: 'inline-block',
      }}
    />

    <span>
      By submitting this form, you agree that Indieur may contact you
      regarding your enquiry. Your information will be used only to
      understand and respond to your request, subject to our Privacy Policy.
    </span>
  </label>
</div>

        {/* Error */}
        {errorMessage && (
          <div className="col-12 form-group">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Submit */}
        <div className="col-12">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Enquiry'}
            <i className="far fa-arrow-right" />
          </Button>
        </div>

      </div>
    </form>
  );
};

export default FormFive;