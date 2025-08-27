# DigiLet - Your Digital Wallet

DigiLet is a modern digital wallet application built for secure financial transactions. This application provides role-based access for users, agents, and administrators to manage digital finances efficiently.

## Public Pages

The application includes the following public pages accessible without authentication:

- **Home** - Landing page with hero section and service overview
- **About** - Company information and mission details
- **Features** - List of available wallet features and services
- **Pricing** - Service fees and subscription information
- **Contact** - Contact form and company details
- **FAQ** - Frequently asked questions and answers

## Features

### For Users

- Wallet balance management and transaction history
- Send money to other users
- Add money through authorized agents
- Cash withdrawal services
- Transaction filtering and search
- Profile management

### For Agents

- Cash-in and cash-out services for users
- Commission tracking and earnings monitoring
- Transaction history management
- Customer service tools

### For Admins

- User management (view, block, unblock)
- Agent approval and suspension management
- System-wide analytics and reporting
- Transaction monitoring with advanced filters
- System configuration and fee management

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + RTK Query
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme Management**: Next Themes
- **Tour Guide**: Driver.js

## Backend Repository

The backend API for this application is available at: [https://github.com/anowarzz/digilet-backend](https://github.com/anowarzz/digilet-backend)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/anowarzz/digilet-frontend.git
cd digilet-frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_backend_api_url_here
```

4. Start the development server:

```bash
pnpm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm run build
```

## Live Demo

Live URL: [https://digilet.vercel.app/](https://digilet.vercel.app/)
