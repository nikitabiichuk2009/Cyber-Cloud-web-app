export const Button = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'md',
    color: 'mainGreen',
    boxShadow: 'xl',
  },
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
  },
  defaultProps: {
    variant: 'solid',
    size: 'lg',
  },
}
