"use client";

import React, { useState, useRef, useCallback } from "react";
import { useAdmin, type GalleryImage } from "@/components/admin/AdminContext";

// ============================================================
// Icons
// ============================================================
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
  Image: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
  ZoomIn: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
  ),
  ChevronLeft: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  ChevronRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
};

// ============================================================
// Lightbox
// ============================================================
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = images[currentIndex];
  if (!current) return null;

  return (
    <div className="admin-lightbox" onClick={onClose}>
      <button className="admin-lightbox-close" onClick={onClose}><Icons.Close /></button>
      <div className="admin-lightbox-content" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button className="admin-lightbox-nav admin-lightbox-nav--prev" onClick={onPrev}>
            <Icons.ChevronLeft />
          </button>
        )}
        <div className="admin-lightbox-image">
          <img src={current.src} alt={current.title} />
        </div>
        {images.length > 1 && (
          <button className="admin-lightbox-nav admin-lightbox-nav--next" onClick={onNext}>
            <Icons.ChevronRight />
          </button>
        )}
      </div>
      <div className="admin-lightbox-info">
        <h3>{current.title}</h3>
        {current.caption && <p>{current.caption}</p>}
        <span>{currentIndex + 1} / {images.length}</span>
      </div>
    </div>
  );
}

// ============================================================
// Gallery Page
// ============================================================
export default function AdminGalleryPage() {
  const { galleryImages, addGalleryImage, deleteGalleryImage, isLoaded } = useAdmin();
  const [dragActive, setDragActive] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("General");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = useCallback((file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );

    for (const file of files) {
      const dataUrl = await processFile(file);
      const image: GalleryImage = {
        id: `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        src: dataUrl,
        title: title || file.name.replace(/\.[^/.]+$/, ""),
        caption,
        category,
        uploadedAt: new Date().toISOString(),
      };
      addGalleryImage(image);
    }
    setTitle("");
    setCaption("");
  }, [title, caption, category, addGalleryImage, processFile]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );

    for (const file of files) {
      const dataUrl = await processFile(file);
      const image: GalleryImage = {
        id: `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        src: dataUrl,
        title: title || file.name.replace(/\.[^/.]+$/, ""),
        caption,
        category,
        uploadedAt: new Date().toISOString(),
      };
      addGalleryImage(image);
    }
    setTitle("");
    setCaption("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [title, caption, category, addGalleryImage, processFile]);

  const handleUrlUpload = useCallback(() => {
    if (!imageUrl.trim()) return;
    const image: GalleryImage = {
      id: `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      src: imageUrl.trim(),
      title: title || "Untitled Image",
      caption,
      category,
      uploadedAt: new Date().toISOString(),
    };
    addGalleryImage(image);
    setImageUrl("");
    setTitle("");
    setCaption("");
  }, [imageUrl, title, caption, category, addGalleryImage]);

  const handleDelete = () => {
    if (deleteTarget) {
      deleteGalleryImage(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  if (!isLoaded) {
    return <div className="admin-loading"><div className="admin-loading-spinner" /><p>Loading gallery...</p></div>;
  }

  return (
    <div className="admin-page">
      {/* Upload Section */}
      <div className="admin-card">
        <h3 className="admin-card-title">Upload Images</h3>

        {/* Upload method toggle */}
        <div className="admin-upload-tabs">
          <button
            className={`admin-upload-tab ${uploadMethod === "file" ? "admin-upload-tab--active" : ""}`}
            onClick={() => setUploadMethod("file")}
          >
            Upload File
          </button>
          <button
            className={`admin-upload-tab ${uploadMethod === "url" ? "admin-upload-tab--active" : ""}`}
            onClick={() => setUploadMethod("url")}
          >
            Image URL
          </button>
        </div>

        {/* Image metadata inputs */}
        <div className="admin-form-grid" style={{ marginBottom: "1rem" }}>
          <div className="admin-form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image title (optional)"
            />
          </div>
          <div className="admin-form-group">
            <label>Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Brief description (optional)"
            />
          </div>
          <div className="admin-form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="admin-select"
              style={{ width: "100%" }}
            >
              <option value="General">General</option>
              <option value="Products">Products</option>
              <option value="Projects">Projects</option>
              <option value="Events">Events</option>
              <option value="Team">Team</option>
            </select>
          </div>
        </div>

        {uploadMethod === "file" ? (
          /* Drag-and-drop zone */
          <div
            className={`admin-upload-zone ${dragActive ? "admin-upload-zone--active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            <div className="admin-upload-zone-icon">
              <Icons.Upload />
            </div>
            <p className="admin-upload-zone-text">
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p className="admin-upload-zone-hint">PNG, JPG, WEBP up to 5MB each</p>
          </div>
        ) : (
          /* URL input */
          <div className="admin-url-upload">
            <div className="admin-form-group">
              <label>Image URL</label>
              <div className="admin-url-input-row">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <button className="admin-btn admin-btn--primary" onClick={handleUrlUpload} disabled={!imageUrl.trim()}>
                  Add Image
                </button>
              </div>
            </div>
            {imageUrl && (
              <div className="admin-form-image-preview">
                <img src={imageUrl} alt="URL Preview" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Gallery ({galleryImages.length} images)</h3>
        </div>

        {galleryImages.length === 0 ? (
          <div className="admin-empty-state">
            <Icons.Image />
            <p>No images uploaded yet. Upload your first image above!</p>
          </div>
        ) : (
          <div className="admin-gallery-grid">
            {galleryImages.map((img, index) => (
              <div key={img.id} className="admin-gallery-item">
                <div className="admin-gallery-item-img">
                  <img src={img.src} alt={img.title} />
                  <div className="admin-gallery-item-overlay">
                    <button
                      className="admin-gallery-action admin-gallery-action--view"
                      onClick={() => setLightboxIndex(index)}
                    >
                      <Icons.ZoomIn />
                    </button>
                    <button
                      className="admin-gallery-action admin-gallery-action--delete"
                      onClick={() => setDeleteTarget(img)}
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </div>
                <div className="admin-gallery-item-info">
                  <span className="admin-gallery-item-title">{img.title}</span>
                  {img.caption && <span className="admin-gallery-item-caption">{img.caption}</span>}
                  <span className="admin-badge admin-badge--category">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : galleryImages.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev! < galleryImages.length - 1 ? prev! + 1 : 0))}
        />
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal admin-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header admin-modal-header--danger">
              <h2>Delete Image</h2>
              <button className="admin-modal-close" onClick={() => setDeleteTarget(null)}><Icons.Close /></button>
            </div>
            <div className="admin-modal-body">
              <p style={{ marginBottom: "1.5rem", color: "#6B7280" }}>
                Are you sure you want to delete <strong style={{ color: "#111" }}>&quot;{deleteTarget.title}&quot;</strong>?
              </p>
              <div className="admin-modal-actions">
                <button className="admin-btn admin-btn--ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="admin-btn admin-btn--danger" onClick={handleDelete}>Delete Image</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
