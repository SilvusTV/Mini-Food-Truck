import {createElement as el} from '../core/createElement.js';

export function Footer() {
  return el('footer', {class: 'bg-gray-100 text-center py-4 text-sm text-gray-600'},
    el('p', {}, ' © 2025 – Mini Food Truck, réalisé avec ❤️ en JS vanilla par COMBE Hugo.')
  );
}
