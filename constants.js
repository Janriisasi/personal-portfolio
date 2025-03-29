export const METADATA = {
  author: "John Rey Sasi",
  title: "Portfolio | John Rey",
  description:
    "John Rey is a passionate Frontend Developer, dedicated to crafting aesthetic and modern apps that captivate and engage users.",
  siteUrl: "",
  twitterHandle: "@janrii",
  keywords: [
    "John Rey Sasi",
    "Frontend Developer",
    "Web Developer",
    "Portfolio",
    "Devfolio",
    "Folio",
  ].join(", "),
  image:
    "https://res.cloudinary.com/dywdhyojt/image/upload/v1721378510/social-preview.png",
  language: "English",
  themeColor: "#000000",
};

export const MENULINKS = [
  {
    name: "Home",
    ref: "home",
  },
  {
    name: "Skills",
    ref: "skills",
  },
  {
    name: "Projects",
    ref: "projects",
  },
  {
    name: "Work",
    ref: "work",
  },
  {
    name: "Contact",
    ref: "contact",
  },
];

export const TYPED_STRINGS = [
  "A Frontend Developer",
  "A UI/UX Designer",
  "I build things for the web",
];

export const SOCIAL_LINKS = [
  {
    name: "mail",
    url: "https://mail.google.com/mail/u/0/#inbox?compose=new",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/john-rey-sasi/",
  },
  {
    name: "github",
    url: "https://github.com/Janriisasi",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/janriiisasi/",
  },
  {
    name: "twitter",
    url: "https://x.com/",
  },
];

export const SKILLS = {
  languagesAndTools: [
    "html",
    "css",
    "cplusplus",
    "java",
    "nodejs",
    "javascript",
    "pandas",
    "vite",
    "figma",
    "wordpress"
  ],
  librariesAndFrameworks: [
    "react",
    "nextjs",
    "tailwindcss",
  ],
  databases: ["mysql", "mongodb"],
  other: ["git"],
};

export const PROJECTS = [
  {
    name: "Anisave",
    image: "/projects/ani.png",
    blurImage: "/projects/blur/ani-blur.png",
    description: "A web app that helps farmers to monitor and sell their crops.",
    gradient: ["#003D4B", "#006D4B"],
    url: "https://github.com/Janriisasi/anisave.git",
  },
  {
    name: "Awesome Todos",
    image: "/projects/awesometodos.png",
    blurImage: "/projects/blur/awesometodos-blur.png",
    description: "A web app that helps you manage your todos",
    gradient: ["#14142B", "#24142B"],
    url: "https://awesome-todos-qzmm.onrender.com/",
  },
  {
    name: "YouGo",
    image: "/projects/yougo.png",
    blurImage: "/projects/blur/yougo-blur.png",
    description:
      "An app that helps user to avoid traffic",
    gradient: ["#323A82", "#523A82"],
    url: "",
  },
  {
    name: "J$J's Shop",
    image: "/projects/jjsshop.png",
    blurImage: "/projects/blur/jjsshop-blur.png",
    description: "An ecommerce website where you can buy or shop items",
    gradient: ["#d6d6d6", "#d1d1d1"],
    url: "",
  },
];

// export const WORK = [
//   {
//     id: 1,
//     company: "Dukaan",
//     title: "Frontend Developer",
//     location: "Bangalore, Karnataka",
//     range: "December - Current",
//     responsibilities: [
//       "Led creation of a captivating cross-platform e-commerce solution.",
//       "Enhanced UX with gamification and personalized push notifications ensuring an ever-improving shopping journey.",
//       "The app boasts a DAU base of 32k and an extensive MAU count of 180k.",
//     ],
//     url: "https://mydukaan.io/",
//     video: "/work/dukaan.mp4",
//   },
//   {
//     id: 2,
//     company: "Aviate",
//     title: "Frontend Developer Intern",
//     location: "Goa",
//     range: "May - October 2022",
//     responsibilities: [
//       "Built their flagship product Q-Rate, a voice-based applicant screening platform.",
//       "Developed pixel-perfect responsive web applications achieving daily traffic of 1000-2000 users.",
//       "Successfully rolled out an error-logging and bug reporting system that cut user-reported bugs by 30%.",
//     ],
//     url: "https://www.aviate.jobs/",
//     video: "/work/aviate.mp4",
//   },
//   {
//     id: 3,
//     company: "Spacenos",
//     title: "Web Developer Intern",
//     location: "Bangalore, Karnataka",
//     range: "September - December 2021",
//     responsibilities: [
//       "Led the Full Stack revamp on the Admin Portal.",
//       "Developed app integration with REST APIs, Google Maps, User Auth, Stripe and other libraries.",
//       "Implemented CRUD features for all the services and providers.",
//     ],
//     url: "https://spacenos.com/",
//     video: "/work/spacenos.mp4",
//   },
// ];

export const WORK_CONTENTS = {
  DUKAAN: [
    {
      title: "Dukaan",
      description:
        "Dukaan is a platform that enables businesses to launch their online stores at ease.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Revolutionizing commerce, one click at a time
        </div>
      ),
    },
    {
      title: "Transformation",
      description:
        "Since 2023, the Dukaan Seller Dashboard struggled with technical issues and a broken user experience due to accumulated technical debt. Leading a team of two junior developers, we migrated the dashboard from CSR to SSR, redesigned the UI, and overhauled the codebase in the process. This resolved the technical debt and vastly improved the user experience, making it Dukaan's largest and most impactful migration.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Senior Frontend Engineer
        </div>
      ),
    },
    {
      title: "Evolution",
      description:
        "Recognizing the need for improved performance and user engagement, I spearheaded the migration of the Dukaan App from native to React-Native for iOS and Android platforms. This strategic move led to a X% enhancement in app performance and a Y% boost in user engagement, representing a significant milestone in the app's evolution.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Engineer
        </div>
      ),
    },
    {
      title: "Optimization",
      description:
        "Leveraging user feedback and analytics, I improved the seller web dashboard design, reducing bounce rates. Simultaneously, I overhauled the build process, slashing bundle size and boosting overall performance.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Engineer Intern
        </div>
      ),
    },
  ],
  AVIATE: [
    {
      title: "Aviate",
      description:
        "Aviate is a preparation and mentorship platform for job-seekers that are seeking non-technical roles across top companies",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Finding the right job isn&apos;t fate, it&apos;s navigation
        </div>
      ),
    },
    {
      title: "Innovation",
      description:
        "I spearheaded the development of Q-Rate, their flagship product, a voice-based applicant screening platform. Moreover, I took initiatives to enhance user engagement and drive substantial increases in daily traffic. Additionally, I implemented an error-logging and bug reporting system, significantly diminishing user-reported bugs.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Developer Intern
        </div>
      ),
    },
  ],
  SPACENOS: [
    {
      title: "Spacenos",
      description:
        "A dynamic startup dedicated to creating innovative products that make the world a better place.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          We build apps that solve problems for the next billion people
        </div>
      ),
    },
    {
      title: "Trailblazing",
      description:
        "I led the comprehensive overhaul of the Admin Portal, implementing CRUD features for all services and providers. Additionally, I architected a feature enabling precise customer location tracking and delivering insightful usage statistics. Through optimized and compressed file serving, I catalyzed a remarkable Yx increase in page speed, resulting in a X% boost in customer retention.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Web Developer Intern
        </div>
      ),
    },
  ],
};

export const GTAG = "G-5HCTL2TJ5W";
