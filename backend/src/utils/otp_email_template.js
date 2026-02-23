export const otpLoginTemplate = (name, otp) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; text-align: center;">
      
      <h2 style="color: #333;">Hello ${name} 👋</h2>
      
      <p style="font-size: 16px; color: #555;">
        Use the OTP below to securely log in to your account.
      </p>
      
      <div style="
        font-size: 28px; 
        font-weight: bold; 
        letter-spacing: 8px; 
        background: #f0f4ff; 
        padding: 15px; 
        border-radius: 8px; 
        margin: 20px 0;
        color: #1d4ed8;
      ">
        ${otp}
      </div>

      <p style="font-size: 14px; color: #888;">
        This OTP is valid for <strong>5 minutes</strong>.
      </p>

      <p style="font-size: 13px; color: #999; margin-top: 20px;">
        If you did not request this login, please ignore this email.
      </p>

      <hr style="margin: 25px 0;" />

      <p style="font-size: 12px; color: #aaa;">
        Task Tracker Pro 🚀
      </p>

    </div>
  </div>
  `;
};
