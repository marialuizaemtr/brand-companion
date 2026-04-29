import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Servicos from "./pages/Servicos";
import Parcerias from "./pages/Parcerias";
import Cursos from "./pages/Cursos";
import RegistrarMarca from "./pages/RegistrarMarca";
import Guia from "./pages/Guia";
import Privacidade from "./pages/Privacidade";
import NCLPage from "./pages/NCL";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostEditor from "./pages/admin/PostEditor";
import WhatsAppDashboard from "./pages/admin/WhatsAppDashboard";
import Debug from "./pages/Debug";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/parcerias" element={<Parcerias />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/registrar-marca" element={<RegistrarMarca />} />
          <Route path="/guia" element={<Guia />} />
          <Route path="/ncl" element={<NCLPage />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/categoria/:cat" element={<BlogCategory />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/posts/new" element={<PostEditor />} />
          <Route path="/admin/posts/:slug/edit" element={<PostEditor />} />
          <Route path="/admin/whatsapp" element={<WhatsAppDashboard />} />
          <Route path="/debug" element={<Debug />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
