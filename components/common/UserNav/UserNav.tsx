/**  @jsxImportSource theme-ui */

import { ColorTokens, TextStyleNames } from '@theme/tokens'

import { Avatar } from '@components/common'
import DropdownMenu from './DropdownMenu'
import { FC } from 'react'
import { Heart } from '@components/icons'
import type { LineItem } from '@commerce/types/cart'
import Link from 'next/link'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/customer/use-customer'
import { useUI } from '@components/ui/context'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC = () => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  return (
    <nav>
      <ul sx={{
        listStyle : 'none',
        m: 0,
        p: 0
      }}>
        {process.env.COMMERCE_CART_ENABLED && (
          <li onClick={toggleSidebar} sx={{
            bg : ColorTokens.primary,
            width :  itemsCount > 0  ? 32 : 12,
            height : itemsCount > 0  ? 32 : 12,
            borderRadius : 100,
            color : ColorTokens.background
          }}>
        
            {itemsCount > 0 && <span sx={{variant : `text.${TextStyleNames.label_upper}`}}>{itemsCount}</span>}
          </li>
        )}
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <li >
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
        )}
        {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
          <li >
            {customer ? (
              <DropdownMenu />
            ) : (
              <button
                
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  )
}

export default UserNav
