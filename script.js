function defineTimestamp(json) {
    generateDashboard(json, 'weekly')
    const dateSort = document.querySelectorAll('[dateFormat]')
    dateSort.forEach(item => {
        item.onclick = (e = PointerEvent, x = item) => {
            if (x.getAttribute('selected') !== null) return
            else {
                document.querySelector('[selected]').removeAttribute('selected')
                x.setAttribute('selected', true)
                fetch('./data.json')
                    .then(response => response.json())
                    .then(json => {
                        generateDashboard(json, x.getAttribute('dateFormat'), true)
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
        return `<div class="card" type="${name}">
        <div class="card__background">
          <img src="./images/icon-${name.split(' ').join('-')}.svg" alt="Background icon">
        </div>
        <main>
          <div class="card__top">
            <h2 id="card__title">${name}</h2>
            <button class="card__options">
              <img src="./images/icon-ellipsis.svg" alt="Options">
            </button>
          </div>
          <div class="card__details">
            <span id="card__hours" class="card__hours">${e.timeframes[timestamp].current}hrs</span>
            <span id="card__previousHours" class="card__previousHours">Last ${timestamp.replace(/daily|weekly|monthly/g, e => replacer[e])} - ${e.timeframes[timestamp].previous}hrs</span>
          </div>
        </main>
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