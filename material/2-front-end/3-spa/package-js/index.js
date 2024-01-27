import { format } from 'date-fns'
import { intersection } from 'lodash-es'

const date = new Date()
const dateFormatted = format(date, 'yyyy.MM.dd')

console.log('dateFormatted', dateFormatted)

const words = ['hello', 'earth', 'hello', 'mars']
const planets = ['venus', 'earth', 'mars']

const planetsMentioned = intersection(words, planets)

console.log('planetsMentioned', planetsMentioned)

