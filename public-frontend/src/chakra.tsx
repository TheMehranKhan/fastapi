import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// Color mode config: follow system preference and enable initial color mode to 'system'
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({ config })

export default theme
