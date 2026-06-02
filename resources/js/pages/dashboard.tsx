import { Head } from '@inertiajs/react';
import ProductManager from '@/components/ProductManager';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8 bg-background dark:bg-[#191c1e] text-gray-900 dark:text-gray-200">
                <ProductManager />
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
