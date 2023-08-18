
const form = document.getElementById('formData')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    let order = '【您的订单已生成】\n--------------------\n'
    for (let [key, value] of formData.entries()) {
        switch (key) {
            case 'tastes':
                order += `奶茶口味：${value}\n`
                break
            case
                'drinks':
                order += `杯数：${value}\n`
                break
            case 'size':
                order += `杯型：${value}\n`
                break
            case 'sweet':
                order += `甜度：${value}\n`
                break
            case 'small':
                order += `免费小料：${value}\n`
                break
            case 'markup':
                order += `加价小料：${value}\n`
                break
            case 'isICE':
                order += `是否加冰：${value}\n`
                break
            case 'isDelete':
                order += `是否去茶底：${value}\n`
                break
            case 'address':
                order += `地址：${value}\n`
                break
            case 'tel':
                order += `手机号：${value}\n`
                break
            case 'time':
                order += `期待送达时间：${value}\n`
                break
            case 'description':
                order += `备注：${value}\n`
                break
            case 'pay':
                order += `支付方式：${value}\n`
                break
        }
    }
    alert(order)
})