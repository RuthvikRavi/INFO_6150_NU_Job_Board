import sgMail from '@sendgrid/mail';
sgMail.setApiKey('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');

export const sendEmail = async (req, res) => {
    
    // Fetch email from req body
    const { to, subject, text } = req.body;

    // Define message recipient, sender, subject and text
    const msg = {
        to,
        from: 'nice.job.app@gmail.com', // replace with your email
        subject,
        text,
      };
  
    try {
      // Try sending email and return 200 on success
      await sgMail.send(msg);
      res.status(200).send('Email sent successfully!');
    } catch (error) {
      // Return error in case of issues
      res.status(500).send('Failed to send email.');
    }
  };