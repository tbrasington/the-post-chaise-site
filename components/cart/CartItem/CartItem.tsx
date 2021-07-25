/** @jsxImportSource theme-ui */
import { Box, Flex } from "theme-ui"
import { ColorTokens, TextStyleNames } from "@theme/tokens"
import { Cross, Minus, Plus, Trash } from "@components/icons"
import React, {
  ChangeEvent,
  FocusEventHandler,
  useEffect,
  useState
} from "react"

import Image from "next/image"
import { LabelRegular } from "@theme/textStyles"
import type { LineItem } from "@commerce/types/cart"
import Link from "next/link"
import Quantity from "@components/ui/Quantity"
import cn from "classnames"
import s from "./CartItem.module.css"
import usePrice from "@framework/product/use-price"
import useRemoveItem from "@framework/cart/use-remove-item"
import { useUI } from "@components/ui/context"
import useUpdateItem from "@framework/cart/use-update-item"

type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
}

const CartItem = ({
  item,
  variant = "default",
  currencyCode,
  ...rest
}: {
  variant?: "default" | "display"
  item: LineItem
  currencyCode: string
}) => {
  const { closeSidebarIfPresent } = useUI()
  const [removing, setRemoving] = useState(false)
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem({ item })

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode
  })

  const handleChange = async ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value))
    await updateItem({ quantity: Number(value) })
  }

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n
    setQuantity(val)
    await updateItem({ quantity: val })
  }

  const handleRemove = async () => {
    setRemoving(true)
    try {
      await removeItem(item)
    } catch (error) {
      setRemoving(false)
    }
  }

  // TODO: Add a type for this
  const options = (item as any).options

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  return (
    <li
      className={cn(s.root, {
        "opacity-50 pointer-events-none": removing
      })}
      {...rest}
    >
      <Flex
        sx={{
          flexFlow: "row",
          flex: 1,
          variant: `text.${TextStyleNames.label_standard}`,
          color: ColorTokens.text,
          pb: 16
        }}
      >
        <Link href={`/product/${item.path}`} passHref={true}>
          <Box
            sx={{
              width: 48,
              height: 48
            }}
          >
            <Image
              onClick={() => closeSidebarIfPresent()}
              width={150}
              height={150}
              src={item.variant.image!.url}
              alt={item.variant.image!.altText}
              unoptimized
            />
          </Box>
        </Link>
        <Flex
          sx={{
            flexDirection: "column",
            pl: 16,
            flex: 1
          }}
        >
          <Link href={`/product/${item.path}`} passHref={true}>
            <span onClick={() => closeSidebarIfPresent()}>{item.name}</span>
          </Link>
          {options && options.length > 0 && (
            <Flex
              sx={{
                alignItems: "center",
                flexDirection: "column",
                mt: 16
              }}
            >
              {options.map((option: ItemOption, i: number) => (
                <Flex
                  key={`${item.id}-${option.name}`}
                  sx={{
                    flexDirection: "column"
                  }}
                >
                  <span
                    sx={{
                      variant: `text.${TextStyleNames.label_upper}`,
                      color: ColorTokens.darken
                    }}
                  >
                    {option.name}
                  </span>
                  <span>{option.value}</span>
                  {i === options.length - 1 ? "" : <span className="mr-3" />}
                </Flex>
              ))}
            </Flex>
          )}
          {variant === "display" && (
            <div className="text-sm tracking-wider">{quantity}x</div>
          )}
        </Flex>
        <Flex
          className="flex flex-col justify-between space-y-2 text-sm"
          sx={{
            justifyContent: "space-between",
            pl: 32
          }}
        >
          <span>{price}</span>
        </Flex>
      </Flex>
      {variant === "default" && (
        <Quantity
          value={quantity}
          handleRemove={handleRemove}
          handleChange={handleChange}
          increase={() => increaseQuantity(1)}
          decrease={() => increaseQuantity(-1)}
        />
      )}
    </li>
  )
}

export default CartItem
