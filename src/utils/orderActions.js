import { useStore } from '../core/store.js';
import { renderToast } from './toastService.js';

export function simulateOrderProgress(orderId) {
  const { getState, setState } = useStore();

  const updateStatus = (status, delay) => {
    setTimeout(() => {
      const orders = [...getState().orders];
      if (orders[orderId]) {
        orders[orderId].status = status;
        setState({ orders });
        renderToast(`Commande #${orderId + 1} : ${status === 1 ? '🚚 En livraison' : '✅ Livrée'}`);
      }
    }, delay);
  };

  updateStatus(1, 3000); // En livraison
  updateStatus(2, 6000); // Livrée
}
