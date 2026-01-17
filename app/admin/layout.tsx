import React, { ReactNode } from "react";
import AdminGuard from "../admin/admin-guard";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AdminGuard>{children}</AdminGuard>
    </div>
  );
};

export default AdminLayout;
