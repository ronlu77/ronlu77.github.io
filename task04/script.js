const CAR_TYPE = {
    'tractor': {
        url: './images/car1.png',
        name_cn: '拖拉机'
    },
    'truck': {
        url: './images/car2.png',
        name_cn: '卡车'
    },
    'motorcycle': {
        url: './images/car3.png',
        name_cn: '摩托车'
    },
    'electric': {
        url: './images/car5.png',
        name_cn: '电动车'
    },
    'smoky': {
        url: './images/car4.png',
        name_cn: '跑车'
    },
    'bike': {
        url: './images/car6.png',
        name_cn: '自行车'
    }
}
const speed_select = document.getElementById('speed')
const cartype_select = document.getElementById('cartype')
const car = document.getElementById('car')
let car_location = {
    left: 0,
    top: 0
}
let speed = 1
let type = 'tractor'
let direction = null

const updateLocalStorage = () => {
    const info = {
        type,
        speed,
        direction,
        car_location
    }
    localStorage.setItem('GAME_INFO', JSON.stringify(info))
}

// 车型改变触发钩子
const onCarTypeChange = (event) => {
    event.stopPropagation()
    type = cartype_select.value
    car.setAttribute('src', CAR_TYPE[cartype_select.value].url)
    updateLocalStorage()
}



const onSpeedChange = (event) => {
    event.stopPropagation()
    speed = speed_select.value
    updateLocalStorage()
}

const setDirection = () => {
    car.classList.remove('car-left', 'car-up', 'car-right', 'car-down')
    switch (direction) {
        case 'left':
            car.classList.add('car-left')
            break
        case 'right':
            car.classList.add('car-right')
            break
        case 'up':
            car.classList.add('car-up')
            break
        case 'down':
            car.classList.add('car-down')
            break
        default:
            return console.error('Error')
    }
}

// 键盘监听事件
const onKeyborad = (event) => {
    const _speed = parseInt(speed)
    switch (event.keyCode) {
        // ←
        case 37:
            car_location.left -= _speed
            direction = 'left'
            break
        // ↑
        case 38:
            car_location.top -= _speed
            direction = 'up'
            break
        // →
        case 39:
            car_location.left += _speed
            direction = 'right'
            break
        // ↓
        case 40:
            car_location.top += _speed
            direction = 'down'
            break
        default:
            return console.error('Error')
    }
    car.style.top = car_location.top + 'px'
    car.style.left = car_location.left + 'px'

    setDirection()
    updateLocalStorage()
}


// 初始化 option
function initSelectOptions() {
    if (localStorage.getItem('GAME_INFO')) {
        const info = JSON.parse(localStorage.getItem('GAME_INFO'))
        type = info.type
        speed = parseInt(info.speed)
        direction = info.direction
        car_location = info.car_location
        speed_select.value = speed
        cartype_select.value = type
        car.setAttribute('src', CAR_TYPE[type].url)
        setDirection()
    } else {
        direction = 'right'
        car.setAttribute('src', CAR_TYPE['tractor'].url)
    }

    const speed_options = []
    const cartype_options_key = Object.keys(CAR_TYPE)
    const cartype_options = []
    let index = 0

    cartype_options_key.forEach(item => {
        const _option = document.createElement('option')
        _option.innerHTML = CAR_TYPE[item].name_cn
        _option.setAttribute('value', item)
        cartype_options.push(_option)
    })
    cartype_select.append(...cartype_options)
    cartype_select.addEventListener('change', onCarTypeChange)
    car.style.left = car_location.left + 'px'
    car.style.top = car_location.top + 'px'

    while (index < 10) {
        const _option = document.createElement('option')
        _option.innerHTML = index + 1
        _option.setAttribute('value', index + 1)
        index++
        speed_options.push(_option)
    }
    speed_select.append(...speed_options)
    speed_select.addEventListener('change', onSpeedChange)
    updateLocalStorage()
}

initSelectOptions()

window.addEventListener('keydown', onKeyborad)