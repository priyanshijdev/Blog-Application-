"use client"
import { useState, useEffect } from "react"
import { getBlogPosts, getCategories } from "@/lib/blog"
import BlogCard from "@/components/blog-card"
import CategoryFilter from "@/components/category-filter"
import type { Post } from "@/lib/blog"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const allPosts = await getBlogPosts()
        const allCategories = await getCategories()

        setPosts(allPosts)
        setFilteredPosts(allPosts)
        setCategories(allCategories)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFilterChange = (category: string) => {
    if (category === "All") {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter((post) => post.category === category))
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-800"></div>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>

      <CategoryFilter categories={categories} onCategoryChange={handleFilterChange} />

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No posts found for this category.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
