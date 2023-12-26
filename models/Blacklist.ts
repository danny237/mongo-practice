import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BlackListSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('blacklist', BlackListSchema)
