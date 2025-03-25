
import React from 'react';

const ContactStyles: React.FC = () => {
  return (
    <style>
      {`
      .success-animation {
        animation: successPulse 1.5s ease-out;
      }
      @keyframes successPulse {
        0% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.2);
        }
        70% {
          box-shadow: 0 0 0 15px rgba(99, 102, 241, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
        }
      }
      `}
    </style>
  );
};

export default ContactStyles;
