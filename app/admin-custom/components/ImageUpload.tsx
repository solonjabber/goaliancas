'use client'

import { useState } from 'react'
import { Upload, X, Star, Loader2, Image as ImageIcon } from 'lucide-react'
import { uploadImage, deleteImage } from '../actions/upload'

export interface GalleryImage {
  media: {
    id: string
    url: string
    alt?: string
    filename?: string
  }
  isPrimary: boolean
  id: string
}

interface ImageUploadProps {
  images: GalleryImage[]
  onChange: (images: GalleryImage[]) => void
  maxImages?: number
}

export default function ImageUpload({ images, onChange, maxImages = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

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

        console.log('[ImageUpload] Fazendo upload via Server Action:', {
          fileName: file.name,
          fileSize: `${(file.size / 1024).toFixed(2)}KB`,
          fileType: file.type
        })

        // Usar Server Action ao invés de fetch
        const result = await uploadImage(formData)

        if (result.error) {
          console.error('[ImageUpload] Erro no upload:', result)
          throw new Error(result.error)
        }

        console.log('[ImageUpload] Upload bem-sucedido:', result.data)

        return {
          media: {
            id: result.data.id,
            url: result.data.url,
            alt: result.data.alt || '',
            filename: result.data.filename,
          },
          isPrimary: images.length === 0,
          id: result.data.id,
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
        // Deletar usando Server Action
        const result = await deleteImage(image.media.id)

        if (result.error) {
          throw new Error(result.error)
        }

        // Remover da lista
        const newImages = images.filter((_, i) => i !== index)

        // Se era a imagem principal, definir a primeira como principal
        if (image.isPrimary && newImages.length > 0) {
          newImages[0].isPrimary = true
        }

        onChange(newImages)
      } catch (error) {
        console.error('Erro ao remover imagem:', error)
        alert('Erro ao remover imagem. Tente novamente.')
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="image-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={uploading}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          {uploading ? (
            <>
              <Loader2 className="h-12 w-12 text-gray-400 mb-4 animate-spin" />
              <p className="text-sm text-gray-600">Fazendo upload...</p>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-blue-600">Clique para enviar</span> ou arraste e solte
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF até 4MB (máximo {maxImages} imagens)
              </p>
            </>
          )}
        </label>
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group border rounded-lg overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {image.media.url ? (
                  <img
                    src={image.media.url}
                    alt={image.media.alt || 'Imagem do produto'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-gray-300" />
                )}
              </div>

              {/* Badge de Imagem Principal */}
              {image.isPrimary && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Principal
                </div>
              )}

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleSetPrimary(index)}
                  className="opacity-0 group-hover:opacity-100 bg-white text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-all"
                  disabled={image.isPrimary}
                >
                  {image.isPrimary ? 'Principal' : 'Definir como principal'}
                </button>
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Alt Text Input */}
              <div className="p-2 bg-white">
                <input
                  type="text"
                  placeholder="Texto alternativo (alt)"
                  value={image.media.alt || ''}
                  onChange={(e) => handleUpdateAlt(index, e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
