
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
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.3);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);
          transform: scale(1.02);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          transform: scale(1);
        }
      }
      
      @keyframes fadeSlideUp {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes popIn {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        70% {
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .fade-slide-up {
        animation: fadeSlideUp 0.4s ease-out forwards;
      }
      
      .pop-in {
        animation: popIn 0.4s ease-out forwards;
      }
      `}
    </style>
  );
};

export default ContactStyles;
