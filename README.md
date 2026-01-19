# JoGigs - Jordan's Neighborhood Service Marketplace

A modern, full-featured Vue.js 3 marketplace application connecting Jordanian customers with local service professionals. Built with Vue 3, Vue Router, and Tailwind CSS.

![JoGigs](https://img.shields.io/badge/Vue.js-3.4-4FC08D?style=flat-square&logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Vue Router](https://img.shields.io/badge/Vue%20Router-4.2-4FC08D?style=flat-square)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Routes](#available-routes)
- [Components](#components)
- [Development](#development)
- [Customization](#customization)
- [Deployment](#deployment)

## ✨ Features

### For Customers
- 🔍 **Service Discovery** - Browse popular service categories
- 📍 **Location-Based Search** - Find professionals by location in Jordan
- ⭐ **Professional Ratings** - View top-rated service providers
- 🔐 **User Authentication** - Secure login and registration
- 🔑 **Password Recovery** - Forgot password functionality
- 🌙 **Dark Mode Support** - Built-in dark mode

### For Professionals
- 📝 **Service Listing** - Create and manage service offerings
- 💰 **Flexible Pricing** - Fixed, hourly, or per-project pricing
- 📍 **Area Coverage** - Select service areas across Jordan
- ⚡ **Availability Settings** - Set immediate or emergency availability
- 🎯 **Category Selection** - Choose from 6 service categories
- 🏷️ **Skills & Tags** - Highlight key services and expertise

### User Interface
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI/UX** - Clean, professional design
- 🚀 **Fast Performance** - Optimized with Vite
- ♿ **Accessible** - WCAG compliant components
- 🌐 **RTL Support Ready** - Prepared for Arabic localization

## 🛠 Tech Stack

- **Framework:** Vue.js 3.4 (Composition API ready)
- **Routing:** Vue Router 4.2
- **Styling:** Tailwind CSS 3.4
- **Build Tool:** Vite 5.0
- **Icons:** Material Symbols Outlined
- **Fonts:** Plus Jakarta Sans, Outfit, Caveat
- **Forms:** @tailwindcss/forms plugin

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ or npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jogigs-app
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

3. **Start development server**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Using npm
npm run build

# Using yarn
yarn build
```

### Preview Production Build

```bash
# Using npm
npm run preview

# Using yarn
yarn preview
```

## 📁 Project Structure

```
jogigs-app/
├── src/
│   ├── components/
│   │   ├── Header.vue          # Navigation header
│   │   ├── Footer.vue          # Footer with links
│   │   ├── HeroSection.vue     # Hero search section
│   │   ├── PopularServices.vue # Service categories grid
│   │   ├── TopRatedNeighbors.vue # Professional profiles
│   │   └── JoinSection.vue     # Call-to-action for professionals
│   ├── App.vue                 # Main app component
│   ├── main.js                 # Entry point
│   └── style.css               # Global styles with Tailwind
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies
└── README.md
```

## Features

- **Service Discovery**: Browse popular service categories
- **Professional Listings**: View verified local professionals with ratings
- **Search Functionality**: Search by service and location
- **Dark Mode Support**: Built-in dark mode support
- **Responsive Design**: Mobile-first responsive layout
- **Professional Cards**: Detailed cards with ratings, reviews, and pricing

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Material Symbols** - Icon library

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

The project uses Vite for fast HMR (Hot Module Replacement) during development. Open your browser to `http://localhost:5173` after running `npm run dev`.

## Components

### Header
Navigation bar with logo, menu links, and auth buttons.

### HeroSection
Main hero section with search functionality for services and locations.

### PopularServices
Grid of popular service categories with icons and counts.

### TopRatedNeighbors
Carousel-style display of top-rated professionals with detailed profiles.

### JoinSection
Call-to-action section encouraging professionals to join the platform.

### Footer
Footer with company info, links, and social media.

## Customization

All color values are configured in `tailwind.config.js`:
- Primary: `#2cb67d`
- Primary Dark: `#249c6b`
- Accent: `#f9bc60`
- Background Dark: `#161b1d`

## License

MIT
