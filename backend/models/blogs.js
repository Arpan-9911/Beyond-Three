import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  submittedBy: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  title: {
    en: { type: String, default: '' },
    hi: { type: String, default: '' },
  },
  content: {
    en: { type: String, default: '' },
    hi: { type: String, default: '' },
  },
  image: { type: String, required: true },
  status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;