// import View from '/src/components/View';
import('./components/View.js').then((View) => {
    document.getElementById('app').appendChild(document.createElement('div', {innerHTML: View.default}));
});

