// import View from '/src/components/View';
import('./components/View.js').then((View) => {
    const el = document.createElement('div');
    el.innerHTML = View.default;
    document.getElementById('app').appendChild(el);
});

