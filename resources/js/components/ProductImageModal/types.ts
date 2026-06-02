/**
 * Type definitions for ProductImageModal component
 */

/**
 * Props for the ProductImageModal component
 */
export interface ProductImageModalProps {
  /**
   * Array of image URLs to display
   */
  images: string[];
  
  /**
   * Initial image index to display (0-based)
   * @default 0
   */
  initialIndex?: number;
  
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Callback when modal should close
   */
  onClose: () => void;
  
  /**
   * Product title for accessibility
   */
  productTitle: string;
}

/**
 * Internal state for the modal
 */
export interface ModalState {
  /**
   * Current image index (0-based)
   */
  currentImageIndex: number;
  
  /**
   * Current zoom level (1.0 = 100%)
   */
  zoomLevel: number;
  
  /**
   * Pan offset for zoomed images
   */
  panOffset: {
    x: number;
    y: number;
  };
  
  /**
   * Whether user is dragging the image
   */
  isDragging: boolean;
  
  /**
   * Whether image is currently loading
   */
  isLoading: boolean;
  
  /**
   * Error message if image fails to load
   */
  error: string | null;
}

/**
 * Image metadata (optional, for future enhancements)
 */
export interface ProductImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
  thumbnailUrl?: string;
}

/**
 * Constants for zoom limits
 */
export const ZOOM_CONSTANTS = {
  MIN_ZOOM: 1.0,
  MAX_ZOOM: 4.0,
  ZOOM_INCREMENT: 0.25,
  RESET_ZOOM: 1.0,
} as const;

/**
 * Image display transform properties
 */
export interface ImageTransform {
  scale: number;
  translateX: number;
  translateY: number;
  rotate: number;
}