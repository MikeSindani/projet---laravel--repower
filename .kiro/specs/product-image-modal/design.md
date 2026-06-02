# Design Document: Modal d'Images Produit avec Zoom et Navigation

## Overview

Cette fonctionnalité ajoute un modal interactif pour les images de produits avec zoom, panning et navigation entre images. Actuellement, la page de détails produit affiche les images de manière statique. Ce modal améliorera l'expérience utilisateur en permettant d'examiner les détails des produits solaires via une interface riche et accessible.

### Contexte et Problématique

Le système actuel de visualisation d'images produit présente plusieurs limitations:
- Images affichées en taille fixe, sans possibilité de zoom
- Navigation basique entre images via une galerie réduite
- Manque d'interactivité pour examiner les détails produits (spécifications techniques, étiquettes)
- Accessibilité limitée pour les utilisateurs mobiles ou avec handicaps visuels

Ce design vise à résoudre ces problèmes en fournissant une expérience immersive qui maintient la cohérence avec le design existant de l'application.

## Architecture

### Architecture du Composant

```
┌─────────────────────────────────────────────┐
│         ProductDetailPage (Existant)         │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │          ProductImageThumbnail      │   │
│  │                                     │   │
│  │  ┌──────────────────────────────┐   │   │
│  │  │   Click Event Handler        │───┼───┼───► Modal ouverture
│  │  └──────────────────────────────┘   │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│    ProductImageModal (Nouveau Composant)     │
├─────────────────────────────────────────────┤
│  État: ModalState                           │
│  - isOpen: boolean                          │
│  - currentImageIndex: number                │
│  - zoomLevel: number                        │
│  - panOffset: { x: number, y: number }      │
│  - isDragging: boolean                      │
├─────────────────────────────────────────────┤
│  Propriétés:                               │
│  - images: string[]                         │
│  - initialIndex: number                     │
│  - onClose: () => void                      │
│  - productTitle: string                     │
└─────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│          Sub-Composants Spécialisés          │
├─────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐          │
│  │   ZoomTool  │  │ Navigation  │          │
│  └─────────────┘  └─────────────┘          │
│          │             │                   │
│          ▼             ▼                   │
│  ┌─────────────────────────────────────┐   │
│  │    ImageDisplay (avec Panning)      │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Intégration avec l'Architecture Existante

Le modal s'intégrera de manière transparente avec l'architecture existante:

1. **Couche Présentation**: Utilisation des patterns React/Inertia.js existants
2. **Gestion d'État**: Hook React local (`useState`, `useCallback`) sans Redux
3. **Styles**: Utilisation du système de design existant (`repower-theme.css`)
4. **Accessibilité**: Conformité ARIA et navigation au clavier
5. **Performance**: Lazy loading d'images et optimisation de rendu

## Composants et Interfaces

### 1. ProductImageModal (Composant Principal)

**Interface TypeScript:**
```typescript
interface ProductImageModalProps {
  images: string[];              // URLs des images à afficher
  initialIndex?: number;        // Index initial (par défaut: 0)
  isOpen: boolean;              // État d'ouverture du modal
  onClose: () => void;          // Callback de fermeture
  productTitle: string;         // Titre pour l'accessibilité
}
```

**État Interne:**
```typescript
interface ModalState {
  currentImageIndex: number;    // Index de l'image courante (0-based)
  zoomLevel: number;           // Niveau de zoom (1.0 = 100%)
  panOffset: { x: number; y: number }; // Décalage de panning
  isDragging: boolean;         // État de drag pour le panning
  isLoading: boolean;          // État de chargement de l'image
  error: string | null;        // Erreur de chargement
}
```

### 2. ImageDisplay (Composant d'Affichage d'Image)

Responsable de l'affichage de l'image avec support de zoom et panning.

**Fonctionnalités:**
- Gestion du zoom via transform CSS `scale()`
- Support du panning via événements drag/touch
- Limites de panning pour éviter l'image hors cadre
- Prévisualisation de la qualité d'image adaptative

**Événements Supportés:**
- Mouse wheel pour zoom avant/arrière
- Drag (click+glisser) pour panning
- Double-click pour toggle zoom/dézoom
- Touch gestures pour mobile (pinch, pan)

### 3. ZoomTool (Contrôles de Zoom)

Interface utilisateur pour contrôler le niveau de zoom.

**Éléments d'Interface:**
- Bouton "+" pour zoom avant (incrément de 0.25x)
- Bouton "-" pour zoom arrière (décrément de 0.25x)
- Bouton "Réinitialiser" pour retourner à 100%
- Indicateur numérique du niveau de zoom (ex: "200%")
- Slider optionnel pour ajustement continu

### 4. NavigationControls (Navigation entre Images)

Navigation entre les différentes images du produit.

**Éléments d'Interface:**
- Flèche gauche pour image précédente
- Flèche droite pour image suivante
- Indicateur de position (ex: "Image 3 sur 5")
- Navigation par clavier (flèches gauche/droite)
- Navigation par tap sur mobile

### 5. ThumbnailGallery (Galerie d'Aperçus)

Affichage d'une galerie d'aperçus sous l'image principale.

**Fonctionnalités:**
- Aperçus cliquables pour navigation rapide
- Mise en évidence de l'image courante
- Scroll horizontal si beaucoup d'images
- Lazy loading des thumbnails

## Data Models

### Structure de Données d'Image

```typescript
interface ProductImage {
  url: string;                 // URL de l'image
  altText?: string;           // Texte alternatif pour accessibilité
  width?: number;             // Largeur originale (px)
  height?: number;            // Hauteur originale (px)
  thumbnailUrl?: string;      // URL de la miniature (optimisée)
}

