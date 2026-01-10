'use client'

import { InstallPrompt } from './InstallPrompt'
import { UpdatePrompt } from './UpdatePrompt'

export function PWAProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <InstallPrompt />
      <UpdatePrompt />
    </>
  )
}
