"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminProvider } from "@/components/admin/AdminContext";
import "./admin.css";

// ============================================================
// Lucide-style inline SVG icons for the admin sidebar
// ============================================================
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
  ),
  Products: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
  ),
  Blogs: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
  ),
  Gallery: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
  ),
  ChevronLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
};

const navItems = [
  { label: "Dashboard", href: "/admin", icon: Icons.Dashboard },
  { label: "Products", href: "/admin/products", icon: Icons.Products },
  { label: "Articles", href: "/admin/blogs", icon: Icons.Blogs },
  { label: "Gallery", href: "/admin/gallery", icon: Icons.Gallery },
];

// ============================================================
// Sidebar Component
// ============================================================
function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="admin-sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`admin-sidebar ${open ? "admin-sidebar--open" : ""}`}>
        {/* Logo area */}
        <div className="admin-sidebar-logo">
          <div className="admin-sidebar-logo-icon">
            <span>iRA</span>
          </div>
          <div>
            <div className="admin-sidebar-logo-title">iRA Synergy</div>
            <div className="admin-sidebar-logo-subtitle">Admin Panel</div>
          </div>
          <button className="admin-sidebar-close-btn" onClick={onClose}>
            <Icons.Close />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          <div className="admin-sidebar-nav-label">Main Menu</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar-link ${isActive ? "admin-sidebar-link--active" : ""}`}
                onClick={onClose}
              >
                <item.icon />
                <span>{item.label}</span>
                {isActive && <div className="admin-sidebar-link-indicator" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="admin-sidebar-bottom">
          <Link href="/" className="admin-sidebar-link" target="_blank">
            <Icons.Home />
            <span>View Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

// ============================================================
// Admin Layout
// ============================================================
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Determine page title from pathname
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.includes("/products")) return "Products";
    if (pathname.includes("/blogs")) return "Articles & Blogs";
    if (pathname.includes("/gallery")) return "Image Gallery";
    return "Admin";
  };

  return (
    <AdminProvider>
      <div className="admin-layout">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="admin-main">
          {/* Top bar */}
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              <button
                className="admin-topbar-menu-btn"
                onClick={() => setSidebarOpen(true)}
              >
                <Icons.Menu />
              </button>
              <div>
                <h1 className="admin-topbar-title">{getPageTitle()}</h1>
                <p className="admin-topbar-breadcrumb">Admin / {getPageTitle()}</p>
              </div>
            </div>
            <div className="admin-topbar-right">
              <div className="admin-topbar-avatar">
                <span>DA</span>
              </div>
              <div className="admin-topbar-user">
                <span className="admin-topbar-user-name">Dinesh Anand</span>
                <span className="admin-topbar-user-role">Administrator</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="admin-content">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