// Format actuel dans la base de données
type ProductPhotos = string[] | string; // JSON string ou array
```

### Gestion de la Transformation d'État

```typescript
// Transformations applicables à l'image
interface ImageTransform {
  scale: number;              // Échelle de zoom (ex: 1.0, 2.0, 3.0)
  translateX: number;         // Translation horizontale (px)
  translateY: number;         // Translation verticale (px)
  rotate: number;             // Rotation en degrés (non implémenté initialement)
}

// État complet de visualisation
interface ViewState {
  imageIndex: number;         // Index de l'image courante
  transform: ImageTransform;  // Transformations appliquées
  isFullscreen: boolean;      // Mode plein écran (optionnel)
  isLoading: boolean;         // État de chargement
}
```

### Persistance (Optionnelle)

Pour une expérience utilisateur améliorée, nous pouvons persister certaines préférences:

```typescript
interface UserPreferences {
  defaultZoomLevel?: number;  // Niveau de zoom par défaut
  zoomIncrement?: number;     // Incrément de zoom préféré
  enableAnimations?: boolean; // Animations activées/désactivées
  lastUsedImageIndex?: number; // Dernière image consultée par produit
}
```

## Gestion d'État

### État Local du Modal

L'état sera géré localement via le hook `useState` de React:

```typescript
const [modalState, setModalState] = useState<ModalState>({
  currentImageIndex: props.initialIndex || 0,
  zoomLevel: 1.0,
  panOffset: { x: 0, y: 0 },
  isDragging: false,
  isLoading: false,
  error: null,
});
```

### Hooks Personnalisés

Pour mieux gérer la complexité, nous créerons des hooks personnalisés:

```typescript
// Hook de gestion de zoom
function useZoomControl(initialZoom = 1.0) {
  const [zoom, setZoom] = useState(initialZoom);
  
  const zoomIn = useCallback((increment = 0.25) => {
    setZoom(prev => Math.min(prev + increment, MAX_ZOOM));
  }, []);

  const zoomOut = useCallback((decrement = 0.25) => {
    setZoom(prev => Math.max(prev - decrement, MIN_ZOOM));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1.0);
  }, []);

  return { zoom, zoomIn, zoomOut, resetZoom };
}

