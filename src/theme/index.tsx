import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'
import { Button } from './button'
import { Link } from './link'
import { Text } from './text'
import { Tooltip } from './tooltip'
import { Modal } from './modal'

export const theme = extendTheme({
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: 'gray.600',
        color: 'gray.800',
        fontFamily: `'Inter Variable', sans-serif`,
      },
    },
  },
  colors,
  sizes: {
    // '4xl': '930px',
    container: {
      '2xl': '1536px',
    },
  },
  // sizes: {
  //   "4xl": "930px",
  //   container: {
  //     lg: "calc(930px + 2rem)",
  //     xl: "calc(1300px + 2rem)",
  //   },
  // },
  // layerStyles: {
  //   outline: {
  //     border: '2px solid',
  //     borderColor: 'highliteLineGray',
  //     borderRadius: '24px',
  //     alignSelf: 'stretch',
  //     paddingX: '20px',
  //     paddingY: '16px',
  //   },
  // },
  components: {
    Button,
    Link,
    Text,
    Tooltip,
    Modal,
  },
})
