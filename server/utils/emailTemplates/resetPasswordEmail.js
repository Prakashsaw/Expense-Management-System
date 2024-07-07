const resetPasswordEmail = (user, resetPasswordLink, EMAIL_FROM) => {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password reset</title>
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
                    <p>Hi, <span style="font-weight: bold;">${user.name}</span>,</p> 

                    <p>You are receiving this because you (or someone else) requested 
                    the reset of your <a href="https://expense-management-system-prakash.netlify.app/"> Expense Management System </a> user account.
                    <br>
                    Select the button to reset your password.</p>

                    <button class = "btn"><a href=${resetPasswordLink}>Reset Password</a></button>
                    
                    <p>If this was you, you can continue with the reset password link.<br>
                    If not, please reach out to us at <a href="mailto:${EMAIL_FROM}">email us</a> for help.</p>

                    <p>Thanks & Regards,<br>
                    Prakash & Company Pvt. Ltd.</p>

                </div>
            </body> `; // Html Body Ending Here;
};

module.exports = resetPasswordEmail;