// Hook de gestion de navigation
function useImageNavigation(images: string[], initialIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  }, [images.length]);

  return { 
    currentIndex, 
    goToNext, 
    goToPrev, 
    goToIndex,
    hasNext: currentIndex < images.length - 1,
    hasPrev: currentIndex > 0
  };
}
```

### Gestion des Événements

```typescript
// Écouteurs d'événements principaux
const handleKeyDown = useCallback((e: KeyboardEvent) => {
  if (!props.isOpen) return;
  
  switch (e.key) {
    case 'Escape':
      props.onClose();
      break;
    case 'ArrowLeft':
      navigation.goToPrev();
      break;
    case 'ArrowRight':
      navigation.goToNext();
      break;
    case '+':
    case '=':
      zoom.zoomIn();
      break;
    case '-':
      zoom.zoomOut();
      break;
    case '0':
      zoom.resetZoom();
      break;
  }
}, [props.isOpen, props.onClose, navigation, zoom]);

// Gestion de la molette de souris
const handleWheel = useCallback((e: React.WheelEvent) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoom.zoomIn(0.1);
    } else {
      zoom.zoomOut(0.1);
    }
  }
}, [zoom]);

// Gestion du drag pour panning
const handleMouseDown = useCallback((e: React.MouseEvent) => {
  if (zoom.zoom <= 1.0) return; // Pas de panning au zoom 100%
  
  setModalState(prev => ({ ...prev, isDragging: true }));
  setDragStart({ x: e.clientX, y: e.clientY });
}, [zoom.zoom]);

const handleMouseMove = useCallback((e: React.MouseEvent) => {
  if (!modalState.isDragging) return;
  
  const deltaX = e.clientX - dragStart.x;
  const deltaY = e.clientY - dragStart.y;
  
  // Calcul des limites de panning basées sur le niveau de zoom
  const maxPan = calculateMaxPan(zoom.zoom, imageDimensions);
  
  setModalState(prev => ({
    ...prev,
    panOffset: {
      x: clamp(prev.panOffset.x + deltaX, -maxPan.x, maxPan.x),
      y: clamp(prev.panOffset.y + deltaY, -maxPan.y, maxPan.y),
    }
  }));
  
  setDragStart({ x: e.clientX, y: e.clientY });
}, [modalState.isDragging, zoom.zoom, imageDimensions]);
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Modal Opening with Correct Image

*For any* product with images and *for any* image index clicked by the user, when the Product_Image_Modal opens, it SHALL display the clicked image at the correct position and initialize navigation state accordingly.

**Validates: Requirements 1.1, 1.3**

### Property 2: Modal Centering and Layout

*For any* screen dimension and *for any* product image, the Product_Image_Modal SHALL be centered on screen and properly positioned according to responsive design principles.

**Validates: Requirements 1.2, 8.3**

### Property 3: Modal Isolation and Focus Management

*For all* modal open states, the Product_Image_Modal SHALL block interaction with underlying page content, trap keyboard focus within the modal, and prevent page scrolling.

**Validates: Requirements 1.4, 6.6**

### Property 4: Zoom Functionality Consistency

*For any* image displayed in the modal and *for all* zoom methods (mouse wheel, zoom buttons, double-click), zoom operations SHALL consistently increase or decrease the zoom level within defined boundaries and maintain image quality.

**Validates: Requirements 2.1, 2.2, 2.5, 2.6**

### Property 5: Zoom and Pan Behavior

*For any* zoomed image, the Product_Image_Zoom SHALL maintain the image centered during zoom operations and allow panning within the viewport boundaries proportional to the zoom level.

**Validates: Requirements 2.3, 2.4**

### Property 6: Navigation State Management

*For any* product with multiple images, the Image_Navigation SHALL provide functional navigation controls, disable appropriate arrows at boundaries, and synchronize the image index indicator in real-time.

**Validates: Requirements 3.1, 3.2, 3.3, 3.5, 5.1, 5.4**

### Property 7: Zoom Reset on Navigation

*For any* navigation operation between images while zoomed, the Image_Navigation SHALL reset the zoom level to default (100%) for the newly displayed image.

**Validates: Requirements 3.6**

### Property 8: Keyboard Navigation Consistency

