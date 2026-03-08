"use client"
import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="h-16 border-b">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold">Linkfotos AI</Link>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="#" className="hover:underline">Como funciona</Link>
          <Link href="#" className="hover:underline">Exemplos</Link>
        </nav>
      </div>
    </header>
  )
}
