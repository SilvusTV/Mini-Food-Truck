import { createElement as el } from '../../core/createElement.js';
import { useStore } from '../../core/store.js';

export function CartModal() {
  const { getState, setState } = useStore();
  const cart = getState().cart || {};
  const isOpen = getState().isCartOpen;

  if (!isOpen) {
    return el('div', { class: 'hidden' }); // évite de casser le rendu
  }

  const closeModal = () => {
    setState({ isCartOpen: false });
  };

  const items = Object.values(cart);
  const totalTTC = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const commandesEnCours = (getState().orders || []).filter(order => order.status < 2);
  const maxCommandes = commandesEnCours.length >= 5;
  const panierVide = items.length === 0;

  return el('div', {
      class: 'fixed inset-0 bg-modal flex justify-center items-center z-50'
    },
    el('div', { class: 'bg-white rounded-xl p-6 w-full max-w-md' },
      el('h2', { class: 'text-xl font-bold mb-4' }, '🛒 Votre Panier'),
      ...items.map(item =>
        el('div', { class: 'flex justify-between items-center mb-2 text-sm gap-2' },
          el('div', { class: 'flex items-center gap-2' },
            el('button', {
              class: 'px-2 py-1 bg-gray-200 rounded hover:bg-gray-300',
              onclick: () => {
                const { getState, setState } = useStore();
                const cart = { ...getState().cart };
                if (cart[item.id].quantity > 1) {
                  cart[item.id].quantity -= 1;
                } else {
                  delete cart[item.id];
                }
                setState({ cart });
              }
            }, '−'),
            el('span', {}, `${item.quantity}`),
            el('button', {
              class: 'px-2 py-1 bg-gray-200 rounded hover:bg-gray-300',
              onclick: () => {
                const { getState, setState } = useStore();
                const cart = { ...getState().cart };
                cart[item.id].quantity += 1;
                setState({ cart });
              }
            }, '+')
          ),
          el('span', {}, `${item.name}`),
          el('span', {}, `${(item.price * item.quantity).toFixed(2)} €`)
        )
      ),
      el('hr', { class: 'my-4' }),
      el('div', { class: 'text-sm space-y-1' },
        el('div', { class: 'flex justify-between font-bold' }, el('span', {}, 'Total TTC'), el('span', {}, `${totalTTC.toFixed(2)} €`))
      ),
      el('div', { class: 'flex justify-end gap-4 mt-6' },
        el('button', {
          class: 'px-4 py-2 bg-gray-200 rounded hover:bg-gray-300',
          onclick: closeModal
        }, 'Fermer'),
        (() => {
          const props = {
            className: 'px-4 py-2 rounded transition ' +
              (panierVide || maxCommandes
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'),
            onclick: () => {
              if (panierVide || maxCommandes) return;
              setState({ isOrderSummaryOpen: true, isCartOpen: false });
            }
          };

          if (panierVide || maxCommandes) {
            props.disabled = true;
          }

          return el('button', props, maxCommandes ? 'Limite de commandes atteinte' : 'Commander');
        })()
      )
    )
  );
}
