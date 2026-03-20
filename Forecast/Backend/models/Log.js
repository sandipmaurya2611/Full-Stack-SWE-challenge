import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    endpoint: { type: String, required: true },
    params: { type: Object },
    responseTimeMs: { type: Number },
    status: { type: Number },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Log || mongoose.model('Log', logSchema);
