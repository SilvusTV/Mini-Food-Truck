import {createElement as el} from '../../core/createElement.js';
import {MenuGrid} from "../MenuGrid.js";
import {CartModal} from "../Modals/CartModal.js";
import {OrderSummaryModal} from "../Modals/OrderSummaryModal.js";
import {OrderTracker} from "../OrderTracker.js";

export function HomePage() {
  return el('main', {class: 'flex-1 container mx-auto px-4 py-8'},
    el('p', {class: 'text-center text-gray-500 italic'}, 'Bienvenue dans l\'application de commande du Food Truck !'),
    el(MenuGrid),
    el(CartModal),
    el(OrderSummaryModal),
    el(OrderTracker)
  );
}
