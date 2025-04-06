import React from 'react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Understanding Mental Health in the Digital Age',
      excerpt: 'Learn about the impact of technology on mental health and ways to maintain balance.',
      author: 'Dr. Sarah Johnson',
      date: 'March 15, 2024',
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'The Importance of Regular Exercise',
      excerpt: 'Discover how regular physical activity can improve your overall health and well-being.',
      author: 'Dr. Michael Chen',
      date: 'March 12, 2024',
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Nutrition Tips for a Healthy Lifestyle',
      excerpt: 'Expert advice on maintaining a balanced diet and making healthy food choices.',
      author: 'Dr. Emily Brown',
      date: 'March 10, 2024',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1571019613645-8b3b2d2bcc8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Health & Wellness Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Stay informed with the latest health insights and medical news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">
                  {post.category}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;