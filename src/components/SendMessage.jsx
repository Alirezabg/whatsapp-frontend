import React, { useEffect, useState } from 'react';

const SendMessage = (props) => {
  const [message, setMessage] = useState('');
  const { activeUserCode } = props;
  useEffect(() => {
    setMessage('');
  }, [activeUserCode]);
  const handleSendMessage = () => {
    const data = {
      messaging_product: 'whatsapp',
      to: activeUserCode.display_phone_number,
      type: 'text',
      text: {
        // the text object
        preview_url: false,
        body: message,
      },
    };

    console.log('Sending message:', data);
    console.log('result sent back', message);
    fetch(
      'https://whatsapp-poc-api-function.azurewebsites.net/api/send-message',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Message sent successfully:', result);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default SendMessage;