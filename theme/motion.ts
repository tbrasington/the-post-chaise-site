export const standardMotionEasing = {
  type: "spring",
  damping: 30,
  stiffness: 100
}

export const defaultMotionContainer = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ...standardMotionEasing
    }
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      ...standardMotionEasing
    },
    duration: 0.2
  }
}

export const motionItem = {
  hidden: { y: 30, opacity: 0, transition: { ...standardMotionEasing } },
  show: { y: 0, opacity: 1, transition: { ...standardMotionEasing } },
  exit: { y: 30, opacity: 0, transition: { ...standardMotionEasing } }
}
