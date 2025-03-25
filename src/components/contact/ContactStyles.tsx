
import React from 'react';

const ContactStyles: React.FC = () => {
  return (
    <style>
      {`
      @keyframes floatUp {
        0%, 100% {
          transform: translateY(0);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-100px);
          opacity: 0;
        }
      }
      .success-animation {
        animation: successPulse 2s ease-out;
      }
      @keyframes successPulse {
        0% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.2);
        }
        70% {
          box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
        }
      }
      .perspective {
        perspective: 1000px;
      }
      `}
    </style>
  );
};

export default ContactStyles;
