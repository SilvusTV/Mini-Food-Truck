import { createElement as el } from './core/createElement.js';
import {HomePage} from "./components/Pages/HomePage.js";
import {OrdersPage} from "./components/Pages/OrderPage.js";

function getPageFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('page') || '/';
}

export function Router() {
  const route = getPageFromQuery();

  switch (route) {
    case '/':
      return HomePage();
    case '/commandes':
      return OrdersPage();
    default:
      return el('main', { class: 'p-4 text-center' },
        el('h2', { class: 'text-xl' }, '404 - Page non trouvée 🧐'),
        el('p', {}, 'La page que vous cherchez n\'existe pas.'),
        el('a', { href: '?page=/', class: 'text-blue-500 hover:underline' }, 'Retour à l\'accueil')
      );
  }
}
