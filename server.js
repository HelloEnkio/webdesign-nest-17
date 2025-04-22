// server.js
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { Resend } from 'resend'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()                               // 👈  charge .env

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app    = express()
const resend = new Resend(process.env.RESEND_API_KEY)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

// -------- API -------------
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, captchaToken } = req.body

  /* 1️⃣ reCAPTCHA */
  try {
    const verify = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method : 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body   : `secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`
      }
    ).then(r => r.json())

    if (!verify.success) return res.status(400).json({ error:'Captcha invalide' })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error:'Erreur captcha' })
  }

  /* 2️⃣ Resend */
  try {
    await resend.emails.send({
      from   : process.env.RESEND_FROM,         // ex : no-reply@enkio.fr
      to     : ['hello@enkio.fr'],
      subject: `Nouveau lead – ${name ?? 'Sans nom'}`,
      html   : `
        <p><b>Nom :</b> ${name ?? 'non renseigné'}</p>
        <p><b>Email :</b> ${email ?? '–'}</p>
        <p><b>Téléphone :</b> ${phone ?? '–'}</p>
        <p><b>Message :</b><br>${message ?? ''}</p>`
    })
    return res.json({ ok:true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error:'Erreur envoi email' })
  }
})

// -------- SPA fallback -----
app.get('*', (_, res) =>
  res.sendFile(path.join(__dirname, 'dist/index.html'))
)

app.listen(process.env.PORT || 3000, () =>
  console.log('✅ Server ready'))
