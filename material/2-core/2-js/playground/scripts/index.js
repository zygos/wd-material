// import user from './user.js'
// import user from './userData.json' assert { type: 'json' }

let counter = 0

function count(numberToAdd, event) {
  counter += numberToAdd // same as counter = counter + number
  console.log(counter)

  // information on the event
  console.log(event)
  console.log(event.target) // which element triggered the event

  document.querySelector('#count').innerText = counter
}

window.count = count

// const statusCode = 200

// const animalImage = await fetch(
//   `https://http.dog/${statusCode}.jpg`,
//   {
//     crossorigin: true,
//     headers: {
//       'Referrer-Policy': 'no-referrer',
//     },
//   },
// )

// console.log(animalImage)

// const response = await animalImage.blob()

// console.log('response', await response.text())