*For all* navigation operations, keyboard arrow keys SHALL produce the same navigation results as clicking the corresponding navigation buttons.

**Validates: Requirements 3.4, 6.3**

### Property 9: Multiple Modal Closure Methods

*For any* open modal state, the Modal_Close_Handler SHALL allow closure via Escape key, click outside image area, and the close button (X), with all methods producing the same result.

**Validates: Requirements 4.1, 4.2, 4.3**

### Property 10: State Restoration After Closure

*For any* modal closure operation, the Product_Details_Page SHALL return to its original state with restored page scroll, interaction capabilities, and appropriate focus management.

**Validates: Requirements 4.4, 4.5**

### Property 11: Image Index Indicator Behavior

*For any* number of product images (including single images), the Image_Index_Indicator SHALL display the correct position format and behave consistently according to the design specification.

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 12: Smooth Animation and Performance

*For all* modal opening operations, the Product_Image_Modal SHALL animate smoothly, preload adjacent images for faster navigation, and maintain performance with large images.

**Validates: Requirements 6.1, 6.2, 6.4**

### Property 13: Accessibility Compliance

*For all* interactive elements in the modal, appropriate ARIA attributes SHALL be present, keyboard navigation SHALL be fully functional, and focus management SHALL follow accessibility best practices.

**Validates: Requirements 6.3, 6.5, 6.6**

### Property 14: Data Structure Compatibility

*For any* product photo data structure (JSON array, JSON string, single URL), the Product_Image_Modal SHALL correctly parse and display images while maintaining compatibility with the existing product details page.

**Validates: Requirements 7.1, 7.2, 7.3**

### Property 15: Design Consistency

*For all* visual elements, the Product_Image_Modal SHALL follow existing application design conventions, styling patterns, and visual hierarchy.

**Validates: Requirements 7.4**

### Property 16: Error Handling and Graceful Degradation

*For any* error condition (failed image load, missing images, interaction errors), the Product_Image_Modal SHALL display appropriate error messages, fallback content, and maintain user experience without crashing.

**Validates: Requirements 8.1, 8.2, 8.4, 8.5**

### Property 17: Loading State Management

*For any* image loading operation, the Product_Image_Modal SHALL display appropriate loading indicators and transition smoothly to the loaded state.

**Validates: Requirements 8.2**

## Error Handling

### Types d'Erreurs à Gérer

1. **Erreurs de Chargement d'Image:**
   - Images non trouvées (404)
   - Images corrompues ou formats non supportés
   - Timeouts de chargement
   - Erreurs réseau

2. **Erreurs de Données:**
   - Champ `photos` manquant ou vide
   - Format JSON invalide
   - URLs d'images mal formées
   - Produits sans images

3. **Erreurs d'Interaction:**
   - Événements simultanés (double-clic rapide)
   - Navigation hors limites
   - Zoom avec valeurs extrêmes
   - Conflits de focus

4. **Erreurs de Performance:**
   - Images trop volumineuses (mémoire)
   - Animations bloquées
   - Préchargement échoué

### Stratégies de Gestion

**Pour les Erreurs de Chargement d'Image:**
- Afficher une image de remplacement standardisée
- Afficher un message d'erreur contextuel
- Proposer une réessai après délai
- Maintenir la navigation vers d'autres images

**Pour les Erreurs de Données:**
- Utiliser des valeurs par défaut
- Valider les données avant utilisation
- Logger les erreurs pour debugging
- Maintenir la fonctionnalité de base

**Pour les Erreurs d'Interaction:**
- Débouncer les événements rapides
- Valider les limites avant exécution
- Fournir un feedback visuel immédiat
- Empêcher les états invalides

**Pour les Erreurs de Performance:**
- Implémenter le lazy loading
- Optimiser les images côté serveur
- Utiliser des placeholders pendant le chargement
- Limiter la taille d'affichage maximale

### Messages d'Erreur

