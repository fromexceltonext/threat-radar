import { TopNav } from "@/components/layout/TopNav";
import type {  ReactNode } from "react";


const AppLayout = ({ children }: { children: ReactNode }) => {

     return (
        <>
          <TopNav />

          <main className="mx-auto w-full max-w-6xl p-6 md:p-10">
            {children}
          </main>
         
        </>
     )    
};

export default AppLayout;