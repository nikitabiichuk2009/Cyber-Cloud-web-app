export const Button = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'md',
    color: 'mainGreen',
    // backgroundColor: 'gray.800',
    boxShadow: 'xl',
    // background: 'gray.800',
    // _focus: {
    //   boxShadow: 'none',
    // },
    // _hover: {
    //   boxShadow: '2xl',
    //   // color: 'mainGreen',
    // },
    // _focus: {
    //   boxShadow: '0 0 0 3px #ffffff',
    //   outline: '2px solid #ffffff',
    // },
    // _disabled: {
    //   opacity: '1',
    //   bg: 'gray.28',
    //   color: 'gray.50',
    // },
    // _hover: {
    //   _disabled: {
    //   bg: 'gray.28',
    //   color: 'gray.50',
    //   boxShadow: 'none',
    //   },
    // },
  },
  // sizes: {
  //   sm: {
  //   fontSize: 'sm',
  //   py: '2.5px',
  //   px: '16px',
  //   height: '24px',
  //   lineHeight: '17.71px',
  //   },
  //   md: {
  //   fontSize: 'md',
  //   py: '8.5px',
  //   px: '16px',
  //   height: '36px',
  //   lineHeight: '17.71px',
  //   },
  // },
  variants: {
    solid: {
      color: 'mainGreen',
      background: 'gray.800',
      _active: {
        background: 'gray.800',
        transform: 'scale(0.98)',
      },
      _hover: {
        background: 'gray.800',
        boxShadow: '2xl',
        transform: 'scale(1.005)',
      },
    },
    wallet: {
      color: 'mainGreen',
      background: 'gray.800',
      '& span:first-of-type': {
        marginInlineEnd: '12px',
      },
      '& span:last-of-type': {
        marginInlineStart: 'auto',
      },
      _active: {
        background: 'gray.800',
        transform: 'scale(0.98)',
      },
      _hover: {
        background: 'gray.800',
        boxShadow: '2xl',
        transform: 'scale(1.005)',
      },
    },

    //   outline: {
    //     color: 'tealButton',
    //     bg: 'transparent',
    //     borderColor: 'tealButton',
    //     border: '2px',
    //     _active: {
    //       color: 'white',
    //       bg: 'tealButton',
    //     },
    //     _hover: {
    //       bg: 'transparent',
    //       borderColor: 'primaryHover',
    //       boxShadow: '0 0 8px 0 rgba(81, 147, 251, 1)',
    //     },
    //   },

    //   link: {
    //     fontWeight: 'normal',
    //     bg: 'transparent',
    //     color: 'tealButton',
    //     _disabled: {
    //       bg: 'transparent',
    //     },
    //     _active: {
    //       color: 'tealButton',
    //     },
    //     _focus: {
    //       boxShadow: 'none',
    //       outline: 'none',
    //     },
    //     _hover: {
    //       color: 'white',
    //       // outline: 'none',
    //       textDecoration: 'none',
    //       _disabled: {
    //         bg: 'transparent',
    //       },
    //     },
    //   },

    //   noDecoration: {
    //     fontWeight: 'normal',
    //     bg: 'transparent',
    //     color: 'tealButton',
    //     _disabled: {
    //       bg: 'transparent',
    //     },
    //     _active: {
    //       color: 'white',
    //     },
    //     _focus: {
    //       boxShadow: 'none',
    //       outline: 'none',
    //     },
    //     _hover: {
    //       // color: 'white',
    //       // outline: 'none',
    //       textDecoration: 'none',
    //       _disabled: {
    //         bg: 'transparent',
    //       },
    //     },
    //   },

    //   input: {
    //     fontSize: 'md',
    //     fontWeight: 'normal',
    //     color: 'textGrey',
    //     justifyContent: 'flex-start',
    //     px: '12px',
    //     border: '2px solid',
    //     borderRightRadius: '0',
    //     borderTopLeftRadius: '6px',
    //     borderBottomLeftRadius: '6px',
    //     borderColor: 'tealButton',
    //     background: 'white',
    //     _hover: {
    //       borderColor: 'tealButton',
    //     },
    //   },

    //   // warning: {
    //   //   bg: 'warning',
    //   //   color: '#ffffff',
    //   // },
    //   // activeLink: {
    //   //   fontWeight: 'normal',
    //   //   bg: 'transparent',
    //   //   color: 'gray.79',
    //   //   _disabled: {
    //   //   bg: 'transparent',
    //   //   },
    //   //   _active: {
    //   //   color: 'primary',
    //   //   },
    //   //   _hover: {
    //   //   color: 'gray.100',
    //   //   },
    //   //   _focus: {
    //   //   boxShadow: 'none',
    //   //   outline: 'none',
    //   //   },
    //   // },
    //   // ghost: {
    //   //   _active: {
    //   //   bg: 'unset',
    //   //   },
    //   //   _hover: {
    //   //   bg: 'unset',
    //   //   },
    //   //   _focus: {
    //   //   boxShadow: 'unset',
    //   //   outline: 'unset',
    //   //   },
    //   // },
  },
  defaultProps: {
    variant: 'solid',
    size: 'lg',
  },
}
