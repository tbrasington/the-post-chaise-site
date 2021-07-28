/** @jsxImportSource theme-ui */
import { Cross, Minus, Plus } from "@components/icons"
import { Flex, ThemeUIStyleObject } from "theme-ui"
import React, { FC } from "react"

import { ColorTokens } from "@theme/tokens"

export interface QuantityProps {
  value: number
  increase: () => any
  decrease: () => any
  handleRemove: React.MouseEventHandler<HTMLButtonElement>
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  max?: number
}

const Quantity: FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  max = 6
}) => {
  const ButtonStyle: ThemeUIStyleObject = {
    bg: "transparent",
    m: 0,
    p: 0,
    width: 40,
    height: 32,
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <Flex
      sx={{
        flex: 1,
        borderStyle: "solid",
        borderColor: ColorTokens.darken,
        borderWidth: "1px"
      }}
    >
      <button sx={ButtonStyle} onClick={handleRemove}>
        <Cross width={20} height={20} />
      </button>
      <label
        className="w-full border-accent-2 border ml-2"
        sx={{
          width: "100%"
        }}
      >
        <input
          sx={{
            width: "100%",
            height: 32,
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderLeftStyle: "solid",
            borderLeftColor: ColorTokens.darken,
            borderLeftWidth: "1px",
            borderRightStyle: "solid",
            borderRightColor: ColorTokens.darken,
            borderRightWidth: "1px",
            px: 12
          }}
          onChange={e =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          value={value}
          type="number"
          max={max}
          min="0"
          readOnly
        />
      </label>
      <button
        type="button"
        onClick={decrease}
        sx={{
          ...ButtonStyle,
          borderRightStyle: "solid",
          borderRightColor: ColorTokens.darken,
          borderRightWidth: "1px"
        }}
        style={{ marginLeft: "-1px" }}
        disabled={value <= 1}
      >
        <Minus width={18} height={18} />
      </button>
      <button
        type="button"
        onClick={increase}
        sx={ButtonStyle}
        style={{ marginLeft: "-1px" }}
        disabled={value < 1 || value >= max}
      >
        <Plus width={18} height={18} />
      </button>
    </Flex>
  )
}

export default Quantity
