// to fetch data from some url then convert it to json then to something with it

// fetch('http://localhost:3000/weather?address').then(response => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

// setting up message paragraphs
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    const address = search.value

    messageOne.textContent = 'Loading.............'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    fetch('/weather?address=' + address).then(response => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = 'Error: ' + data.error
            }
            else{
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = 'Weather: ' + data.weather
                messageThree.textContent = 'Temperature: ' + data.temperature
            }
        })
    })
})