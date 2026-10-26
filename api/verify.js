import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { email, link } = req.body;
  if (!email || !link) return res.status(400).json({ error: 'Email dan link wajib diisi' });

  try {
    const response = await fetch('https://am.jzcloud.web.id/api/verify-link', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0',
        'origin': 'https://am.jzcloud.web.id',
        'referer': 'https://am.jzcloud.web.id/'
      },
      body: JSON.stringify({ email: email.trim(), magicLink: link.trim() })
    });
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Gagal memverifikasi link' });
  }
}
