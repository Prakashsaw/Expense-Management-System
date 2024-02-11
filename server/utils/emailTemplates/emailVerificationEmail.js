const emailVerificationEmail = (user, emailVerificationLink, EMAIL_FROM) => {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                  .btn {
                    background-color: #04AA6D;
                    border: none;
                    color: white;
                    padding: 8px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 2px 2px; 
                    border-radius: 5px;
                  }
                  .btn a {
                    color: white;
                    text-decoration: none;
                  }

                  .btn:hover {
                    background-color: green;
                  }

                </style>
            </head>
            <body>
                <div>
                  <p>Hi, <span style="font-weight: bold;">${user.name}</span>, Welcome to Expanse Management System.</p> 

                  <p>Thank you for registering on <a href="https://expense-management-system-prakash.netlify.app/"> Expense Management System </a> user account.</p>
                  <p>Please verify your email address.<br>
                  Select the button to verify your email.</p>
                  <button class = "btn"><a href=${emailVerificationLink}>Verify Email</a></button>
                  
                  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>

                  <p>Your email address needs to be verified before you can use your account.<br>
                  Your verification link will expire in <span style="font-weight: bold;">10 min.</span></p>
                  <p>If you need assistance, please contact us at <a href="mailto:${EMAIL_FROM}">email us</a>.</p>
                  <p>Thanks & Regards,<br>
                  Prakash & Company.</p>

                </div>
            </body>`; // Html Body Ending Here
};

module.exports = emailVerificationEmail;
