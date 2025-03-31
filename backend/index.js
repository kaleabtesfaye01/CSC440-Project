import express from "express";

const PORT = 5050;

const app = express();

app.get("/", (req, res) => {
  res.send("Smart Booking System Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
