import { FC, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "@components/icons"
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock"

import { Avatar } from "@components/common"
import ClickOutside from "@lib/click-outside"
import Link from "next/link"
import { useColorMode } from "theme-ui"
import useLogout from "@framework/auth/use-logout"
import { useRouter } from "next/router"
import { useUI } from "@components/ui/context"

interface DropdownMenuProps {
  open?: boolean
}

const LINKS = [
  {
    name: "My Orders",
    href: "/orders"
  },
  {
    name: "My Profile",
    href: "/profile"
  },
  {
    name: "My Cart",
    href: "/cart"
  }
]

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false }) => {
  const logout = useLogout()
  const { pathname } = useRouter()
  const [mode, setMode] = useColorMode()
  const [display, setDisplay] = useState(false)
  const { closeSidebarIfPresent } = useUI()
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>

  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [display])

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div>
        <button onClick={() => setDisplay(!display)} aria-label="Menu">
          <Avatar />
        </button>
        {display && (
          <ul ref={ref}>
            {LINKS.map(({ name, href }) => (
              <li key={href}>
                <div>
                  <Link href={href}>
                    <a
                      onClick={() => {
                        setDisplay(false)
                        closeSidebarIfPresent()
                      }}
                    >
                      {name}
                    </a>
                  </Link>
                </div>
              </li>
            ))}
            <li>
              <a
                onClick={() => {
                  mode === "dark" ? setMode("light") : setMode("dark")
                  setDisplay(false)
                }}
              >
                <div>
                  Theme: <strong>{mode}</strong>{" "}
                </div>
                <div className="ml-3">
                  {mode == "dark" ? (
                    <Moon width={20} height={20} />
                  ) : (
                    <Sun width="20" height={20} />
                  )}
                </div>
              </a>
            </li>
            <li>
              <a onClick={() => logout()}>Logout</a>
            </li>
          </ul>
        )}
      </div>
    </ClickOutside>
  )
}

export default DropdownMenu
