/**
 * Simple SMTP Email Sender
 * 
 * This utility uses a simple approach to send emails from your portfolio website
 */

// For frontend applications, we'll use emailjs-com since we can't directly use SMTP (which requires backend)
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
// Replace these values with the ones from your EmailJS dashboard
const EMAILJS_USER_ID = 'JEZ3RLBu6gRW-d2EY'; // From Account > API Keys > Public Key
const EMAILJS_SERVICE_ID = 'service_40dtukp'; // From Email Services > Your Service
const EMAILJS_TEMPLATE_ID = 'template_8qpnqz6'; // From Email Templates > Your Template
const RECIPIENT_EMAIL = 'hardik.songara.21549@gmail.com';

/**
 * Send email using EmailJS (client-side solution)
 * @param {Object} formData - Form data containing name, email, subject, message
 * @returns {Promise} Promise that resolves with result
 */
export const sendEmail = async (formData) => {
  try {
    // Initialize EmailJS
    emailjs.init(EMAILJS_USER_ID);
    
    // Prepare template parameters
    const templateParams = {
      to_name: 'Hardik Songara',
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email,
      recipient: RECIPIENT_EMAIL
    };
    
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return {
      success: true,
      message: 'Message sent successfully! I will get back to you soon.'
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again later.'
    };
  }
};