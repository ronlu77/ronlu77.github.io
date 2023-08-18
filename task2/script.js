
const form = document.getElementById('formData')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    let order = ''
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    alert(order)
})