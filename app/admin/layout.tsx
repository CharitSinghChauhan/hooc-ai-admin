import { ReactNode } from "react";
import AdminGuard from "./admin-guard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AdminGuard>{children}</AdminGuard>
    </div>
  );
}
