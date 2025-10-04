# Overview

This is a full-stack web application for an elegant saree catalog, built with React frontend and Express.js backend. The application features a modern e-commerce interface for browsing and searching traditional Indian sarees with categories, filters, and product details. It uses MongoDB for data storage and includes a comprehensive UI component library built with shadcn/ui and Radix UI primitives.

# Recent Changes (Oct 4, 2025)

## Vercel Serverless Functions Import Fix (Oct 4, 2025)
- **Issue**: Collections and products not loading in Vercel deployment (showing "No products found")
- **Root Cause**: Serverless API functions were using `.js` extensions in import statements
  - Example: `import { getStorage } from '../_lib/storage.js'`
  - This works locally with `tsx` runtime but fails in Vercel's TypeScript compilation
  - Vercel expects TypeScript imports without extensions
- **Solution**: Removed all `.js` extensions from import statements in `/api` directory
  - Fixed imports in all API endpoints (categories, products, collections, search)
  - Fixed imports in `api/_lib/storage.ts` and all route handlers
  - Changed from `'../storage.js'` to `'../storage'`
- **Files Updated**:
  - `api/_lib/storage.ts` - Core storage module imports
  - `api/categories/index.ts`, `api/categories/[slug].ts`
  - `api/products/index.ts`, `api/products/[id].ts`, `api/products/category/[category].ts`
  - `api/collections/[collectionType].ts`
  - `api/search.ts`
- **Status**: ✅ All imports fixed, Vercel deployment should now load products correctly

## Vercel Deployment TypeScript Fix (Oct 4, 2025)
- **Issue**: Vercel build failing with TypeScript error: `Module '"zod"' has no exported member 'z'`
- **Root Cause**: `api/tsconfig.json` was using `moduleResolution: "node16"` which had compatibility issues with Vercel's build process
- **Solution**: Updated `api/tsconfig.json`:
  - Changed `moduleResolution` from "node16" to "node" for better Vercel compatibility
  - Set `noEmit` to `true` (Vercel handles TypeScript compilation internally)
  - Fixed paths configuration to use `@shared/*` for cleaner imports
- **Status**: ✅ TypeScript configuration now compatible with Vercel deployment

## Fresh GitHub Import - Replit Environment Setup (Oct 4, 2025)
- **Import Source**: GitHub repository clone
- **Environment Setup**: Configured for Replit environment
  - Node.js 20 already installed
  - All npm packages verified (494 packages)
  - cross-env dependency working correctly
- **Workflow Configuration**: 
  - "Start application" workflow configured to run `npm run dev`
  - Bound to port 5000 with webview output type
  - Express server and Vite dev server running successfully
- **MongoDB Connection**: 
  - MONGODB_URI secret configured and verified
  - Successfully connected to MongoDB
  - Categories collection initialized (6 categories)
- **Vite Configuration**: 
  - Already configured with `host: "0.0.0.0"` for Replit proxy
  - `allowedHosts: true` enabled for iframe compatibility
- **Deployment Configuration**: 
  - Autoscale deployment configured
  - Build command: `npm run build`
  - Start command: `npm run start`
- **Application Status**: ✅ Frontend and backend fully operational, welcome page loads correctly

## Vercel Serverless Architecture Refactoring - Completed
- **Major Architectural Change**: Refactored from monolithic Express.js app to Vercel serverless functions
- **API Structure**: Created `/api` directory with serverless function endpoints:
  - `/api/categories` - Get all categories
  - `/api/categories/[slug]` - Get category by slug
  - `/api/products` - Search/filter products
  - `/api/products/[id]` - Get product by ID
  - `/api/products/category/[category]` - Get products by category
  - `/api/collections/[collectionType]` - Get products by collection type
  - `/api/search` - Search products by query
- **MongoDB Connection Pooling**: Implemented proper connection pooling for serverless using globalThis caching
  - Handles cold starts efficiently
  - Reuses connections across warm lambda invocations
  - Configured with optimal pool settings (maxPoolSize: 10, minPoolSize: 2)
- **Vercel Configuration**: Created `vercel.json` with proper routing, rewrites, and build settings
- **TypeScript Setup**: Created dedicated `api/tsconfig.json` for serverless functions with proper path resolution
- **Build Scripts**: Updated `package.json` with Vercel-compatible build commands
- **Deployment Files**: Created `.vercelignore` and `.env.example` for deployment
- **Status**: ✅ Serverless architecture verified by architect, ready for Vercel deployment

## Responsive Design & Navigation Improvements - Completed
- **Desktop Compatibility**: Fixed product cards being too large on desktop screens
- **Responsive Grid System**: Product grids now adapt to screen size:
  - Mobile (default): 2 columns
  - Small screens (sm): 3 columns
  - Medium screens (md): 3 columns
  - Large screens (lg): 4 columns
  - Extra large screens (xl): 5 columns
- **Applied to**: Category pages, product detail similar products section
- **Logo Navigation**: ATAURUM logo now clickable - navigates to /home and scrolls to top
- **Mobile View**: Kept unchanged as requested

## Category Images Fix - Completed
- **Issue**: Category navigation images were not loading due to filename mismatch
- **Root Cause**: Database had paths like `/images/1.svg` but files were named with full names and spaces (e.g., "Banarasi Silk.svg")
- **Solution**: 
  1. Renamed image files to remove spaces: `Banarasi-Silk.svg`, `New-Trends.svg`, `Pure-Cotton.svg`, `Printed-Silk.svg`
  2. Updated MongoDB database with correct image paths matching the renamed files
- **Images Fixed**: All 6 category images now properly mapped and accessible
- **Note**: Users may need to do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R) to clear browser cache

## Hamburger Menu Improvements - Completed
- **Direction**: Menu now slides in from the right instead of left
- **Background**: Removed background image, replaced with clean solid background
- **Navigation**: Category buttons now navigate to `/category/{slug}` without page refresh using wouter
- **Responsive Design**: Menu scales properly on all screen sizes (w-full on mobile, sm:w-80 md:w-96 on larger screens)
- **Smooth Transitions**: Added backdrop overlay with smooth animations (300ms duration)
- **Fixed Navigation**: Categories link directly to category pages (e.g., /category/satin) with smooth client-side routing

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
- **Development**: Express.js with TypeScript (for local development on Replit)
- **Production**: Vercel serverless functions (individual API routes in `/api` directory)
- **API Design**: RESTful API with routes for categories, products, search, and collections
- **Development Setup**: Hot reload with Vite integration in development mode
- **Serverless Features**: 
  - Connection pooling with globalThis caching for MongoDB
  - Individual function endpoints for optimal cold start performance
  - TypeScript support with dedicated tsconfig for API functions
- **Error Handling**: Centralized error handling in both Express and serverless functions
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