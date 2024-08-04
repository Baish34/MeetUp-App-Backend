const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sessionTimings: {
    type: String,
    required: true,
  },
  speakers: [
    {
      image: String,
      name: String,
      bio: String,
    },
  ],
  pricing: {
    type: Number,
    default: 0,
  },
  venue: {
    address: String,
    additionalInfo: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  dressCode: {
    type: String,
    default: "",
  },
  ageRestrictions: {
    type: String,
    default: "",
  },
  host: {
    type: String,
    requires: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
