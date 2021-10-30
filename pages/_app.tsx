import "@assets/main.css"
import "@assets/chrome-bug.css"

import { FC, useEffect } from "react"

import type { AppProps } from "next/app"
import { Head } from "@components/common"
import { ManagedUIContext } from "@components/ui/context"
import { AnimatePresence } from "framer-motion"
const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const url = `${router.route}`

  useEffect(() => {
    document.body.classList?.remove("loading")
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Component {...pageProps} key={url} />
          </AnimatePresence>
        </Layout>
      </ManagedUIContext>
    </>
  )
}
