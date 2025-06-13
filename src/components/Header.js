import { createElement as el } from '../core/createElement.js';
import { CartIcon } from './CartIcon.js';
import {rerender} from "../core/render.js";
import { App } from './Pages/App.js';

export function Header() {
  return el('header', {
      class: 'bg-orange-500 text-white py-4 shadow-md sticky top-0 z-50'
    },
    el('div', {
        class: 'container mx-auto px-4 flex justify-between items-center'
      },
      el('h1', { class: 'text-2xl font-bold' }, '🍔 Mini Food Truck'),
      el('div', { class: 'flex items-center gap-4' },
        el('a', {
          href: '?page=/',
          class: 'hover:underline',
        }, 'Accueil'),
        el('a', {
          href: '?page=/commandes',
          class: 'hover:underline',
        }, 'Commandes'),
        el(CartIcon)
      )
    )
  );
}
