# Talk AI

Talk AI is an innovative platform that allows you to add intelligent AI agents to your meetings. These agents can follow instructions, interact with participants, and provide summaries, transcripts, and recordings of your calls.

## 🚀 Features

- **AI-Powered Agents**: Create and customize AI agents with specific instructions to assist in your meetings.
- **Real-Time Interaction**: Agents can interact with participants during the call, providing information and performing tasks as needed.
- **Meeting Summaries**: Automatically generate concise summaries of your meetings, highlighting key points and decisions.
- **Transcripts and Recordings**: Access full transcripts and recordings of your calls for future reference.
- **Secure Authentication**: Sign in using your email and password, or with your GitHub or Google accounts for a seamless experience.
- **User-Friendly Dashboard**: Manage your agents and meetings through an intuitive and easy-to-use dashboard.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **API**: [tRPC](https://trpc.io/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://better-auth.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

## 🏁 Getting Started

To get started with Talk AI, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/talk-ai.git
   cd talk-ai
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root of your project and add the necessary environment variables. You can use the `.env.example` file as a template.

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**:

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 📂 Folder Structure

The project follows a modular architecture, with a clear separation of concerns. Here's a brief overview of the main directories:

- **`/src/app`**: Contains the main application logic, including pages, layouts, and API routes.
- **`/src/components`**: Reusable UI components used throughout the application.
- **`/src/constants`**: Shared constants, such as pagination settings.
- **`/src/db`**: Database-related files, including the schema and Drizzle ORM setup.
- **`/src/hooks`**: Custom React hooks for handling state and logic.
- **`/src/lib`**: Utility functions and libraries, such as authentication and helper functions.
- **`/src/modules`**: Modular components of the application, such as agents, authentication, and meetings.
- **`/src/trpc`**: tRPC setup, including the client, server, and routers.

## 🤝 Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
