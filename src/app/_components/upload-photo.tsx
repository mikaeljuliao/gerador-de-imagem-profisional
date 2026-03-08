"use client"
import React, { useEffect, useRef, useState } from 'react'

export default function UploadPhoto({ id }: { id?: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    if (f) setFile(f)
  }

  const clear = () => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div id={id} className="w-full max-w-lg">
      <div className="text-center lg:text-left">
        <h2 className="text-2xl lg:text-3xl font-extrabold">Envie sua foto</h2>
        <p className="text-gray-600 mt-2">Escolha uma foto sua para transformar em um retrato profissional. Funciona melhor com fotos onde seu rosto está bem visível.</p>
      </div>

      <div className="mt-6">
        {preview ? (
          <div className="relative">
            <img src={preview} alt="preview" className="w-full h-64 object-cover rounded-lg" />
            <button onClick={clear} aria-label="Remover foto" className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mt-4">
              <button className="px-6 py-3 bg-black text-white rounded-md">Gerar foto profisional</button>
            </div>
          </div>
        ) : (
          <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onSelect} />
            <div className="flex flex-col items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V3m0 0l-3 3m3-3 3 3" />
              </svg>
              <p className="text-sm text-gray-600">Arraste sua foto aqui ou clique para selecionar</p>
              <p className="text-xs text-gray-400">PNG, JPG ou WEBP</p>
            </div>
          </label>
        )}
      </div>
    </div>
  )
}
