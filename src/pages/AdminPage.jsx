import React, { useState, useEffect } from 'react';
import { AdminGuard } from '../components/admin/AdminGuard';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminOverview } from '../components/admin/AdminOverview';
import { ChallengeTable } from '../components/admin/ChallengeTable';
import { TeamTable } from '../components/admin/TeamTable';
import { LiveActivity } from '../components/admin/LiveActivity';
import { AdminModeration } from '../components/admin/AdminModeration';

export const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview | challenges | teams | activity | moderation
  const [selectedSectorFilter, setSelectedSectorFilter] = useState('ALL');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('CEC_ADMIN_AUTH');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('CEC_ADMIN_AUTH');
    setIsAuthenticated(false);
  };

  const handleNavigateToTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSectorFilter = (sectorName) => {
    setSelectedSectorFilter(sectorName);
  };

  if (!isAuthenticated) {
    return <AdminGuard onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminLayout
      activeTab={activeTab}
      onSelectTab={handleNavigateToTab}
      onLogout={handleLogout}
    >
      {activeTab === 'overview' && (
        <AdminOverview
          onNavigateToTab={handleNavigateToTab}
          onSelectSectorFilter={handleSelectSectorFilter}
        />
      )}

      {activeTab === 'challenges' && (
        <ChallengeTable
          initialSectorFilter={selectedSectorFilter}
        />
      )}

      {activeTab === 'teams' && (
        <TeamTable />
      )}

      {activeTab === 'activity' && (
        <LiveActivity
          compact={false}
        />
      )}

      {activeTab === 'moderation' && (
        <AdminModeration />
      )}
    </AdminLayout>
  );
};

export default AdminPage;
