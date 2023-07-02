import { createElement } from "../utils.js";

export function newAlert(text, color) {
    document.querySelector('.alert')?.remove()

    const alert = createElement('div', {class: `alert ${color}`}, `${text}`)

    document.querySelector('body').append(alert)

    alert.addEventListener('animationend', () => {
        alert.remove()
    })

}
