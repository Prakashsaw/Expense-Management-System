const contactUsMessageSentSuccess = (user, EMAIL_FROM) => {
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
                    <p>Hi, <span style="font-weight: bold;">${user.name}</span>, Welcome to Expense Management System.</p> 

                    <p>You are receiving this because you have sent a message to us.<br>
                    We received your message and our team will reach out you soon.<br>   
                    Till then explore our application <a href="https://expense-management-system-prakash.netlify.app/"> Expense Management System </a>.</p>

                    <p>If you have any query please reach out to us at <a href="mailto:${EMAIL_FROM}">email us</a>.</p>

                    <p>Thanks & Regards,<br>
                    Prakash & Company Pvt Ltd.</p>

                </div>
            </body>`; // Html Body Ending Here.
};

module.exports = contactUsMessageSentSuccess;