```typescript
const ErrorMessages = {
  IMAGE_LOAD_FAILED: "L'image n'a pas pu être chargée. Veuillez réessayer.",
  NO_IMAGES_AVAILABLE: "Ce produit ne contient pas d'images disponibles.",
  INVALID_IMAGE_FORMAT: "Le format de l'image n'est pas supporté.",
  NETWORK_ERROR: "Problème de connexion réseau. Vérifiez votre connexion.",
  ZOOM_LIMIT_REACHED: "Limite de zoom atteinte.",
  NAVIGATION_ERROR: "Impossible de naviguer vers cette image.",
} as const;
```

## Testing Strategy

### Approche de Test Duale

Le modal d'images produit nécessite une combinaison de tests unitaires et de tests basés sur les propriétés:

**Tests Unitaires (Exemple-Based):**
- Tests spécifiques pour des scénarios concrets
- Tests d'intégration avec les composants existants
- Tests d'accessibilité et de navigation clavier
- Tests de performance et de chargement

**Tests Basés sur les Propriétés (Property-Based Testing):**
- Validation des propriétés universelles définies ci-dessus
- Tests de comportement sur un large éventail d'entrées
- Détection d'edge cases et de comportements inattendus
- Validation de la cohérence des interactions

### Configuration des Tests

**Bibliothèque PBT:** Utilisation de `fast-check` pour TypeScript/React
**Nombre d'itérations:** Minimum 100 itérations par test de propriété
**Générateurs d'entrées:**
```typescript
// Générateur pour les URLs d'images
const imageUrlArbitrary = fc.array(
  fc.webUrl({ withQueryParameters: true, withFragments: false }),
  { minLength: 1, maxLength: 10 }
);

// Générateur pour les dimensions d'écran
const screenSizeArbitrary = fc.record({
  width: fc.integer({ min: 320, max: 3840 }),
  height: fc.integer({ min: 480, max: 2160 })
});

// Générateur pour les interactions utilisateur
const userInteractionArbitrary = fc.oneof(
  fc.constant('click'),
  fc.constant('wheel'),
  fc.constant('keyboard'),
  fc.constant('touch')
);
```

### Plan de Tests

#### Tests Unitaires Prioritaires

1. **Tests d'Ouverture du Modal:**
   ```typescript
   test('ouvre le modal avec l\'image cliquée', () => {
     const images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
     const clickedIndex = 1;
     
     render(<ProductImageModal images={images} initialIndex={clickedIndex} />);
     
     expect(screen.getByAltText('Image produit')).toHaveAttribute('src', 'img2.jpg');
   });
   ```

2. **Tests de Navigation:**
   ```typescript
   test('désactive la flèche gauche sur la première image', () => {
     const images = ['img1.jpg', 'img2.jpg'];
     
     render(<ProductImageModal images={images} initialIndex={0} />);
     
     expect(screen.getByLabelText('Image précédente')).toBeDisabled();
   });
   ```

3. **Tests de Zoom:**
   ```typescript
   test('réinitialise le zoom au changement d\'image', () => {
     const images = ['img1.jpg', 'img2.jpg'];
     const { rerender } = render(<ProductImageModal images={images} />);
     
     // Zoom sur première image
     fireEvent.click(screen.getByLabelText('Zoom avant'));
     
     // Changer d'image
     fireEvent.click(screen.getByLabelText('Image suivante'));
     
     expect(screen.getByTestId('zoom-level')).toHaveTextContent('100%');
   });
   ```

4. **Tests d'Accessibilité:**
   ```typescript
   test('gère le focus pour l\'accessibilité', () => {
     render(<ProductImageModal images={['img1.jpg']} isOpen={true} />);
     
     // Le focus devrait être piégé dans le modal
     expect(document.activeElement).toBeWithin(screen.getByRole('dialog'));
   });
   ```

#### Tests de Propriétés (PBT)

1. **Propriété 1 - Ouverture avec Image Correcte:**
   ```typescript
   test.prop([imageUrlArbitrary, fc.nat()])(
     'ouvre toujours le modal avec l\'image cliquée',
     (images, clickedIndex) => {
       const validIndex = clickedIndex % images.length;
       
       const { getByAltText } = render(
         <ProductImageModal images={images} initialIndex={validIndex} />
       );
       
       expect(getByAltText('Image produit').src).toBe(images[validIndex]);
     }
   );
   ```

