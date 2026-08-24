import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

export default function AdminProtectedRoute({ children }) {
    const adminToken = localStorage.getItem("admin-token");

    if (!adminToken) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <>
            <AdminNavbar />
            {children}
        </>
    );
}