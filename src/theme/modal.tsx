export const Modal = {
  baseStyle: {
    header: {
      color: 'gray.500',
      bg: 'mainBlack',
      px: '24px',
      py: '16px',
      borderRadius: '16px 16px 0 0',
    },
    dialog: {
      bg: 'mainBlack',
      borderRadius: '16px',
    },
    closeButton: {
      top: '8px',
      right: '12px',
      color: 'gray.500',
      _focus: {
        boxShadow: 'none',
      },
      _hover: {
        color: 'mainGreen',
      },
    },
    body: {
      bg: 'mainBlack',
      px: '16px',
      py: '16px',
      borderRadius: '0 0 16px 16px',
    },
    footer: {
      justifyContent: 'center',
    },
  },
}
