import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendRegistrationConfirmation = async (
  email: string,
  name: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "TEDx SRMIST Delhi NCR - Registration Confirmed!",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #E62B1E; color: white; padding: 20px; text-align: center;">
        <h1>TED<sup>x</sup> SRMIST Delhi NCR</h1>
        <p style="font-size: 18px;">Ideas Worth Spreading</p>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #E62B1E;">Registration Successful, ${name}!</h2>
        
        <p>Thank you for registering for TED<sup>x</sup> SRMIST Delhi NCR! We have successfully received your registration.</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333;">Event Details:</h3>
          <p><strong>Date:</strong> 21 January 2026</p>
          <p><strong>Time:</strong> 10:00 AM – 4:00 PM</p>
          <p><strong>Venue:</strong> SRMIST NCR Campus, Ghaziabad</p>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #E62B1E; margin: 20px 0;">
          <p style="margin: 0; color: #856404;"><strong>Next Steps:</strong> We'll review all registrations and get back to you if you are selected for the event. Please keep an eye on your email for further updates.</p>
        </div>
        
        <p>Please keep this email as your registration confirmation.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #E62B1E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">View Event Details</a>
        </div>
        
        <p>If you have any questions, feel free to reach out to us at tedxsrmistdelhincr@gmail.com</p>
        
        <p style="margin-top: 30px;">
          Looking forward to seeing you there!<br>
          <strong>TED<sup>x</sup> SRMIST Delhi NCR Team</strong>
        </p>
      </div>
    </div>

    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendContactNotification = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ORGANIZER_EMAIL || process.env.EMAIL_USER,
    subject: `TED<sup>x</sup> Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #E62B1E; color: white; padding: 20px; text-align: center;">
          <h1>New Contact Form Submission</h1>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #E62B1E;">Contact Details:</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p>${message}</p>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendSelectionConfirmation = async (
  email: string,
  name: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Congratulations! You're Selected for TEDx SRMIST Delhi NCR",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #E62B1E; color: white; padding: 20px; text-align: center;">
        <h1>TED<sup>x</sup> SRMIST Delhi NCR</h1>
        <p style="font-size: 18px;">Ideas Worth Spreading</p>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #E62B1E;">Congratulations, ${name}!</h2>
        
        <p>We're excited to inform you that you have been <strong>selected to attend</strong> TED<sup>x</sup> SRMIST Delhi NCR!</p>
        
        <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h3 style="color: #155724; margin-top: 0;">You're In! 🎉</h3>
          <p style="color: #155724; margin-bottom: 0;">Your spot at the event is confirmed. We can't wait to see you there!</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333;">Event Details:</h3>
          <p><strong>Date:</strong> 21 January 2026</p>
          <p><strong>Time:</strong> 10:00 AM – 4:00 PM</p>
          <p><strong>Venue:</strong> SRMIST NCR Campus, Ghaziabad</p>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #E62B1E; margin: 20px 0;">
          <p style="margin: 0; color: #856404;"><strong>Important:</strong> Please save this email as your confirmation. You may be required to show this at the venue for entry.</p>
        </div>
        
        <p>Get ready for an inspiring day of groundbreaking ideas and exceptional speakers. We'll send you more details about the event schedule and speakers as we get closer to the date.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #E62B1E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">View Event Details</a>
        </div>
        
        <p>If you have any questions, feel free to reach out to us at tedxsrmistdelhincr@gmail.com</p>
        
        <p style="margin-top: 30px;">
          Looking forward to seeing you there!<br>
          <strong>TED<sup>x</sup> SRMIST Delhi NCR Team</strong>
        </p>
      </div>
    </div>

    `,
  };

  await transporter.sendMail(mailOptions);
};
