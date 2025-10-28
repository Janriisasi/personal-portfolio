export const METADATA = {
  author: "John Rey Sasi",
  title: "Portfolio | John Rey",
  description:
    "John Rey is a passionate Frontend Developer, dedicated to crafting modern web apps that captivate and engage users.",
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
  "A Web Developer",
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
    "javascript",
    "nodejs",
    "java",
    "cplusplus",
    "python",
    "pandas",
    "vite",
    "figma",
    "wordpress"
  ],
  librariesAndFrameworks: [
    "react",
    "tailwindcss",
  ],
  databases: ["mysql", "mongodb", "supabase"],
  other: ["git"],
};

export const PROJECTS = [
  {
    name: "Anisave",
    image: "/projects/ani.png",
    blurImage: "/projects/blur/ani-blur.png",
    description: "A web app that helps farmers to monitor market prices and showcase their crops.",
    gradient: ["#003D4B", "#006D4B"],
    url: "https://anisave.vercel.app/",
  },
  {
    name: "HanceAI",
    image: "/projects/hanceai.png",
    blurImage: "/projects/blur/hanceai-blur.png",
    description: "My first AI Web App that I created using Ollama",
    gradient: ["#101010", "#4D1F93"],
    url: "https://github.com/Janriisasi/hanceai",
  },
  {
    name: "Crypture",
    image: "/projects/crypture.png",
    blurImage: "/projects/blur/crypture-blur.png",
    description: "A web app that helps you to remember your password in any websites.",
    gradient: ["#000000", "#f1f1f1"],
    url: "https://crypture-one.vercel.app/",
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
    name: "J&J's Shop",
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
  WebDevelopment: [
    {
      title: "I.T Student",
      description:
        "I may not have industry experience yet, but I have gained hands-on experience in coding and building projects through my studies and personal initiatives. I have worked on web and mobile  applications, embedded systems, and various software solutions.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          3RD YEAR
        </div>
      ),
    },
    {
      title: "Transformation",
      description:
        "Since 2021, I have been exploring web development, starting with HTML on my mobile phone. Despite limited resources, I took the initiative to learn the fundamentals of structuring web pages, improving my skills through self-study and practice. Over time, I expanded my knowledge by experimenting with CSS and JavaScript, building small projects to enhance my understanding of responsive design and interactivity. My passion for web development continues to grow as I explore new technologies and frameworks to refine my skills.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Web Development
        </div>
      ),
    },
    {
      title: "Evolution",
      description:
        "Now, I have experience in both frontend and backend development, allowing me to create fully functional web applications. My focus has shifted to refining my skills, optimizing performance, and developing real-world projects that solve practical problems.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Developer
        </div>
      ),
    },
    {
      title: "Optimizing Skills",
      description:
        "I am still in the process of learning and exploring new concepts, technologies, and best practices in web development. I continuously strive to improve my skills, refine my approach, and stay updated with the latest industry trends. However, despite still being a learner, my dedication, hands-on experience, and problem-solving mindset have equipped me with the ability to build well-structured, functional, and efficient web applications. You can already trust me to apply my knowledge effectively, adapt to challenges, and deliver quality work with a strong commitment to excellence.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Finding the right job isn&apos;t fate, it&apos;s navigation
        </div>
      ),
    },
  ],
  Hardware: [
    {
      title: "Arduino",
      description:
        "I learned Arduino in my last semester, where I explored the fundamentals of microcontrollers, circuit design, and sensor integration. Through hands-on projects, I gained experience in programming Arduino boards, working with various components like sensors, LEDs, and displays, and understanding how hardware and software interact. This experience allowed me to develop problem-solving skills in embedded systems and electronics, further expanding my technical expertise beyond web development.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Arduino
        </div>
      ),
    },
    {
      title: "Expand",
      description:
        "Now, I am expanding my skills in Arduino projects by exploring more advanced concepts, integrating additional sensors and modules, and working on real-world applications. I continuously experiment with different hardware components, improve my coding efficiency, and enhance my understanding of embedded systems. While I continue to deepen my knowledge, my hands-on experience and problem-solving abilities give me the confidence to design and implement Arduino-based projects effectively, ensuring functionality, efficiency, and innovation in every project I undertake.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Integration
        </div>
      ),
    },
  ],
  Design: [
    {
      title: "UI/UX Design",
      description:
        "I learned the basics of UI/UX design in my last semester, where I explored fundamental principles such as user-centered design, accessibility, wireframing, and prototyping. Through hands-on practice, I gained experience in creating intuitive interfaces, improving user experience, and understanding how design choices impact usability. I worked with tools like Figma to develop wireframes and prototypes, focusing on creating visually appealing and functional designs.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          User Experience
        </div>
      ),
    },
    {
      title: "Learning",
      description:
        "Now, I am continuously learning how to design the perfect app or web app by refining my understanding of user behavior, accessibility, and visual aesthetics. I explore advanced design principles, usability testing, and interaction design to create interfaces that are not only visually appealing but also highly functional and intuitive. I experiment with different design tools, study industry trends, and analyze successful applications to enhance my approach. While I am still expanding my skills, my strong foundation in UI/UX design allows me to craft user-friendly interfaces that improve the overall experience of digital products, ensuring they are both engaging and efficient.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          UI/UX design isn&apos;t about aesthetics; it&apos;s about usability.
        </div>
      ),
    },
  ],
};

export const GTAG = "G-5HCTL2TJ5W";
