import { createElement as el } from '../core/createElement.js';
import { useStore } from '../core/store.js';

export function OrderTracker() {
  const { getState } = useStore();
  const orders = getState().orders || [];
  const steps = ['Préparation', 'En livraison', 'Livré'];

  const processOrder = orders.filter(o => o.status < 2);
  const lastOrder = [...orders].reverse().find(o => o.status === 2);

  if (processOrder.length === 0 && !lastOrder) {
    return el('div', { class: 'text-center text-gray-500' }, 'Aucune commande à suivre pour le moment.');
  }

  const toScreen = processOrder.length > 0 ? processOrder : [lastOrder];

  return el('section', { class: 'container mx-auto px-4 py-8' },
    el('h2', { class: 'text-xl font-semibold mb-4' },
      processOrder.length > 0 ? '📦 Commandes en cours' : '📬 Dernière commande livrée'
    ),
    ...toScreen.map((order, i) =>
      el('div', {
          class: 'bg-white rounded shadow p-4 mb-4 border-l-4 transition-all ' +
            (order.status === 0 ? 'border-yellow-400' :
              order.status === 1 ? 'border-blue-500' :
                'border-green-500')
        },
        el('p', { class: 'mb-2 font-semibold' },
          processOrder.length > 0
            ? `Commande #${orders.indexOf(order) + 1}`
            : 'Commande livrée'
        ),
        el('ul', { class: 'text-sm list-disc list-inside mb-2' },
          ...order.items.map(item =>
            el('li', {}, `${item.name} × ${item.quantity}`)
          )
        ),
        el('p', { class: 'text-gray-600 mb-2' }, `Statut : ${steps[order.status]}`),
        order.status === 0 && el('button', {
          class: 'bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600',
          onclick: () => {
            const { getState, setState } = useStore();
            const orders = [...getState().orders];
            const index = orders.indexOf(order);
            if (index > -1) {
              orders.splice(index, 1);
              setState({ orders });
              import('../utils/toastService.js').then(({ renderToast }) => {
                renderToast(`Commande #${index + 1} annulée ❌`);
              });
            }
          }
        }, 'Annuler')
      )
    )
  );
}
