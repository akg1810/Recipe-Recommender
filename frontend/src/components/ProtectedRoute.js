import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const location = useLocation();

    if (!localStorage.getItem('token')) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <Component />;
};

export default ProtectedRoute;