import React, { FC, useCallback, useMemo } from "react"

import { ThemeProvider } from "theme-ui"
import theme from "@theme/index"

export interface State {
  displayMenu: boolean
  displaySidebar: boolean
  displayDropdown: boolean
  displayModal: boolean
  sidebarView: string
  modalView: string
  userAvatar: string
}

const initialState = {
  displayMenu: false,
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: "LOGIN_VIEW",
  sidebarView: "CART_VIEW",
  userAvatar: ""
}

type Action =
  | {
      type: "OPEN_MENU"
    }
  | {
      type: "CLOSE_MENU"
    }
  | {
      type: "OPEN_SIDEBAR"
    }
  | {
      type: "CLOSE_SIDEBAR"
    }
  | {
      type: "OPEN_DROPDOWN"
    }
  | {
      type: "CLOSE_DROPDOWN"
    }
  | {
      type: "OPEN_MODAL"
    }
  | {
      type: "CLOSE_MODAL"
    }
  | {
      type: "SET_MODAL_VIEW"
      view: MODAL_VIEWS
    }
  | {
      type: "SET_SIDEBAR_VIEW"
      view: SIDEBAR_VIEWS
    }
  | {
      type: "SET_USER_AVATAR"
      value: string
    }

type MODAL_VIEWS =
  | "SIGNUP_VIEW"
  | "LOGIN_VIEW"
  | "FORGOT_VIEW"
  | "NEW_SHIPPING_ADDRESS"
  | "NEW_PAYMENT_METHOD"

type SIDEBAR_VIEWS = "CART_VIEW" | "CHECKOUT_VIEW" | "PAYMENT_METHOD_VIEW"

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = "UIContext"

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_MENU": {
      return {
        ...state,
        displayMenu: true
      }
    }
    case "CLOSE_MENU": {
      return {
        ...state,
        displayMenu: false
      }
    }
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true
      }
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false
      }
    }
    case "OPEN_DROPDOWN": {
      return {
        ...state,
        displayDropdown: true
      }
    }
    case "CLOSE_DROPDOWN": {
      return {
        ...state,
        displayDropdown: false
      }
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false
      }
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false
      }
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.view
      }
    }
    case "SET_SIDEBAR_VIEW": {
      return {
        ...state,
        sidebarView: action.view
      }
    }
    case "SET_USER_AVATAR": {
      return {
        ...state,
        userAvatar: action.value
      }
    }
  }
}

export const UIProvider: FC = props => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openMenu = useCallback(
    () => dispatch({ type: "OPEN_MENU" }),
    [dispatch]
  )
  const closeMenu = useCallback(
    () => dispatch({ type: "CLOSE_MENU" }),
    [dispatch]
  )
  const toggleMenu = useCallback(
    () =>
      state.displayMenu
        ? dispatch({ type: "CLOSE_MENU" })
        : dispatch({ type: "OPEN_MENU" }),
    [dispatch, state.displayMenu]
  )
  const closeMenuIfPresent = useCallback(
    () => state.displayMenu && dispatch({ type: "CLOSE_MENU" }),
    [dispatch, state.displayMenu]
  )

  const openSidebar = useCallback(
    () => dispatch({ type: "OPEN_SIDEBAR" }),
    [dispatch]
  )
  const closeSidebar = useCallback(
    () => dispatch({ type: "CLOSE_SIDEBAR" }),
    [dispatch]
  )
  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: "CLOSE_SIDEBAR" })
        : dispatch({ type: "OPEN_SIDEBAR" }),
    [dispatch, state.displaySidebar]
  )
  const closeSidebarIfPresent = useCallback(
    () => state.displaySidebar && dispatch({ type: "CLOSE_SIDEBAR" }),
    [dispatch, state.displaySidebar]
  )

  const openDropdown = useCallback(
    () => dispatch({ type: "OPEN_DROPDOWN" }),
    [dispatch]
  )
  const closeDropdown = useCallback(
    () => dispatch({ type: "CLOSE_DROPDOWN" }),
    [dispatch]
  )

  const openModal = useCallback(
    () => dispatch({ type: "OPEN_MODAL" }),
    [dispatch]
  )
  const closeModal = useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    [dispatch]
  )

  const setUserAvatar = useCallback(
    (value: string) => dispatch({ type: "SET_USER_AVATAR", value }),
    [dispatch]
  )

  const setModalView = useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: "SET_MODAL_VIEW", view }),
    [dispatch]
  )

  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS) => dispatch({ type: "SET_SIDEBAR_VIEW", view }),
    [dispatch]
  )

  const value = useMemo(
    () => ({
      ...state,
      openMenu,
      closeMenu,
      toggleMenu,
      closeMenuIfPresent,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
      setUserAvatar
    }),
    [
      closeDropdown,
      closeMenu,
      closeMenuIfPresent,
      closeModal,
      closeSidebar,
      closeSidebarIfPresent,
      openDropdown,
      openMenu,
      openModal,
      openSidebar,
      setModalView,
      setSidebarView,
      setUserAvatar,
      state,
      toggleMenu,
      toggleSidebar
    ]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </UIProvider>
)
