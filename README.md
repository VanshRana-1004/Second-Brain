# Second-Brain 🧠
A ReactJS + TypeScript project serving as your second brain to store important links from YouTube, Instagram, LinkedIn, Twitter, Notion, and websites. Organize and share your stored content easily, ensuring quick access and collaboration with others. Simplify your digital life with sharable storage!


# Features 🚀
- <b> Content Storage : </b>Save and organize important links in one place for easy access.

- <b> Quick Access : </b>Easily retrieve stored content whenever needed without hassle.

- <b> Tag-Based Organization : </b>Filter content based on defined tags for better organization.

- <b> Sharing Functionality : </b>Share your stored links and media with others through a unique link.

- <b> Privacy Control : </b>Disable sharing anytime to ensure your content stays private.

- <b> Responsive Design : </b>Enjoy a seamless experience on both desktop and mobile devices.

- <b> User-Friendly Interface : </b>Navigate effortlessly with a clean and intuitive design.


# Tech Stack 🛠️

 <b>Frontend</b>

  - <b>Framework : </b>React with TypeScript

  - <b>Styling : </b>Tailwind CSS
    
  - <b>State Management : </b>Axios library and local storage
    
  - <b>Build Tool : </b>Vite

 <b>Backend</b>

  - <b>Framework : </b>Node.js with Express
    
  - <b>Database : </b>MongoDB for data storage
    
  - <b>Authentication : </b>JWT (JSON Web Tokens)


# Visit Website 🔗 

- [Second Brain](https://secondbrain-app.vercel.app/)


# Folder Structure 🏗️

```
secondbrainapp/
├── Backend/          # Contains the server-side code
│   ├── src/          # Backend source files
│   ├── .env          # Environment variables for the backend
│   └── package.json
├── Frontend/         # Contains the client-side code
│   ├── src/          # Frontend source files
│   ├── public/       # Public assets like logos
│   └── package.json
└── README.md         # Project documentation
```

#  Installation and Setup ⚙️

1. <b>Clone the repository :</b>
```
 git clone https://github.com/VanshRana-1004/Second-Brain.git
 cd BrainDock
```

2. <b>Setup Backend :</b>
```
 cd Backend
 npm install
 npm run dev
```

3. <b>Setup Frontend :</b>
```
 cd ../Frontend
 npm install
 npm run dev
```

4. <b>Environment Variables :</b>
- Create ```.env``` files in the respective folders with the following:
  - Backend ```.env```
    ```
    PORT=3000
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    ```
  - Frontend ```.env```
    ```
    VITE_API_URL=<backend-api-url>
    ```

# Key Functionalities ✨
- <b>Save and Categorize : </b>Keep your links organized by categories or tags.
- <b>Explore Shared Brains : </b>Discover resources shared by other users.


# License 📜
- This project is licensed under the MIT License.


# Author 🧑‍💻
- Vansh Rana
- [Github Link](https://github.com/VanshRana-1004)


Let me know if you'd like further refinements!
