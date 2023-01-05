export const standardMotionEasing = {
  type: "spring",
  damping: 30,
  stiffness: 100
}

export const defaultMotionContainer = {
  hidden: {
    opacity: 0,
    y: 30
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ...standardMotionEasing
    }
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: {
      staggerChildren: 0.1,
      ...standardMotionEasing
    },
    duration: 0.1
  }
}

export const motionItem = {
  hidden: { y: 30, opacity: 0, transition: { ...standardMotionEasing } },
  show: { y: 0, opacity: 1, transition: { ...standardMotionEasing } },
  exit: { y: 30, opacity: 0, transition: { ...standardMotionEasing } }
}