2. **Propriété 4 - Consistance du Zoom:**
   ```typescript
   test.prop([fc.float({ min: 1.0, max: 3.0 })])(
     'toutes les méthodes de zoom produisent le même résultat',
     (targetZoom) => {
       // Test que mouse wheel, boutons, et double-click
       // produisent tous le même niveau de zoom final
       // pour une cible donnée
     }
   );
   ```

3. **Propriété 6 - Gestion d'État de Navigation:**
   ```typescript
   test.prop([imageUrlArbitrary, fc.nat()])(
     'la navigation maintient toujours un état valide',
     (images, navigationSteps) => {
       // Navigation aléatoire à travers les images
       // devrait toujours maintenir:
       // - Index dans les limites
       // - Indicateur synchronisé
       // - Flèches activées/désactivées correctement
     }
   );
   ```

4. **Propriété 10 - Restauration d'État:**
   ```typescript
   test.prop([fc.record({
     scrollPosition: fc.integer({ min: 0, max: 1000 }),
     initialFocus: fc.oneof(fc.constant('image'), fc.constant('button'))
   })])(
     'restaure toujours l\'état de la page après fermeture',
     (pageState) => {
       // Après ouverture et fermeture du modal,
       // la page devrait retourner exactement à son état initial
     }
   );
   ```

### Tests d'Intégration

1. **Intégration avec ProductDetailPage:**
   - Test que le clic sur une miniature ouvre le modal
   - Test que la navigation dans le modal n'affecte pas la page
   - Test que la fermeture du modal restaure l'état de la page

2. **Intégration avec le Thème Existant:**
   - Test que les styles s'appliquent correctement
   - Test que les couleurs et polices sont cohérentes
   - Test que les animations suivent le pattern existant

3. **Tests de Performance:**
   - Test de temps de chargement avec différentes tailles d'images
   - Test de fluidité des animations
   - Test de mémoire avec de nombreuses images

4. **Tests d'Accessibilité:**
   - Test de navigation au clavier complète
   - Test de lecteurs d'écran (ARIA attributes)
   - Test de contraste et de taille des éléments

### Tests Responsives

1. **Tests Multi-plateformes:**
   - Desktop: Chrome, Firefox, Safari
   - Mobile: iOS Safari, Android Chrome
   - Tablette: iPad, Android tablet

2. **Tests de Tailles d'Écran:**
   - Mobile: 320px - 768px
   - Tablette: 768px - 1024px
   - Desktop: 1024px - 3840px

3. **Tests d'Interaction:**
   - Souris et clavier (desktop)
   - Touch gestures (mobile)
   - Trackpad gestures (laptop)

### Métriques de Qualité

1. **Couverture de Code:** Minimum 80% pour les composants du modal
2. **Performance:**
   - Ouverture du modal: < 200ms
   - Changement d'image: < 100ms
   - Animation de zoom: 60fps fluide
3. **Accessibilité:** Conformité WCAG 2.1 AA
4. **Compatibilité Navigateur:** Support des 2 dernières versions majeures

### Tags de Tests

Pour faciliter l'exécution et le reporting, chaque test sera taggé:

```typescript
// Tags pour les tests unitaires
test('ouvre le modal', { tags: ['modal', 'opening', 'unit'] })

// Tags pour les tests de propriétés
test.prop([], { tags: ['modal', 'properties', 'pbt'] })(
  'propriété de navigation',
  () => {}
)
```

**Format de Tag:**
- `Feature: product-image-modal`
- `Property {number}: {property_text}`
- `Component: {component_name}`
- `Type: {unit|integration|pbt|e2e}`

### Exécution des Tests

**Commande de test:**
```bash
# Tests unitaires seulement
npm test -- --testPathPattern="ProductImageModal"

# Tests de propriétés
npm test -- --testPathPattern="ProductImageModal.properties"

# Tous les tests du modal
npm test -- --testPathPattern="modal"
```

