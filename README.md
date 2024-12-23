# Xoom - Video Calling App

Xoom is a video calling application built with Next.js, Clerk for authentication, and Stream for video functionality. This project aims to provide a seamless video calling experience with features like personal meeting rooms, recordings, and previous calls.

## Features

- **Personal Meeting Room**: Create and join personal meeting rooms.
- **Recordings**: Access and manage your call recordings.
- **Previous Calls**: View a list of your previous calls.
- **Authentication**: Secure authentication using Clerk.
- **Responsive Design**: Optimized for various screen sizes.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Clerk**: Authentication and user management.
- **Stream**: Video calling functionality.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/xoom.git
   cd xoom
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
   NEXT_PUBLIC_STREAM_API_KEY=<your-stream-api-key>
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

### Running the App

Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application components and pages.
- `components/`: Reusable UI components.
- `hooks/`: Custom hooks for various functionalities.
- `providers/`: Context providers for managing state and side effects.
- `public/`: Static assets like images and icons.
- `styles/`: Global and component-specific styles.

## Available Scripts

- `dev`: Runs the app in development mode.
- `build`: Builds the app for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code quality issues.

## Features and Functionalities

### Personal Meeting Room

- **Description**: Users can create and join their personal meeting rooms.
- **Usage**: Navigate to the "Personal Room" page, and click "Start Meeting" to create a new meeting room. You can also copy the invitation link to share with others.

### Recordings

- **Description**: Users can access and manage their call recordings.
- **Usage**: Navigate to the "Recordings" page to view a list of your recorded calls.

### Previous Calls

- **Description**: Users can view a list of their previous calls.
- **Usage**: Navigate to the "Previous" page to see a history of your ended calls.

### Authentication

- **Description**: Secure authentication using Clerk.
- **Usage**: Users can sign up or sign in using the provided authentication pages.

### Responsive Design

- **Description**: The application is optimized for various screen sizes.
- **Usage**: The app will automatically adjust its layout based on the screen size.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
