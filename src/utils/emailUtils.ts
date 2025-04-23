// src/utils/emailUtils.ts
import { FormState } from '@/hooks/use-contact-form'

export async function sendContactForm(
  formData: FormState,
  captchaToken: string
): Promise<{ success: boolean; message: string }> {
  try {
    const resp = await fetch('/api/contact', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ ...formData, captchaToken })
    })

    if (!resp.ok) {
      const { error } = await resp.json()
      return { success:false, message: error ?? 'Erreur serveur' }
    }

    return { success:true, message:'Message envoyé !' }
  } catch (err) {
    return { success:false, message:'Erreur réseau' }
  }
}
