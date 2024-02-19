const OTPVerificationEmail = (user, OTP, EMAIL_FROM) => {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password reset successful</title>
            </head>
            <body>
                <div>
                    <p>Hi, <span style="font-weight: bold;">${user.name}!</span>, Welcome to Expanse Management System.</p> 

                    <p>You are receiving this because you have created the 
                    new user account on <a href="https://expense-management-system-prakash.netlify.app/"> Expense Management System </a>.<br>
                    
                    You are requested to enter the one-time password (OTP) provided in this email.</p>
                    <p>Your OTP is : <span style="font-weight: bold; font-size: 20px; letter-spacing: 2px;">${OTP}</span>.</p>
                    <p>Your OTP will expire in <span style="font-weight: bold;">10 min.</span><br>
                    
                    For any query please reach out to us at <a href="mailto:${EMAIL_FROM}">email us</a>.</p>

                    <p>Thanks & Regards,<br>
                    Prakash & Company.</p>

                </div>
            </body>`; // Html Body Ending Here.
};

module.exports = OTPVerificationEmail;
