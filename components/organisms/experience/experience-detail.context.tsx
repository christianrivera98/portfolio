"use client"

import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from "react"

export type ExperienceDetail =
  | { kind: "company"; index: number }
  | { kind: "project"; projectId: string }

interface ExperienceDetailContextValue {
  detail: ExperienceDetail | null
  openCompany: (index: number) => void
  openProject: (projectId: string) => void
  previewCompany: (index: number) => void
  endPreview: () => void
  close: () => void
}

const ExperienceDetailContext = createContext<ExperienceDetailContextValue | null>(null)

export function ExperienceDetailProvider({ children }: { children: ReactNode }) {
  const [detail, setDetail] = useState<ExperienceDetail | null>(null)
  const pinned = useRef(false)

  const openCompany = useCallback((index: number) => {
    pinned.current = true
    setDetail({ kind: "company", index })
  }, [])
  const openProject = useCallback((projectId: string) => {
    pinned.current = true
    setDetail({ kind: "project", projectId })
  }, [])
  const previewCompany = useCallback((index: number) => {
    if (!pinned.current) setDetail({ kind: "company", index })
  }, [])
  const endPreview = useCallback(() => {
    if (!pinned.current) setDetail(null)
  }, [])
  const close = useCallback(() => {
    pinned.current = false
    setDetail(null)
  }, [])

  return (
    <ExperienceDetailContext.Provider
      value={{ detail, openCompany, openProject, previewCompany, endPreview, close }}
    >
      {children}
    </ExperienceDetailContext.Provider>
  )
}

export function useExperienceDetail() {
  const ctx = useContext(ExperienceDetailContext)
  if (!ctx) throw new Error("useExperienceDetail must be used within ExperienceDetailProvider")
  return ctx
}
