import { createElement as el } from '../../core/createElement.js';
import { useStore } from '../../core/store.js';

export function OrdersPage() {
  const { getState } = useStore();
  const orders = getState().orders || [];

  return el('main', { class: 'flex-1 container mx-auto px-4 py-8' },
    el('h2', { class: 'text-xl font-bold mb-4' }, '📜 Historique des commandes'),
    orders.length === 0
      ? el('p', {}, 'Aucune commande passée.')
      : el('div', { class: 'space-y-4' },
        ...orders.map((order, i) =>
          el('div', { class: 'bg-white shadow rounded p-4' },
            el('h3', { class: 'font-semibold mb-2' }, `Commande #${i + 1}`),
            el('ul', { class: 'list-disc list-inside text-sm' },
              ...order.items.map(item =>
                el('li', {}, `${item.name} × ${item.quantity}`)
              )
            ),
            el('p', { class: 'text-gray-600 text-sm mt-2' }, `Statut : ${['Préparation', 'En livraison', 'Livrée'][order.status]}`)
          )
        )
      )
  );
}
