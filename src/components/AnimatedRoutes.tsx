import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import Breeds from "@/pages/Breeds";
import CareHub from "@/pages/CareHub";
import Care from "@/pages/Care";
import Health from "@/pages/Health";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={<Index />} />
        <Route path="/breeds" element={<Breeds />} />
        <Route path="/care-hub" element={<CareHub />} />
        <Route path="/care" element={<Care />} />
        <Route path="/health" element={<Health />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
