"use client";

import React, { useState, useMemo } from "react";
import { useAdmin } from "@/components/admin/AdminContext";
import type { BlogPost } from "@/data/blogs";

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
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
};

// ============================================================
// Blog Detail Modal
// ============================================================
function BlogDetailModal({
  blog,
  onClose,
}: {
  blog: BlogPost;
  onClose: () => void;
}) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{blog.title}</h2>
          <button className="admin-modal-close" onClick={onClose}><Icons.Close /></button>
        </div>
        <div className="admin-modal-body">
          {blog.coverImage && (
            <div className="admin-blog-cover-preview">
              <img src={blog.coverImage} alt={blog.title} />
            </div>
          )}
          <div className="admin-blog-detail-meta">
            <span><Icons.Calendar /> {blog.date}</span>
            <span><Icons.Clock /> {blog.readTime}</span>
            <span className="admin-badge admin-badge--category">{blog.category}</span>
          </div>
          <div className="admin-detail-grid">
            <div>
              <h4 className="admin-detail-label">Author</h4>
              <p className="admin-detail-text">{blog.author}</p>
            </div>
            <div>
              <h4 className="admin-detail-label">Related Solution</h4>
              <p className="admin-detail-text">{blog.relatedSolutionSlug || "None"}</p>
            </div>
          </div>
          <div>
            <h4 className="admin-detail-label">Excerpt</h4>
            <p className="admin-detail-text">{blog.excerpt}</p>
          </div>
          {blog.content && (
            <div>
              <h4 className="admin-detail-label">Content Preview</h4>
              <div className="admin-blog-content-preview" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Edit Blog Modal
// ============================================================
function EditBlogModal({
  blog,
  onSave,
  onClose,
}: {
  blog?: BlogPost;
  onSave: (data: BlogPost) => void;
  onClose: () => void;
}) {
  const isNew = !blog;
  const [form, setForm] = useState<BlogPost>(
    blog || {
      id: `blog-${Date.now()}`,
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      author: "iRA Synergy Engineering Team",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      readTime: "5 min read",
      category: "",
      relatedSolutionSlug: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    onSave({ ...form, slug });
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{isNew ? "Write New Article" : `Edit: ${blog!.title}`}</h2>
          <button className="admin-modal-close" onClick={onClose}><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit} className="admin-modal-body">
          <div className="admin-form-group">
            <label>Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="Enter article title..."
            />
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated from title"
              />
            </div>
            <div className="admin-form-group">
              <label>Category *</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                placeholder="e.g., Smart City, Waste Management"
              />
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Author name"
              />
            </div>
            <div className="admin-form-group">
              <label>Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                placeholder="e.g., 5 min read"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Cover Image URL</label>
            <input
              type="text"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />
            {form.coverImage && (
              <div className="admin-form-image-preview">
                <img src={form.coverImage} alt="Preview" />
              </div>
            )}
          </div>

          <div className="admin-form-group">
            <label>Excerpt *</label>
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
              placeholder="Brief summary of the article..."
            />
          </div>

          <div className="admin-form-group">
            <label>Content (HTML)</label>
            <textarea
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="<p>Your article content here...</p>"
              className="admin-textarea-mono"
            />
          </div>

          <div className="admin-form-group">
            <label>Related Solution Slug</label>
            <input
              type="text"
              value={form.relatedSolutionSlug}
              onChange={(e) => setForm({ ...form, relatedSolutionSlug: e.target.value })}
              placeholder="e.g., renewable-energy-solutions"
            />
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary">
              {isNew ? "Publish Article" : "Save Changes"}
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
          <h2>Delete Article</h2>
          <button className="admin-modal-close" onClick={onClose}><Icons.Close /></button>
        </div>
        <div className="admin-modal-body">
          <p style={{ marginBottom: "1.5rem", color: "#6B7280" }}>
            Are you sure you want to delete <strong style={{ color: "#111" }}>&quot;{itemName}&quot;</strong>? This action cannot be undone.
          </p>
          <div className="admin-modal-actions">
            <button className="admin-btn admin-btn--ghost" onClick={onClose}>Cancel</button>
            <button className="admin-btn admin-btn--danger" onClick={onConfirm}>Delete Article</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Blogs Page
// ============================================================
export default function AdminBlogsPage() {
  const { adminBlogs, addBlog, updateBlog, deleteBlog, isLoaded } = useAdmin();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewBlog, setViewBlog] = useState<BlogPost | null>(null);
  const [editBlog, setEditBlog] = useState<BlogPost | null | "new">(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const categories = useMemo(() => [...new Set(adminBlogs.map((b) => b.category))], [adminBlogs]);

  const filtered = useMemo(() => {
    return adminBlogs.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [adminBlogs, search, categoryFilter]);

  if (!isLoaded) {
    return <div className="admin-loading"><div className="admin-loading-spinner" /><p>Loading articles...</p></div>;
  }

  const handleSave = (blog: BlogPost) => {
    if (editBlog === "new") {
      addBlog(blog);
    } else {
      updateBlog(blog.id, blog);
    }
    setEditBlog(null);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteBlog(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <div className="admin-search-box">
            <Icons.Search />
            <input
              type="text"
              placeholder="Search articles..."
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
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="admin-page-header-right">
          <button className="admin-btn admin-btn--primary" onClick={() => setEditBlog("new")}>
            <Icons.Plus />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      <p className="admin-results-count">{filtered.length} article{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Blog Cards */}
      <div className="admin-blog-grid">
        {filtered.map((blog) => (
          <div key={blog.id} className="admin-blog-card">
            <div className="admin-blog-card-img">
              {blog.coverImage ? (
                <img src={blog.coverImage} alt={blog.title} />
              ) : (
                <div className="admin-blog-card-placeholder">No Cover</div>
              )}
              <span className="admin-blog-card-category">{blog.category}</span>
            </div>
            <div className="admin-blog-card-body">
              <h4 className="admin-blog-card-title">{blog.title}</h4>
              <p className="admin-blog-card-excerpt">{blog.excerpt}</p>
              <div className="admin-blog-card-meta">
                <span>{blog.author}</span>
                <span className="admin-blog-card-dot">·</span>
                <span>{blog.date}</span>
                <span className="admin-blog-card-dot">·</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
            <div className="admin-blog-card-actions">
              <button className="admin-icon-btn admin-icon-btn--view" title="View" onClick={() => setViewBlog(blog)}><Icons.Eye /></button>
              <button className="admin-icon-btn admin-icon-btn--edit" title="Edit" onClick={() => setEditBlog(blog)}><Icons.Edit /></button>
              <button className="admin-icon-btn admin-icon-btn--delete" title="Delete" onClick={() => setDeleteTarget(blog)}><Icons.Trash /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="admin-empty-state">
            <p>No articles found. Create your first article!</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {viewBlog && <BlogDetailModal blog={viewBlog} onClose={() => setViewBlog(null)} />}
      {editBlog && (
        <EditBlogModal
          blog={editBlog === "new" ? undefined : editBlog}
          onSave={handleSave}
          onClose={() => setEditBlog(null)}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          itemName={deleteTarget.title}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
