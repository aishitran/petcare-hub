import React, { createContext, useContext, useState } from 'react';
import { UserProfile, UserRole } from '../types/user';
import { mockUsers } from '../data/mockUsers';

interface AuthContextType {
  role: UserRole;
  currentUser: UserProfile | null;
  switchRole: (newRole: UserRole, targetUserId?: string) => void;
  updateCurrentUser: (updated: Partial<UserProfile>) => void;
  toggleSavePet: (petId: string) => void;
  isSavedPet: (petId: string) => boolean;
  loginAs: (userEmail: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default demo state: logged in as Minh (USER)
  const [role, setRole] = useState<UserRole>('USER');
  const [currentUserId, setCurrentUserId] = useState<string>('user-1');
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);

  const currentUser = role === 'GUEST' ? null : (users.find(u => u.id === currentUserId) || users[0]);

  const switchRole = (newRole: UserRole, targetUserId?: string) => {
    setRole(newRole);
    if (newRole === 'GUEST') {
      // Guest mode
    } else if (newRole === 'ADMIN') {
      setCurrentUserId('admin-1');
    } else if (targetUserId) {
      setCurrentUserId(targetUserId);
    } else if (currentUserId === 'admin-1' || !currentUserId) {
      setCurrentUserId('user-1');
    }
  };

  const updateCurrentUser = (updated: Partial<UserProfile>) => {
    if (!currentUser) return;
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updated } : u));
  };

  const toggleSavePet = (petId: string) => {
    if (!currentUser) return;
    const isSaved = currentUser.savedPetIds.includes(petId);
    const updatedList = isSaved 
      ? currentUser.savedPetIds.filter(id => id !== petId)
      : [...currentUser.savedPetIds, petId];
    
    updateCurrentUser({ savedPetIds: updatedList });
  };

  const isSavedPet = (petId: string): boolean => {
    if (!currentUser) return false;
    return currentUser.savedPetIds.includes(petId);
  };

  const loginAs = (userEmail: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
    if (found) {
      setRole(found.role);
      setCurrentUserId(found.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setRole('GUEST');
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        currentUser,
        switchRole,
        updateCurrentUser,
        toggleSavePet,
        isSavedPet,
        loginAs,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
