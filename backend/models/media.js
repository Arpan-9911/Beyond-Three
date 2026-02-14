import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['image', 'video', 'social'],
  },
  title: { type: String, default: '' },
  file: { type: String, default: '' },
  url: { type: String, default: '' },
  platform: { type: String, default: '' },
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);
export default Media;