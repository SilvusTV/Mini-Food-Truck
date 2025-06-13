import { createElement as el } from '../../core/createElement.js';
import { useStore } from '../../core/store.js';
import {simulateOrderProgress} from "../../utils/orderActions.js";

export function OrderSummaryModal() {
  const { getState, setState } = useStore();
  const cart = getState().cart || {};
  const isOpen = getState().isOrderSummaryOpen;

  if (!isOpen) return el('div', { class: 'hidden' });

  const items = Object.values(cart);

  const totalTTC = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalHT = totalTTC / 1.2;
  const tva = totalTTC - totalHT;

  const closeModal = () => setState({ isOrderSummaryOpen: false });

  const validateOrder = () => {
    const { getState, setState } = useStore();
    const cart = getState().cart;
    const orders = getState().orders || [];

    const commandesEnCours = orders.filter(order => order.status < 2);
    if (commandesEnCours.length >= 5) {
      import('../../utils/toastService.js').then(({ renderToast }) => {
        renderToast('❌ Maximum de 5 commandes en cours atteint');
      });
      return;
    }

    if (Object.keys(cart).length === 0) return;

    const newOrder = {
      items: Object.values(cart),
      status: 0
    };

    const updatedOrders = [...orders, newOrder].slice(-5); // Max 5 commandes
    setState({ cart: {}, orders: updatedOrders, isOrderSummaryOpen: false });

    simulateOrderProgress(updatedOrders.length - 1);
  };

  return el('div', {
      class: 'fixed inset-0 bg-modal flex justify-center items-center z-50'
    },
    el('div', { class: 'bg-white rounded-xl p-6 w-full max-w-md' },
      el('h2', { class: 'text-xl font-bold mb-4' }, '🧾 Récapitulatif de votre commande'),
      ...items.map(item =>
        el('div', { class: 'flex justify-between items-center mb-2 text-sm' },
          el('span', {}, `${item.name} × ${item.quantity}`),
          el('span', {}, `${(item.price * item.quantity).toFixed(2)} €`)
        )
      ),
      el('hr', { class: 'my-4' }),
      el('div', { class: 'text-sm space-y-1' },
        el('div', { class: 'flex justify-between' }, el('span', {}, 'Total HT'), el('span', {}, `${totalHT.toFixed(2)} €`)),
        el('div', { class: 'flex justify-between' }, el('span', {}, 'TVA (20%)'), el('span', {}, `${tva.toFixed(2)} €`)),
        el('div', { class: 'flex justify-between font-bold' }, el('span', {}, 'Total TTC'), el('span', {}, `${totalTTC.toFixed(2)} €`))
      ),
      el('div', { class: 'flex justify-end gap-4 mt-6' },
        el('button', {
          class: 'px-4 py-2 bg-gray-200 rounded hover:bg-gray-300',
          onclick: closeModal
        }, 'Annuler'),
        el('button', {
          class: 'px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700',
          onclick: validateOrder
        }, 'Valider')
      )
    )
  );
}
