# NU Job Board

### Team Members

- Ruthvik Bangalore Ravi - 002294710

- Neha Balaji - 002295604

- Aditya Sawant - 002762104

- Ameya Apte - 002764540

##

### Purpose of the project

An online platform named `NU Job Board` connecting job seekers and employers to make job hunting and hiring efficient and effective.

## Features

- **Dynamic Web Application:**
  - Streamlines job search and hiring processes.
  - PC, Laptop and Mobile-friendly.

- **User Authentication:**
  - Secure account creation and login.
  - Allows applicants to track the status of their applications.
  - Email notifications about important updates.

- **Intuitive Design:**
  - Modern and efficient solution for both employers and job seekers.
  - Simple and easy to navigate self-explanatory pages.

- **Powerful Search Functionality:**
  - Enables job seekers to find opportunities seamlessly.
  - Also empowers them to search through courses to boost their skill set.

- **Application and Course Management:**
  - Employers can post detailed job listings with robust application management features.
  - Varied available coursework with integrated secure payment gateway for secure transactions.

## Tech Stack

- **Frontend**:
  - HTML, CSS, JavaScript
  - Bootstrap
  - React

- **Backend**:
  - MongoDB (Database)
  - Node.js (Runtime Environment)
  - Express.js (Server-side Logic)

## Project Structure

The project follows the MVC (Model-View-Controller) pattern with a clear separation of frontend and backend concerns. Please refer to the PowerPoint presentation for more information - 
https://www.canva.com/design/DAF2dGedx7M/v1n2yywkOn2Nmdk8dAkw4Q/view?utm_content=DAF2dGedx7M&utm_campaign=designshare&utm_medium=link&utm_source=editor

### Available Users
1. **Admin** - Admin users can add in jobs and courses as well as view applications and subscriptions of participating members. The Admin users also have CRUD access on jobs and courses and can as well perform Delete operation on applications and subscriptions. Admin dashboard is an upgraded version of the normal dashboard with many additional functionalities. Admin users are not present by default and can be simply added by converting any normal user into an admin user using the `/makeAdmin` endpoint available.
2. **Normal User** - A normal user of the job board can be simply defined as a job seeker who is interested to browse through and apply for various jobs available on the website. The job seeker can also go through and purchase available courses for improving their skill set. Normal users can register themselves through the Register page and can then enjoy the services of the website. Once added, a user cannot be deleted from the database without admin help.

### How to run this Assignment
1. First navigate to the `backend` folder and install all the dependencies using `npm install` in your terminal
2. Now create the `.env` file with the required variables. Common variables include `PORT`, `MONGO_URI` and `JWT_SECRET_KEY`
3. Then simply go the terminal and enter `npm start` to ensure the application is up and running. The application runs on the default port `8000`
4. Now navigate to the `frontend` folder and also install the dependencies using `npm install` in another terminal.
5. Now enter `npm start` in this terminal to run your `React` application. Make sure the `BASE_URL` in your `config.js` file in your `utils` folder is pointing to your backend server. In case you want to start the application on any custom port enter `PORT=your_port npm start`
6. Start using the website through any web browser of your choice.

## How to deploy to cloud server
1. Navigate to any cloud platform of your choice and create a server of your choice.
2. Install Node and MongoDB on your cloud server.
3. Once installed run the application on your virtual machine. You can start your application on `PORT 80` to make it available on any `HTTP` domain.

**Note**: We had used Debian 12 as our preferred cloud server OS. The script file to install various dependencies for this project can be found in `script.sh`. You can then either use `scp` to copy your local repo file to your cloud server or you can also set up your GitHub inside your cloud server to clone your repository. After running this shell and having the necessary repo files, simply follow the steps to run the application above to get your website up and running. 
