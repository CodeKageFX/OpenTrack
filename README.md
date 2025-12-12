# **OpenTrack: Transparent Donation & Distribution Platform** 🌍

OpenTrack is a cutting-edge web application designed to bring unparalleled transparency to community projects and aid distribution. Built with a focus on trust and accountability, the platform allows organizations to manage projects, collect donations, verify beneficiaries, and provide verifiable proof of item distribution, ensuring every contribution makes a visible impact.

## Features

*   **Public Transparency Dashboard**: Offers real-time, public-facing insights into total funds raised, items distributed, and beneficiary progress across all projects.
*   **Comprehensive Project Management**: Project administrators can create, manage, and track the status of their specific initiatives, including funding goals, raised amounts, and distribution metrics.
*   **Beneficiary Lifecycle Management**: Features detailed workflows for beneficiary registration, identity verification, item assignment, and status updates (pending, approved, assigned, delivered, completed).
*   **Donor & Donation Tracking**: Securely records all donations, distinguishing between anonymous and named contributions, with an option to upload receipts.
*   **Proof of Impact Gallery**: Beneficiaries are required to upload photo evidence of receiving items, fostering accountability and building donor confidence.
*   **Role-Based Administration**: Provides distinct dashboards for Project Admins (managing their projects) and a Super Admin (overseeing platform-wide operations and project approvals).
*   **Intuitive Application Forms**: Streamlined forms for both project administrators to submit new initiatives and for individuals to apply as beneficiaries.
*   **Configurable Settings**: Project-level settings for branding, donation rules, and distribution criteria, alongside global platform configurations for super administrators.
*   **Dynamic Activity Logs**: Keeps a detailed record of all system activities, including approvals, donations, proof uploads, and settings changes.
*   **Responsive & Modern UI**: A user-friendly interface powered by Next.js, React, and Tailwind CSS, ensuring a seamless experience across all devices.
*   **Theme Toggle**: Supports light and dark modes for personalized user preference.

## Usage

To experience OpenTrack, follow the instructions below to run the application locally.

### Running the Application

1.  **Start Development Server**:
    Launch the application in development mode:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    This will start the development server, usually accessible at `http://localhost:3000`.

2.  **Accessing Different Portals**:
    Once the application is running, you can explore its various sections:
    *   **Public Dashboard**: Navigate to `http://localhost:3000` to view the main transparency dashboard, browse projects, donate, or register as a beneficiary.
    *   **Project Admin Dashboard**: Access project-specific administration at `http://localhost:3000/admin`. This dashboard is where individual project owners manage their distributions, beneficiaries, and proofs.
    *   **Super Admin Dashboard**: For platform-level oversight, visit `http://localhost:3000/our-admin`. This allows reviewing project submissions, managing platform users, and configuring global settings.

## Technologies Used

| Technology         | Description                                                      | Link                                                 |
| :----------------- | :--------------------------------------------------------------- | :--------------------------------------------------- |
| **Next.js**        | React framework for production-grade applications.               | [nextjs.org](https://nextjs.org/)                    |
| **React**          | JavaScript library for building user interfaces.                 | [react.dev](https://react.dev/)                      |
| **TypeScript**     | Superset of JavaScript that adds static types.                   | [typescriptlang.org](https://www.typescriptlang.org/) |
| **Tailwind CSS**   | Utility-first CSS framework for rapid UI development.            | [tailwindcss.com](https://tailwindcss.com/)        |
| **Shadcn UI**      | Reusable components built with Radix UI and Tailwind CSS.        | [ui.shadcn.com](https://ui.shadcn.com/)              |
| **Radix UI**       | Low-level UI components with a focus on accessibility.           | [www.radix-ui.com](https://www.radix-ui.com/)        |
| **Lucide React**   | Beautifully crafted open-source icons for React.                | [lucide.dev](https://lucide.dev/)                    |
| **TanStack Query** | Powerful asynchronous state management for React.                | [tanstack.com/query](https://tanstack.com/query)     |
| **Sonner**         | An opinionated toast component for React.                        | [sonner.emilkowalski.studio](https://sonner.emilkowalski.studio/) |
| **ESLint**         | Pluggable JavaScript linter for identifying and reporting patterns. | [eslint.org](https://eslint.org/)                    |

## Contributing

We welcome contributions to OpenTrack! If you're interested in improving the platform, please follow these guidelines:

*   ✨ **Fork the repository.**
*   🌿 **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
*   💻 **Make your changes** and ensure your code adheres to the project's coding style.
*   ✅ **Write clear and concise commit messages.**
*   🚀 **Push your branch** to your forked repository.
*   📝 **Open a pull request** with a detailed description of your changes.

## License

This project is open-source.

## Author Info

*   **Your Name**
    *   Email: [your.email@example.com](mailto:your.email@example.com)
    *   LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
    *   Twitter: [@your_handle](https://twitter.com/your_handle)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)