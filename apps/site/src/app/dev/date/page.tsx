import { Suspense } from 'react'
import DateTestPageClient from './date-client'

function LoadingFallback() {
  return <div className="min-h-screen bg-background-950 p-8" />
}

export default function DateTestPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DateTestPageClient />
    </Suspense>
  )
}
