export const defaultMotionContainer = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      when: "afterChildren"
    },
    duration: 0.2
  }
}

export const motionItem = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 1 }
}
