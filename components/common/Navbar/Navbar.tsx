import { Button, Container, Logo, useUI } from '@components/ui'
import React, { FC } from 'react'

import { Flex } from 'theme-ui'
import Link from 'next/link'
import NavbarRoot from './NavbarRoot'
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
        <Flex>
            <Link href="/">
              <a aria-label="Logo">
                <Logo />
              </a>
            </Link>
        

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
