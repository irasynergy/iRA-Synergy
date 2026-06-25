"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import { useAdmin } from "@/components/admin/AdminContext";
import type { Product, ProductCategory } from "@/types";
import { productCategories } from "@/data/products";

// ============================================================
// Icons
// ============================================================
const Icons = {
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Plus: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Grid: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
  ),
  List: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
  ),
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
  ),
};

// ============================================================
// Product Detail Modal
// ============================================================
function ProductDetailModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{product.name}</h2>
          <button className="admin-modal-close" onClick={onClose}><Icons.Close /></button>
        </div>
        <div className="admin-modal-body">
          {/* Image gallery */}
          <div className="admin-detail-images">
            {product.images.map((img, i) => (
              <div key={i} className="admin-detail-image">
                <img src={img} alt={`${product.name} ${i + 1}`} />
              </div>
            ))}
          </div>

          <div className="admin-detail-grid">
            <div>
              <h4 className="admin-detail-label">Description</h4>
              <p className="admin-detail-text">{product.description}</p>
            </div>
            <div>
              <h4 className="admin-detail-label">Details</h4>
              <div className="admin-detail-meta">
                <div><strong>ID:</strong> {product.id}</div>
                <div><strong>Slug:</strong> {product.slug}</div>
                <div><strong>Category:</strong> {product.category}</div>
                <div><strong>Price:</strong> {product.price || "N/A"}</div>
                <div><strong>Badge:</strong> {product.badge || "None"}</div>
                <div><strong>Status:</strong> {product.inStock ? "In Stock" : "Out of Stock"}</div>
                {product.brochureUrl && (
                  <div>
                    <strong>Brochure:</strong>{" "}
                    <a
                      href={product.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#0F5C24", textDecoration: "underline", fontWeight: "bold" }}
                    >
                      Download/View PDF
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          {product.features.length > 0 && (
            <div>
              <h4 className="admin-detail-label">Features</h4>
              <ul className="admin-detail-list">
                {product.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}

          {/* Specs */}
          {product.specs.length > 0 && (
            <div>
              <h4 className="admin-detail-label">Specifications</h4>
              <div className="admin-detail-specs">
                {product.specs.map((s, i) => (
                  <div key={i} className="admin-detail-spec-row">
                    <span className="admin-detail-spec-label">{s.label}</span>
                    <span className="admin-detail-spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div>
              <h4 className="admin-detail-label">Certifications</h4>
              <div className="admin-category-tags">
                {product.certifications.map((c, i) => (
                  <span key={i} className="admin-category-tag">{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Edit Product Modal
// ============================================================
function EditProductModal({
  product,
  onSave,
  onClose,
}: {
  product?: Product;
  onSave: (data: Product) => void;
  onClose: () => void;
}) {
  const isNew = !product;
  const [form, setForm] = useState<Product>(
    product || {
      id: `p-${Date.now()}`,
      slug: "",
      name: "",
      category: "Smart City" as ProductCategory,
      description: "",
      shortDescription: "",
      features: [],
      specs: [],
      certifications: [],
      images: [],
      price: "On Request",
      inStock: true,
      badge: "",
      relatedProductSlugs: [],
    }
  );
  const [featuresText, setFeaturesText] = useState(product?.features.join("\n") || "");
  const [certsText, setCertsText] = useState(product?.certifications.join(", ") || "");
  const [specs, setSpecs] = useState<{label: string, value: string}[]>(product?.specs || []);
  const [bulkSpecsText, setBulkSpecsText] = useState("");

  const [images, setImages] = useState<string[]>(product?.images || []);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image Drag-and-Drop Reordering state & handlers
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleImageDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleImageDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleImageDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const reordered = [...images];
    const [removed] = reordered.splice(draggedIndex, 1);
    reordered.splice(index, 0, removed);
    setImages(reordered);
    setDraggedIndex(null);
  };

  const handleParseBulkSpecs = () => {
    if (!bulkSpecsText.trim()) return;
    const lines = bulkSpecsText.split('\n');
    const newSpecs: {label: string, value: string}[] = [];
    
    for (const line of lines) {
      const cleanLine = line.trim();
      if (!cleanLine || cleanLine.match(/^\|?-+\|-+\|?$/)) continue; // skip markdown divider
      
      let label = "";
      let value = "";
      
      if (cleanLine.startsWith('|')) {
        const parts = cleanLine.split('|').map(s => s.trim());
        if (parts.length >= 3) {
          label = parts[1];
          value = parts[2];
        }
      } else if (cleanLine.includes('\t')) {
        const parts = cleanLine.split('\t').map(s => s.trim());
        label = parts[0];
        value = parts.slice(1).join(' ');
      } else if (cleanLine.includes(':')) {
        const parts = cleanLine.split(':').map(s => s.trim());
        label = parts[0];
        value = parts.slice(1).join(':');
      }

      if (label && value && label.toLowerCase() !== "specification" && label.toLowerCase() !== "details") {
        newSpecs.push({ label, value });
      }
    }
    
    if (newSpecs.length > 0) {
      setSpecs([...specs, ...newSpecs]);
      setBulkSpecsText("");
    } else {
      alert("Could not parse any specifications. Please try a different format like Markdown table, 'Label | Value', or 'Label: Value'");
    }
  };

  // Brochure PDF state & ref
  const [brochureUrl, setBrochureUrl] = useState(product?.brochureUrl || "");
  const brochureFileInputRef = useRef<HTMLInputElement>(null);

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
      setImages((prev) => [...prev, dataUrl]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );

    for (const file of files) {
      const dataUrl = await processFile(file);
      setImages((prev) => [...prev, dataUrl]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [processFile]);

  const handleBrochureFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const dataUrl = await processFile(file);
      setBrochureUrl(dataUrl);
    } else if (file) {
      alert("Please select a valid PDF file.");
    }
    if (brochureFileInputRef.current) brochureFileInputRef.current.value = "";
  }, [processFile]);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    onSave({
      ...form,
      slug,
      features: featuresText.split("\n").map(s => s.trim()).filter(Boolean),
      specs: specs.filter(s => s.label.trim() !== "" || s.value.trim() !== ""),
      images,
      brochureUrl: brochureUrl || undefined,
      certifications: certsText.split(",").map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{isNew ? "Add New Product" : `Edit: ${product!.name}`}</h2>
          <button className="admin-modal-close" onClick={onClose}><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit} className="admin-modal-body">
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Product Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="e.g., Solar Smart Bench"
              />
            </div>
            <div className="admin-form-group">
              <label>Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated from name"
              />
            </div>
            <div className="admin-form-group">
              <label>Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
              >
                {productCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Badge</label>
              <select
                value={form.badge || ""}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
              >
                <option value="">None</option>
                {productCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option disabled>──────────</option>
                <option value="GeM Listed">GeM Listed</option>
                <option value="Government Approved">Government Approved</option>
                <option value="Best Seller">Best Seller</option>
                <option value="New">New</option>
                <option value="Eco-Certified">Eco-Certified</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Price</label>
              <input
                type="text"
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="On Request"
              />
            </div>
            <div className="admin-form-group">
              <label>Stock Status</label>
              <select
                value={form.inStock ? "true" : "false"}
                onChange={(e) => setForm({ ...form, inStock: e.target.value === "true" })}
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label>Short Description *</label>
            <input
              type="text"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              required
              placeholder="Brief one-line description"
            />
          </div>

          <div className="admin-form-group">
            <label>Full Description *</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              placeholder="Detailed product description..."
            />
          </div>

          <div className="admin-form-group">
            <label>Features (one per line)</label>
            <textarea
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder={"Feature 1\nFeature 2\nFeature 3"}
            />
          </div>

          <div className="admin-form-group">
            <label>Technical Specifications</label>

            {/* Bulk Paste Section */}
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f9fafb', border: '1px dashed #d1d5db', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                <strong>Bulk Paste:</strong> Paste a Markdown table or tab-separated text (e.g. from Excel) directly below to auto-fill the table.
              </p>
              <textarea
                rows={3}
                value={bulkSpecsText}
                onChange={(e) => setBulkSpecsText(e.target.value)}
                placeholder="| Specification | Details |\n| Model | AWI-500 |"
                style={{ marginBottom: '8px', fontFamily: 'monospace', fontSize: '12px' }}
              />
              <button
                type="button"
                className="admin-btn admin-btn--primary"
                onClick={handleParseBulkSpecs}
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                Parse & Add to Table
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {specs.map((spec, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => {
                      const newSpecs = [...specs];
                      newSpecs[index].label = e.target.value;
                      setSpecs(newSpecs);
                    }}
                    placeholder="e.g. Dimensions"
                    style={{ flex: 1 }}
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => {
                      const newSpecs = [...specs];
                      newSpecs[index].value = e.target.value;
                      setSpecs(newSpecs);
                    }}
                    placeholder="e.g. 10x20 cm"
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => setSpecs(specs.filter((_, i) => i !== index))}
                    className="admin-icon-btn admin-icon-btn--delete"
                  >
                    <Icons.Trash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => setSpecs([...specs, { label: "", value: "" }])}
                style={{ alignSelf: 'flex-start', marginTop: '8px' }}
              >
                <Icons.Plus /> Add Specification
              </button>
            </div>
          </div>

          <div className="admin-form-group">
            <label>Product Images</label>
            <div
              className={`admin-upload-zone ${dragActive ? "admin-upload-zone--active" : ""}`}
              style={{ padding: "2rem 1rem" }}
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
              <p className="admin-upload-zone-text" style={{ fontSize: "1rem" }}>
                <strong>Click to upload</strong> or drag and drop
              </p>
            </div>
            
            {images.length > 0 && (
              <>
                <p style={{ fontSize: "11px", color: "#6B7280", marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>💡</span> <strong>Drag images to rearrange their sequence/order.</strong> The first image will be the primary/cover thumbnail.
                </p>
                <div className="admin-detail-images" style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "12px" }}>
                  {images.map((img, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => handleImageDragStart(i)}
                      onDragOver={(e) => handleImageDragOver(e, i)}
                      onDrop={(e) => handleImageDrop(e, i)}
                      className="admin-detail-image"
                      style={{
                        position: "relative",
                        cursor: "grab",
                        border: "2px dashed #d1d5db",
                        borderRadius: "8px",
                        padding: "6px",
                        backgroundColor: "#f9fafb",
                        transition: "all 0.2s",
                        opacity: draggedIndex === i ? 0.4 : 1,
                      }}
                      onDragEnd={() => setDraggedIndex(null)}
                    >
                      <img
                        src={img}
                        alt={`Preview ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "contain",
                          pointerEvents: "none"
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "4px",
                          left: "4px",
                          backgroundColor: i === 0 ? "#0F5C24" : "rgba(17, 24, 39, 0.75)",
                          color: "white",
                          fontSize: "10px",
                          fontWeight: "bold",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          pointerEvents: "none"
                        }}
                      >
                        {i === 0 ? "Cover" : `#${i + 1}`}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          background: "rgba(220, 38, 38, 0.9)",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px",
                          cursor: "pointer"
                        }}
                        title="Delete image"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="admin-form-group">
            <label>Brochure PDF (Optional)</label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="text"
                value={brochureUrl}
                onChange={(e) => setBrochureUrl(e.target.value)}
                placeholder="/brochures/product-brochure.pdf or upload PDF"
                style={{ flexGrow: 1 }}
              />
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => brochureFileInputRef.current?.click()}
                style={{ whiteSpace: "nowrap" }}
              >
                Upload PDF
              </button>
              <input
                ref={brochureFileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleBrochureFileSelect}
                style={{ display: "none" }}
              />
            </div>
            {brochureUrl && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", padding: "8px", backgroundColor: "#f3f4f6", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span style={{ fontSize: "12px", color: "#374151", flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={brochureUrl}>
                  {brochureUrl.startsWith("data:") ? "Attached PDF Brochure (Base64)" : brochureUrl}
                </span>
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "12px", color: "#0F5C24", textDecoration: "underline", fontWeight: "bold" }}
                >
                  View
                </a>
                <span style={{ color: "#d1d5db" }}>|</span>
                <button
                  type="button"
                  onClick={() => setBrochureUrl("")}
                  style={{ color: "#DC2626", background: "none", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="admin-form-group">
            <label>Certifications (comma separated)</label>
            <input
              type="text"
              value={certsText}
              onChange={(e) => setCertsText(e.target.value)}
              placeholder="ISO 9001, CE, GeM Listed"
            />
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary">
              {isNew ? "Add Product" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// Delete Confirmation Modal
// ============================================================
function DeleteModal({
  itemName,
  onConfirm,
  onClose,
}: {
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal--sm" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header admin-modal-header--danger">
          <h2>Delete Confirmation</h2>
          <button className="admin-modal-close" onClick={onClose}><Icons.Close /></button>
        </div>
        <div className="admin-modal-body">
          <p style={{ marginBottom: "1.5rem", color: "#6B7280" }}>
            Are you sure you want to delete <strong style={{ color: "#111" }}>&quot;{itemName}&quot;</strong>? This action cannot be undone.
          </p>
          <div className="admin-modal-actions">
            <button className="admin-btn admin-btn--ghost" onClick={onClose}>Cancel</button>
            <button className="admin-btn admin-btn--danger" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Products Page
// ============================================================
export default function AdminProductsPage() {
  const { adminProducts, addProduct, updateProduct, deleteProduct, isLoaded } = useAdmin();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null | "new">(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return adminProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [adminProducts, search, categoryFilter]);

  if (!isLoaded) {
    return <div className="admin-loading"><div className="admin-loading-spinner" /><p>Loading products...</p></div>;
  }

  const handleSave = (product: Product) => {
    if (editProduct === "new") {
      addProduct(product);
    } else {
      updateProduct(product.id, product);
    }
    setEditProduct(null);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="admin-page">
      {/* Header bar */}
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <div className="admin-search-box">
            <Icons.Search />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {productCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="admin-page-header-right">
          <div className="admin-view-toggle">
            <button
              className={`admin-view-btn ${viewMode === "table" ? "admin-view-btn--active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              <Icons.List />
            </button>
            <button
              className={`admin-view-btn ${viewMode === "grid" ? "admin-view-btn--active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Icons.Grid />
            </button>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={() => setEditProduct("new")}>
            <Icons.Plus />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="admin-results-count">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="admin-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Badge</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-table-product">
                        <div className="admin-table-product-img">
                          {product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} />
                          ) : (
                            <div className="admin-table-product-placeholder">N/A</div>
                          )}
                        </div>
                        <div>
                          <div className="admin-table-product-name">{product.name}</div>
                          <div className="admin-table-product-id">{product.shortDescription}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="admin-badge admin-badge--category">{product.category}</span></td>
                    <td><span className="admin-badge admin-badge--info">{product.badge || "—"}</span></td>
                    <td className="admin-table-price">{product.price || "N/A"}</td>
                    <td>
                      <span className={`admin-badge ${product.inStock ? "admin-badge--success" : "admin-badge--danger"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-action-btns">
                        <button className="admin-icon-btn admin-icon-btn--view" title="View" onClick={() => setViewProduct(product)}><Icons.Eye /></button>
                        <button className="admin-icon-btn admin-icon-btn--edit" title="Edit" onClick={() => setEditProduct(product)}><Icons.Edit /></button>
                        <button className="admin-icon-btn admin-icon-btn--delete" title="Delete" onClick={() => setDeleteTarget(product)}><Icons.Trash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="admin-table-empty">No products found matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="admin-product-grid">
          {filtered.map((product) => (
            <div key={product.id} className="admin-product-card">
              <div className="admin-product-card-img">
                {product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <div className="admin-product-card-placeholder">No Image</div>
                )}
                {product.badge && <span className="admin-product-card-badge">{product.badge}</span>}
              </div>
              <div className="admin-product-card-body">
                <h4>{product.name}</h4>
                <p>{product.shortDescription}</p>
                <div className="admin-product-card-meta">
                  <span className="admin-badge admin-badge--category">{product.category}</span>
                  <span className={`admin-badge ${product.inStock ? "admin-badge--success" : "admin-badge--danger"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <div className="admin-product-card-actions">
                <button className="admin-icon-btn admin-icon-btn--view" onClick={() => setViewProduct(product)}><Icons.Eye /></button>
                <button className="admin-icon-btn admin-icon-btn--edit" onClick={() => setEditProduct(product)}><Icons.Edit /></button>
                <button className="admin-icon-btn admin-icon-btn--delete" onClick={() => setDeleteTarget(product)}><Icons.Trash /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {viewProduct && <ProductDetailModal product={viewProduct} onClose={() => setViewProduct(null)} />}
      {editProduct && (
        <EditProductModal
          product={editProduct === "new" ? undefined : editProduct}
          onSave={handleSave}
          onClose={() => setEditProduct(null)}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          itemName={deleteTarget.name}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
