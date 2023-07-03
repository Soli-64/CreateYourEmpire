
export function newAlert(text, color) {
    document.querySelector('.alert')?.remove()

    const alert = createElement('div', {class: `alert ${color}`}, `${text}`)

    document.querySelector('body').append(alert)

    alert.addEventListener('animationend', () => {
        alert.remove()
    })

}

/**
 * 
 * @param {string} tagName 
 * @param {Object} attributes 
 * @param {string} innertext 
 * @returns {HTMLElement}
 */
export function createElement(tagName, attributes, innertext) {
    const element = document.createElement(tagName)
    for (const [attribut, value] of Object.entries(attributes)) {
        if (value !== null) {
            element.setAttribute(attribut, value)
        }
    }
    element.innerText = innertext
    return element
}