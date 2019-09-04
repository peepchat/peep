// Colors

const primary = '#81E6D9'
const secondary = '#E6FFFA'
const teritary = '#2C7A7B'
const white = '#ffffff'
const text = '#CCC'


// Transitions

const transitions = {

  ease: time => {
    return `all ${time} ease-in-out`
  }

}

export const theme = {
  colors: {
    primary,
    secondary,
    teritary,
    white,
    text,
  },
  
  transitions
}