# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting

## Code Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for client state
- **Data Fetching**: TanStack Query (React Query) with server-side prefetching
- **Database**: Supabase for data persistence and authentication
- **Authentication**: Kakao OAuth via Supabase Auth
- **External APIs**: Korean government open data APIs for animal shelter information

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
  - `_components/` - Shared UI components
  - `_lib/` - Utilities, hooks, providers, and stores
  - `_types/` - TypeScript type definitions
  - `api/` - API route handlers
  - `@pawDialog/` - Parallel route for modal dialogs
  - `paws/[id]/` - Dynamic routes for animal detail pages

- `src/lib/` - Core utilities and external service integrations
  - `supabase/` - Supabase client configurations

### Key Patterns

#### Modal with Page Fallback
The app uses Next.js intercepting routes pattern with `@pawDialog/(.)paws/[id]` to show animal details in a modal when navigating from the main page, but as a full page when accessing the URL directly.

#### State Management
- **Zustand stores**: Located in `src/app/_lib/stores/index.ts`
  - `usePawStore` - Currently selected animal
  - `useFullCityStore` - Cached city/district data
  - `usePawQueryStore` - Search results and pagination state

#### Data Fetching
- **TanStack Query hooks**: Located in `src/app/_lib/hooks/react-query/`
- Server-side prefetching implemented for initial data loading
- Infinite scroll pagination for animal listings

#### Image Proxy
Due to HTTPS/HTTP mixed content issues with government API images, a Next.js API route (`/api/image-proxy`) proxies images from the external API.

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon public key
- `NEXT_KAKAO_APP_KEY` - Kakao Maps API key
- `SERVICE_KEY` - Korean government open data service key

### API Integration

The app integrates with Korean government APIs:
- Animal shelter data from 농림축산식품부 (Ministry of Agriculture, Food and Rural Affairs)
- Administrative region data (시도/시군구)
- All external API calls are proxied through Next.js API routes to protect service keys

### Important Notes

- All Korean animal shelter data is fetched from government APIs and stored in Supabase
- The app uses Korean locale and Korean government administrative divisions
- Image loading requires proxy due to HTTP/HTTPS mixed content restrictions
- Authentication is handled via Supabase Auth with Kakao OAuth provider