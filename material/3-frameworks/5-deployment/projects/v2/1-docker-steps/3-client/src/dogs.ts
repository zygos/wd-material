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

const getRandomImage = (isGoodDog: boolean) => {
  const IMAGE_PATH = '/dogs/'
  const IMAGE_ID_MIN = 1
  const IMAGE_ID_MAX = 5
  const id = Math.floor(Math.random() * (IMAGE_ID_MAX - IMAGE_ID_MIN + 1)) + IMAGE_ID_MIN

  return `${IMAGE_PATH}${isGoodDog ? 'good' : 'bad'}-dog-${id}.jpg`
}

export const formRandomDog = (id: number, isGoodDog: boolean) => ({
  id,
  name: getRandomName(),
  isGoodDog,
  image: getRandomImage(isGoodDog),
})
