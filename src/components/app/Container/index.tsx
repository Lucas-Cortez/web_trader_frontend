import { ReactNode } from "react";

type ContainerProps = { children: ReactNode };

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-7xl mx-auto px-8 flex flex-col gap-6">{children}</div>;
};
