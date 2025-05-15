import transporter from "../config/mailer.js";

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `<h2>Your OTP is: ${otp}</h2><p>It expires in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
