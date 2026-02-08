import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: {
    en: { type: String, default: '' },
    hi: { type: String, default: '' },
  },
  description: {
    en: { type: String, default: '' },
    hi: { type: String, default: '' },
  },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;