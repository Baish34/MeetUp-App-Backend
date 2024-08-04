const express = require("express");
const app = express();
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/events.models");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

async function createEvent(newEvent) {
  try {
    const event = new Event(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    res
      .status(201)
      .json({ message: "Event added successfully.", event: savedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add event" });
  }
});

async function readAllEvents() {
  try {
    const allEvents = await Event.find();
    return allEvents;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length !== 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No events found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

async function readEventByTitle(eventTitle) {
  try {
    const event = await Event.findOne({ title: eventTitle });
    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.get("/events/title/:title", async (req, res) => {
  try {
    const event = await readEventByTitle(req.params.title);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

app.get("/events/id/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
