import React, { useState } from 'react';
import { Button } from '../';

const FormOne = ({ className, title, btnText }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // =========================================================
  // GOOGLE APPS SCRIPT WEB APP URL
  // APPOINTMENT FORM
  // =========================================================
 const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbw_8XgvN1wYNCpSzo-2Ln3k4YeRD1pqjYm35GVVn7zvqiO__DF3Q2-XR51pAXQojp9fWQ/exec';
  // =========================================================
  // GET TODAY'S DATE
  // =========================================================
  const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      date.getDate()
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  // =========================================================
  // VALIDATE FORM
  // =========================================================
  const validateForm = (form) => {
    const newErrors = {};

    const name =
      form.elements['name']?.value.trim() || '';

    const email =
      form.elements['email']?.value.trim() || '';

    const subject =
      form.elements[
        'appointment_subject'
      ]?.value.trim() || '';

    const appointmentDate =
      form.elements[
        'appointment_date'
      ]?.value || '';

    const message =
      form.elements['message']?.value.trim() || '';

    // =======================================================
    // FULL NAME
    // =======================================================
    if (!name) {
      newErrors.name =
        'Please enter your full name.';
    } else if (name.length < 2) {
      newErrors.name =
        'Name must contain at least 2 characters.';
    } else if (
      !/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(name)
    ) {
      newErrors.name =
        'Please enter a valid name.';
    }

    // =======================================================
    // EMAIL
    // =======================================================
    if (!email) {
      newErrors.email =
        'Please enter your email address.';
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email
      )
    ) {
      newErrors.email =
        'Please enter a valid email address.';
    }

    // =======================================================
    // APPOINTMENT SUBJECT
    // =======================================================
    if (!subject) {
      newErrors.subject =
        'Please enter an appointment subject.';
    } else if (subject.length < 3) {
      newErrors.subject =
        'Subject must contain at least 3 characters.';
    }

    // =======================================================
    // APPOINTMENT DATE
    // =======================================================
    if (!appointmentDate) {
      newErrors.appointmentDate =
        'Please select an appointment date.';
    } else if (appointmentDate < today) {
      newErrors.appointmentDate =
        'Please select today or a future date.';
    }

    // =======================================================
    // MESSAGE
    // =======================================================
    if (!message) {
      newErrors.message =
        'Please enter a message.';
    } else if (message.length < 10) {
      newErrors.message =
        'Message must contain at least 10 characters.';
    } else if (message.length > 2000) {
      newErrors.message =
        'Message cannot exceed 2000 characters.';
    }

    return newErrors;
  };

  // =========================================================
  // CLEAR FIELD ERROR
  // =========================================================
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((previousErrors) => {
        const updatedErrors = {
          ...previousErrors
        };

        delete updatedErrors[fieldName];

        return updatedErrors;
      });
    }

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage('');

    const form = e.target;

    // =======================================================
    // VALIDATION
    // =======================================================
    const validationErrors =
      validateForm(form);

    setErrors(validationErrors);

    // =======================================================
    // STOP IF VALIDATION FAILS
    // =======================================================
    if (
      Object.keys(validationErrors).length > 0
    ) {
      const firstErrorField =
        Object.keys(validationErrors)[0];

      const fieldMap = {
        name: 'name',
        email: 'email',
        subject: 'appointment_subject',
        appointmentDate: 'appointment_date',
        message: 'message'
      };

      const fieldName =
        fieldMap[firstErrorField];

      if (
        fieldName &&
        form.elements[fieldName]
      ) {
        form.elements[fieldName].focus();
      }

      return;
    }

    // =======================================================
    // START SUBMITTING
    // =======================================================
    setIsSubmitting(true);

    // =======================================================
    // GET FORM VALUES
    // =======================================================
    const name =
      form.elements['name']?.value.trim() || '';

    const email =
      form.elements['email']?.value.trim() || '';

    const appointmentSubject =
      form.elements[
        'appointment_subject'
      ]?.value.trim() || '';

    const appointmentDate =
      form.elements[
        'appointment_date'
      ]?.value || '';

    const message =
      form.elements['message']?.value.trim() || '';

    // =======================================================
    // CREATE UNIQUE HIDDEN IFRAME
    // =======================================================
    const iframeName =
      `appointment_form_${Date.now()}`;

    const iframe =
      document.createElement('iframe');

    iframe.name = iframeName;

    iframe.id = iframeName;

    iframe.style.display = 'none';

    document.body.appendChild(iframe);

    // =======================================================
    // CREATE HIDDEN HTML FORM
    // =======================================================
    const googleForm =
      document.createElement('form');

    googleForm.method = 'POST';

    googleForm.action =
      GOOGLE_SCRIPT_URL;

    googleForm.target =
      iframeName;

    googleForm.style.display = 'none';

    // =======================================================
    // HELPER TO ADD HIDDEN INPUT
    // =======================================================
    const addHiddenInput = (
      name,
      value
    ) => {
      const input =
        document.createElement('input');

      input.type = 'hidden';

      input.name = name;

      input.value = value || '';

      googleForm.appendChild(input);
    };

    // =======================================================
    // ADD DATA
    // =======================================================
    addHiddenInput(
      'fullName',
      name
    );

    addHiddenInput(
      'email',
      email
    );

    addHiddenInput(
      'appointmentSubject',
      appointmentSubject
    );

    addHiddenInput(
      'appointmentDate',
      appointmentDate
    );

    addHiddenInput(
      'message',
      message
    );

    // =======================================================
    // ADD FORM TO DOCUMENT
    // =======================================================
    document.body.appendChild(
      googleForm
    );

    // =======================================================
    // SUBMIT
    // =======================================================
    try {
      googleForm.submit();

    } catch (error) {

      console.error(
        'Appointment submission error:',
        error
      );

      setIsSubmitting(false);

      setErrorMessage(
        'Unable to submit your request. Please try again.'
      );

      googleForm.remove();

      iframe.remove();

      return;
    }

    // =======================================================
    // CLEANUP + SUCCESS SCREEN
    //
    // We intentionally don't read the Apps Script response.
    // This avoids browser CORS problems.
    // =======================================================
    setTimeout(() => {

      googleForm.remove();

      iframe.remove();

      setIsSubmitting(false);

      setErrors({});

      form.reset();

      setIsSuccess(true);

    }, 2000);
  };

  // =========================================================
  // SUCCESS SCREEN
  // =========================================================
  if (isSuccess) {
    return (
      <>
        <style>{`

          /* =================================================
             SUCCESS WRAPPER
          ================================================= */

          .form-one-success {
            width: 100% !important;

            min-height: 100% !important;

            display: flex !important;

            align-items: center !important;

            justify-content: center !important;

            padding: 50px 20px !important;

            background: #f5f7fb !important;

            box-sizing: border-box !important;

            overflow: visible !important;
          }

          /* =================================================
             SUCCESS CARD
          ================================================= */

          .form-one-success-card {
            width: 100% !important;

            max-width: 700px !important;

            background: #ffffff !important;

            border-radius: 16px !important;

            padding: 55px 40px !important;

            text-align: center !important;

            box-shadow:
              0 15px 45px
              rgba(15, 35, 70, 0.10) !important;

            border:
              1px solid #e9edf5 !important;

            box-sizing: border-box !important;

            overflow: visible !important;
          }

          /* =================================================
             BLUE SUCCESS ICON
          ================================================= */

          .form-one-success-icon {
            width: 78px !important;

            height: 78px !important;

            min-width: 78px !important;

            min-height: 78px !important;

            margin: 0 auto 25px !important;

            border-radius: 50% !important;

            background: #1255E5 !important;

            display: flex !important;

            align-items: center !important;

            justify-content: center !important;

            box-shadow:
              0 10px 25px
              rgba(18, 85, 229, 0.25) !important;

            box-sizing: border-box !important;

            overflow: visible !important;
          }

          /* =================================================
             CHECK ICON
          ================================================= */

          .form-one-success-icon i {
            display: block !important;

            width: auto !important;

            height: auto !important;

            font-size: 42px !important;

            line-height: 1 !important;

            color: #ffffff !important;

            margin: 0 !important;

            padding: 0 !important;

            text-align: center !important;
          }

          /* =================================================
             SUCCESS HEADING
          ================================================= */

          .form-one-success-card h2 {
            display: block !important;

            width: 100% !important;

            max-width: 100% !important;

            margin: 0 auto 15px !important;

            padding: 0 !important;

            font-size: 32px !important;

            font-weight: 700 !important;

            line-height: 1.25 !important;

            color: #111827 !important;

            text-align: center !important;

            white-space: normal !important;

            overflow: visible !important;

            box-sizing: border-box !important;
          }

          /* =================================================
             SUCCESS MESSAGE
          ================================================= */

          .form-one-success-card p {
            display: block !important;

            width: 100% !important;

            max-width: 560px !important;

            margin: 0 auto 30px !important;

            padding: 0 !important;

            font-size: 16px !important;

            line-height: 1.8 !important;

            color: #667085 !important;

            text-align: center !important;

            white-space: normal !important;

            overflow: visible !important;

            box-sizing: border-box !important;
          }

          /* =================================================
             MOBILE SUCCESS SCREEN
          ================================================= */

          @media (max-width: 767px) {

            .form-one-success {
              padding: 30px 15px !important;
            }

            .form-one-success-card {
              width: 100% !important;

              max-width: 100% !important;

              padding: 40px 20px !important;

              border-radius: 12px !important;
            }

            .form-one-success-icon {
              width: 68px !important;

              height: 68px !important;

              min-width: 68px !important;

              min-height: 68px !important;

              margin-bottom: 20px !important;
            }

            .form-one-success-icon i {
              font-size: 36px !important;
            }

            .form-one-success-card h2 {
              font-size: 25px !important;

              line-height: 1.3 !important;

              margin-bottom: 14px !important;
            }

            .form-one-success-card p {
              font-size: 14px !important;

              line-height: 1.7 !important;

              margin-bottom: 25px !important;
            }

          }

        `}</style>

        <div className="form-one-success">

          <div className="form-one-success-card">

            {/* =================================================
                SUCCESS ICON
            ================================================= */}

            <div className="form-one-success-icon">

              <i className="fal fa-check" />

            </div>

            {/* =================================================
                SUCCESS TITLE
            ================================================= */}

            <h2>
              Thank You for Contacting Indieur
            </h2>

            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            <p>
              Your appointment request has
              been received successfully.
              Our team will review the
              information and contact you
              using the details provided.
            </p>

          </div>

        </div>
      </>
    );
  }

  // =========================================================
  // MAIN FORM
  // =========================================================
  return (
    <>
      <style>{`

        /* =================================================
           FORM WRAPPER
        ================================================= */

        .form-one-wrapper {
          width: 100%;
        }

        /* =================================================
           FORM GROUP
        ================================================= */

        .form-one-wrapper .form-group {
          position: relative;

          margin-bottom: 20px;
        }

        /* =================================================
           ERROR MESSAGE
        ================================================= */

        .form-one-wrapper .form-error {
          display: block;

          width: 100%;

          margin-top: 6px;

          padding-left: 2px;

          color: #dc3545;

          font-size: 13px;

          line-height: 1.4;

          font-weight: 500;

          box-sizing: border-box;
        }

        /* =================================================
           INVALID INPUT
        ================================================= */

        .form-one-wrapper
        input.input-error,

        .form-one-wrapper
        textarea.input-error {
          border-color: #dc3545 !important;
        }

        /* =================================================
           INVALID INPUT FOCUS
        ================================================= */

        .form-one-wrapper
        input.input-error:focus,

        .form-one-wrapper
        textarea.input-error:focus {

          border-color: #dc3545 !important;

          box-shadow:
            0 0 0 2px
            rgba(220, 53, 69, 0.08) !important;

          outline: none !important;
        }

        /* =================================================
           NORMAL FOCUS
        ================================================= */

        .form-one-wrapper
        input:focus,

        .form-one-wrapper
        textarea:focus {
          outline: none;
        }

        /* =================================================
           DATE INPUT
        ================================================= */

        .form-one-wrapper
        input[type="date"] {
          width: 100%;

          box-sizing: border-box;
        }

        /* =================================================
           TEXTAREA
        ================================================= */

        .form-one-wrapper textarea {
          min-height: 130px;

          resize: vertical;
        }

        /* =================================================
           GENERAL ERROR
        ================================================= */

        .form-one-wrapper
        .general-error {

          width: 100%;

          padding: 10px 14px;

          margin: 0 0 15px 0;

          border-radius: 4px;

          background:
            rgba(220, 53, 69, 0.08);

          color: #dc3545;

          font-size: 14px;

          line-height: 1.5;

          box-sizing: border-box;
        }

        /* =================================================
           DISABLED BUTTON
        ================================================= */

        .form-one-wrapper
        button:disabled {

          opacity: 0.65;

          cursor: not-allowed;
        }

        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 767px) {

          .form-one-wrapper
          .form-group {
            margin-bottom: 18px;
          }

          .form-one-wrapper
          .form-error {
            font-size: 12px;
          }

        }

      `}</style>

      <div className="form-one-wrapper">

        <form
          className={`form-style1 ${className || ''}`}
          onSubmit={handleSubmit}
          noValidate
        >

          {/* =================================================
              TITLE
          ================================================= */}

          <h2 className="form-title h4">
            {title}
          </h2>

          {/* =================================================
              FULL NAME
          ================================================= */}

          <div className="form-group">

            <input
              type="text"
              name="name"
              placeholder="Enter Full Name *"
              required
              autoComplete="name"
              maxLength="100"

              onChange={() =>
                clearError('name')
              }

              className={
                errors.name
                  ? 'input-error'
                  : ''
              }
            />

            {errors.name && (
              <div className="form-error">
                {errors.name}
              </div>
            )}

          </div>

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="form-group">

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              required
              autoComplete="email"
              maxLength="150"

              onChange={() =>
                clearError('email')
              }

              className={
                errors.email
                  ? 'input-error'
                  : ''
              }
            />

            {errors.email && (
              <div className="form-error">
                {errors.email}
              </div>
            )}

          </div>

          {/* =================================================
              APPOINTMENT SUBJECT
          ================================================= */}

          <div className="form-group">

            <input
              type="text"
              name="appointment_subject"
              placeholder="Appointment Subject *"
              required
              maxLength="150"

              onChange={() =>
                clearError('subject')
              }

              className={
                errors.subject
                  ? 'input-error'
                  : ''
              }
            />

            {errors.subject && (
              <div className="form-error">
                {errors.subject}
              </div>
            )}

          </div>

          {/* =================================================
              APPOINTMENT DATE
          ================================================= */}

          <div className="form-group">

            <input
              type="date"
              name="appointment_date"
              min={today}
              required

              onChange={() =>
                clearError(
                  'appointmentDate'
                )
              }

              className={
                errors.appointmentDate
                  ? 'input-error'
                  : ''
              }

              style={{
                width: '100%'
              }}
            />

            {errors.appointmentDate && (
              <div className="form-error">
                {errors.appointmentDate}
              </div>
            )}

          </div>

          {/* =================================================
              MESSAGE
          ================================================= */}

          <div className="form-group">

            <textarea
              name="message"
              placeholder="Write a short message... *"
              required
              minLength="10"
              maxLength="2000"

              onChange={() =>
                clearError('message')
              }

              className={
                errors.message
                  ? 'input-error'
                  : ''
              }
            />

            {errors.message && (
              <div className="form-error">
                {errors.message}
              </div>
            )}

          </div>

          {/* =================================================
              GENERAL ERROR
          ================================================= */}

          {errorMessage && (

            <div className="form-group">

              <p className="general-error">
                {errorMessage}
              </p>

            </div>

          )}

          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}

          <div className="form-btn">

            <Button
              className="style5"
              type="submit"
              disabled={isSubmitting}
            >

              {isSubmitting
                ? 'Submitting...'
                : btnText}

              {!isSubmitting && (
                <i className="far fa-arrow-right" />
              )}

            </Button>

          </div>

        </form>

      </div>
    </>
  );
};

export default FormOne;