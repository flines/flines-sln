// import View from '/src/components/View';
import { addHtmlToBody } from './utils/webpage.mjs';

addHtmlToBody('<p>mjs</p>');
import('./components/View.js').then((View) => {
    const el = document.createElement('div');
    el.innerHTML = View.default;
    document.getElementById('app').appendChild(el);
});

