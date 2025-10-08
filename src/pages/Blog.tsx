import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '@/data/blogPosts';

const Blog = () => {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  const categories = ['Wszystkie', 'Rynek pracy', 'Porady', 'Kariera', 'Technologia', 'Wellbeing'];

  return (
    <>
      <Helmet>
        <title>FOMO.blog - Przydatne porady o poszukiwaniu pracy | FOMOjobs</title>
        <meta
          name="description"
          content="Odkryj najważniejsze trendy, strategie i praktyczne wskazówki, które pomogą Ci znaleźć idealną pracę. Blog FOMOjobs."
        />
        <meta name="keywords" content="porady o pracy, szukanie pracy, kariera, rekrutacja, CV, rozmowa kwalifikacyjna" />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient-x text-primary-foreground">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <BookOpen className="w-12 h-12" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="text-white">FOMO</span>.<span className="text-secondary drop-shadow-lg">blog</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-4 opacity-90 max-w-3xl mx-auto">
                Przydatne porady o poszukiwaniu pracy
              </p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Odkryj najważniejsze trendy, strategie i praktyczne wskazówki
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Categories */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'Wszystkie' ? 'default' : 'outline'}
                className={category === 'Wszystkie' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Featured Post */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="grid md:grid-cols-2">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-12 flex items-center justify-center">
                    <div className="text-center">
                      <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary">Polecany</Badge>
                      <BookOpen className="w-24 h-24 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">{featuredPost.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                      <Badge variant="outline">{featuredPost.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      👉 {featuredPost.excerpt}
                    </p>
                    <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-fit">
                      Czytaj więcej
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Other Blog Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-primary/40" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {post.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                        👉 {post.excerpt}
                      </p>
                      <div className="flex items-center text-primary font-semibold text-sm group">
                        <span>Czytaj więcej</span>
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <FOMOJobsFooter />
    </>
  );
};

export default Blog;
