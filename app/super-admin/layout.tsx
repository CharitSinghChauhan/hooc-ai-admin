import { ReactNode } from "react";
import SuperAdminGuard from "./super-admin-guard";

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <SuperAdminGuard>{children}</SuperAdminGuard>
    </div>
  );
}
