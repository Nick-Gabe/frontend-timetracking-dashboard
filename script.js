function defineTimestamp(json) {
    generateDashboard(json, 'weekly')
    const dateSort = document.querySelectorAll('[data-format]')
    dateSort.forEach(item => {
        item.onclick = (e = PointerEvent, x = item) => {
            if (x.getAttribute('data-selected') !== null) return
            else {
                document.querySelector('[data-selected]').removeAttribute('data-selected')
                x.setAttribute('data-selected', true)
                fetch('./data.json')
                    .then(response => response.json())
                    .then(json => {
                        generateDashboard(json, x.getAttribute('data-format'), true)
                    })
            }
        }
    })
}

function generateDashboard(json, timestamp) {
    const replacer = {
        daily: 'Day',
        weekly: 'Week',
        monthly: 'Month'
    }
    const cardContainer = document.querySelector('#dashboard')

    const cards = json.map(e => {
        let name = e.title.toLowerCase()
        return `<div class="card" data-type="${name}">
        <div class="card__background">
          <img src="./images/icon-${name.split(' ').join('-')}.svg" alt="Background icon">
        </div>
        <div class="main">
          <div class="card__top">
            <h2>${name}</h2>
            <button class="card__options">
              <img src="./images/icon-ellipsis.svg" alt="Options">
            </button>
          </div>
          <div class="card__details">
            <span class="card__hours">${e.timeframes[timestamp].current}hrs</span>
            <span class="card__previousHours">Last ${timestamp.replace(/daily|weekly|monthly/g, e => replacer[e])} - ${e.timeframes[timestamp].previous}hrs</span>
          </div>
        </div>
        </div>`
    }).join(' ')

    document.querySelectorAll('.card').forEach(x => x.remove())
    cardContainer.insertAdjacentHTML('beforeend', cards)
}

fetch('./data.json')
    .then(response => response.json())
    .then(json => {
        defineTimestamp(json)
    })