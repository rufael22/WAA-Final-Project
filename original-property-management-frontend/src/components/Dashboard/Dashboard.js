import React from 'react';
import './Dashboard.scss';
import useRole from 'hooks/useRole';
import DashboardAdmin from 'components/Dashboard/DashboardAdmin';
import DashboardOwner from 'components/Dashboard/DashboardOwner';

const Dashboard = () => {
    const role = useRole();

    return (
        <div className="dashboard">
            {role.isAdmin && <DashboardAdmin />}
            {role.isOwner && <DashboardOwner />}
        </div>
    );
};

export default Dashboard;