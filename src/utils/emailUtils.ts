
import { FormState } from '@/hooks/use-contact-form';

// This function will be used to send the form data to the server
export async function sendContactForm(formData: FormState, recaptchaToken: string): Promise<{ success: boolean; message: string }> {
  try {
    // You would typically send this to your backend API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        recaptchaToken,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue');
    }
    
    return { success: true, message: data.message || 'Message envoyé avec succès' };
  } catch (error) {
    console.error('Error sending contact form:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi du message'
    };
  }
}

// For demo purposes, simulate sending email without a backend
export async function simulateSendContactForm(formData: FormState): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    console.log('Form submitted:', formData);
    // Simulate network delay
    setTimeout(() => {
      resolve({ 
        success: true, 
        message: 'Message envoyé avec succès (simulation)' 
      });
    }, 1500);
  });
}
