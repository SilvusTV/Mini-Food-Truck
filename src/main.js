import { render } from './core/render.js';
import { App } from './components/Pages/App.js';
import {useStore} from "./core/store.js";

const root = document.getElementById('app');
render(App(), root, App);

const { subscribe } = useStore();
subscribe(() => {
  render(App(), root, App);
});