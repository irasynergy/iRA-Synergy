"use client";

import React, { useState, useRef, useCallback } from "react";
import { useAdmin, type GalleryImage } from "@/components/admin/AdminContext";
import { fallbackImages } from "@/components/Hero";

const Icons = {
  Upload: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
  ),
  Image: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
};

export default function AdminHeroPage() {
  const { galleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage, isLoaded } = useAdmin();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);

  // Form State
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dbHeroImages = galleryImages.filter(img => img.category === "Hero");

  // Fallbacks logic
  const displayImages = dbHeroImages.length > 0 ? dbHeroImages : fallbackImages.map((m, i) => ({
    id: `static-hero-${i}`,
    src: m.src,
    title: `Default Slide ${i + 1}`,
    caption: m.alt,
    category: "Hero",
    uploadedAt: new Date().toISOString()
  }));

  const processFile = useCallback((file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await processFile(file);
      setImageUrl(dataUrl);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const dataUrl = await processFile(file);
      setImageUrl(dataUrl);
    }
  };

  const openModal = (item?: GalleryImage) => {
    if (item) {
      setEditingItem(item);
      setCaption(item.caption || "");
      setImageUrl(item.src);
    } else {
      setEditingItem(null);
      setCaption("");
      setImageUrl("");
    }
    setUploadMethod("file");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = () => {
    if (!imageUrl) return;

    if (editingItem && !editingItem.id.startsWith("static-")) {
      updateGalleryImage(editingItem.id, {
        caption,
        src: imageUrl
      });
    } else {
      addGalleryImage({
        id: `hero-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: `Slide ${displayImages.length + 1}`,
        caption,
        category: "Hero",
        src: imageUrl,
        uploadedAt: new Date().toISOString()
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    if (deleteTarget && !deleteTarget.id.startsWith("static-")) {
      deleteGalleryImage(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  if (!isLoaded) {
    return <div className="admin-loading"><div className="admin-loading-spinner" /><p>Loading...</p></div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="admin-card-title">Homepage Carousel</h3>
            <p className="admin-card-subtitle">Manage the large scrolling images on your home page</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={() => openModal(undefined)}>
            Add New Slide
          </button>
        </div>

        {displayImages.length === 0 ? (
          <div className="admin-empty-state">
            <Icons.Image />
            <p>No images uploaded yet. Upload your first slide above!</p>
          </div>
        ) : (
          <div className="admin-gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
            {displayImages.map((img) => (
              <div key={img.id} className="admin-gallery-item shadow-sm border border-gray-200">
                <div className="admin-gallery-item-img" style={{ aspectRatio: '16/9' }}>
                  <img src={img.src} alt={img.caption} style={{ objectPosition: 'center' }} />
                  <div className="admin-gallery-item-overlay">
                    <button className="admin-gallery-action admin-gallery-action--view" onClick={() => openModal(img)}>
                      <Icons.Edit />
                    </button>
                    {!img.id.startsWith("static-") && (
                      <button className="admin-gallery-action admin-gallery-action--delete" onClick={() => setDeleteTarget(img)}>
                        <Icons.Trash />
                      </button>
                    )}
                  </div>
                </div>
                <div className="admin-gallery-item-info">
                  <span className="admin-gallery-item-title">{img.title}</span>
                  <span className="admin-gallery-item-caption text-xs truncate max-w-full block">Alt Text: {img.caption || "None"}</span>
                  {img.id.startsWith("static-") && <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block border border-amber-200">Default Template</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editingItem ? 'Edit Slide' : 'Add Slide'}</h2>
              <button className="admin-modal-close" onClick={closeModal}><Icons.Close /></button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Alt Text (SEO Caption)</label>
                <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="e.g. Smart City Infrastructure Solutions" />
                <span className="text-xs text-gray-500 mt-1 block">This text is hidden visually but important for search engines.</span>
              </div>
              <div className="admin-form-group">
                <label>Background Image</label>
                <div className="admin-upload-tabs" style={{ marginBottom: "1rem" }}>
                  <button className={`admin-upload-tab ${uploadMethod === "file" ? "admin-upload-tab--active" : ""}`} onClick={() => setUploadMethod("file")}>Upload File</button>
                  <button className={`admin-upload-tab ${uploadMethod === "url" ? "admin-upload-tab--active" : ""}`} onClick={() => setUploadMethod("url")}>Image URL</button>
                </div>
                
                {uploadMethod === "file" ? (
                  <div
                    className={`admin-upload-zone ${dragActive ? "admin-upload-zone--active" : ""}`}
                    onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} style={{ display: "none" }} />
                    <div className="admin-upload-zone-icon"><Icons.Upload /></div>
                    <p className="admin-upload-zone-text"><strong>Click to upload</strong> or drag and drop</p>
                  </div>
                ) : (
                  <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/photo.jpg" />
                )}

                {imageUrl && (
                  <div className="mt-4">
                    <span className="text-sm font-semibold mb-2 block">Live Preview</span>
                    <div className="w-full relative rounded-lg overflow-hidden border border-gray-200" style={{ aspectRatio: '16/9' }}>
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-8">
                         <h1 className="text-white font-bold text-2xl lg:text-3xl mb-2">Building a<br/><span className="text-emerald-400">Smarter, Cleaner &</span><br/>Sustainable India</h1>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-actions" style={{ padding: "1rem 1.5rem", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button className="admin-btn admin-btn--ghost" onClick={closeModal}>Cancel</button>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={!imageUrl}>Save Slide</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal admin-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header admin-modal-header--danger">
              <h2>Delete Slide</h2>
              <button className="admin-modal-close" onClick={() => setDeleteTarget(null)}><Icons.Close /></button>
            </div>
            <div className="admin-modal-body">
              <p style={{ marginBottom: "1.5rem", color: "#6B7280" }}>
                Are you sure you want to delete <strong style={{ color: "#111" }}>{deleteTarget.title}</strong>?
              </p>
              <div className="admin-modal-actions">
                <button className="admin-btn admin-btn--ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="admin-btn admin-btn--danger" onClick={handleDelete}>Delete Slide</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
