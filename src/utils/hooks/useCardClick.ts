import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useCardClick(fullSlug: string) {
  const [down, setDown] = useState<Date>()
  const [up, setUp] = useState<Date>()
  const router = useRouter()
  useEffect(() => {
    const d = down?.getTime()
    const u = up?.getTime()
    if (d && u) {
      if (u - d < 200) {
        router.push(fullSlug)
      }
    }
  }, [fullSlug, down, router, up])

  return {
    onMouseDown: () => setDown(new Date()),
    onMouseUp: () => setUp(new Date()),
  }
}
