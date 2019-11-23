// console.log("client JS has loaded")

const weatherForm = document.querySelector('.form')
const address = document.querySelector('input')
message1 = document.querySelector('#message1')
message2 = document.querySelector('#message2')
errormsg = document.querySelector('#error')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = address.value
    if (location) {
        message1.textContent = 'Loading'
        message2.textContent = ''
        errormsg.textContent = ''
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    errormsg.textContent = data.error
                    message1.textContent = ''
                    message2.textContent = ''
                    console.log(data.error)
                } else {
                    errormsg.textContent = ''
                    message1.textContent = data.location
                    message2.textContent = data.forecastData
                    console.log(data.location)
                    console.log(data.forecastData)
                }
            })
        })
    } else {
        errormsg.textContent = "please enter the location"
        message2.textContent = ''
        message1.textContent = ''
    }
})