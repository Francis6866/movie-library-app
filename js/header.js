export function toggleTheme() {
    const toggleBall = document.querySelector('.toggle-ball');
    const headerEl  = document.querySelector('.header')
    const mainEl  = document.querySelector('.main')

    toggleBall.addEventListener('click', function(){
        headerEl.classList.toggle('light')
        mainEl.classList.toggle('light')
    })
}