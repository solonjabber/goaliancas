'use client'

import { useState } from 'react'
import { Upload, X, Star, Loader2, Image as ImageIcon } from 'lucide-react'

export interface GalleryImage {
  media: {
    id: string
    url: string
    alt?: string
    filename: string
  }
  isPrimary: boolean
  id?: string
}

interface ImageUploadProps {
  images: GalleryImage[]
  onChange: (images: GalleryImage[]) => void
  maxImages?: number
}

export default function ImageUpload({ images, onChange, maxImages = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    // Verificar limite de imagens
    if (images.length + files.length > maxImages) {
      alert(`Você pode adicionar no máximo ${maxImages} imagens`)
      return
    }

    // Verificar tamanho dos arquivos (max 4MB)
    const MAX_SIZE = 4 * 1024 * 1024 // 4MB
    const invalidFiles = Array.from(files).filter(file => file.size > MAX_SIZE)

    if (invalidFiles.length > 0) {
      const fileList = invalidFiles.map(f =>
        `${f.name} (${(f.size / 1024 / 1024).toFixed(2)}MB)`
      ).join('\n')
      alert(`Os seguintes arquivos são muito grandes (máximo 4MB):\n\n${fileList}\n\nPor favor, reduza o tamanho das imagens antes de fazer upload.`)
      return
    }

    setUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || `Erro ao fazer upload de ${file.name}`)
        }

        const data = await res.json()
        return {
          media: {
            id: data.doc.id,
            url: data.doc.url,
            alt: data.doc.alt || '',
            filename: data.doc.filename,
          },
          isPrimary: images.length === 0, // Primeira imagem é principal
          id: data.doc.id,
        }
      })

      const uploadedImages = await Promise.all(uploadPromises)
      onChange([...images, ...uploadedImages])
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error)
      alert(`Erro ao fazer upload das imagens:\n\n${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async (index: number) => {
    const image = images[index]

    if (confirm('Tem certeza que deseja remover esta imagem?')) {
      try {
        // Deletar do servidor
        await fetch(`/api/upload?id=${image.media.id}`, {
          method: 'DELETE',
        })

        // Remover da lista
        const newImages = images.filter((_, i) => i !== index)

        // Se era a imagem principal, definir a primeira como principal
        if (image.isPrimary && newImages.length > 0) {
          newImages[0].isPrimary = true
        }

        onChange(newImages)
      } catch (error) {
        console.error('Erro ao remover imagem:', error)
        alert('Erro ao remover imagem')
      }
    }
  }

  const handleSetPrimary = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }))
    onChange(newImages)
  }

  const handleUpdateAlt = (index: number, alt: string) => {
    const newImages = [...images]
    newImages[index].media.alt = alt
    onChange(newImages)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-amber-500 bg-amber-50'
            : 'border-gray-300 hover:border-amber-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="image-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={uploading || images.length >= maxImages}
        />

        <label
          htmlFor="image-upload"
          className={`cursor-pointer ${uploading || images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <Loader2 className="h-10 w-10 text-amber-600 animate-spin" />
            ) : (
              <Upload className="h-10 w-10 text-gray-400" />
            )}
            <p className="text-sm font-medium text-gray-700">
              {uploading
                ? 'Enviando imagens...'
                : 'Clique para selecionar ou arraste imagens aqui'}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF até 4MB ({images.length}/{maxImages} imagens)
            </p>
          </div>
        </label>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id || index}
              className={`relative group border-2 rounded-lg overflow-hidden ${
                image.isPrimary ? 'border-amber-500' : 'border-gray-200'
              }`}
            >
              {/* Image */}
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={image.media.url}
                  alt={image.media.alt || `Imagem ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Primary Badge */}
                {image.isPrimary && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Principal
                  </div>
                )}

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  {!image.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(index)}
                      className="bg-white text-gray-700 p-2 rounded-full hover:bg-amber-500 hover:text-white transition-colors"
                      title="Definir como principal"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="bg-white text-gray-700 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                    title="Remover imagem"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Alt Text Input */}
              <div className="p-2 bg-white">
                <input
                  type="text"
                  placeholder="Texto alternativo (opcional)"
                  value={image.media.alt || ''}
                  onChange={(e) => handleUpdateAlt(index, e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && !uploading && (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Nenhuma imagem adicionada ainda</p>
        </div>
      )}
    </div>
  )
}
