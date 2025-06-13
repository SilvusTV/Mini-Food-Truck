import { createElement as el } from '../core/createElement.js';
import { useStore } from '../core/store.js';
import {PexelsImage} from "./PexelsImage.js";

export function MenuGrid() {
  const { getState, setState } = useStore();
  const menu = getState().menu || [];

  const handleAddToCart = (item) => {
    const state = getState();
    const currentCart = state.cart || {};
    const quantity = currentCart[item.id]?.quantity || 0;

    setState({
      cart: {
        ...currentCart,
        [item.id]: {
          ...item,
          quantity: quantity + 1,
        }
      }
    });
  };

  return el('div', { class: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' },
    ...menu.map(item =>
      el('div', { class: 'bg-white shadow rounded-xl overflow-hidden flex flex-col' },
        PexelsImage({ query: item.image, alt: item.name, className: 'w-full h-48' }),
        el('div', { class: 'p-4 flex-1 flex flex-col justify-between' },
          el('h2', { class: 'text-lg font-bold mb-2' }, item.name),
          el('p', { class: 'text-sm text-gray-600 mb-4 flex-1' }, item.description || 'Un délicieux plat à déguster.'),
          el('div', { class: 'flex justify-between items-center mt-auto' },
            el('span', { class: 'text-orange-600 font-semibold' }, `${item.price.toFixed(2)} €`),
            el('button', {
              class: 'bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition',
              onclick: () => handleAddToCart(item)
            }, 'Ajouter')
          )
        )
      )
    )
  );
}
