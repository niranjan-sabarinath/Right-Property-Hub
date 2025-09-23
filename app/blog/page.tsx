"use client"

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
  Search,
  TrendingUp,
  Home,
  DollarSign,
  BookOpen,
  LucideIcon
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

interface Category {
  name: string;
  count: number;
  icon: LucideIcon;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '2024 Real Estate Market Trends: What Buyers Need to Know',
    content: 'The real estate market in 2024 is showing interesting patterns with shifting buyer preferences and market dynamics. As we move through the year, several key trends are emerging that potential buyers should be aware of. Interest rates, while higher than in previous years, have stabilized, creating a more predictable environment for homebuyers. Emerging neighborhoods are gaining popularity as buyers seek better value and more space. The demand for sustainable and energy-efficient homes continues to grow, with many buyers prioritizing green features and smart home technology. Additionally, the work-from-home trend has led to increased interest in properties with dedicated home office spaces and outdoor living areas. Understanding these trends can help buyers make informed decisions in the current market.',
    image: '/images/properties/prestige-rainbow/main.webp',
    category: 'Market Trends',
    author: 'Priya Sharma',
    date: '2024-01-15',
    readTime: '8 min read',
    featured: true
  },
  {
    id: '2',
    title: 'First-Time Homebuyer\'s Complete Guide',
    content: 'Buying your first home is an exciting milestone that requires careful planning and preparation. Start by checking your credit score and saving for a down payment, typically 10-20% of the home\'s price. Get pre-approved for a mortgage to understand your budget and show sellers you\'re a serious buyer. Work with an experienced real estate agent who understands the local market and can guide you through the process. When house hunting, consider both your current needs and future plans, and don\'t forget to factor in additional costs like property taxes, insurance, and maintenance. The home inspection is a crucial step to identify any potential issues before finalizing the purchase. Finally, be prepared for closing costs, which typically range from 2-5% of the home\'s price. With the right preparation and guidance, you can navigate the homebuying process with confidence.',
    image: '/images/properties/indis-vb-city/main.jpg',
    category: 'Buying Guide',
    author: 'Rahul Kapoor',
    date: '2024-01-12',
    readTime: '12 min read'
  },
  {
    id: '3',
    title: 'Investment Properties: Building Wealth Through Real Estate',
    content: 'Real estate investment can be a powerful wealth-building strategy when approached with knowledge and careful planning. Successful investors focus on location, looking for areas with strong job growth, good schools, and amenities. The 1% rule is a helpful guideline - the monthly rent should be at least 1% of the purchase price to ensure positive cash flow. Consider different investment strategies, such as buy-and-hold rentals, house flipping, or vacation rentals, each with its own risk and reward profile. Financing options for investment properties differ from primary residences, with typically higher down payment requirements and interest rates. Don\'t forget to factor in property management costs, maintenance, and potential vacancy periods when calculating returns. Building a diversified real estate portfolio over time can provide both ongoing rental income and long-term appreciation, making it a cornerstone of many successful investment strategies.',
    image: '/images/properties/aikaa-villas/main.jpg',
    category: 'Investment',
    author: 'Ananya Patel',
    date: '2024-01-10',
    readTime: '10 min read',
    featured: true
  },
  {
    id: '4',
    title: 'Home Staging Tips That Actually Sell Houses',
    content: 'Home staging is one of the most effective ways to make your property more appealing to potential buyers and sell it faster, often for a higher price. Start by decluttering and depersonalizing the space to help buyers envision themselves living there. Focus on creating a neutral, inviting atmosphere with a fresh coat of paint in light, neutral colors. Arrange furniture to maximize space and highlight the home\'s best features. Good lighting is essential - open curtains, clean windows, and add lamps to brighten dark corners. In the kitchen and bathrooms, ensure all surfaces are spotless and consider minor updates like new hardware or a fresh backsplash. Curb appeal matters too, so maintain the lawn, add potted plants, and ensure the front entrance is welcoming. Professional staging can yield a significant return on investment, with staged homes typically selling faster and for more money than unstaged ones.',
    image: '/images/properties/dsr-skymarq/main.jpg',
    category: 'Selling Tips',
    author: 'Arjun Reddy',
    date: '2024-01-08',
    readTime: '6 min read'
  },
  {
    id: '5',
    title: 'Understanding Mortgage Options in 2024',
    content: 'With various mortgage options available, choosing the right one is crucial for your financial future. Conventional loans typically require good credit (680+) and a 20% down payment to avoid private mortgage insurance (PMI). FHA loans, backed by the Federal Housing Administration, are popular among first-time buyers as they allow lower down payments (as low as 3.5%) and more flexible credit requirements. VA loans offer excellent benefits for veterans and active military, including no down payment and no PMI. Adjustable-rate mortgages (ARMs) may offer lower initial rates but come with the risk of future rate increases. Fixed-rate mortgages provide stability with consistent payments over the life of the loan. In 2024, consider factors like how long you plan to stay in the home, your financial stability, and interest rate trends when selecting a mortgage. Consulting with a mortgage professional can help you navigate these options and find the best fit for your situation.',
    image: '/images/properties/vaishnaoi-southwoods/main.jpg',
    category: 'Financing',
    author: 'Priya Sharma',
    date: '2024-01-05',
    readTime: '9 min read'
  },
  {
    id: '6',
    title: 'The Rise of Smart Homes: Technology Meets Real Estate',
    content: 'Smart home technology is becoming increasingly important in today\'s real estate market, with many buyers considering it a must-have feature. Modern smart homes offer convenience, security, and energy efficiency through integrated systems that can be controlled via smartphone or voice commands. Popular features include smart thermostats that learn your schedule, smart lighting systems, video doorbells, and integrated security systems. These technologies not only enhance daily living but can also lead to significant energy savings and insurance discounts. When selling, smart home features can increase your home\'s value and appeal to tech-savvy buyers. However, it\'s important to choose systems that are widely compatible and easy to use, as overly complex systems might deter some potential buyers. As technology continues to evolve, we can expect even more innovative smart home solutions that will further transform how we live and interact with our living spaces.',
    image: '/images/properties/msn-realty/main.jpg',
    category: 'Technology',
    author: 'Rahul Kapoor',
    date: '2024-01-03',
    readTime: '7 min read'
  }
];

