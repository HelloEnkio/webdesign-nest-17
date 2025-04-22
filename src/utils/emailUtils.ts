// src/utils/emailUtils.ts

import type { FormState } from '@/hooks/use-contact-form';

export interface SendResult {
  success: boolean;
  message: string;
}

/**
 * Envoie le formulaire + token reCAPTCHA à votre endpoint Express (/api/contact).
 * Le serveur fait la vérification du CAPTCHA et envoie l’email via Resend.
 */
export async function sendContactForm(
  formData: FormState,
  recaptchaToken: string
): Promise<SendResult> {
  // Préparez le payload attendu par server.js
  const payload = {
    name:               formData.name,
    email:              formData.contact.includes('@') ? formData.contact : '',
    phone:              formData.contact.includes('@') ? '' : formData.contact,
    projectType:        formData.projectType,
    projectDescription: formData.projectDescription,
    captchaToken:       recaptchaToken,
  };

  try {
    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      // server.js renvoie { error: '...' } en cas d’échec
      return { success: false, message: data.error || 'Erreur serveur' };
    }

    return { success: true, message: 'Message envoyé avec succès' };
  } catch (err) {
    console.error('sendContactForm fetch error:', err);
    return {
      success: false,
      message: 'Impossible de contacter le serveur.'
    };
  }
}
