import { createElement as el } from '../core/createElement.js';

const cache = {};

export function PexelsImage({ query, alt = '', className = '' }) {
  const baseQuery = query.replace(/\.jpg$/i, '').trim();

  const src = cache[baseQuery] || 'https://via.placeholder.com/300x200?text=Chargement...';

  // Prépare l’élément <img>
  const image = el('img', {
    src,
    alt,
    className: `w-full h-48 object-cover rounded ${className}`.trim()
  });

  // Lance la recherche si pas déjà faite
  if (!cache[baseQuery]) {
    fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(baseQuery)}&orientation=landscape&per_page=1`, {
      headers: {
        Authorization: 'kvUMQXd7CfdtUJK930t6RlAZznYNmABHSozvNh4SzG3iAlLriP96IjlX'
      }
    })
      .then(res => res.json())
      .then(data => {
        const url = data?.photos?.[0]?.src?.medium || 'https://via.placeholder.com/300x200?text=Image+Introuvable';
        cache[baseQuery] = url;
        const imgNode = document.querySelector(`img[alt="${alt}"]`);
        if (imgNode) imgNode.src = url;
      })
      .catch(err => {
        console.error('Erreur Pexels :', err);
      });
  }

  return image;
}
