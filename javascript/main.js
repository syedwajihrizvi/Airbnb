let windowScroll = document.documentElement.scrollTop

let progressButton = document.documentElement.querySelector('.draggable__progress-bar__button')
let progress = document.documentElement.querySelector('.draggable__progress-bar__progress')
let progressBar = document.documentElement.querySelector('.draggable__progress-bar')
let calculationHeading = document.documentElement.querySelector('.progress__display__dynamic')
let progressNights = document.documentElement.querySelector('.progress__nights')
let calculationSteps = document.documentElement.querySelector('.progress__calculation__description')

calculationHeading.style.fontSize = "4rem"
calculationHeading.innerText = `$110 CAD`
let isDragging = false

progressButton.addEventListener('mousedown', (e) => {
    isDragging = true
})

const calculateDays = (percentage) => {
    if (percentage > 0 && percentage <= 10) {
        return 10
    } else if (percentage > 10 && percentage <= 20) {
        return 20
    } else if (percentage > 20 && percentage <= 30) {
        return 30
    } else if (percentage > 30 && percentage <= 40) {
        return 40
    } else if (percentage > 40 && percentage <= 50) {
        return 50
    } else if (percentage > 50 && percentage <= 60) {
        return 60
    } else if (percentage > 60 && percentage <= 70) {
        return 70
    } else if (percentage > 70 && percentage <= 80) {
        return 80
    } else if (percentage > 80 && percentage <= 90) {
        return 90
    }
    return 100
}

const calculateRevenue = (days) => {
    return days*11
}

const renderDays = (days) => {
    if (days <= 1) {
        return `${days} day`
    }
    return `${days} days`
}

const renderNights = (days) => {
    if (days <= 1) {
        return `${days} night`
    }
    return `${days} nights`
}

const renderCalculationSteps = (days) => {
    return `<span>${days}</span> at an estimated $110 CAD per night `    
}

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return

    const progressBarRect = progressBar.getBoundingClientRect()
    let newLeft= e.clientX - progressBarRect.left
    newLeft =  Math.max(0, Math.min(newLeft, progressBarRect.width))
    newLeft = (newLeft / progressBarRect.width) * 100

    newLeft = calculateDays(parseInt(newLeft))
    progressButton.style.left = `${newLeft}%`
    progress.style.width = `${newLeft}%`
    progressNights.style.left = `${newLeft}%`
    calculationHeading.innerText = `$${calculateRevenue(newLeft)} CAD`
    const days = renderDays(newLeft/10)
    progressNights.innerText = `${days}`
    calculationSteps .innerHTML = renderCalculationSteps(days)

})

document.addEventListener('mouseup', () => {
    isDragging = false
})

progressBar.addEventListener('click', (e) => {
    const progressBarRect = progressBar.getBoundingClientRect()
    let newLeft= e.clientX - progressBarRect.left
    newLeft =  Math.max(0, Math.min(newLeft, progressBarRect.width))
    newLeft = (newLeft / progressBarRect.width) * 100
    newLeft = calculateDays(parseInt(newLeft))
    progressButton.style.left = `${newLeft}%`
    progress.style.width = `${newLeft}%`
    progressNights.style.left = `${newLeft}%`
    calculationHeading.innerText = `$${calculateRevenue(newLeft)} CAD`
    const days = renderDays(newLeft/10)
    progressNights.innerText = `${days}`
    calculationSteps .innerHTML = renderCalculationSteps(days)

})

document.addEventListener('scroll', () => {
    // The horizontal scroll bar
    const leftScrollContainer = document.querySelector('.scroll-left')
    const scrollY = window.scrollY
    leftScrollContainer.scrollLeft = scrollY

    let currentScroll = document.documentElement.scrollTop
    navBar = document.querySelector('.nav')
    if (currentScroll > 0)
        navBar.classList.add('nav__border')
    else
        navBar.classList.remove('nav__border')

    if (currentScroll > windowScroll) {
        footerVariableHeading = document.querySelector('.footer__variable__heading')
        footerVariableHeading.style.display = "none"
    } else {
        footerVariableHeading.style.display = "inline-block"
    }
    windowScroll = currentScroll
})

const primaryButton = document.querySelectorAll('.btn--primary')

primaryButton.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const buttonRect = button.getBoundingClientRect()
        const x = e.clientX - buttonRect.left;
        const y = e.clientY - buttonRect.top;
        let glowItem = e.target.querySelector('.btn__glow')
        console.log(glowItem)
        if (!glowItem) {
            glowItem = e.target
        }
        glowItem.style.opacity = '1'
        glowItem.style.top = `${y}px`
        glowItem.style.left = `${x}px`
        glowItem.style.cursor = 'pointer'
        console.log(e.target.childNodes)
    })
})

primaryButton.forEach(button => {
    button.addEventListener('mouseleave', (e) => {
        const glowItem = e.target.querySelector('.btn__glow')
        glowItem.style.opacity = '0';
        glowItem.style.top = '0'
        glowItem.style.left = '0'
        console.log('Mouse Left')
    })
})

const collapsibleChevrons = document.querySelectorAll('.collapsible__chevron')
collapsibleChevrons.forEach(chevron => {
    chevron.addEventListener('click', () => {
        chevron.parentNode.parentNode.classList.toggle('collapsible__expanded')
    })
})
