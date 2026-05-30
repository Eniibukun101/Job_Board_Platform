# JobNest Frontend

A modern, responsive login page built with Next.js for the JobNest job search platform.

## Features

- 🎨 Clean, modern UI with custom branding
- 📱 Fully responsive design (mobile and desktop)
- 🔐 Secure login form with email and password fields
- 🔑 Google Sign-In integration ready
- 💾 Save password option
- 🎯 "Forgot Password" link
- ✨ Smooth loading states and error handling

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the login page.

## Project Structure

```
app/
├── components/
│   ├── LoginPage.tsx       # Main login page component
│   ├── LoginForm.tsx       # Login form component
│   └── WelcomeSection.tsx  # Welcome/branding section
├── auth/                   # Auth-related routes (placeholder)
├── globals.css            # Global styles with Tailwind CSS
├── layout.tsx             # Root layout
└── page.tsx               # Home page

public/                     # Static assets
```

## Customization

### Colors

Edit the theme in `tailwind.config.js`:
- Primary color: `#2D2639` (dark purple)
- Accent color: `#FF6B6B` (red)

### Styling

All styles are built with Tailwind CSS. Modify classes in component files or update `app/globals.css`.

### Logo

The logo is currently a simple SVG element with the letter "J". Replace with your actual logo by modifying the logo section in `app/components/WelcomeSection.tsx` and `app/components/LoginForm.tsx`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps

1. Connect to your authentication API by updating the `handleSubmit` function in `app/components/LoginPage.tsx`
2. Implement the Google Sign-In functionality in the `handleGoogleSignIn` function
3. Create the forgot password and sign-up pages in the `app/auth/` directory
4. Add your actual logo and branding assets

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

## License

All rights reserved - JobNest
