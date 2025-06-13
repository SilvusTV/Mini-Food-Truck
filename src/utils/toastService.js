import { Toast } from '../components/Toast.js';
import { createDomNode } from '../core/utils/createDomNode.js';

export function renderToast(message) {
  const toastNode = createDomNode(Toast({ message }));
  document.body.appendChild(toastNode);
  setTimeout(() => toastNode.remove(), 3000);
}
