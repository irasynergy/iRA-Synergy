"use client";

import React, { useState, useRef, useCallback } from "react";
import { useAdmin, type GalleryImage } from "@/components/admin/AdminContext";
import { teamMembers as staticTeamMembers, companyInfo } from "@/data/company";

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
};

export default function AdminTeamPage() {
  const { galleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage, isLoaded } = useAdmin();
  
  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState(""); // used for both role and quote
  const [category, setCategory] = useState<"Team" | "Director">("Team");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived data
  const dbTeam = galleryImages.filter(img => img.category === "Team");
  const dbDirectors = galleryImages.filter(img => img.category === "Director");

  // Fallbacks logic
  const displayTeam = dbTeam.length > 0 ? dbTeam : staticTeamMembers.map((m, i) => ({
    id: `static-team-${i}`,
    src: m.image,
    title: m.name,
    caption: m.role,
    category: "Team",
    uploadedAt: new Date().toISOString()
  }));

  const displayDirectors = dbDirectors.length > 0 ? dbDirectors : companyInfo.directors.map((d, i) => ({
    id: `static-dir-${i}`,
    src: d.image,
    title: d.name,
    caption: `${d.title} | ${d.quote}`,
    category: "Director",
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

  const openModal = (item?: GalleryImage, defaultCat: "Team" | "Director" = "Team") => {
    if (item) {
      setEditingItem(item);
      setName(item.title);
      setRole(item.caption);
      setCategory(item.category as "Team" | "Director");
      setImageUrl(item.src);
    } else {
      setEditingItem(null);
      setName("");
      setRole("");
      setCategory(defaultCat);
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
    if (!name || !imageUrl) return;

    if (editingItem && !editingItem.id.startsWith("static-")) {
      // Update existing DB entry
      updateGalleryImage(editingItem.id, {
        title: name,
        caption: role,
        category,
        src: imageUrl
      });
    } else {
      // It's either a brand new one OR we are overriding a static one
      addGalleryImage({
        id: `team-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: name,
        caption: role,
        category,
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
            <h3 className="admin-card-title">Directors</h3>
            <p className="admin-card-subtitle">Manage leadership profiles on the About page</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={() => openModal(undefined, "Director")}>
            Add Director
          </button>
        </div>
        <div className="admin-gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {displayDirectors.map((dir) => (
            <div key={dir.id} className="admin-gallery-item">
              <div className="admin-gallery-item-img" style={{ aspectRatio: '1/1' }}>
                <img src={dir.src} alt={dir.title} style={{ objectPosition: 'top' }} />
                <div className="admin-gallery-item-overlay">
                  <button className="admin-gallery-action admin-gallery-action--view" onClick={() => openModal(dir, "Director")}>
                    <Icons.Edit />
                  </button>
                  {!dir.id.startsWith("static-") && (
                    <button className="admin-gallery-action admin-gallery-action--delete" onClick={() => setDeleteTarget(dir)}>
                      <Icons.Trash />
                    </button>
                  )}
                </div>
              </div>
              <div className="admin-gallery-item-info">
                <span className="admin-gallery-item-title">{dir.title}</span>
                <span className="admin-gallery-item-caption text-xs truncate max-w-full block">{dir.caption.split('|')[0]}</span>
                {dir.id.startsWith("static-") && <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block border border-amber-200">Default Template</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="admin-card-title">Team Members</h3>
            <p className="admin-card-subtitle">Manage key personnel profiles</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={() => openModal(undefined, "Team")}>
            Add Team Member
          </button>
        </div>
        <div className="admin-gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {displayTeam.map((member) => (
            <div key={member.id} className="admin-gallery-item">
              <div className="admin-gallery-item-img" style={{ aspectRatio: '1/1' }}>
                <img src={member.src} alt={member.title} style={{ objectPosition: 'top' }} />
                <div className="admin-gallery-item-overlay">
                  <button className="admin-gallery-action admin-gallery-action--view" onClick={() => openModal(member, "Team")}>
                    <Icons.Edit />
                  </button>
                  {!member.id.startsWith("static-") && (
                    <button className="admin-gallery-action admin-gallery-action--delete" onClick={() => setDeleteTarget(member)}>
                      <Icons.Trash />
                    </button>
                  )}
                </div>
              </div>
              <div className="admin-gallery-item-info">
                <span className="admin-gallery-item-title">{member.title}</span>
                <span className="admin-gallery-item-caption text-xs block truncate">{member.caption}</span>
                {member.id.startsWith("static-") && <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block border border-amber-200">Default Template</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editingItem ? 'Edit Profile' : 'Add Profile'}</h2>
              <button className="admin-modal-close" onClick={closeModal}><Icons.Close /></button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
                  <label>Type</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value as "Team" | "Director")} className="admin-select" style={{ width: "100%" }}>
                    <option value="Team">Team Member</option>
                    <option value="Director">Director</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
                </div>
                <div className="admin-form-group">
                  <label>{category === "Director" ? "Title & Quote (Format: Title | Quote)" : "Role"}</label>
                  <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder={category === "Director" ? "Managing Director | We build..." : "Operations Manager"} />
                </div>
                <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
                  <label>Photo</label>
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
                    <div className="mt-4 flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover object-top" />
                      </div>
                      <span className="text-sm text-gray-500">Preview</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="admin-modal-actions" style={{ padding: "1rem 1.5rem", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button className="admin-btn admin-btn--ghost" onClick={closeModal}>Cancel</button>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={!name || !imageUrl}>Save Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal admin-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header admin-modal-header--danger">
              <h2>Delete Profile</h2>
              <button className="admin-modal-close" onClick={() => setDeleteTarget(null)}><Icons.Close /></button>
            </div>
            <div className="admin-modal-body">
              <p style={{ marginBottom: "1.5rem", color: "#6B7280" }}>
                Are you sure you want to delete <strong style={{ color: "#111" }}>{deleteTarget.title}</strong>?
              </p>
              <div className="admin-modal-actions">
                <button className="admin-btn admin-btn--ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="admin-btn admin-btn--danger" onClick={handleDelete}>Delete Profile</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
