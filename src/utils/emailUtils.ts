
import { FormState } from '@/hooks/use-contact-form';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '@/config/apiKeys';

export async function sendContactForm(formData: FormState, recaptchaToken: string): Promise<{ success: boolean; message: string }> {
  try {
    // Vérifier d'abord le reCAPTCHA
    const recaptchaResponse = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResponse.success) {
      throw new Error('Échec de la vérification reCAPTCHA');
    }

    // Utiliser la clé API depuis la configuration
    if (!RESEND_API_KEY || RESEND_API_KEY === "re_yourKeyHere") {
      throw new Error('Clé API Resend non configurée');
    }

    const resend = new Resend(RESEND_API_KEY);
    
    // Format du contenu de l'email
    const { name, projectType, projectDescription, contact } = formData;
    const contactTypeText = contact.includes('@') ? 'Email' : 'Téléphone';
    const nameText = name || 'Non spécifié';
    const projectTypeText = projectType || 'Non spécifié';
    
    const { data, error } = await resend.emails.send({
      from: 'Enkio Contact <onboarding@resend.dev>',
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
      throw new Error('Échec de l\'envoi de l\'email');
    }
    
    return { success: true, message: 'Message envoyé avec succès' };
    
  } catch (error) {
    console.error('Error in sendContactForm:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi du message'
    };
  }
}

// Fonction de vérification reCAPTCHA
async function verifyRecaptcha(token: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    
    const data = await response.json();
    return { success: data.success };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false };
  }
}
