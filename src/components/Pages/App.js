import { createElement as el } from '../../core/createElement.js';
import { useStore } from '../../core/store.js';
import { Loader } from '../Loader.js';
import {ErrorMessage} from "../ErrorMessage.js";
import {Header} from "../Header.js";
import {Footer} from "../Footer.js";
import {Router} from "../../router.js";


export function App() {
  window.App = App; // for re-render in useState
  const { getState, setState } = useStore();
  const { initialized } = getState();
  //hydrate store from the API
  if (!initialized) {
    setState({ loading: true, error: null });
    fetch('https://keligmartin.github.io/api/menu.json')
      .then(response => response.json())
      .then(data => {
        setState({ menu: data, loading: false, initialized: true, error: null });
      })
      .catch(error => {
        console.error('Error while getting book:', error);

        const errorType = error instanceof SyntaxError
          ? 'parse'
          : error.message.includes('Failed to fetch')
            ? 'network'
            : 'unknown';

        setState({ error: errorType, loading: false });
      });
  }
  if (getState().loading) {
    return Loader();
  }

  if (getState().error) {
    return ErrorMessage({ type: getState().error });
  }
  return el('div', {class:'min-h-screen flex flex-col bg-[#fff8f0] text-gray-800'},
    el(Header),
    el(Router),
    el(Footer)
  );
}
