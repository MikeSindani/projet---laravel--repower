import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Loader2
} from 'lucide-react'
import { useState, useCallback, useEffect, useRef } from 'react'
import type { ProductImageModalProps, ModalState } from './types'

/**
 * ProductImageModal - A modal component for viewing product images with zoom and navigation
 * 
 * Features:
 * - Modal overlay with click-outside-to-close
 * - Image zoom in/out with mouse wheel and buttons
 * - Panning for zoomed images
 * - Navigation between multiple images
 * - Keyboard shortcuts (Escape to close, arrows to navigate, +/- to zoom)
 * - Accessible with ARIA attributes
 */
export function ProductImageModal({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  productTitle,
}: ProductImageModalProps) {
  // Modal state
  const [state, setState] = useState<ModalState>({
    currentImageIndex: initialIndex,
    zoomLevel: 1.0,
    panOffset: { x: 0, y: 0 },
    isDragging: false,
    isLoading: true,
    error: null,
  })

  // Refs for event handlers
  const modalRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setState({
        currentImageIndex: initialIndex,
        zoomLevel: 1.0,
        panOffset: { x: 0, y: 0 },
        isDragging: false,
        isLoading: true,
        error: null,
      })
    }
  }, [isOpen, initialIndex])

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          goToPrev()
          break
        case 'ArrowRight':
          goToNext()
          break
        case '+':
        case '=':
          zoomIn()
          break
        case '-':
          zoomOut()
          break
        case '0':
          resetZoom()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, state.currentImageIndex])

  // Navigation functions
  const goToNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentImageIndex: (prev.currentImageIndex + 1) % images.length,
      zoomLevel: 1.0,
      panOffset: { x: 0, y: 0 },
      isLoading: true,
      error: null,
    }))
  }, [images.length])

  const goToPrev = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentImageIndex: (prev.currentImageIndex - 1 + images.length) % images.length,
      zoomLevel: 1.0,
      panOffset: { x: 0, y: 0 },
      isLoading: true,
      error: null,
    }))
  }, [images.length])

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setState(prev => ({
        ...prev,
        currentImageIndex: index,
        zoomLevel: 1.0,
        panOffset: { x: 0, y: 0 },
        isLoading: true,
        error: null,
      }))
    }
  }, [images.length])

  // Zoom functions
  const zoomIn = useCallback(() => {
    setState(prev => ({
      ...prev,
      zoomLevel: Math.min(prev.zoomLevel + 0.25, 4.0),
    }))
  }, [])

  const zoomOut = useCallback(() => {
    setState(prev => ({
      ...prev,
      zoomLevel: Math.max(prev.zoomLevel - 0.25, 1.0),
    }))
  }, [])

  const resetZoom = useCallback(() => {
    setState(prev => ({
      ...prev,
      zoomLevel: 1.0,
      panOffset: { x: 0, y: 0 },
    }))
  }, [])

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      zoomIn()
    } else {
      zoomOut()
    }
  }, [zoomIn, zoomOut])

  // Handle double-click to toggle zoom
  const handleDoubleClick = useCallback(() => {
    if (state.zoomLevel > 1.0) {
      resetZoom()
    } else {
      zoomIn()
    }
  }, [state.zoomLevel, zoomIn, resetZoom])

  // Handle mouse down for panning
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (state.zoomLevel <= 1.0) return
    
    setState(prev => ({ ...prev, isDragging: true }))
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }, [state.zoomLevel])

  // Handle mouse move for panning
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!state.isDragging || !dragStartRef.current) return
    
    const deltaX = e.clientX - dragStartRef.current.x
    const deltaY = e.clientY - dragStartRef.current.y
    
    // Calculate pan limits based on zoom level
    const maxPan = (state.zoomLevel - 1) * 100
    
    setState(prev => ({
      ...prev,
      panOffset: {
        x: Math.max(-maxPan, Math.min(maxPan, prev.panOffset.x + deltaX)),
        y: Math.max(-maxPan, Math.min(maxPan, prev.panOffset.y + deltaY)),
      },
    }))
    
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }, [state.isDragging, state.zoomLevel])

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setState(prev => ({ ...prev, isDragging: false }))
    dragStartRef.current = null
  }, [])

  // Handle mouse leave to stop dragging
  const handleMouseLeave = useCallback(() => {
    setState(prev => ({ ...prev, isDragging: false }))
    dragStartRef.current = null
  }, [])

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: false, error: null }))
  }, [])

  // Handle image error
  const handleImageError = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isLoading: false, 
      error: "L'image n'a pas pu être chargée" 
    }))
  }, [])

  // Handle click outside modal to close
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  // Don't render if modal is closed
  if (!isOpen) return null

  const currentImage = images[state.currentImageIndex]
  const hasMultipleImages = images.length > 1
  const isFirstImage = state.currentImageIndex === 0
  const isLastImage = state.currentImageIndex === images.length - 1

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div className="relative w-full max-w-6xl max-h-[90vh] p-4">
        
        {/* Header with close button and navigation */}
        <div className="flex items-center justify-between mb-4">
          {/* Left navigation (if multiple images) */}
          {hasMultipleImages && (
            <button
              onClick={goToPrev}
              disabled={isFirstImage}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Image précédente"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
          )}
          
          {/* Image counter */}
          <div className="text-white text-sm font-medium">
            Image {state.currentImageIndex + 1} sur {images.length}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Fermer le modal"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Main image container */}
        <div className="relative bg-black rounded-xl overflow-hidden">
          {/* Loading indicator */}
          {state.isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Loader2 size={48} className="text-white animate-spin" />
            </div>
          )}

          {/* Error state */}
          {state.error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-400 mb-4">{state.error}</p>
                <button
                  onClick={() => setState(prev => ({ ...prev, isLoading: true, error: null }))}
                  className="px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-all"
                >
                  Réessayer
                </button>
              </div>
            </div>
          ) : (
            /* Image with zoom and pan */
            <div 
              className="relative overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ 
                height: '70vh',
                maxHeight: '70vh',
              }}
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imageRef}
                src={currentImage}
                alt={`${productTitle} - Image ${state.currentImageIndex + 1}`}
                className="w-full h-full object-contain transition-transform duration-200"
                style={{
                  transform: `scale(${state.zoomLevel}) translate(${state.panOffset.x}px, ${state.panOffset.y}px)`,
                  cursor: state.zoomLevel > 1.0 ? 'grab' : 'zoom-in',
                }}
                onLoad={handleImageLoad}
                onError={handleImageError}
                draggable={false}
              />
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className="mt-4 flex items-center justify-between">
          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              aria-label="Zoom arrière"
            >
              <ZoomOut size={20} className="text-white" />
            </button>
            
            <button
              onClick={resetZoom}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white text-sm font-medium min-w-[60px] text-center"
            >
              {Math.round(state.zoomLevel * 100)}%
            </button>
            
            <button
              onClick={zoomIn}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              aria-label="Zoom avant"
            >
              <ZoomIn size={20} className="text-white" />
            </button>

            <button
              onClick={() => {
                // Toggle fullscreen if supported
                if (document.fullscreenElement) {
                  document.exitFullscreen()
                } else {
                  modalRef.current?.parentElement?.requestFullscreen()
                }
              }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all ml-2"
              aria-label="Plein écran"
            >
              <Maximize2 size={20} className="text-white" />
            </button>
          </div>

          {/* Right navigation (if multiple images) */}
          {hasMultipleImages && (
            <button
              onClick={goToNext}
              disabled={isLastImage}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Image suivante"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          )}
        </div>

        {/* Thumbnail gallery */}
        {hasMultipleImages && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === state.currentImageIndex
                    ? 'border-secondary scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Keyboard shortcuts hint */}
        <div className="mt-4 text-center">
          <p className="text-white/50 text-xs">
            Appuyez sur Échap pour fermer • Flèches pour naviguer • Molette ou +/- pour zoomer
          </p>
        </div>
      </div>
    </div>
  )
}