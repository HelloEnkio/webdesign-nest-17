// server.js
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { Resend } from 'resend'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

// --- Logs de démarrage (vérification variables) ---
console.log("--- [SERVER] Vérification Variables Environnement Backend ---");
console.log(`[SERVER] Timestamp: ${new Date().toISOString()}`);
console.log("[SERVER] PORT:", process.env.PORT || 'Non défini (utilisera 3000 par défaut)');
console.log("[SERVER] RECAPTCHA_SECRET:", process.env.RECAPTCHA_SECRET ? `Chargée (longueur: ${process.env.RECAPTCHA_SECRET.length})` : 'MANQUANTE !');
console.log("[SERVER] RESEND_API_KEY:", process.env.RESEND_API_KEY ? `Chargée (longueur: ${process.env.RESEND_API_KEY.length})` : 'MANQUANTE !');
console.log("[SERVER] RESEND_FROM:", process.env.RESEND_FROM || 'MANQUANTE !');
console.log("--------------------------------------------------");
// --- Fin Logs ---

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app    = express()
// Initialisez Resend SEULEMENT si la clé existe
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
if (!resend) {
  console.error(`[SERVER] ERREUR: RESEND_API_KEY est manquante, l'envoi d'email échouera.`);
}

app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

// -------- API -------------
app.post('/api/contact', async (req, res) => {
  // <-- LOG : La requête a-t-elle atteint le serveur ?
  console.log(`\n--- [SERVER] Requête POST /api/contact reçue ---`);
  console.log(`[SERVER] Timestamp: ${new Date().toISOString()}`);
  console.log("[SERVER] Body reçu:", JSON.stringify(req.body, null, 2)); // Affiche le contenu reçu

  const { name, email, phone, message, captchaToken } = req.body;

  // Vérification si les clés secrètes sont chargées
  if (!process.env.RECAPTCHA_SECRET) {
      console.error("[SERVER] ERREUR: RECAPTCHA_SECRET manquant dans l'environnement !");
      return res.status(500).json({ error: 'Configuration serveur incomplète (captcha)' });
  }
   if (!resend || !process.env.RESEND_FROM) { // Vérifie resend et RESEND_FROM
      console.error("[SERVER] ERREUR: RESEND_API_KEY ou RESEND_FROM manquant dans l'environnement !");
      return res.status(500).json({ error: 'Configuration serveur incomplète (email)' });
  }


  /* 1️⃣  reCAPTCHA */
  console.log("[SERVER] Étape 1: Vérification reCAPTCHA..."); // <-- LOG
  try {
      const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const secretKey = process.env.RECAPTCHA_SECRET;
      const bodyPayload = `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(captchaToken)}`;

      // <-- LOG : Juste avant l'appel fetch vers Google
      console.log(`[SERVER] Appel fetch vers Google reCAPTCHA (URL: ${verifyUrl})`);

      const response = await fetch(verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: bodyPayload
      });

      const verify = await response.json();

      // <-- LOG : Résultat de la vérification Google
      console.log("[SERVER] Réponse de Google reCAPTCHA:", JSON.stringify(verify, null, 2));

      if (!verify.success) {
          // <-- LOG : Captcha invalide
          console.warn("[SERVER] Échec vérification reCAPTCHA:", verify['error-codes'] || 'Raison inconnue');
          return res.status(400).json({ error: 'Captcha invalide' });
      }
       console.log("[SERVER] Vérification reCAPTCHA réussie."); // <-- LOG
  } catch (e) {
      // <-- LOG : Erreur pendant la vérification captcha
      console.error("[SERVER] Erreur lors de l'appel fetch reCAPTCHA:", e);
      return res.status(500).json({ error: 'Erreur interne lors de la vérification captcha' });
  }

  /* 2️⃣  Resend */
  console.log("[SERVER] Étape 2: Tentative d'envoi d'email via Resend..."); // <-- LOG
  try {
      const mailOptions = {
          from: process.env.RESEND_FROM,
          to: ['hello@enkio.fr'], // Assurez-vous que l'email destinataire est correct
          subject: `Nouveau lead – ${name || 'Sans nom'}`,
          html: `
         <p><b>Nom :</b> ${name || 'non renseigné'}</p>
         <p><b>Email :</b> ${email || '–'}</p>
         <p><b>Téléphone :</b> ${phone || '–'}</p>
         <p><b>Message :</b><br>${message ? message.replace(/\n/g, '<br>') : ''}</p>` // Remplace les sauts de ligne par <br>
      };

      // <-- LOG : Options de l'email avant envoi
      console.log("[SERVER] Options email:", JSON.stringify(mailOptions, null, 2));

      const data = await resend.emails.send(mailOptions);

      // <-- LOG : Succès de l'envoi Resend
      console.log("[SERVER] Email envoyé avec succès via Resend:", JSON.stringify(data, null, 2));
      return res.json({ ok: true });

  } catch (e) {
      // <-- LOG : Erreur pendant l'envoi Resend
      console.error("[SERVER] Erreur lors de l'envoi Resend:", e);
      return res.status(500).json({ error: "Erreur interne lors de l'envoi de l'email" });
  }
})

// -------- SPA fallback -----
app.get('*', (req, res) => {
  // <-- LOG : Requête GET non API interceptée par le fallback
  console.log(`[SERVER] GET ${req.path} -> SPA Fallback: Envoi de dist/index.html`);
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.listen(process.env.PORT || 3000, () =>
  console.log(`[SERVER] ✅ Server ready on port ${process.env.PORT || 3000}`) // Log le port réel
)
