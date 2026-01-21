import { ReactNode } from "react";

const SignUpLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen w-screen">{children}</div>;
};

export default SignUpLayout;
