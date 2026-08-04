import { Schema, model, models } from "mongoose"

const mediaSchema = new Schema({
    asset_id: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    secure_url: {
        type: String,
        required: true,
    },
    path: {
        type: String,
    },
    thumbnail_url: {
        type: String,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true })

const MediaModel = models.Media || model('Media', mediaSchema)

export default MediaModel