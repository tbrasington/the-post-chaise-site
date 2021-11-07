import { Footer, Navbar } from "@components/common"
import React, { FC } from "react"
//import Loader from "@components/ui/Loader"

import { useUI } from "@components/ui/context"
import { SanityPages } from "@sanityLib/types/meta"
import NavigationMenu from "../NavigationMenu"

interface Props {
  pageProps: {
    pages: SanityPages
  }
}

const NavigationMenuUI: FC<{ links: SanityPages }> = ({ links }) => {
  const { displayMenu } = useUI()
  return displayMenu ? <NavigationMenu links={links} /> : null
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  return (
    <div>
      <Navbar />
      <NavigationMenuUI links={pageProps.pages} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
