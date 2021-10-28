import { FC, useEffect, useState } from 'react'

import { Box } from 'theme-ui'
import throttle from 'lodash.throttle'

const NavbarRoot: FC = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return (
    <Box
      sx={{
        pt: [32, 64, 48],
        pb: [32, 32, 48],
        borderBottom: hasScrolled ? 'solid 1px #fff' : 'none',
      }}
    >
      {children}
    </Box>
  )
}

export default NavbarRoot
