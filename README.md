# AIWallpaperGen

AIWallpaperGen is a web application that generates unique, AI-driven wallpapers. Built as a side project to explore the full-stack capabilities of the T3 Stack (by Theo Browne) and dive into the AI generative trend, this project blends modern frontend development with innovative AI techniques.

## Table of Contents
- Features
- Tech Stack
- Demo
- Installation
- Usage
- Roadmap
- Contributing
- License


## Features
- AI-Generated Wallpapers: Create custom wallpapers using advanced AI algorithms powered by OpenAI.
- User Authentication: Secure login via Google and GitHub sign-in using NextAuth.
- Responsive Design: Clean and simple UI built with TailwindCSS and Shadcn UI, enhanced with Framer Motion animations.
- Internationalization: Multi-language support through Next-Intl & Tolgee.
- Optimized Performance: Fast caching with Cloudflare & Redis and efficient deployment via AWS Amplify.
  
## Tech Stack
The project leverages a modern, full-stack environment, including:

  -  🧵 tRPC with T3 Stack
  -  🔐 Auth.js (NextAuth v5) with Google & GitHub sign-in
  -  🧬 Prisma
  -  🤖 OpenAI
  -  ☁️ AWS S3 for storage
  -  🚀 AWS Amplify for deployment
  -  🐘 PostgreSQL with Supabase
  -  🎨 TailwindCSS, Shadcn UI, Framer Motion
  -  🌍 Next-Intl & Tolgee for internationalization
  -  ⚡ Cloudflare & Redis for fast caching
  -  ...and more!


## Demo
<video controls src="public/demo.mp4" title="Demo - AIWallpaperGen"></video>



## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/aiwallpapergen.git
cd aiwallpapergen
npm install
```

Configure your environment variables as needed (for example, API keys for OpenAI, AWS credentials, etc.). See the .env.example file for more details.


## Usage

To run the project locally:


Run Tolgee (make sure you have Docker installed):

```bash
npm run tolgee
```

Run the application:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to explore AIWallpaperGen in action.
For production builds:

```bash
npm run build
npm start
```


## Roadmap
Enhanced Customization: More options for users to tailor their wallpapers.

Tutorial Series: Regular blog posts and video tutorials explaining the “what” and “how” of each technology used, along with challenges and lessons learned.

Additional Integrations: New features and integrations to further enhance user experience.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements. For major changes, please open an issue first to discuss what you would like to modify.
License

Distributed under the MIT License. See LICENSE for more information.