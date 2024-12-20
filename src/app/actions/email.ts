'use server';

import nodemailer from 'nodemailer';
import { redirect } from 'next/navigation';

/**
 * TODO: follow this link and setup gamil app
 * cause this will break
 * https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628
 */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendEmail(formData: FormData) {
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Validate the data
  if (!email || !subject || !message) {
    redirect('/?error=true');
    // return { error: 'All fields are required' };
  }

  try {
    await transporter.sendMail({
      from: email.toString(),
      to: 'omrimorr@gmail.com',
      subject: subject.toString(),
      text: message.toString(),
      replyTo: email.toString(),
    });

    // return { success: true };
    redirect('/?success=true');
  } catch (error) {
    console.error('Email error:', error);
    redirect('/?error=true');
    // return { error: 'Failed to send email' };
  }
}
