# Overview

This is a full-stack web application for an elegant saree catalog, built with React frontend and Express.js backend. The application features a modern e-commerce interface for browsing and searching traditional Indian sarees with categories, filters, and product details. It uses MongoDB for data storage and includes a comprehensive UI component library built with shadcn/ui and Radix UI primitives.

# Recent Changes (Oct 4, 2025)

## Replit Environment Setup - Completed
- **MongoDB Connection**: Successfully connected using MONGODB_URI from Replit Secrets
- **Workflow Configuration**: "Start application" workflow running on port 5000 with webview output
- **Application Status**: ✅ Frontend and backend fully operational
- **Database**: MongoDB connected, categories initialized (6 categories)
- **Deployment**: Autoscale deployment configured for production

# Previous Changes (Oct 3, 2025)

## UI/UX Improvements - Completed
- **Welcome Page Redesign**: 
  - Removed decorative lines above and below "ATAURUM" title
  - Repositioned layout: title and slogan at top, social icons and button at bottom
  - Added Instagram, Facebook, and YouTube social media icons above "Explore Our Catalog" button
  - Created spacious, balanced layout with flexbox vertical positioning
- **Product Detail Page Updates**:
  - Removed wishlist icon from product header
  - Implemented functional share button using Web Share API (copies link to clipboard as fallback)
  - Implemented functional WhatsApp share button to share product links
  - Made price color darker (changed to #8B4513 for better visibility)
  - Enlarged "Available Colors" section (24x28 images, increased spacing and font size)
  - Moved color labels below images instead of overlaying on images for cleaner appearance

## GitHub Import Setup for Replit - Completed
- **MongoDB Connection**: Successfully connected to MongoDB using MONGODB_URI from Replit Secrets
- **Workflow Configuration**: Configured "Start application" workflow to run `npm run dev` on port 5000 with webview output type
- **Vite Configuration**: Added `host: "0.0.0.0"` and `allowedHosts: true` to vite.config.ts for Replit proxy compatibility
- **Dependencies**: All npm packages installed and verified working (494 packages)
- **Database Initialization**: Categories collection initialized with 6 saree categories
- **Deployment Configuration**: Configured autoscale deployment with build and start commands
- **Status**: ✅ Application fully operational on port 5000, MongoDB connected, frontend and backend running successfully

## Configuration Details
- Development command: `npm run dev` (uses cross-env and tsx)
- Server binding: 0.0.0.0:5000 (required for Replit environment)
- Vite config: `allowedHosts: true` enabled for proxy compatibility
- Production build: `npm run build` (builds frontend with Vite + backend with esbuild)
- Production start: `npm run start` (runs Node.js on built files)

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for welcome, home, and 404
- **UI Components**: shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens and color schemes
- **State Management**: TanStack Query for server state management and caching
- **Component Structure**: Modular components including carousel, product grid, search bar, category navigation, and product modal

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with routes for categories and products
- **Development Setup**: Hot reload with Vite integration in development mode
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request/response logging for API endpoints

## Data Storage
- **Database**: MongoDB with native MongoDB driver
- **Schema Design**: Collections for categories and products with embedded documents
- **Data Validation**: Zod schemas for runtime type checking and validation
- **Storage Interface**: Abstract storage interface pattern for potential database switching

## Authentication & Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Security**: CORS handling and request parsing middleware

## External Dependencies
- **Database**: MongoDB for primary data storage
- **Session Store**: PostgreSQL for session management
- **CDN**: Unsplash for product and banner images
- **Fonts**: Google Fonts (Inter, Playfair Display) for typography
- **Icons**: Lucide React icon library
- **Development Tools**: Replit-specific plugins for development environment integration

# External Dependencies

## Core Technologies
- **React 18** - Frontend framework with hooks and functional components
- **Express.js** - Backend web framework for Node.js
- **TypeScript** - Type safety across frontend and backend
- **MongoDB** - NoSQL database with native driver (@mongodb/client)
- **Vite** - Build tool and development server

## UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Headless UI primitives for accessibility
- **Lucide React** - Icon library
- **class-variance-authority** - Utility for managing CSS class variants

## Data & State Management
- **TanStack Query** - Server state management and caching
- **Zod** - Schema validation library
- **React Hook Form** - Form state management with @hookform/resolvers

## Database & Sessions
- **connect-pg-simple** - PostgreSQL session store for Express
- **Drizzle ORM** - SQL toolkit (configured but using MongoDB instead)

## Development & Build
- **ESBuild** - JavaScript bundler for production builds
- **TSX** - TypeScript execution engine for development
- **PostCSS** - CSS processing with autoprefixer

## External Services
- **Unsplash** - Image CDN for product photos and banners
- **Google Fonts** - Web fonts (Inter, Playfair Display)
- **Replit** - Development environment with specialized plugins