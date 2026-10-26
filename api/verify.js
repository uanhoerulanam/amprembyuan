import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, link } = req.body;
  if (!email || !link) return res.status(400).json({ error: 'Email and link required' });

  try {
    const response = await fetch('https://am.jzcloud.web.id/api/verify-link', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), magicLink: link.trim() })
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Gagal verifikasi' });
  }
}
