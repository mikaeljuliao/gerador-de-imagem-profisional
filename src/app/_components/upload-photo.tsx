"use client"

import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { generateProfessionalPhoto} from '@/lib/api/analyze'

interface uploadPhotoProps {
  onPhotoSelected: (photo: string) => void
  onContinue: (url: string) => void
  selectedPhoto?: string | null;
  onStartOver?: () => void;
}

export default function UploadPhoto({ id, onPhotoSelected, onContinue, selectedPhoto }: { id?: string } & uploadPhotoProps) {
  const [isDraggin, setIsDraggin] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [fileSize, setFileSize] = useState<number>(0)
  const [fileType, setFileType] = useState<string>("")
  const [localPhoto, setLocalPhoto] = useState<string | null>(null)


  const geerateMutatio = useMutation({
    mutationFn: generateProfessionalPhoto,
    onSuccess: (response) => {
      if (response?.data?.generatedImage) {
        // URL DA IMAGEM GERADA
        onContinue(response.data.generatedImage)
      }
    },
    onError: (error: Error) => {
      console.log("FALHA NA MUTATION:", error)
    }
  })

  const handlDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    setIsDraggin(false)

    if (!file) return
    if (!file.type.startsWith("image/")) return

    setFileName(file.name)
    setFileSize(file.size)
    setFileType(file.type)

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        const result = e.target.result as string
        setLocalPhoto(result)
        onPhotoSelected(result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveFile = () => {
    setFileName("")
    setFileType("")
    setFileSize(0)
    setLocalPhoto(null)
    onPhotoSelected("")
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      setFileType(file.type);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const result = e.target?.result as string
          setLocalPhoto(result)
          onPhotoSelected(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggin(true)
  }

  const handleGragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggin(false)
  }

  const handleGenerate = async () => {
    if(!selectedPhoto ) return;

    try{
        await geerateMutatio.mutateAsync({
            
            imageUrl: selectedPhoto,
            fileName: fileName,
            fileSize: fileSize,
            fileType: fileType
        })
    }catch(error){
      console.error( "ERROR AO GERAR", error)
    }
  }

  return (
    <div id={id} className="w-full max-w-lg">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Envie sua foto</h2>
        <p className="text-sm text-gray-600">Escolha uma foto sua para transformar em um retrato profissional. Funciona melhor com fotos onde seu rosto está bem visível.</p>
      </div>

      <div
        className={`relative mt-6 border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer ${
          selectedPhoto ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onDrop={handlDrop}
        onDragLeave={handleGragLeave}
        onDragOver={handleGragOver}
      >
        {(selectedPhoto ?? localPhoto) ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-32 h-32 flex items-center justify-center rounded bg-gray-100 overflow-hidden">
              <img src={(selectedPhoto ?? localPhoto) ?? undefined} alt="preview" className="w-full h-full object-cover" />
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Pré-visualização</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleRemoveFile} className="px-4 py-2 border rounded">Remover</button>
              <button onClick={handleGenerate} className="px-4 py-2 bg-black text-white rounded cursor-pointer">Gerar foto profissional</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="flex flex-col items-center w-full cursor-pointer relative">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileSelect}
                className="bg-red-50 w-full h-full absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V3m0 0l-3 3m3-3 3 3" />
                </svg>
              </div>

              <div className="text-center mt-2">
                <p className="text-sm font-medium text-gray-900">Arraste sua foto aqui</p>
                <p className="text-xs text-gray-500">ou clique para selecionar — PNG, JPG ou WEBP</p>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
