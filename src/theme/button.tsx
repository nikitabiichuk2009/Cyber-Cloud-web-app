export const Button = {
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: '46px',
    _focus: {
      boxShadow: 'none',
    },
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
      color: 'white',
      bg: 'tealButton',
      _active: {
        bg: 'primaryActive',
      },
      _hover: {
        bg: 'primaryHover',
        boxShadow: '0 0 8px 0 rgba(81, 147, 251, 1)',
      },
    },

    outline: {
      color: 'tealButton',
      bg: 'transparent',
      borderColor: 'tealButton',
      border: '2px',
      _active: {
        color: 'white',
        bg: 'tealButton',
      },
      _hover: {
        bg: 'transparent',
        borderColor: 'primaryHover',
        boxShadow: '0 0 8px 0 rgba(81, 147, 251, 1)',
      },
    },

    link: {
      fontWeight: 'normal',
      bg: 'transparent',
      color: 'tealButton',
      _disabled: {
        bg: 'transparent',
      },
      _active: {
        color: 'tealButton',
      },
      _focus: {
        boxShadow: 'none',
        outline: 'none',
      },
      _hover: {
        color: 'white',
        // outline: 'none',
        textDecoration: 'none',
        _disabled: {
          bg: 'transparent',
        },
      },
    },

    noDecoration: {
      fontWeight: 'normal',
      bg: 'transparent',
      color: 'tealButton',
      _disabled: {
        bg: 'transparent',
      },
      _active: {
        color: 'white',
      },
      _focus: {
        boxShadow: 'none',
        outline: 'none',
      },
      _hover: {
        // color: 'white',
        // outline: 'none',
        textDecoration: 'none',
        _disabled: {
          bg: 'transparent',
        },
      },
    },

    input: {
      fontSize: 'md',
      fontWeight: 'normal',
      color: 'textGrey',
      justifyContent: 'flex-start',
      px: '12px',
      border: '2px solid',
      borderRightRadius: '0',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      borderColor: 'tealButton',
      background: 'white',
      _hover: {
        borderColor: 'tealButton',
      },
    },

    // warning: {
    //   bg: 'warning',
    //   color: '#ffffff',
    // },
    // activeLink: {
    //   fontWeight: 'normal',
    //   bg: 'transparent',
    //   color: 'gray.79',
    //   _disabled: {
    //   bg: 'transparent',
    //   },
    //   _active: {
    //   color: 'primary',
    //   },
    //   _hover: {
    //   color: 'gray.100',
    //   },
    //   _focus: {
    //   boxShadow: 'none',
    //   outline: 'none',
    //   },
    // },
    // ghost: {
    //   _active: {
    //   bg: 'unset',
    //   },
    //   _hover: {
    //   bg: 'unset',
    //   },
    //   _focus: {
    //   boxShadow: 'unset',
    //   outline: 'unset',
    //   },
    // },
  },
  defaultProps: {
    variant: 'outline',
  },
}
