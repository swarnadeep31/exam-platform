import mongoose from "mongoose"

const attempSchema = new mongoose.Schema(
    {
        score : {
            type: Number,
            require: true
        },
        total : {
            type: Number,
            require: true
        },
        answer : {
            type: Object,
            require: true
        },
    },
    {timestamps: true}
)

export default mongoose.model("Attempt",attempSchema)