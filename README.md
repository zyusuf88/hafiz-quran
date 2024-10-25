# Introducing Hafiz! 🎧 ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) 
 
### A creative app that transforms learning the Quran into an amazing virtual experience!

##
## 💡 Inspiration Behind the App

Hafiz is a concept that originated from a game my friends and I frequently engage in. As we embarked on our journey of learning the Quran, we discovered the joy of testing our progress in a competitive manner. Inspired by this experience, I decided to take on the challenge of transforming it into a captivating game!

##
## ✨ Features
### - 🎧 Listen to different Quranic recitations

### - 📝 Guess the Surah and track your accuracy

### - 🏆 Compete with yourself to improve your memorization skills

### - 📊 Progress tracking to measure improvement over time

##
## 🎥 Demo

![Hafiz-Quran Demo](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGVlOHo0OXJ3eTMxdHhqb2N5N2Zwb3E1MnoweHpkdGZ3cmM3MXhybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TpXZNCLDprihlVzAOs/giphy.webp)
##
## 📋 Table of Contents
- [🛠️ Tech Stack](#tech-stack)
- [🚀 Installation](#installation)
 - [📝 Tips for Installation](#tips-for-installation)
- [📖 Usage](#usage)
- [⚙️ Local App Set Up](#local-app-set-up)
- [📜 License](#license)

##
## 🛠️ Tech Stack

### Hafiz is built using the following technologies:

| **Category**      | **Technology**                                  | **Description**                                                                                                  |
|-------------------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| **Frontend**      | **Next.js** 🎨                                  | A React framework for building server-side rendered applications, enabling fast and optimized user interfaces.    |
| **Backend**       | **Node.js** ⚙️                                   | A JavaScript runtime that allows us to run JavaScript server-side, facilitating efficient handling of requests.   |
| **API Integration**| **Quran API** 📖                                 | Utilizes [alquran.cloud API](https://alquran.cloud/api) for accessing Quranic recitations and data.               |
| **Containerization**| **Docker** 🐋                                   | Used for packaging the application and its dependencies, ensuring consistency across different environments.      |
| **Deployment**    | **Amazon ECS** ☁️                                | Managed container service to run the application in a scalable and secure environment.                           |
| **CI/CD**         | **GitHub Actions** 🔄                            | Automates the build, test, and deployment processes, ensuring efficient code integration and delivery.            |

## 

## 🚀 Installation

First, install dependancies 

```bash
npm install 
```

##
## 📝 Tips for Installation

> If you encounter any errors during installation, ensure that Node.js and npm are correctly installed on your system. Here are some troubleshooting tips:
>
> - **Check Node.js and npm Versions**: Make sure you're using a supported version of Node.js (14.x or later) and npm. Check your installed versions with:
>
>   ```bash
>   node -v
>   npm -v
>   ```
>
> - **Node.js Installation**: If Node.js isn't installed, refer to the [Node.js Installation Guide](https://nodejs.org/en/download/) for your operating system.

##
## 📖 Usage

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### 1. After running `npm run dev`, open the app.
#### 2. Listen to a short recitation.
#### 3. Choose the correct Surah from the options provided.

##
## ⚙️ Local App Set Up

### To run the app locally, execute the following commands:

```bash
docker build -t hafiz-quran .
```
- **Builds the Docker image:** This command compiles the application into a Docker image named hafiz-quran.

- **Uses the Dockerfile:** The build process relies on the Dockerfile in the current directory to determine how to create the image.

- **Packages dependencies:** It includes all necessary dependencies specified in the Dockerfile, ensuring the app is ready to run in any environment.


```bash
docker run -p 3000:3000 hafiz-quran
```

- **Runs the Docker container:** This command starts a new container instance of the hafiz-quran image.

- **Maps ports:** It maps port 3000 of the host machine to port 3000 of the container, allowing you to access the app through your browser.

- **Executes the application:** The command runs the application as defined in the image, making it accessible locally at http://localhost:3000.

## 📜 License

![License](https://img.shields.io/badge/license-Proprietary-blue)

This project is licensed under a **Proprietary License**, which means that:

- You **do not** have permission to modify, distribute, or use this code for personal or commercial purposes without explicit permission from the project owners.

- The codebase is **closed-source**, and no contributions or forks are allowed.
- If you are interested in using or adapting this project in any way, you must first contact the project owners for explicit permission.

For further details, please refer to the [LICENSE](./LICENSE) file.

