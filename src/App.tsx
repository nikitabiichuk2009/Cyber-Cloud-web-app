import logo from './logo.svg'
import './App.css'
import { Box, Code, Heading, Image, Link, Text } from '@chakra-ui/react'

function App() {
  return (
    <Box as="div" className="App">
      <Box as="header" className="App-header">
        <Image as="img" src={logo} className="App-logo" alt="logo" />
        <Text as={'p'}>
          Edit <Code as="code">src/App.tsx</Code> and save to reload.
        </Text>
        <Link
          as="a"
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </Link>
        <Heading as="h1">Hello, world!</Heading>
      </Box>
    </Box>
  )
}

export default App
