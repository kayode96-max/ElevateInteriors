# Elevate Interior

`Elevate Interior` is a web application designed to help homeowners and interior designers quickly estimate material requirements for various home decoration projects. It provides a suite of easy-to-use calculators to take the guesswork out of planning and budgeting.

Built with Next.js, React, and ShadCN UI, this application offers a clean, modern, and responsive user experience.

## ✨ Features

The application currently includes the following calculators:

- **Flooring Calculator**: Estimate the total square footage of flooring material needed, including a configurable wastage percentage.
- **Wall Area Calculator**: Calculate the paintable or wallpaper-ready area of your walls by specifying dimensions and subtracting doors and windows.
- **Ceiling Area Calculator**: Quickly find the surface area of a room's ceiling based on its length and width.
- **POP Ceiling Calculator**: A comprehensive estimator for Plaster of Paris (POP) ceiling projects, factoring in material costs, labor, and profit margins.
- **Curtain Calculator**: Determine the ideal dimensions for curtains and curtain rods based on window size and desired style.
- **Panel Estimator**: Calculate the number of decorative or functional panels required to cover a specific area.
- **Paint Estimator**: Estimate the number of paint gallons needed based on total surface area and the number of coats.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI/Generative**: [Google Genkit](https://firebase.google.com/docs/genkit)

## 📦 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm (or a compatible package manager like Yarn or pnpm) installed on your system.

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository** (if applicable) or ensure you are in the project directory.

2.  **Install dependencies**:
    Open your terminal and run the following command to install all the necessary packages:
    ```bash
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can start the Next.js development server:

```bash
npm run dev
```

This command starts the app in development mode with Turbopack for faster performance. Open [http://localhost:9002](http://localhost:9002) to view it in your browser. The page will auto-update as you make edits to the code.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs ESLint to identify and fix problems in the code.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

## 📁 Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── src
│   ├── app/                # Main application routes and layouts
│   │   ├── globals.css     # Global styles and Tailwind directives
│   │   ├── layout.tsx      # Root layout for the application
│   │   └── page.tsx        # The main homepage component
│   │
│   ├── components/         # Reusable UI components
│   │   ├── calculators/    # Calculator components for each feature
│   │   └── ui/             # Core UI components from ShadCN
│   │
│   ├── hooks/              # Custom React hooks
│   │
│   └── lib/                # Utility functions and libraries
│       └── utils.ts        # Helper functions (e.g., `cn` for classnames)
│
├── public/                 # Static assets
│
└── package.json            # Project dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.
