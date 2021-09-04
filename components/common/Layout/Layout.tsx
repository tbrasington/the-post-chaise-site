import { Footer, Navbar } from "@components/common"
import React, { FC } from "react"
//import Loader from "@components/ui/Loader"
import { useAcceptCookies } from "@lib/hooks/useAcceptCookies"
import { useRouter } from "next/router"
import { useUI } from "@components/ui/context"
import { SanityPages } from "@sanity/types/meta"
import NavigationMenu from "../NavigationMenu"

// const dynamicProps = {
//   loading: function LoaderLoding() {
//     return <Loader />
//   }
// }

// const FeatureBar = dynamic(
//   () => import("@components/common/FeatureBar"),
//   dynamicProps
// )

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
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = "en-GB" } = useRouter()

  return (
    <div>
      <Navbar />
      <NavigationMenuUI links={pageProps.pages} />
      <main>{children}</main>
      <Footer />

      {/* <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        /> */}
    </div>
  )
}

export default Layout
