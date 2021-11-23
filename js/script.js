const body = document.querySelector('body')

body.addEventListener('click', (e) => {
    if (e.target.nodeName === 'INPUT') {
        body.classList.remove('light')
        body.classList.add(`${e.target.value}`)
    }
})



