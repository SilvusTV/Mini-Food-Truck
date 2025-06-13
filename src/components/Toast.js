import { createElement as el } from '../core/createElement.js';

export function Toast({ message }) {
  return el('div', {
    class: 'fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded shadow z-[9999] animate-fade-in-out text-sm'
  }, message);
}
