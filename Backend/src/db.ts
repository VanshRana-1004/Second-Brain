import mongoose,{  Types } from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const userModel = mongoose.model('User', userSchema);

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String, ref: 'Tags' }],
  date: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const contentModel = mongoose.model('Content', contentSchema);

const tagsSchema = new mongoose.Schema({
  tag: { type: String, unique: true, required: true },
  contentId: [{ type: Types.ObjectId, ref: 'Content' }],
});

export const tagsModel = mongoose.model('Tags', tagsSchema);

const linkSchema = new mongoose.Schema({
  hash: { type: String, unique: true, required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  enabled: { type: Boolean},
});

export const linkModel = mongoose.model('Link', linkSchema);