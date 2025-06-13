import { createElement as el } from '../core/createElement.js';
import { useStore } from '../core/store.js';
import { render } from '../core/render.js';

export function CartIcon() {
  const { getState, setState } = useStore();
  const cart = getState().cart || {};
  const quantity = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

  const button = el('button', {
      class: 'relative',
      onclick: () => {
        setState({ isCartOpen: true });
        render();
      }
    },
    el('div',{class:'bg-white rounded-full cursor-pointer p-2'},
      el('img', {
        src: '/public/Icons/shopping-cart-outline.svg',
        alt: 'Panier',
        class: 'w-7 h-7'
      })
      ),
    quantity > 0 && el('span', {
      class: 'absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'
    }, String(quantity))
  );

  return button;
}
