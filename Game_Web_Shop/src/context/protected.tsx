import React, { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

// definierar typ för komponentens props
interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: ('user')[];
}

// skyddad route komponent som bara tillåter åtkomst för autentiserade användare
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, allowedRoles}) => {
  // hämtar isAuthenticated från Redux store för att se om användaren är inloggad
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Om användaren är autentiserad, renderas barnkomponenterna (children)
  // Annars, omdirigeras användaren till login sidan
  if (!isAuthenticated || !user || !allowedRoles.includes('user')) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;