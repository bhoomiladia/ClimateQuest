"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Users, Thermometer, Droplets, Wind, Leaf, Globe, Lightbulb, Target } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Understanding the Greenhouse Effect",
    excerpt: "Learn how greenhouse gases trap heat in Earth's atmosphere and why this matters for our planet's future.",
    readTime: "5 min read",
    category: "Climate Basics",
    difficulty: "Beginner",
    icon: Thermometer,
    image: "/greenhouse-effect-diagram-for-kids.jpg",
  },
  {
    id: 2,
    title: "The Water Cycle and Climate Change",
    excerpt: "Discover how rising temperatures are affecting precipitation patterns and water availability worldwide.",
    readTime: "7 min read",
    category: "Water & Weather",
    difficulty: "Intermediate",
    icon: Droplets,
    image: "/water-cycle-climate-change-illustration.jpg",
  },
  {
    id: 3,
    title: "Renewable Energy for Beginners",
    excerpt: "Explore solar, wind, and other clean energy sources that can help reduce carbon emissions.",
    readTime: "6 min read",
    category: "Clean Energy",
    difficulty: "Beginner",
    icon: Wind,
    image: "/renewable-energy-sources-for-kids.jpg",
  },
  {
    id: 4,
    title: "Biodiversity and Ecosystem Health",
    excerpt: "Learn why protecting different species and habitats is crucial for fighting climate change.",
    readTime: "8 min read",
    category: "Nature & Wildlife",
    difficulty: "Intermediate",
    icon: Leaf,
    image: "/biodiversity-ecosystem-illustration.jpg",
  },
  {
    id: 5,
    title: "Climate Action Around the World",
    excerpt: "Discover inspiring stories of young climate activists and successful environmental projects globally.",
    readTime: "10 min read",
    category: "Global Impact",
    difficulty: "Advanced",
    icon: Globe,
    image: "/global-climate-action-youth-activists.jpg",
  },
  {
    id: 6,
    title: "Simple Climate Solutions at Home",
    excerpt: "Practical tips and tricks for reducing your carbon footprint through everyday actions.",
    readTime: "4 min read",
    category: "Take Action",
    difficulty: "Beginner",
    icon: Lightbulb,
    image: "/home-climate-solutions-for-families.jpg",
  },
]

const learningModules = [
  {
    title: "Climate Science Fundamentals",
    lessons: 12,
    duration: "2 hours",
    level: "Beginner",
    icon: Thermometer,
    color: "bg-[#E7FFCE]",
  },
  {
    title: "Sustainable Living Guide",
    lessons: 8,
    duration: "1.5 hours",
    level: "Beginner",
    icon: Leaf,
    color: "bg-[#D8FFB1]",
  },
  {
    title: "Climate Policy & Solutions",
    lessons: 15,
    duration: "3 hours",
    level: "Advanced",
    icon: Target,
    color: "bg-[#B6DA9F]",
  },
]

const categories = [
  "All",
  "Climate Basics",
  "Water & Weather",
  "Clean Energy",
  "Nature & Wildlife",
  "Global Impact",
  "Take Action",
]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

export default function StudyPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const categoryMatch = selectedCategory === "All" || post.category === selectedCategory
    const difficultyMatch = selectedDifficulty === "All" || post.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FAE9] to-[#E7FFCE]">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[var(--font-poppins)] text-[#2D5016]">
            Climate Study Hub
          </h1>
          <p className="text-xl text-[#4A7C59] mb-8 max-w-3xl mx-auto">
            Explore engaging articles, interactive lessons, and practical guides to become a climate champion. Learn at
            your own pace with content designed for young environmental leaders.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-[#B6DA9F]">
              <BookOpen className="w-5 h-5 text-[#A8D38D]" />
              <span className="text-[#2D5016] font-medium">50+ Articles</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-[#B6DA9F]">
              <Users className="w-5 h-5 text-[#A8D38D]" />
              <span className="text-[#2D5016] font-medium">Community Learning</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-[#B6DA9F]">
              <Clock className="w-5 h-5 text-[#A8D38D]" />
              <span className="text-[#2D5016] font-medium">Self-Paced</span>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#E7FFCE] to-[#D8FFB1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-[var(--font-poppins)] text-[#2D5016]">
            Interactive Learning Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningModules.map((module, index) => (
              <Card
                key={index}
                className="bg-white/90 border-[#B6DA9F] hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${module.color} flex items-center justify-center mb-4`}>
                    <module.icon className="w-8 h-8 text-[#2D5016]" />
                  </div>
                  <CardTitle className="text-[#2D5016] font-[var(--font-poppins)]">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-[#4A7C59]">
                      <span>{module.lessons} lessons</span>
                      <span>{module.duration}</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#F2FAE9] text-[#2D5016] border-[#B6DA9F]">
                      {module.level}
                    </Badge>
                  </div>
                  <Button className="w-full bg-[#A8D38D] hover:bg-[#B6DA9F] text-[#2D5016]">Start Learning</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-[var(--font-poppins)] text-[#2D5016]">
            Climate Education Blog
          </h2>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[#2D5016] mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-[#A8D38D] text-[#2D5016] hover:bg-[#B6DA9F]"
                        : "border-[#B6DA9F] text-[#4A7C59] hover:bg-[#F2FAE9]"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#2D5016] mb-2">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={
                      selectedDifficulty === difficulty
                        ? "bg-[#A8D38D] text-[#2D5016] hover:bg-[#B6DA9F]"
                        : "border-[#B6DA9F] text-[#4A7C59] hover:bg-[#F2FAE9]"
                    }
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="bg-white/90 border-[#B6DA9F] hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <post.icon className="w-5 h-5 text-[#A8D38D]" />
                    <Badge variant="secondary" className="bg-[#F2FAE9] text-[#2D5016] border-[#B6DA9F] text-xs">
                      {post.category}
                    </Badge>
                    <Badge variant="outline" className="border-[#B6DA9F] text-[#4A7C59] text-xs">
                      {post.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-[#2D5016] font-[var(--font-poppins)] text-lg leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A7C59] text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#4A7C59] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <Button size="sm" className="bg-[#A8D38D] hover:bg-[#B6DA9F] text-[#2D5016]">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
