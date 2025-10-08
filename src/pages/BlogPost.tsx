import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, BookOpen, User, ArrowRight } from 'lucide-react';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
import { Helmet } from 'react-helmet-async';
import { blogPosts, ContentSection } from '@/data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <FOMOJobsNavbar />
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Artykuł nie znaleziony</h1>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Powrót do bloga
              </Button>
            </Link>
          </div>
        </div>
        <FOMOJobsFooter />
      </>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const renderContent = (section: ContentSection, index: number) => {
    switch (section.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-lg leading-relaxed text-muted-foreground mb-6">
            {section.content}
          </p>
        );

      case 'heading':
        return (
          <h2 key={index} className="text-3xl font-bold text-foreground mb-6 mt-12">
            {section.content}
          </h2>
        );

      case 'subheading':
        return (
          <h3 key={index} className="text-2xl font-semibold text-foreground mb-4 mt-8">
            {section.content}
          </h3>
        );

      case 'list':
        return (
          <ul key={index} className="space-y-3 mb-6 ml-6">
            {section.items?.map((item, i) => (
              <li key={i} className="text-lg text-muted-foreground list-disc">
                {item}
              </li>
            ))}
          </ul>
        );

      case 'icon-list':
        return (
          <ul key={index} className="space-y-3 mb-6">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl">✓</span>
                <span className="text-lg text-muted-foreground flex-1">{item}</span>
              </li>
            ))}
          </ul>
        );

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-primary bg-primary/5 p-6 my-8 italic text-lg">
            "{section.content}"
          </blockquote>
        );

      case 'table':
        return (
          <div key={index} className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  {section.tableData?.headers.map((header, i) => (
                    <th key={i} className="border border-primary/20 p-4 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.tableData?.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    {row.map((cell, j) => (
                      <td key={j} className="border border-primary/20 p-4 text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'stats':
        return (
          <div key={index} className="grid md:grid-cols-3 gap-6 my-12">
            {section.statsData?.map((stat, i) => (
              <Card key={i} className="border-0 shadow-card bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | FOMO.blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, porady o pracy, FOMOjobs`} />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-16">
        {/* Article Header */}
        <div className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient-x text-primary-foreground">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/blog">
                <Button variant="outline" size="sm" className="mb-6 border-white/30 text-white hover:bg-white/10">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Powrót do bloga
                </Button>
              </Link>

              <Badge className="mb-4 bg-white/10">{post.category}</Badge>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-card p-8 md:p-12 mb-12">
                {post.content.map((section, index) => renderContent(section, index))}
              </Card>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-6">Powiązane artykuły</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                      <Card className="border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-primary/40" />
                        </div>
                        <CardContent className="p-6">
                          <Badge variant="outline" className="text-xs mb-3">
                            {relatedPost.category}
                          </Badge>
                          <h4 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center text-primary font-semibold text-sm group">
                            <span>Czytaj więcej</span>
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <FOMOJobsFooter />
    </>
  );
};

export default BlogPost;
