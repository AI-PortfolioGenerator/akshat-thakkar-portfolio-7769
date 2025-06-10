# Email Configuration

This folder contains the email sending utility for the contact form.

## Setup Instructions

To make the contact form send real emails, you need to set up EmailJS:

1. **Create an EmailJS Account**
   - Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account

2. **Create an Email Service**
   - In the EmailJS dashboard, go to "Email Services"
   - Click "Add New Service" and connect your email provider (Gmail, Outlook, etc.)
   - This will generate a Service ID

3. **Create an Email Template**
   - In EmailJS dashboard, go to "Email Templates"
   - Create a new template with variables:
     - `{{from_name}}` - The sender's name
     - `{{from_email}}` - The sender's email
     - `{{subject}}` - The email subject
     - `{{message}}` - The message content
   - This will generate a Template ID

4. **Update Configuration**
   - Open `sendmail.js` in this folder
   - Replace the following values:
     - `EMAILJS_USER_ID` with your EmailJS User ID (from Account > API Keys)
     - `EMAILJS_SERVICE_ID` with your Service ID
     - `EMAILJS_TEMPLATE_ID` with your Template ID

That's it! Your contact form should now send emails to hardik.songara.21549@gmail.com.

## How It Works

The contact form collects:
- Name
- Email
- Subject
- Message

When submitted, it sends this information to your specified email address using EmailJS.