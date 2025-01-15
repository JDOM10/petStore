'use client'

import { Button } from '@/components/ui/botton'
import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const NavbarActions = () => {
  const router = useRouter()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="ml-auto flex items-center gap-x-4">
    </div>
  )
}