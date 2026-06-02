import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, ImageOff, Package, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
    id?: number;
    title: string;
    description: string;
    price_usd: number;
    price_cdf: number;
    photos: string[];
    active: boolean;
    category?: string;
}

const EMPTY_FORM: Product = {
    title: '',
    description: '',
    price_usd: 0,
    price_cdf: 0,
    photos: [],
    active: true,
    category: '',
};

const categoryLabels: Record<string, string> = {
    'Panneau solaire': 'Panneaux Solaires',
    'Onduleur hybride': 'Onduleurs',
    'Stockage energie': 'Batteries / Stockage',
    'Cables': 'Câbles & Accessoires',
    'Services': 'Services / Divers',
};

const CATEGORY_COLORS: Record<string, string> = {
    'Panneau solaire': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    'Onduleur hybride': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    'Stockage energie': 'bg-green-500/10 text-green-600 dark:text-green-400',
    'Cables': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    'Services': 'bg-secondary/10 text-secondary',
};

export default function ProductManager() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [formData, setFormData] = useState<Product>({ ...EMPTY_FORM });

    // Fetch products
    const fetchProducts = async () => {
        setFetchLoading(true);
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (e) {
            console.error('Erreur chargement:', e);
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    // Form handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const base64 = ev.target?.result as string;
                setFormData(prev => ({ ...prev, photos: [...prev.photos, base64] }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhoto = (index: number) => {
        setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
    };

    // Open modal for creation
    const openCreateModal = () => {
        setFormData({ ...EMPTY_FORM });
        setEditingId(null);
        setIsModalOpen(true);
    };

    // Open modal for editing
    const openEditModal = (product: Product) => {
        // Parse photos if they come as JSON string from database
        let photos = product.photos || [];
        if (typeof photos === 'string') {
            try {
                photos = JSON.parse(photos);
            } catch (e) {
                photos = [];
            }
        }
        setFormData({ ...product, photos: Array.isArray(photos) ? photos : [] });
        setEditingId(product.id ?? null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ ...EMPTY_FORM });
    };

    // Save (create or update)
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = editingId ? `/api/products/${editingId}` : '/api/products';
            const method = editingId ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                await fetchProducts();
                closeModal();
            }
        } catch (e) {
            console.error('Erreur sauvegarde:', e);
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const handleDelete = async (id: number) => {
        if (!confirm('Supprimer ce produit ?')) return;
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            if (res.ok) await fetchProducts();
        } catch (e) {
            console.error('Erreur suppression:', e);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-card-foreground">Gestion des Produits</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {products.length} produit{products.length !== 1 ? 's' : ''} au catalogue
                    </p>
                </div>
                <Button onClick={openCreateModal} className="flex items-center gap-2">
                    <Plus size={18} />
                    Ajouter un produit
                </Button>
            </div>

            {/* Modal (for create AND edit) */}
            <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) closeModal(); }}>
                <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">
                            {editingId ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="space-y-5 pt-2">
                        {/* Title + Category */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-1">Titre *</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Nom du produit"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Catégorie *</label>
                                <select
                                    name="category"
                                    value={formData.category || ''}
                                    onChange={handleInputChange}
                                    required
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Choisir une catégorie</option>
                                    <option value="Panneau solaire">Panneaux Solaires</option>
                                    <option value="Onduleur hybride">Onduleurs</option>
                                    <option value="Stockage energie">Batteries / Stockage</option>
                                    <option value="Cables">Câbles & Accessoires</option>
                                    <option value="Services">Services / Divers</option>
                                </select>
                            </div>
                        </div>

                        {/* Prices */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-1">Prix USD *</label>
                                <Input
                                    type="number"
                                    name="price_usd"
                                    value={formData.price_usd}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Prix CDF *</label>
                                <Input
                                    type="number"
                                    name="price_cdf"
                                    value={formData.price_cdf}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Description du produit..."
                                rows={3}
                            />
                        </div>

                        {/* Active toggle */}
                        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                            <input
                                type="checkbox"
                                id="active-toggle"
                                checked={formData.active}
                                onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                                className="h-4 w-4 rounded border-input"
                            />
                            <label htmlFor="active-toggle" className="text-sm font-medium cursor-pointer">
                                Produit actif (visible sur le site)
                            </label>
                        </div>

                        {/* Photos */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Photos</label>
                            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary hover:bg-primary/5">
                                <Package size={28} className="text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Cliquer pour ajouter des photos</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />
                            </label>
                            {formData.photos.length > 0 && (
                                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                                    {formData.photos.map((photo, i) => (
                                        <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                                            <img src={photo} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(i)}
                                                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 border-t border-border pt-4">
                            <Button type="submit" disabled={loading} className="flex-1">
                                {loading ? 'Sauvegarde...' : editingId ? 'Mettre à jour' : 'Créer le produit'}
                            </Button>
                            <Button type="button" variant="outline" onClick={closeModal}>
                                Annuler
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Products list */}
            {fetchLoading ? (
                <div className="flex items-center justify-center py-16 text-muted-foreground">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
                    <span className="ml-3">Chargement...</span>
                </div>
            ) : products.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-border p-12 text-center">
                    <Package size={40} className="mx-auto mb-4 text-muted-foreground opacity-40" />
                    <p className="text-muted-foreground font-medium">Aucun produit dans le catalogue.</p>
                    <p className="text-sm text-muted-foreground mt-1">Cliquez sur «&nbsp;Ajouter un produit&nbsp;» pour commencer.</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
                        >
                            {/* Photo or placeholder */}
                            <div className="relative h-48 overflow-hidden bg-muted">
                                {product.photos && product.photos.length > 0 ? (
                                    <img
                                        src={product.photos[0]}
                                        alt={product.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <ImageOff size={32} className="text-muted-foreground opacity-30" />
                                    </div>
                                )}
                                {/* Active badge */}
                                <div className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${product.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                                    {product.active ? 'Actif' : 'Inactif'}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-4">
                                {product.category && (
                                    <span className={`mb-2 self-start rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[product.category] || 'bg-secondary/10 text-secondary'}`}>
                                        {categoryLabels[product.category] || product.category}
                                    </span>
                                )}
                                <h3 className="font-semibold text-card-foreground line-clamp-2 leading-snug">
                                    {product.title}
                                </h3>
                                {product.description && (
                                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                                        {product.description}
                                    </p>
                                )}
                                <div className="mt-auto flex items-center justify-between pt-3">
                                    <div>
                                        <div className="font-bold text-primary dark:text-white">
                                            ${product.price_usd}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {product.price_cdf?.toLocaleString()} CDF
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => openEditModal(product)}
                                            className="flex items-center gap-1"
                                        >
                                            <Edit size={13} />
                                            Modifier
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(product.id!)}
                                            className="flex items-center gap-1"
                                        >
                                            <Trash2 size={13} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
