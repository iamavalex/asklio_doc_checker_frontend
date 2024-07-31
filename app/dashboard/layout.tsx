import React from 'react';
import Menu from '@/app/components/Menu';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full flex justify-center mt-8">
                <Menu />
            </div>
            <main className="flex-grow p-2">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
