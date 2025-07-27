export function toggleTheme() {
    const toggleBall = document.querySelector('.toggle-ball');
    const headerEl  = document.querySelector('.header')

    toggleBall.addEventListener('click', function(){
        headerEl.classList.toggle('light')
    })
}