// server.js
import express from 'express'
import path from 'path'
import { Resend } from 'resend'
import fetch from 'node-fetch'

const app = express()
const resend = new Resend(process.env.RESEND_API_KEY)

app.use(express.json())
// Pour servir vos fichiers statiques Vite buildés
app.use(express.static(path.join(__dirname, 'dist')))

// Endpoint API pour le formulaire
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, captchaToken } = req.body

  // 1) Vérif reCAPTCHA v2/v3
  const secret = process.env.RECAPTCHA_SECRET   
  const resp = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`,
    { method: 'POST' }
  )
  const { success, score } = await resp.json()
  if (!success || (score !== undefined && score < 0.5)) {
    return res.status(400).json({ error: 'Captcha non validé' })
  }

  // 2) Envoi d’email via Resend
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,      // ex: "no‑reply@enkio.fr"
      to: ['hello@enkio.fr'],
      subject: `Nouveau lead de ${name}`,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `
    })
    return res.json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erreur envoi mail' })
  }
})

// Fallback pour le SPA
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
