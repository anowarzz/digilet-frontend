import blogImg1 from "@/assets/images/blog-image-1.jpg";
import blogImg2 from "@/assets/images/blog-image-2.jpg";
import blogImg3 from "@/assets/images/blog-image-3.jpg";

const dummyBlogs = [
  {
    id: 1,
    image: blogImg1,
    category: "Product News",
    title: "Digilet launches instant wallet top-up feature",
    description:
      "Now you can top up your wallet instantly with our new feature. Learn how it works and why it’s secure.",
    author: "Simon Riley",
    date: "2025-10-10",
  },
  {
    id: 2,
    image: blogImg2,
    category: "Guides",
    title: "How to keep your digital wallet safe",
    description:
      "Security tips and best practices to protect your money and data in the digital age.",
    author: "Ghost Blogger",
    date: "2025-09-28",
  },
  {
    id: 3,
    image: blogImg3,
    category: "Tips & Tricks",
    title: "5 ways to save on transaction fees",
    description:
      "Discover how to minimize your costs when sending or receiving money with Digilet.",
    author: "Tech Slayer",
    date: "2025-09-15",
  },
];

const Blogs = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-14">
          <span className="uppercase tracking-widest text-xs font-semibold text-primary dark:text-custom-blue mb-2">
            Our Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 text-center leading-tight">
            Blogs & Articles
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center">
            Explore the latest news, product updates, and expert tips to help
            you get the most out of your digital wallet experience.
          </p>
        </div>
        {/* Blog Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dummyBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
              <div className="flex-1 flex flex-col p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-200">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {blog.description}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span>By {blog.author}</span>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
