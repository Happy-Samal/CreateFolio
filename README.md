# CreateFolio

## Overview

CreateFolio is a web application designed to help professionals, creatives, and influencers showcase their work and advance their careers. It allows users to create a personalized portfolio to highlight their achievements, connect with opportunities, and share their profiles with potential clients or employers. Users can set up an account to manage their portfolio and connect with others in their field, facilitating professional growth and networking.

## Website host on

click - https://create-folio.vercel.app/

## Technologies Used

- **Frontend & Backend**: React js , ExpressJs(Nodejs)
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: passport js
- **Email**: email js
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js (v12.x or later)
- npm (v6.x or later) or yarn (v1.22.x or later)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Happy-Samal/CreateFolio.git
   cd CreateFolio
    ```

1. **Install dependencies:**

   ```sh
   npm install
   #or
   yarn install
   ```
3. **Set up environment variables:**

    Create a .env file in the root directory (frontend ) and add the necessary environment variables (example below):

    ```sh
    VITE_API_URL=your_backend_url
    VITE_TEMPLATE_KEY=<your_email_template_id>
    VITE_SERVICE_KEY=<your_email_service_key>
    VITE_PUBLIC_KEY=<your_email_public_id>
    ```
    Create a .env file in the backend  and add the necessary environment variables (example below):

    ```sh
    MONGO_URI=<YOUR_MONGO_URL>
    PORT=3000
    FRONTEND_URL=<YOUR_FRONTEND_URL>
    SESSION_SECRET=<YOUR_SECRET_KEY>
    URL=<YOUR_BACKEND_URL>

    GOOGLE_ID=<YOUR_GOOGLE_ID>
    GOOGLE_SECRET=<YOUR_GOOGLE_SECRET>
    GITHUB_ID=<YOUR_GITHUB_ID>
    GITHUB_SECRET=<YOUR_GITHUB_SECRET>
    FACEBOOK_ID=<YOUR_FACEBOOK_ID>
    FACEBOOK_SECRET=<YOUR_FACEBOOK_SECRET>
    NODE_ENV="development || production"
    ```
 4. **Getting Started**

    First, run the client: (frontend)

    ```sh
        npm run dev
        # or
        yarn dev
        # or
        pnpm dev
        # or
        bun dev
     ```
    First, run the server: (backend)

    ```sh
        nodemon index.js
     ```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the page by modifying `src/app.jsx`. The page auto-updates as you edit the file.


## Feedback and Contributions

We invite you to experience our site by using it to support or create campaigns. Your feedback is invaluable to us and helps us improve our platform. If you have any suggestions or encounter any issues, please let us know.

We welcome contributions to enhance the platform. You can add new features, fix bugs, or improve documentation. Pull requests are welcome!

### How to Contribute
1. **Fork the repository:**

    Click on the "Fork" button at the top right of this page to create a copy of this repository under your GitHub account.

2. **Clone the forked repository:**
    ```sh
    git clone https://github.com/Happy-Samal/CreateFolio.git
    cd CreateFolio
    ```
3. **Create a new branch:**
    ```sh
    git checkout -b feature-branch
    ```    
4. **Make your changes and commit them:**
    ```sh
    git add .
    git commit -m 'Add new feature'
    ```

5. **Push to the branch:**
    ```sh
    git push origin feature-branch
    ```

6. **Open a Pull Request:**

    Go to the repository on GitHub and click on the "Compare & pull request" button. Provide a clear description of your changes and submit the pull request.


## Contribution Guidelines

- Ensure your code follows the project's coding standards.
- Include relevant documentation and update existing    documentation if needed.
- Write clear and descriptive commit messages.
- Test your changes thoroughly before submitting a pull request.

## License
This project is licensed under the MIT [License](https://github.com/Happy-Samal/CreateFolio/blob/main/LICENSE). See the LICENSE file for details.

## Contact
For any questions or feedback, please reach out to us at rudrasamal007@gmail.com

## Deploy on Vercel

go to the [link](https://vercel.app) . create account with github and create a project and import the CreateFolio repository name and first select root is frontend and set environment variables then go to the dashboard and create new project at that time root is backend and set environment variables


##
### 😀If you are reading this then [Give me Money for buy a chai](https://Need-Money.vercel.app/user/happy_samal) 🍵
##

## Credit

<a href="https://lordicon.com/">Icons by Lordicon.com</a>
<a href="https://icons8.com/">Icons by icons8.com</a>