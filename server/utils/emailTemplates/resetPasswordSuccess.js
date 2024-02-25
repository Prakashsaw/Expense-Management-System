const resetPasswordSuccess = (user, EMAIL_FROM) => {
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
                    <p>Hi, <span style="font-weight: bold;">${user.name}<span>,</p> 

                    <p>You are receiving this because you (or someone else) have reset the 
                    password of your <a href="https://expense-management-system-prakash.netlify.app/"> Expense Management System </a> user account.</p>
                    
                    <p>If this was you, you can safely ignore this email.<br>
                    If not, please reach out to us at <a href="mailto:${EMAIL_FROM}">email us</a> for help.</p>

                    <p>Thanks & Regards,<br>
                    Prakash & Company Pvt. Ltd.</p>

                </div>
            </body>`; // Html Body Ending Here.
};

module.exports = resetPasswordSuccess;
