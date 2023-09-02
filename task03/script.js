const WIN_COUNT = 2 // 游戏局数
const header = document.querySelector('.header')
const next_btn = document.getElementById('start-button')
const confirmbtn = document.getElementById('confirm-button')
const dialog = document.getElementById('dialog-info')
const form = document.getElementById('select-form')
const leftList = document.getElementsByClassName('left-gesture-item')
const rightList = document.getElementsByClassName('right-gesture-item')
const result = document.querySelector('.result-info')
const robotWin = document.querySelector('.robotWin')
const robotLoss = document.querySelector('.robotLoss')
const userWin = document.querySelector('.userWin')
const userLoss = document.querySelector('.userLoss')

let round = 0 // 当前回合
let user_loss = 0
let user_win = 0
let robot_loss = 0
let robot_win = 0

const restart = () => {
   location.reload()
}


// 获取机器人随机手势
function gainRobotGesture() {
    return Math.floor(Math.random() * 3) + 1 // [1, 4)
}

// 同步更改分数
function setPoint() {
    userLoss.innerHTML = user_loss
    userWin.innerHTML = user_win
    robotLoss.innerHTML = robot_loss
    robotWin.innerHTML = robot_win
}

// 判断玩家该回合对局结果
function gainResult(robotGesture, userGesture) {
    let message_str = ''
    let flag = null

    round++
    if (robotGesture == userGesture) {
        return message_str = '本回合平局'
    }
    switch (userGesture * 1) {
        case 1:
            flag = robotGesture == 3
            break;
        case 2:
            flag = robotGesture == 1
            break;
        case 3:
            flag = robotGesture == 2
            break;
        default: console.error('Error')
    }
    if (flag) {
        user_win++
        robot_loss++
        message_str = '本回合玩家赢'
    } else {
        user_loss++
        robot_win++
        message_str = '本回合机器人赢'
    }
    return message_str
}

function replaceButtonToRestart() {
    const restart_btn = document.createElement('button')
    const parent_node = next_btn.parentNode
    restart_btn.addEventListener('click', restart)
    restart_btn.innerHTML = '开始新一轮游戏'
    parent_node.replaceChild(restart_btn, next_btn)
}

function setMatchResult(result_message) {
    const span_node = document.createElement('span')
    span_node.innerHTML = result_message
    result.appendChild(span_node)
}


// 展示操作弹窗
next_btn.addEventListener('click', () => {
    dialog.showModal()
})

// 玩家确认手势钩子
confirmbtn.addEventListener('click', (val) => {
    // todo 获取表单选择的下拉项对应value
    const formData = new FormData(form)
    const userGesture = formData.get('gesture')
    const robotGesture = gainRobotGesture()

    Array.from(leftList).forEach(item => item.classList.remove('active'))
    Array.from(rightList).forEach(item => item.classList.remove('active'))
    leftList[robotGesture].classList.add('active')
    rightList[userGesture].classList.add('active')

    result.innerHTML = gainResult(robotGesture, userGesture)
    robotWin.innerHTML = robot_win
    robotLoss.innerHTML = robot_loss
    userWin.innerHTML = user_win
    userLoss.innerHTML = user_loss
    header.innerHTML = `第${round}回合（共3回合）`

    if (round === 3) {
        let result_message = ''
        if (user_win == robot_win) {
            result_message = '这把平局'
        } else {
            result_message = user_win > robot_win ? '👨恭喜您获得胜利' : '🤖恭喜机器人获得胜利'
        }
        setMatchResult(result_message)
        replaceButtonToRestart()
        return
    } else {
        if (user_win == 2) {
            setMatchResult('👨恭喜您获得胜利')
            replaceButtonToRestart()
            return
        } else if (user_loss == 2) {
            setMatchResult('🤖恭喜机器人获得胜利')
            replaceButtonToRestart()
            return
        }
    }
})