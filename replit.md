# Overview

This is a full-stack web application for an elegant saree catalog, built with React frontend and Express.js backend. The application features a modern e-commerce interface for browsing and searching traditional Indian sarees with categories, filters, and product details. It uses MongoDB for data storage and includes a comprehensive UI component library built with shadcn/ui and Radix UI primitives.

# Recent Changes (Oct 4, 2025)

## GitHub Import Setup for Replit - Complete (Oct 4, 2025)
- **Import Type**: Fresh GitHub clone configured for Replit environment
- **Node.js Setup**: Node.js 20 already installed and verified
- **Package Management**: 
  - All npm packages installed (580 packages)
  - Fixed cross-env binary resolution with `npm install`
- **MongoDB Configuration**:
  - MONGODB_URI secret verified and working
  - Database connection successful
  - Categories collection initialized (6 categories)
- **Workflow Configuration**:
  - "Start application" workflow set up to run `npm run dev`
  - Configured for port 5000 with webview output type
  - Express server and Vite dev server running successfully
- **Frontend Configuration**:
  - Vite already configured with `host: "0.0.0.0"` for Replit proxy
  - `allowedHosts: true` enabled for iframe compatibility
  - Frontend loads correctly at root and /home routes
- **Production Build Fix**:
  - Updated package.json start script to use `tsx` instead of compiled JS
  - Changed from `NODE_ENV=production node dist/index.js` to `cross-env NODE_ENV=production tsx server/index.ts`
  - This allows production deployment without TypeScript compilation of server code
- **Deployment Configuration**:
  - Autoscale deployment configured
  - Build command: `npm run build` (builds Vite frontend)
  - Start command: `npm run start` (runs Express server with tsx)
- **Application Status**: ✅ Fully operational - welcome page and home page both loading correctly

# Recent Changes (Oct 4, 2025)

## Added Comprehensive Logging for Debugging (Oct 4, 2025)
- **Purpose**: Debug why products aren't loading in Vercel deployment
- **Changes**: Added detailed console.log statements throughout serverless functions
  - MongoDB connection logging in `api/_lib/mongodb.ts`
  - Storage operations logging in `api/_lib/storage.ts`
  - Request/response logging in all API endpoints
- **What Gets Logged**:
  - Database connection status
  - Number of categories/products fetched
  - Query parameters received
  - Any errors with full stack traces
- **How to View Logs in Vercel**:
  1. Go to your Vercel deployment
  2. Click on "Functions" tab
  3. Select the function that was called (e.g., `/api/categories`)
  4. View real-time logs showing MongoDB connection and data retrieval
- **Log Format**: All logs prefixed with `[API /endpoint]`, `[Storage]`, or `[MongoDB]` for easy filtering

## Vercel ES Modules Import Fix (Oct 4, 2025)
- **Issue**: Collections and products not loading in Vercel deployment - 500 errors with "Cannot find module"
- **Root Cause**: TypeScript + ES Modules configuration issue
  - Project uses `"type": "module"` in package.json (ES modules)
  - Node.js ESM **requires** explicit `.js` extensions in imports, even in TypeScript files
  - This is a known TypeScript quirk: you must write `.js` in imports even though files are `.ts`
  - TypeScript doesn't rewrite import paths during compilation
- **Solution**: Ensured all imports in `/api` directory use `.js` extensions
  - TypeScript source: `import { getStorage } from '../_lib/storage.js'`
  - After compilation: imports correctly resolve to compiled `.js` files
  - Local development works because `tsx` handles this automatically
  - Vercel's Node.js runtime needs explicit extensions for ESM
- **Why This Matters**: 
  - ✅ Works: `import { getStorage } from '../_lib/storage.js'` (correct for ESM)
  - ❌ Fails: `import { getStorage } from '../_lib/storage'` (Node.js can't find module)
- **Status**: ✅ All ES module imports correctly configured with `.js` extensions

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