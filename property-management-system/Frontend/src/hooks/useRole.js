import { useState, useEffect } from 'react';
import { isRole } from 'Utils';

const useRole = () => {
    const [role, setRole] = useState({
        isAdmin: false,
        isCustomer: false,
        isOwner: false,
        isViewer: false
    });

    useEffect(() => {
        const checkedRole = {
            isAdmin: isRole('ADMIN'),
            isCustomer: isRole('CUSTOMER'),
            isOwner: isRole('OWNER'),
            isViewer: isRole('VIEWER')
        };

        setRole(prev => ({...prev, ...checkedRole}));
    }, []);

    return role;
}

export default useRole;