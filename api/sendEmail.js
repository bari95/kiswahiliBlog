

const aws = require('aws-sdk');
const ses = new aws.SES();

exports.handler = async (event) => {
  const formData = JSON.parse(event.body);

  // Construct email message
  const emailParams = {
    Destination: {
      ToAddresses: ['kanenobariki@gmail.com','aron.pallangyo90@gmail.com'], // Replace with your email
    },
    Message: {
      Body: {
        Text: {
          Data: `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`,
        },
      },
      Subject: { Data: 'New Contact Form Submission' },
    },
    Source: 'aron.pallangyo90@gmail.com', // Replace with your email
  };

  try {
    // Send email
    await ses.sendEmail(emailParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' }),
    };
  }
};