**Intégration CI/CD:**
- Exécution automatique sur chaque PR
- Rapport de couverture généré
- Vérification des métriques de performance
- Validation d'accessibilité automatisée

## Considerations Techniques

### Optimisations de Performance

1. **Lazy Loading d'Images:**
   ```typescript
   // Utilisation de l'API Intersection Observer
   const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         const img = entry.target as HTMLImageElement;
         img.src = img.dataset.src || '';
         observer.unobserve(img);
       }
     });
   });
   ```

2. **Préchargement Intelligent:**
   - Précharger les images adjacentes (±1)
   - Précharger en basse qualité d'abord
   - Utiliser le cache navigateur

3. **Debouncing des Événements:**
   ```typescript
   function useDebouncedCallback(callback: Function, delay: number) {
     const timeoutRef = useRef<NodeJS.Timeout>();
     
     return useCallback((...args: any[]) => {
       if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
       }
       
       timeoutRef.current = setTimeout(() => {
         callback(...args);
       }, delay);
     }, [callback, delay]);
   }
   ```

### Accessibilité

1. **Attributs ARIA:**
   ```jsx
   <div
     role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title"
     aria-describedby="modal-description"
   >
     <h2 id="modal-title">Visualisation d'image produit</h2>
     <p id="modal-description">
       Modal permettant d'afficher et de zoomer sur les images du produit.
       Utilisez les flèches pour naviguer entre les images et les boutons + et - pour zoomer.
     </p>
   </div>
   ```

2. **Gestion du Focus:**
   - Focus piégé dans le modal quand ouvert
   - Focus retourné à l'élément déclencheur à la fermeture
   - Navigation au clavier complète

3. **Support des Lecteurs d'Écran:**
   - Annonces dynamiques pour les changements d'image
   - Feedback sur le niveau de zoom
   - Instructions claires pour l'interaction

### Responsive Design

1. **Breakpoints:**
   ```css
   /* Mobile */
   @media (max-width: 768px) {
     .product-image-modal {
       padding: 1rem;
     }
     
     .modal-content {
       max-height: 80vh;
     }
   }
   
   /* Desktop */
   @media (min-width: 769px) {
     .product-image-modal {
       padding: 2rem;
     }
     
     .modal-content {
       max-height: 90vh;
       max-width: 90vw;
     }
   }
   ```

2. **Gestures Mobiles:**
   - Pinch-to-zoom pour mobile
   - Swipe pour navigation entre images
   - Tap pour fermer le modal

### Sécurité

1. **Validation des URLs:**
   ```typescript
   function isValidImageUrl(url: string): boolean {
     try {
       const parsed = new URL(url);
       return ['http:', 'https:'].includes(parsed.protocol) &&
              /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(parsed.pathname);
     } catch {
       return false;
     }
   }
   ```

2. **Protection XSS:**
   - Ne jamais injecter de HTML non échappé
   - Utiliser `React.createElement` ou JSX
   - Valider toutes les entrées utilisateur

### Maintenance et Évolutivité

1. **Architecture Modulaire:**
   - Composants découpés par responsabilité
   - Hooks réutilisables
   - Interfaces TypeScript bien définies

2. **Documentation:**
   - Commentaires JSDoc pour toutes les fonctions publiques
   - Exemples d'utilisation
   - Guide de contribution

3. **Monitoring:**
   - Logs d'erreurs
   - Métriques de performance
   - Analytics d'utilisation

## Conclusion

Ce design document présente une approche complète pour l'implémentation du modal d'images produit avec zoom et navigation. L'architecture proposée maintient la cohérence avec le système existant tout en fournissant une expérience utilisateur riche et accessible.

Les propriétés de correction définies fournissent une base solide pour les tests basés sur les propriétés, garantissant que le système se comporte correctement dans toutes les situations valides. La stratégie de test duale combine des tests unitaires concrets avec des tests de propriétés universels pour une couverture complète.

L'implémentation suivra les meilleures pratiques en matière de performance, d'accessibilité et de maintenabilité, en s'intégrant parfaitement avec l'application REPOWER-DRC existante.