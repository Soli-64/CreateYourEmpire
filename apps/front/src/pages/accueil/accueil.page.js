import '../../css/style.scss'

document.querySelector('#new-world').addEventListener('click', () => {
    window.location.href = "/src/pages/world/world.html?mode=new&content=false"
})

document.querySelector('#load-world').addEventListener('click', () => {
    window.location.href = "/src/pages/load-world/load-world.html"
})
