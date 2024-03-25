import type { DogInsert } from '@mono/server/src/shared/entities'

const getRandomName = (() => {
  const dogNames = [
    'Apollo',
    'Bandit',
    'Comet',
    'Dash',
    'Echo',
    'Fido',
    'Goliath',
    'Hunter',
    'Igloo',
    'Jaws',
    'Krypto',
    'Lucky',
    'Muffin',
    'Nimbus',
    'Opal',
    'Paws',
    'Quicksilver',
    'Rascal',
    'Scout',
    'Tango',
    'Uno',
    'Vortex',
    'Whiskers',
    'Xena',
    'Yapper',
    'Zephyr',
  ]

  return () => dogNames[Math.floor(Math.random() * dogNames.length)]
})()

/** Inclusive random number generator. */
const randomWithin = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// Generally, the client would not have privileges to set URLs.
const getRandomImage = (isGoodDog: boolean) => {
  const IMAGE_ID_MIN = 1
  const IMAGE_ID_MAX = 5
  const IMAGE_PATH = '/dogs/'
  const id = randomWithin(IMAGE_ID_MIN, IMAGE_ID_MAX)

  return `${IMAGE_PATH}${isGoodDog ? 'good' : 'bad'}-dog-${id}.jpg`
}

export const formDog = (isGoodDog: boolean): DogInsert => ({
  name: getRandomName(),
  isGoodDog,
  image: getRandomImage(isGoodDog),
})
