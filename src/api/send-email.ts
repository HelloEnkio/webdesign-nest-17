
import { Resend } from 'resend';
import { FormState } from '@/hooks/use-contact-form';

// This is for future implementation with a backend
// When you implement this for real use, move this to a server-side API
const resend = new Resend('re_123456789'); // Replace with your actual Resend API key

export async function sendEmail(formData: FormState, recaptchaToken: string) {
  try {
    // First verify reCAPTCHA token with Google's API
    const recaptchaResponse = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResponse.success) {
      return { success: false, message: 'Échec de la vérification reCAPTCHA' };
    }
    
    // Format the email content
    const { name, projectType, projectDescription, contact } = formData;
    
    const contactTypeText = contact.includes('@') ? 'Email' : 'Téléphone';
    const nameText = name ? name : 'Non spécifié';
    const projectTypeText = projectType ? projectType : 'Non spécifié';
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Enkio Contact <contact@enkio.fr>',
      to: ['hello@enkio.fr'],
      subject: 'Nouvelle demande de contact - Site Web Enkio',
      html: `
        <h1>Nouvelle demande de contact</h1>
        <p><strong>Nom:</strong> ${nameText}</p>
        <p><strong>${contactTypeText}:</strong> ${contact}</p>
        <p><strong>Type de projet:</strong> ${projectTypeText}</p>
        <p><strong>Description:</strong></p>
        <p>${projectDescription || 'Aucune description fournie'}</p>
      `,
    });
    
    if (error) {
      console.error('Error sending email:', error);
      return { success: false, message: 'Échec de l\'envoi de l\'email' };
    }
    
    return { success: true, message: 'Message envoyé avec succès' };
    
  } catch (error) {
    console.error('Error in send-email function:', error);
    return { success: false, message: 'Une erreur est survenue lors de l\'envoi du message' };
  }
}

// Mock function to verify recaptcha - in a real implementation, you would call Google's API
async function verifyRecaptcha(token: string): Promise<{ success: boolean }> {
  // In a real implementation, you would verify the token with Google's API
  // For demo purposes, just return success if token exists
  return { success: !!token };
}
