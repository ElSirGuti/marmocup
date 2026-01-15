"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type AdminUser = {
    id: string;
    full_name: string;
    username: string;
};

type AdminContextType = {
    admin: AdminUser | null;
    login: (user: AdminUser) => void;
    logout: () => void;
    loading: boolean;
};

const AdminContext = createContext<AdminContextType>({
    admin: null,
    login: () => { },
    logout: () => { },
    loading: true,
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [admin, setAdmin] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Simple persistence check
        const stored = localStorage.getItem('marmo_admin_user');
        if (stored) {
            setAdmin(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    const login = (user: AdminUser) => {
        setAdmin(user);
        localStorage.setItem('marmo_admin_user', JSON.stringify(user));
        router.push('/admin/dashboard');
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('marmo_admin_user');
        router.push('/admin');
    };

    // Protect Routes
    useEffect(() => {
        if (!loading && !admin && pathname.startsWith('/admin') && pathname !== '/admin') {
            router.push('/admin');
        }
    }, [admin, loading, pathname, router]);

    return (
        <AdminContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
