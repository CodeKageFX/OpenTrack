import { type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type Props = {
    children: ReactNode;
};


const ProjectPageLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-12 mx-auto w-fit">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default ProjectPageLayout