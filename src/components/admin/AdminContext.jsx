import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <AdminContext.Provider value={{ isEditMode, setIsEditMode }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    return { isEditMode: false, setIsEditMode: () => {} };
  }
  return context;
}