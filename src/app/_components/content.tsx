"use client"
import React, { useState } from 'react'
import Header from './header'
import Hero from './hero'
import UploadPhoto from './upload-photo'

export default function HomeContent() {

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>("")

  const [generatedPhoto, setGeneratedPhoto] =useState<string | null>("")


  const handlePhotoSelected = (photo: string) =>{
      setSelectedPhoto(photo || null)
  }


  const handleContinue = (url: string) =>{
    setGeneratedPhoto(url)
  }

  const handleStartOver = () =>{
    setSelectedPhoto(null)
    setGeneratedPhoto(null)
  }
  return (
    <>
     <Header />
     <main className='container mx-auto px-4 py-8'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-200px)]'>
           <div className='flex items-start'>
             <Hero />
           </div>
           <div  className='flex items-center justify-center'>
             <UploadPhoto id="upload" onPhotoSelected={handlePhotoSelected} 
             onContinue={handleContinue} 
             onStartOver={handleStartOver} />
           </div>
        </div>
     </main>
    </>
  )
}
