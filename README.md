# Dev Dynasty - Pace University Capstone Project

# Project Overview:
The Moodsphere project enhances music recommendations by factoring in users' emotions to create personalized playlists. Unlike traditional recommenders based on genres or artists, it adjusts suggestions based on users' current emotional states. By analyzing emotions, the system curates playlists that align with users' feelings at any moment, offering a more engaging experience. User profiles store emotional data and music preferences, allowing the system to adapt over time, improving the accuracy of recommendations. Ultimately, the project aims to revolutionize music discovery by combining emotion analysis with adaptive machine learning for a more personalized, emotionally resonant experience.

# 🎵 MoodSphere – Emotion-Based Music Recommendation System

**Capstone Project | Pace University – Seidenberg School of CSIS**  
**Team Dev Dynasty | Class of 2024 | New York City**

---

## 📌 Overview

**MoodSphere** reimagines music recommendation by using your real-time **emotional state** to suggest songs that truly resonate. Unlike traditional systems that rely only on genre or artist, MoodSphere uses **AI-powered emotion detection** to personalize playlists based on how the user feels in the moment.

> Upload a selfie → Predict mood using CNN → Recommend music from Firebase → Curate by artist, genre, or emotion.

---

## 🚀 Features

- 🎭 **Real-time Emotion Prediction** (via CNN model and image upload)
- 🔍 **Search by Genre, Artist, or Mood**
- 🔁 **Firebase Integration** to fetch curated playlists
- 🧠 **User History Aware** (backend-ready for profile-based learning)
- ☁️ **Built with Flask, React (Vite), TensorFlow, and Firebase**

---

## 🛠 Tech Stack

| Frontend   | Backend    | AI/ML        | Cloud & Infra       |
|------------|------------|--------------|----------------------|
| React + Vite | Flask (Python) | TensorFlow + Keras | Firebase, Google Cloud Run, Docker-ready |

---

## 💻 Local Setup

> You can run the project locally on `localhost:5173` (React) and `localhost:5000` (Flask)

### Prerequisites

- Node.js + npm
- Python 3.10+
- Git

### 1. Clone the repository

```bash
git clone https://github.com/htmw/2024S-Dev-Dynasty.git
cd 2024S-Dev-Dynasty
