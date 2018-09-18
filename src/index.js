// import View from '/src/components/View';
import('/src/components/View').then((View) => {
    document.getElementById('app').appendChild(document.createElement('div', {innerHTML: View.default}));
});

