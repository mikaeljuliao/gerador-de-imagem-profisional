"use client"
import React from 'react'

export default function Hero() {
  const handleCTAClick = () => {
    const el = document.getElementById('upload')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="space-y-6">
      <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight max-w-lg">Fotos profissionais para o linkedin</h1>
      <p className="text-gray-600 max-w-xl">Transforme qualquer foto sua em um retrato profissional de alta qualidade usando inteligência artificial. Perfeito para seu perfil do LinkedIn.</p>
    

      <div className="mt-8 flex justify-center lg:justify-start items-center gap-4">
        <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 -rotate-2">
          <img src="/foto1.png" alt="foto1" className="w-full h-full object-cover" />
        </div>
        <div className="w-42 h-42 rounded-lg overflow-hidden bg-gray-100">
          <img src="/foto2.png" alt="foto2" className="w-full h-full object-cover" />
        </div>
        <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 rotate-2">
          <img src="/foto3.png" alt="foto3" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}
