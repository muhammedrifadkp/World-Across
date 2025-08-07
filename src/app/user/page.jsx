'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import UserDashboard from '@/components/home/UserDashboard';
import ClientOnly from '@/components/ClientOnly';

const UserPage = () => {
  const { user } = useAuth();

  return (
    <ClientOnly>
      <ProtectedRoute>
        <UserDashboard user={user} />
      </ProtectedRoute>
    </ClientOnly>
  );
};

export default UserPage;