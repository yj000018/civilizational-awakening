/**
 * App — Civilizational Awakening
 * Routes: /, /inquiry, /pillars, /pillars/:slug, /projects, /projects/:slug, /concepts/:slug, /essays, /essays/:slug, /thinkers, /thinkers/:slug, /map, /connect
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import Inquiry from "./pages/Inquiry";
import Pillars from "./pages/Pillars";
import PillarDetail from "./pages/PillarDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ConceptDetail from "./pages/ConceptDetail";
import Thinkers from "./pages/Thinkers";
import ThinkerDetail from "./pages/ThinkerDetail";
import Essays from "./pages/Essays";
import EssayDetail from "./pages/EssayDetail";
import MapPage from "./pages/Map";
import Connect from "./pages/Connect";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/inquiry" component={Inquiry} />
      <Route path="/pillars" component={Pillars} />
      <Route path="/pillars/:slug" component={PillarDetail} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:slug" component={ProjectDetail} />
      <Route path="/concepts/:slug" component={ConceptDetail} />
      <Route path="/thinkers" component={Thinkers} />
      <Route path="/thinkers/:slug" component={ThinkerDetail} />
      <Route path="/essays" component={Essays} />
      <Route path="/essays/:slug" component={EssayDetail} />
      <Route path="/map" component={MapPage} />
      <Route path="/connect" component={Connect} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
