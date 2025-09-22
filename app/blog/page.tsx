import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Search,
  TrendingUp,
  Home,
  DollarSign,
  BookOpen
} from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: '2024 Real Estate Market Trends: What Buyers Need to Know',
    excerpt: 'Discover the latest trends shaping the real estate market in 2024, from interest rates to emerging neighborhoods.',
    content: 'The real estate market in 2024 is showing interesting patterns...',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Market Trends',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min read',
    featured: true
  },
  {
    id: '2',
    title: 'First-Time Homebuyer\'s Complete Guide',
    excerpt: 'Everything you need to know about buying your first home, from getting pre-approved to closing day.',
    content: 'Buying your first home is an exciting milestone...',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Buying Guide',
    author: 'Michael Chen',
    date: '2024-01-12',
    readTime: '12 min read'
  },
  {
    id: '3',
    title: 'Investment Properties: Building Wealth Through Real Estate',
    excerpt: 'Learn how to evaluate investment properties and build a profitable real estate portfolio.',
    content: 'Real estate investment can be a powerful wealth-building strategy...',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Investment',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    readTime: '10 min read',
    featured: true
  },
  {
    id: '4',
    title: 'Home Staging Tips That Actually Sell Houses',
    excerpt: 'Professional staging tips to help your property sell faster and for a better price.',
    content: 'Home staging is one of the most effective ways to sell your property...',
    image: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Selling Tips',
    author: 'David Park',
    date: '2024-01-08',
    readTime: '6 min read'
  },
  {
    id: '5',
    title: 'Understanding Mortgage Options in 2024',
    excerpt: 'A comprehensive guide to different mortgage types and how to choose the right one for your situation.',
    content: 'With various mortgage options available, choosing the right one...',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Financing',
    author: 'Sarah Johnson',
    date: '2024-01-05',
    readTime: '9 min read'
  },
  {
    id: '6',
    title: 'The Rise of Smart Homes: Technology Meets Real Estate',
    excerpt: 'How smart home technology is changing property values and buyer expectations.',
    content: 'Smart home technology is becoming increasingly important...',
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    author: 'Michael Chen',
    date: '2024-01-03',
    readTime: '7 min read'
  }
];

const categories = [
  { name: 'All Posts', count: blogPosts.length, icon: BookOpen },
  { name: 'Market Trends', count: 1, icon: TrendingUp },
  { name: 'Buying Guide', count: 1, icon: Home },
  { name: 'Investment', count: 1, icon: DollarSign },
  { name: 'Selling Tips', count: 1, icon: ArrowRight },
  { name: 'Financing', count: 1, icon: DollarSign },
  { name: 'Technology', count: 1, icon: TrendingUp }
];

const featuredPosts = blogPosts.filter(post => post.featured);
const recentPosts = blogPosts.slice(0, 3);

const BlogPage = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Real Estate Insights"
        subtitle="Stay informed with the latest real estate trends, market analysis, and expert advice to make smarter property decisions."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs text-white">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex space-x-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/blog/${post.id}`}>
                        <h4 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(post.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Featured Posts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="pt-6">
                      <Badge variant="secondary" className="mb-3 text-white">
                        {post.category}
                      </Badge>
                      <Link href={`/blog/${post.id}`}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* All Posts */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">All Articles</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Button variant="ghost" size="sm">Latest</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3 aspect-video md:aspect-auto relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="md:w-2/3 pt-6">
                        <Badge variant="secondary" className="mb-3 text-white">
                          {post.category}
                        </Badge>
                        
                        <Link href={`/blog/${post.id}`}>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.id}`}>
                              Read More
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;