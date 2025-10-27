'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainNavigation() {
  const pathname = usePathname();

  const tabs = [
    { id: '/', label: 'Dashboard', path: '/' },
    { id: '/personas', label: 'Personas', path: '/personas' },
    // { id: '/channels', label: 'All Channels', path: '/channels' }
  ];

  return (
    <div className="nav-tabs">
      {tabs.map(tab => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.id}
            href={tab.path}
            className={`nav-tab ${isActive ? 'active' : ''}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
