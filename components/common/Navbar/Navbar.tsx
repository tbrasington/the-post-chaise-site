/** @jsxImportSource theme-ui */
import { Button, Container, Logo, useUI } from '@components/ui'

import  { FC } from 'react'
import { Flex } from 'theme-ui'
import Link from 'next/link'
import NavbarRoot from './NavbarRoot'
import { TextStyleNames } from '@theme/tokens'
import { UserNav } from '@components/common'

interface Link {
  href: string
  label: string
}
interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const { displayMenu, toggleMenu } = useUI()
  return (
    <NavbarRoot>
      <Container>
        <Flex
          sx={{
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <Flex
            sx={{
              flex: 1,
            }}
          >
            <Link href="/">
              <a aria-label="Logo" sx={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center', 
                variant : `text.${TextStyleNames.label_upper}`
              }}>
                <Logo sx={{ 
                    width : [64, 64, 128],
                    height:[64, 64, 128],
                }}/>
                <span sx={{ml : 32}}>The Post Chaise</span>
              </a>
            </Link>
          </Flex>

          <Flex>
            <nav>
              <Button onClick={() => toggleMenu()}>menu</Button>
            </nav>
            <UserNav />
          </Flex>
        </Flex>

        {displayMenu ? (
          <nav>
            <Link href="/search">
              <a>All</a>
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a>{l.label}</a>
              </Link>
            ))}
          </nav>
        ) : null}
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
