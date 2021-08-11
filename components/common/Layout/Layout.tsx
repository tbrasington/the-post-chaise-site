import { Footer, Navbar } from "@components/common"
import { Modal, Sidebar } from "@components/ui"
import React, { FC } from "react"

import CartSidebarView from "@components/cart/CartSidebarView"
import type { Category } from "@commerce/types/site"
import CheckoutSidebarView from "@components/checkout/CheckoutSidebarView"
import { CommerceProvider } from "@framework"
import Loader from "@components/ui/Loader"
import dynamic from "next/dynamic"
import { useAcceptCookies } from "@lib/hooks/useAcceptCookies"
import { useRouter } from "next/router"
import { useUI } from "@components/ui/context"
import { SanityPages } from "@sanity/types/meta"
import NavigationMenu from "../NavigationMenu"

const dynamicProps = {
  loading: function LoaderLoding() {
    return <Loader />
  }
}

// const FeatureBar = dynamic(
//   () => import("@components/common/FeatureBar"),
//   dynamicProps
// )

interface Props {
  pageProps: {
    pages: SanityPages
    categories: Category[]
  }
}

const SidebarView: FC<{ sidebarView: string; closeSidebar(): any }> = ({
  sidebarView,
  closeSidebar
}) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === "CART_VIEW" && <CartSidebarView />}
      {sidebarView === "CHECKOUT_VIEW" && <CheckoutSidebarView />}
    </Sidebar>
  )
}

const SidebarUI: FC = () => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI()
  return displaySidebar ? (
    <SidebarView sidebarView={sidebarView} closeSidebar={closeSidebar} />
  ) : null
}

const NavigationMenuUI: FC<{ links: SanityPages }> = ({ links }) => {
  const { displayMenu } = useUI()
  return displayMenu ? <NavigationMenu links={links} /> : null
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = "en-GB" } = useRouter()

  return (
    <CommerceProvider locale={locale}>
      <div>
        <Navbar />
        <NavigationMenuUI links={pageProps.pages} />
        <main>{children}</main>
        <Footer />
        <SidebarUI />
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
    </CommerceProvider>
  )
}

export default Layout
