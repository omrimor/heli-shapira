'use server';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  // port: 587,
  // secure: false,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

type State = {
  message?: string;
  success?: boolean;
  error?: boolean;
};

export async function sendEmail(prevState: State, formData: FormData) {
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Validate the data
  if (!email || !subject || !message) {
    return {
      error: true,
      message: 'כל השדות נדרשים!',
      success: false,
    };
  }

  try {
    await transporter.sendMail({
      from: email.toString(),
      to: process.env.EMAIL_USER,
      subject: `** פנייה מהאתר  ** ${subject.toString()}`,
      text: message.toString(),
      replyTo: email.toString(),
    });
    return {
      success: true,
      message: 'תודה! נהיה בקשר!',
      error: false,
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      error: true,
      message: 'אופס! משהו קרה מהצד שלי. נסה שוב מאוחר יותר',
      success: false,
    };
  }
}
