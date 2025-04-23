// src/utils/emailUtils.ts
import { FormState } from '@/hooks/use-contact-form';

export async function sendContactForm(
  formData: FormState, // Correction: formData est l'objet complet ici
  captchaToken: string
): Promise<{ success: boolean; message: string }> {
  const payload = { ...formData, captchaToken }; // Crée le payload à envoyer

  // <-- LOG : Données envoyées
  console.log('[FRONTEND] Préparation envoi formulaire:', payload);

  try {
    // <-- LOG : Juste avant le fetch
    console.log(`[FRONTEND] Appel fetch POST vers /api/contact à ${new Date().toISOString()}`);

    const resp = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload) // Utilise le payload créé
    });

    // <-- LOG : Réponse brute reçue
    console.log('[FRONTEND] Réponse brute reçue:', resp);
    console.log(`[FRONTEND] Statut réponse: ${resp.status} ${resp.statusText}`);

    if (!resp.ok) {
      let errorData = { error: 'Erreur inconnue du serveur' };
      try {
        errorData = await resp.json(); // Essaie de lire le corps de l'erreur
        // <-- LOG : Erreur JSON du serveur
        console.error('[FRONTEND] Erreur JSON reçue du serveur:', errorData);
      } catch (jsonError) {
        // <-- LOG : Impossible de parser l'erreur JSON
        console.error('[FRONTEND] Impossible de parser la réponse JSON d\'erreur:', await resp.text());
      }
      return { success: false, message: errorData.error ?? 'Erreur serveur' };
    }

    // <-- LOG : Réponse OK du serveur
    console.log('[FRONTEND] Réponse OK reçue du serveur.');
    // On ne lit pas .json() ici car une réponse OK pourrait ne pas avoir de corps ou ne pas être JSON
    return { success: true, message: 'Message envoyé !' };

  } catch (err) {
    // <-- LOG : Erreur réseau
    console.error('[FRONTEND] Erreur réseau lors du fetch:', err);
    return { success: false, message: 'Erreur réseau' };
  }
}
