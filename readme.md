Absolutely! Here's a **fun, engaging, GitHub-ready README** with badges, emojis, and screenshot placeholders for your **ClimateQuest** project:

---

# 🌱 ClimateQuest

![License](https://img.shields.io/badge/License-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-13-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-teal) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

**ClimateQuest** is a web app where eco-warriors come together to learn, share, and take action for a greener planet! 🌎

Track your eco-actions, participate in challenges, earn points, and compete with the community—all while having fun! 💚

---

## 🎯 Features

* **Community Feed:** Share your eco-actions and reflections. 📝
* **Task Verification:** Upload images to prove your actions and earn points. 📸
* **Challenges:** Join community challenges and unlock rewards. 🏆
* **Leaderboard:** See top eco-warriors ranked by points. 🥇🥈🥉
* **User Dashboard:** Track your stats, posts, and achievements. 📊
* **Mobile Friendly:** Fully responsive and visually appealing with TailwindCSS. 📱

---

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router, React 18, TypeScript)
* **Backend:** Next.js API routes
* **Database:** MongoDB (Mongoose)
* **Authentication:** NextAuth.js
* **Styling:** TailwindCSS, Lucide Icons
* **Hosting:** Vercel

---

## 🚀 Installation

1. **Clone the repo**

```bash
git clone https://github.com/bhoomiladia/ClimateQuest.git
cd ClimateQuest
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Setup environment variables**

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the dev server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit: `http://0.0.0.0:3000` 🌐

---

## 🗂 Folder Structure

```
app/
├─ community/        # Community feed, tasks, posts
├─ dashboard/        # User stats & profile
├─ globals.css       # Global styles

components/
├─ ui/               # Reusable components (Card, Button, Avatar)

lib/
├─ mongodb.ts        # MongoDB connection helper

models/
├─ Post.ts           # Post schema
├─ User.ts           # User schema
```

---

## 📌 API Endpoints

### `/api/community/posts`

* **GET:** Fetch all posts with user info.
* **POST:** Create a new post:

```json
{
  "content": "Your post content",
  "task": "Optional task description",
  "image": "Optional base64 image",
  "verification": { "success": true, "points": 10 },
  "user": {
    "id": "userId",
    "name": "userName",
    "avatar": "userAvatarUrl"
  }
}
```

### `/api/community/challenges`

* **GET:** Fetch all active challenges.

### `/api/community/leaderboard`

* **GET:** Fetch top users sorted by points.

### `/api/community/verify-task`

* **POST:** Verify a completed task by uploading an image.

---



## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a pull request

---

## 📜 License

MIT License © 2025 Bhoomi Ladia

---

If you want, I can **also make a “fun intro GIF/banner section” for the README** so it looks like a modern GitHub project landing page—super engaging for anyone who opens your repo.

Do you want me to do that next?
