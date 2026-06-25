"use client";

import React from "react";
import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminContext";

// ============================================================
// Inline SVG Icons
// ============================================================
const StatIcons = {
  Products: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
  ),
  Blogs: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
  ),
  Gallery: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
  Categories: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
};

export default function AdminDashboard() {
  const { adminProducts, adminBlogs, galleryImages, isLoaded } = useAdmin();

  if (!isLoaded) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Category counts
  const categories = [...new Set(adminProducts.map((p) => p.category))];
  const inStockCount = adminProducts.filter((p) => p.inStock).length;

  const stats = [
    {
      label: "Total Products",
      value: adminProducts.length,
      icon: StatIcons.Products,
      color: "#0F5C24",
      bgColor: "rgba(15, 92, 36, 0.1)",
      href: "/admin/products",
    },
    {
      label: "Articles & Blogs",
      value: adminBlogs.length,
      icon: StatIcons.Blogs,
      color: "#D4941A",
      bgColor: "rgba(212, 148, 26, 0.1)",
      href: "/admin/blogs",
    },
    {
      label: "Gallery Images",
      value: galleryImages.length,
      icon: StatIcons.Gallery,
      color: "#4A90A4",
      bgColor: "rgba(74, 144, 164, 0.1)",
      href: "/admin/gallery",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: StatIcons.Categories,
      color: "#5E35B1",
      bgColor: "rgba(94, 53, 177, 0.1)",
      href: "/admin/products",
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Welcome Banner */}
      <div className="admin-welcome-banner">
        <div className="admin-welcome-content">
          <h2>Welcome back, Admin 👋</h2>
          <p>Here&apos;s what&apos;s happening with your iRA Synergy content today.</p>
        </div>
        <div className="admin-welcome-decoration">
          <div className="admin-welcome-circle admin-welcome-circle--1" />
          <div className="admin-welcome-circle admin-welcome-circle--2" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="admin-stat-card">
            <div className="admin-stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
              <stat.icon />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{stat.value}</span>
              <span className="admin-stat-label">{stat.label}</span>
            </div>
            <div className="admin-stat-arrow" style={{ color: stat.color }}>
              <StatIcons.Arrow />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions + Recent Items */}
      <div className="admin-dashboard-grid">
        {/* Quick Actions */}
        <div className="admin-card">
          <h3 className="admin-card-title">Quick Actions</h3>
          <div className="admin-quick-actions">
            <Link href="/admin/products" className="admin-quick-action-btn admin-quick-action-btn--green">
              <StatIcons.Products />
              <span>Manage Products</span>
            </Link>
            <Link href="/admin/blogs" className="admin-quick-action-btn admin-quick-action-btn--amber">
              <StatIcons.Blogs />
              <span>Write Article</span>
            </Link>
            <Link href="/admin/gallery" className="admin-quick-action-btn admin-quick-action-btn--blue">
              <StatIcons.Gallery />
              <span>Upload Images</span>
            </Link>
          </div>
        </div>

        {/* Product Overview */}
        <div className="admin-card">
          <h3 className="admin-card-title">Product Overview</h3>
          <div className="admin-overview-stats">
            <div className="admin-overview-stat">
              <span className="admin-overview-stat-value">{inStockCount}</span>
              <span className="admin-overview-stat-label">In Stock</span>
            </div>
            <div className="admin-overview-stat">
              <span className="admin-overview-stat-value">{adminProducts.length - inStockCount}</span>
              <span className="admin-overview-stat-label">Out of Stock</span>
            </div>
            <div className="admin-overview-stat">
              <span className="admin-overview-stat-value">{categories.length}</span>
              <span className="admin-overview-stat-label">Categories</span>
            </div>
          </div>
          <div className="admin-category-tags">
            {categories.map((cat) => (
              <span key={cat} className="admin-category-tag">{cat}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Products</h3>
          <Link href="/admin/products" className="admin-card-link">View All →</Link>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Badge</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {adminProducts.slice(0, 5).map((product) => (
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
                        <div className="admin-table-product-id">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="admin-badge admin-badge--category">{product.category}</span></td>
                  <td><span className="admin-badge admin-badge--info">{product.badge || "—"}</span></td>
                  <td>
                    <span className={`admin-badge ${product.inStock ? "admin-badge--success" : "admin-badge--danger"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
