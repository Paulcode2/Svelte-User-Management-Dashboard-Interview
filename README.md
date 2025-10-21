# User Management Dashboard

This project is a simple User Management Dashboard built with Svelte. It provides functionalities to manage users, including adding, editing, deleting, and searching for users.

## Features

- User Table: Displays a list of users with their details.
- Add/Edit/Delete Functionality: Manage user data easily.
- Search Capability: Filter users by name or email.
- Reactive Interface: Updates in real-time without external frameworks.

## Project Structure

```
user-management-dashboard
├── public
│   └── index.html
├── src
│   ├── main.js
│   ├── App.svelte
│   ├── components
│   │   ├── UserTable.svelte
│   │   ├── UserRow.svelte
│   │   ├── UserForm.svelte
│   │   └── SearchBar.svelte
│   ├── stores
│   │   └── users.js
│   ├── lib
│   │   └── utils.js
│   └── styles
│       └── app.css
├── package.json
├── vite.config.js
└── svelte.config.js
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd user-management-dashboard
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the dashboard.

## Usage

- Use the search bar to filter users by name or email.
- Click on "Add User" to open the form for adding a new user.
- Edit or delete existing users directly from the user table.

## License

This project is licensed under the MIT License.