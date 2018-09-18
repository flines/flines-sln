export function addHtmlToBody(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);
}