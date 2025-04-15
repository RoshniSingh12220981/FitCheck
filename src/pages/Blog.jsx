import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Blog = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [newPost, setNewPost] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newEntry = {
        id: uuidv4(),
        content: newPost,
        author: 'Anonymous',
        image: imageURL || 'https://source.unsplash.com/random/400x200',
        timestamp: new Date().toLocaleString(),
      };
      setPosts([newEntry, ...posts]);
      setNewPost('');
      setImageURL('');
    }
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#fef9f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
        📝 Pastel Blog
      </h1>
      <p style={{ fontSize: '1rem', color: '#777', marginBottom: '30px' }}>
        Share your thoughts with the world 💬
      </p>

      <form
        onSubmit={handlePostSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '50px',
        }}
      >
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your post here..."
          rows="4"
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            resize: 'none',
            marginBottom: '15px',
          }}
        />
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Paste an image URL (optional)"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '15px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '16px',
            backgroundColor: '#ffd6e0',
            color: '#333',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s ease-in-out',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#ffb3c1')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#ffd6e0')}
        >
          🚀 Post Now
        </button>
      </form>

      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
        }}
      >
        {posts.length === 0 ? (
          <p style={{ color: '#aaa' }}>No posts yet. Start writing!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                backgroundColor: '#fff',
                width: '300px',
                borderRadius: '16px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow =
                  '0 12px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 6px 18px rgba(0, 0, 0, 0.1)';
              }}
            >
              <img
                src={post.image}
                alt="Blog Visual"
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ padding: '16px' }}>
                <p
                  style={{
                    fontSize: '15px',
                    color: '#333',
                    marginBottom: '10px',
                  }}
                >
                  {post.content}
                </p>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#999',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>— {post.author}</span>
                  <span>{post.timestamp}</span>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    marginTop: '12px',
                    background: 'none',
                    border: 'none',
                    color: '#ff6b6b',
                    fontSize: '13px',
                    cursor: 'pointer',
                    padding: '5px 0',
                  }}
                >
                  ❌ Delete Post
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
