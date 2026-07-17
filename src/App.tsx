import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ParticleCursor from "@/components/ParticleCursor";
import Index from "./pages/Index.tsx";
import Projects from "./pages/Projects.tsx";
import InquiryFormDemo from "./pages/InquiryFormDemo.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <TooltipProvider>
    <ParticleCursor />
    <Toaster />
    <BrowserRouter basename="/portfolio">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/inquiry" element={<InquiryFormDemo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
