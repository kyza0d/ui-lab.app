// src/shared/components/icon-registry.ts
import {
  Settings,
  XCircle,
  LayoutGrid,
  Compass,
  MessageCircle,
  Search,
  Book,
  FlaskRound,
  Package,
  Zap,
  Component,
  PlaySquare, // For action
  Edit3,      // For input
  Info,       // For information
  MessageSquare, // For feedback
  Box,        // For container
  Monitor     // For display
} from 'lucide-react';
import { FaFlask, FaCircleXmark } from 'react-icons/fa6';

export const Icons = {
  Settings,
  Flask: FaFlask,
  FlaskLucide: FlaskRound,
  FallbackLucide: XCircle,
  FallbackFa: FaCircleXmark || FaFlask,
  LayoutGrid,
  Compass,
  MessageCircle,
  Search,
  Book,
  Package,
  Zap,
  Component,
  PlaySquare,
  Edit3,
  Info,
  MessageSquare,
  Box,
  Monitor,
};

export const CategoryIcons: Record<string, React.ComponentType<any>> = {
  layout: Icons.LayoutGrid,
  composition: Icons.Component,
  action: Icons.PlaySquare,
  input: Icons.Edit3,
  information: Icons.Info,
  feedback: Icons.MessageSquare,
  navigation: Icons.Compass,
  container: Icons.Box,
  display: Icons.Monitor,
  // Add a default or fallback for categories not explicitly mapped
  default: Icons.Settings,
};
