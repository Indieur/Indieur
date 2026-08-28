import React, { useState } from 'react';
import { Button } from '../';

const FormOne = ({ className, title, btnText }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // ==========================================
  // TODAY'S DATE
  // YYYY-MM-DD
  // ==========================================
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


  // ==========================================
  // VALIDATE FORM
  // ==========================================
  const validateForm = (form) => {
    const newErrors = {};

    const name =
      form.elements['name']?.value.trim();

    const email =
      form.elements['email']?.value.trim();

    const subject =
      form.elements[
        'appointment_subject'
      ]?.value.trim();

    const appointmentDate =
      form.elements[
        'appointment_date'
      ]?.value;

    const message =
      form.elements['message']?.value.trim();


    // ========================================
    // FULL NAME
    // ========================================
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


    // ========================================
    // EMAIL
    // ========================================
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


    // ========================================
    // APPOINTMENT SUBJECT
    // ========================================
    if (!subject) {
      newErrors.subject =
        'Please enter an appointment subject.';
    } else if (subject.length < 3) {
      newErrors.subject =
        'Subject must contain at least 3 characters.';
    }


    // ========================================
    // APPOINTMENT DATE
    // ========================================
    if (!appointmentDate) {
      newErrors.appointmentDate =
        'Please select an appointment date.';
    } else if (appointmentDate < today) {
      newErrors.appointmentDate =
        'Please select today or a future date.';
    }


    // ========================================
    // MESSAGE
    // ========================================
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


  // ==========================================
  // CLEAR FIELD ERROR
  // ==========================================
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


  // ==========================================
  // FORM SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    const form = e.target;

    // Validate
    const validationErrors =
      validateForm(form);

    setErrors(validationErrors);

    // Stop submission if validation fails
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


    // ========================================
    // SUBMIT
    // ========================================
    setIsSubmitting(true);

    const formData =
      new FormData(form);

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData
        }
      );

      const data =
        await response.json();


      // ======================================
      // SUCCESS
      // ======================================
      if (data.success) {
        setIsSuccess(true);
        setErrors({});
        form.reset();
      }

      // ======================================
      // API ERROR
      // ======================================
      else {
        setErrorMessage(
          data.message ||
            'Something went wrong. Please try again.'
        );
      }

    } catch (error) {
      console.error(
        'Form submission error:',
        error
      );

      setErrorMessage(
        'Unable to submit your request. Please try again.'
      );

    } finally {
      setIsSubmitting(false);
    }
  };


  // ==========================================
  // SUCCESS MESSAGE
  // ==========================================
  if (isSuccess) {
    return (
      <>
        <style>{`

          .form-one-success {
            width: 100%;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 50px 20px;
            background: #f5f7fb;
          }

          .form-one-success-card {
            width: 100%;
            max-width: 700px;
            background: #ffffff;
            border-radius: 16px;
            padding: 55px 40px;
            text-align: center;
            box-shadow:
              0 15px 45px
              rgba(15, 35, 70, 0.10);
            border: 1px solid #e9edf5;
          }

          .form-one-success-icon {
            width: 78px;
            height: 78px;
            margin: 0 auto 25px;
            border-radius: 50%;
            background: #1264ff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow:
              0 10px 25px
              rgba(18, 100, 255, 0.25);
          }

          .form-one-success-icon i {
            font-size: 42px;
            color: #ffffff;
            line-height: 1;
          }

          .form-one-success-card h2 {
            margin: 0 0 15px;
            font-size: 32px;
            font-weight: 700;
            line-height: 1.25;
            color: #111827;
          }

          .form-one-success-card p {
            margin: 0 auto 30px;
            max-width: 560px;
            font-size: 16px;
            line-height: 1.8;
            color: #667085;
          }

          @media (max-width: 767px) {

            .form-one-success {
              padding: 30px 15px;
            }

            .form-one-success-card {
              padding: 40px 20px;
              border-radius: 12px;
            }

            .form-one-success-card h2 {
              font-size: 25px;
            }

            .form-one-success-card p {
              font-size: 14px;
            }

          }

        `}</style>


        <div className="form-one-success">

          <div className="form-one-success-card">

            {/* Success Icon */}
            <div className="form-one-success-icon">

              <i className="fal fa-check" />

            </div>


            {/* Heading */}
            <h2>
              Thank You for Contacting Indieur
            </h2>


            {/* Message */}
            <p>
              Your growth requirement has been
              received successfully. Our team will
              review the information and contact you
              using the details provided.
            </p>


          </div>

        </div>
      </>
    );
  }


  // ==========================================
  // MAIN FORM
  // ==========================================
  return (
    <>
      {/* ======================================
          FORM CSS
      ======================================= */}
      <style>{`

        /* ====================================
           FORM WRAPPER
        ==================================== */

        .form-one-wrapper {
          width: 100%;
        }


        /* ====================================
           FORM GROUP
        ==================================== */

        .form-one-wrapper .form-group {
          position: relative;
          margin-bottom: 20px;
        }


        /* ====================================
           REQUIRED STAR
        ==================================== */

        .form-one-wrapper .required-star {
          color: #dc3545;
          font-weight: 700;
          margin-left: 2px;
        }


        /* ====================================
           VALIDATION ERROR
        ==================================== */

        .form-one-wrapper .form-error {
          display: block;
          width: 100%;
          margin-top: 6px;
          padding-left: 2px;

          color: #dc3545;

          font-size: 13px;
          line-height: 1.4;

          font-weight: 500;
        }


        /* ====================================
           INVALID INPUT
        ==================================== */

        .form-one-wrapper
        input.input-error,

        .form-one-wrapper
        textarea.input-error {
          border-color: #dc3545 !important;
        }


        /* ====================================
           INVALID INPUT FOCUS
        ==================================== */

        .form-one-wrapper
        input.input-error:focus,

        .form-one-wrapper
        textarea.input-error:focus {
          border-color: #dc3545 !important;

          box-shadow:
            0 0 0 2px
            rgba(220, 53, 69, 0.08);

          outline: none;
        }


        /* ====================================
           NORMAL FOCUS
        ==================================== */

        .form-one-wrapper
        input:focus,

        .form-one-wrapper
        textarea:focus {
          outline: none;
        }


        /* ====================================
           TEXTAREA
        ==================================== */

        .form-one-wrapper textarea {
          min-height: 130px;
          resize: vertical;
        }


        /* ====================================
           GENERAL API ERROR
        ==================================== */

        .form-one-wrapper .general-error {
          width: 100%;

          padding: 10px 14px;

          margin: 0 0 15px 0;

          border-radius: 4px;

          background:
            rgba(220, 53, 69, 0.08);

          color: #dc3545;

          font-size: 14px;

          line-height: 1.5;
        }


        /* ====================================
           DISABLED BUTTON
        ==================================== */

        .form-one-wrapper
        button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }


        /* ====================================
           MOBILE
        ==================================== */

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
          action="https://api.web3forms.com/submit"
          method="POST"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* ==================================
              WEB3FORMS ACCESS KEY
          =================================== */}

          <input
            type="hidden"
            name="access_key"
            value="9015df3b-8397-41eb-849c-ab499f677b46"
          />


          {/* ==================================
              EMAIL SUBJECT
          =================================== */}

          <input
            type="hidden"
            name="subject"
            value="New Growth Requirement Enquiry – Indieur"
          />


          {/* ==================================
              SENDER NAME
          =================================== */}

          <input
            type="hidden"
            name="from_name"
            value="Indieur Website – Growth Requirement Form"
          />


          {/* ==================================
              SPAM PROTECTION
          =================================== */}

          <input
            type="checkbox"
            name="botcheck"
            style={{
              display: 'none'
            }}
          />


          {/* ==================================
              FORM TITLE
          =================================== */}

          <h2 className="form-title h4">
            {title}
          </h2>


          {/* ==================================
              FULL NAME
          =================================== */}

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


          {/* ==================================
              EMAIL
          =================================== */}

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


          {/* ==================================
              APPOINTMENT SUBJECT
          =================================== */}

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


          {/* ==================================
              APPOINTMENT DATE
          =================================== */}

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


          {/* ==================================
              MESSAGE
          =================================== */}

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


          {/* ==================================
              GENERAL ERROR
          =================================== */}

          {errorMessage && (

            <div className="form-group">

              <p className="general-error">
                {errorMessage}
              </p>

            </div>

          )}


          {/* ==================================
              SUBMIT BUTTON
          =================================== */}

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