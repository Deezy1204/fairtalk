const fs = require('fs');
const urls = [
  'https://skyzmetroradio.co.zw/2026/03/27/imiklomelo-kadakamela-partners-highlanders-for-centenary-celebrations/',
  'https://breezefm.co.zw/empowering-the-future-ministry-of-tourism-launches-provincial-structures-for-women-and-youth/',
  'https://skyzmetroradio.co.zw/2025/07/06/two-suspects-in-ecobank-heist-arrested-in-south-africa/',
  'https://breezefm.co.zw/cimas-and-smilestar-foundation-bring-smiles-to-rural-zimbabwe/'
];
Promise.all(urls.map(u => fetch(u).then(r => r.text()).then(html => {
  const match = html.match(/<meta property="og:image"\s+content="([^"]+)"/);
  return u + '\nImage: ' + (match ? match[1] : 'not found');
}))).then(results => console.log(results.join('\n\n'))).catch(console.error);
