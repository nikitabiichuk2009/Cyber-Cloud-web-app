// import React from "react";
import { useEffect } from 'react'
// import { NavLink, useMatch, useResolvedPath } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'

// import {
//   MenuItem,
//   Link,
//   useBreakpointValue,
//   Menu,
//   MenuButton,
//   MenuList,
//   Button,
// } from '@chakra-ui/react'

// import { resources } from '../../i18n'

// export const StyledNavLink = ({ to, children, variant, ...props }) => {
//   const resolved = useResolvedPath(to)
//   const match = useMatch({ path: resolved.pathname, end: true })
//   const displayMenuItems = useBreakpointValue({ base: true, lg: false })

//   const commonProps = {
//     as: NavLink,
//     to: to,
//     color: match ? 'white' : 'textGrey',
//   }

//   return variant === 'tab' ? (
//     <Link
//       {...commonProps}
//       variant="tab"
//       borderBottom={match && '2px solid'}
//       borderBottomColor={match ? 'teal' : 'none'}
//       {...props}
//     >
//       {children}
//     </Link>
//   ) : (
//     <MenuItem {...commonProps} {...(displayMenuItems && { fontSize: 'xl' })} variant={variant}>
//       {children}
//     </MenuItem>
//   )
// }

// export const LanguageSwitcher = () => {
//   const { i18n } = useTranslation()

//   const changeLanguage = (lang) => {
//     i18n.changeLanguage(lang)
//   }

//   const currentLanguageCode = i18n.language.split('-')[0]

//   return (
//     <Menu matchWidth={true} autoSelect={false}>
//       <MenuButton as={Button} size="lg" p="0" borderRadius="999px">
//         {resources[currentLanguageCode]?.name_short || 'Lang'}
//       </MenuButton>
//       <MenuList minW="48px">
//         {Object.keys(resources).map((lang) => (
//           <MenuItem key={lang} onClick={() => changeLanguage(resources[lang].code)}>
//             {resources[lang].name_short}
//           </MenuItem>
//         ))}
//       </MenuList>
//     </Menu>
//   )
// }

export const setDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? 'CyberCloud - ' + title : 'CyberCloud'
  }, [title]) // Only re-run the effect if the title changes
}