const categories: Category[] = [
  { name: 'All Posts', count: blogPosts.length, icon: BookOpen },
  { name: 'Market Trends', count: blogPosts.filter((p: BlogPost) => p.category === 'Market Trends').length, icon: TrendingUp },
  { name: 'Buying Guide', count: blogPosts.filter((p: BlogPost) => p.category === 'Buying Guide').length, icon: Home },
  { name: 'Investment', count: blogPosts.filter((p: BlogPost) => p.category === 'Investment').length, icon: DollarSign },
  { name: 'Selling Tips', count: blogPosts.filter((p: BlogPost) => p.category === 'Selling Tips').length, icon: Home },
  { name: 'Financing', count: blogPosts.filter((p: BlogPost) => p.category === 'Financing').length, icon: DollarSign },
  { name: 'Technology', count: blogPosts.filter((p: BlogPost) => p.category === 'Technology').length, icon: TrendingUp }
];

const featuredPosts = blogPosts.filter(post => post.featured);
const recentPosts = blogPosts.slice(0, 3);

const BlogPage = () => {
  const [expandedPosts, setExpandedPosts] = React.useState<{[key: string]: boolean}>({});

  const toggleExpand = (postId: string) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

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
                      <h4 className="text-sm font-medium line-clamp-2">
                        {post.title}
                      </h4>
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <div className="relative">
                        <div 
                          className={`text-gray-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${expandedPosts[post.id] ? 'max-h-full' : 'max-h-24'}`}
                        >
                          {post.content}
                        </div>
                        <button 
                          onClick={() => toggleExpand(post.id)}
                          className="text-primary hover:underline text-sm font-medium mb-2 focus:outline-none"
                        >
                          {expandedPosts[post.id] ? 'Show Less' : 'Read More...'}
                        </button>
                      </div>
                      
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
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        
                        <div className="relative">
                          <div 
                            className={`text-gray-600 leading-relaxed mb-4 overflow-hidden transition-all duration-300 ${expandedPosts[post.id] ? 'max-h-full' : 'max-h-24'}`}
                          >
                            {post.content}
                          </div>
                          <button 
                            onClick={() => toggleExpand(post.id)}
                            className="text-primary hover:underline text-sm font-medium mt-2 focus:outline-none"
                          >
                            {expandedPosts[post.id] ? 'Show Less' : 'Read More'}
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 pt-2 border-t border-gray-100 mt-4">
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