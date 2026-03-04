const mongoose = require('mongoose');
const Service = require('./models/Service');
const Blog = require('./models/Blog'); 
require('dotenv').config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/codecelix')
    .then(() => console.log("MongoDB Connected for Seeding..."))
    .catch(err => console.log("Connection Error:", err));

// --- PROFESSIONAL SERVICES DATA ---
  const services = [
  {
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    icon: "bot", // Icons.jsx se match kar diya
    description: "Automate your business processes with high-end AI models.",
    color: "#6366f1",
    details: [
      { heading: "Custom AI Models", body: "Tailored algorithms for your data." },
      { heading: "Neural Networks", body: "Deep learning for complex patterns." }
    ]
  },
  {
    title: "Cyber Security",
    slug: "cyber-security",
    icon: "shield-check", // Icons.jsx se match kar diya
    description: "Enterprise-grade protection for your digital assets.",
    color: "#ef4444",
    details: [
      { heading: "Threat Detection", body: "Real-time monitoring of attacks." },
      { heading: "Data Encryption", body: "End-to-end security for users." }
    ]
  },
  {
    title: "Market Analytics",
    slug: "market-analytics",
    icon: "bar-chart", // Icons.jsx se match kar diya
    description: "Data-driven insights to grow your business faster.",
    color: "#10b981",
    details: [
      { heading: "Growth Metrics", body: "Visualize your revenue growth." },
      { heading: "User Behavior", body: "Understand how users interact." }
    ]
  }
];

// --- PROFESSIONAL BLOGS DATA ---
const blogs = [
    {
        title: "Scaling SaaS Architecture in 2026",
        slug: "scaling-saas-2026",
        category: "Technology",
        excerpt: "Learn the core principles of building scalable software that supports millions of users.",
        content: "<h2>Why Scalability Matters</h2><p>In 2026, user expectations are higher than ever. To compete, your backend must handle traffic spikes efficiently.</p><h3>Microservices vs Monolith</h3><p>We recommend a microservices approach for long-term flexibility...</p>",
        author: "Asad Waseem",
        image: "uploads/blog-saas.jpg",
        readTime: "5 min read"
    },
    {
        title: "The Power of React Server Components",
        slug: "react-server-components",
        category: "Development",
        excerpt: "Improve your frontend performance by mastering server-side rendering techniques.",
        content: "<h2>The Future of Frontend</h2><p>React is moving towards server-first logic. This reduces bundle sizes and speeds up initial load times.</p>",
        author: "Asad Waseem",
        image: "uploads/blog-react.jpg",
        readTime: "8 min read"
    }
];

// --- SEED FUNCTION ---
const seedDB = async () => {
    try {
        // Purana data delete karein taake duplicate na ho
        await Service.deleteMany({});
        await Blog.deleteMany({});

        // Naya data insert karein
        await Service.insertMany(services);
        await Blog.insertMany(blogs);

        console.log("Data Seeded Successfully!");
        console.log(`- ${services.length} Services Added`);
        console.log(`- ${blogs.length} Blogs Added`);

        mongoose.connection.close();
    } catch (error) {
        console.error("Error Seeding Data:", error);
        process.exit(1);
    }
};

seedDB();