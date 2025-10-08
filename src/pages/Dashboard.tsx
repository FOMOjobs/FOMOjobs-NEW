import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Users, Briefcase, Target, Bell, Filter, Search, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedCompetitor, setSelectedCompetitor] = useState('all');

  // Mock data for charts
  const trafficData = [
    { date: '2024-01-01', current: 1200, previous: 800 },
    { date: '2024-01-08', current: 1350, previous: 900 },
    { date: '2024-01-15', current: 1100, previous: 950 },
    { date: '2024-01-22', current: 1500, previous: 1100 },
    { date: '2024-01-29', current: 1800, previous: 1200 },
  ];

  const competitorData = [
    { platform: 'Indeed', positions: 245, change: '+12%', trend: 'up' },
    { platform: 'LinkedIn', positions: 189, change: '+8%', trend: 'up' },
    { platform: 'Glassdoor', positions: 156, change: '-3%', trend: 'down' },
    { platform: 'Pracuj.pl', positions: 134, change: '+15%', trend: 'up' },
    { platform: 'NoFluffJobs', positions: 98, change: '+5%', trend: 'up' },
  ];

  const roleInsights = [
    { role: 'Fullstack Developer', positions: 45, interviews: 12, screening: 23 },
    { role: 'Frontend Developer', positions: 38, interviews: 8, screening: 19 },
    { role: 'Backend Developer', positions: 32, interviews: 6, screening: 15 },
    { role: 'DevOps Engineer', positions: 28, interviews: 9, screening: 12 },
    { role: 'QA Engineer', positions: 24, interviews: 5, screening: 11 },
    { role: 'Product Manager', positions: 18, interviews: 4, screening: 8 },
  ];

  const completionRate = 73;

  return (
    <>
      <SEO
        title="FOMO.dashboards - Analityka Konkurencji | FOMOjobs"
        description="Dashboard analityki konkurencji FOMOjobs. Śledź pozycje, trendy i insights z rynku pracy."
      />

      <div className="min-h-screen bg-background">

        {/* Navigation Header */}
        <div className="bg-card border-b border-border sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link to="/" className="text-xl font-bold text-gradient">
                  FOMO<span className="text-secondary">jobs</span>
                </Link>
                <span className="text-muted-foreground">|</span>
                <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Dostosuj
                </Button>
                <Button size="sm" className="gap-2 bg-gradient-primary hover:shadow-primary">
                  <Bell className="w-4 h-4" />
                  Alerty
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary via-accent to-primary/90 dark:from-primary/80 dark:via-accent/80 dark:to-primary/70 text-primary-foreground py-12"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Analityka Konkurencji</h2>
                <p className="text-xl opacity-95 max-w-2xl drop-shadow">
                  Monitoruj trendy rynku pracy i wyprzedzaj konkurencję. Wszystkie insights w jednym miejscu.
                </p>
              </div>
              <div className="flex gap-3">
                <Button size="lg" className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg">
                  <Filter className="w-5 h-5" />
                  Filtry
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-lg">
                  <Search className="w-5 h-5" />
                  Wyszukaj
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Wybierz stanowisko" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie stanowiska</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="qa">QA Engineer</SelectItem>
                <SelectItem value="pm">Product Manager</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCompetitor} onValueChange={setSelectedCompetitor}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Wybierz konkurenta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszyscy konkurenci</SelectItem>
                <SelectItem value="indeed">Indeed</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="glassdoor">Glassdoor</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Key Metrics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="hover-lift shadow-card border-0 bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktywne pozycje</CardTitle>
                <Briefcase className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">1,247</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% vs poprzedni miesiąc
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-card border-0 bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Konkurenci</CardTitle>
                <Users className="h-5 w-5 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">24</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Monitorowanych platform
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-card border-0 bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Współczynnik aplikacji</CardTitle>
                <Target className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{completionRate}%</div>
                <Progress value={completionRate} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Średnia skuteczność aplikacji
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-card border-0 bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Najgorętsze stanowisko</CardTitle>
                <TrendingUp className="h-5 w-5 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">Fullstack Developer</div>
                <Badge className="mt-1 bg-secondary text-secondary-foreground">45 pozycji</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Najwięcej ofert w tym tygodniu
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {/* Traffic Overview */}
            <Card className="col-span-1 shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Ruch na pozycjach konkurentów
                </CardTitle>
                <CardDescription>Porównanie aktualnego i poprzedniego okresu (28 dni)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString('pl-PL', { month: 'short', day: 'numeric' })}
                      className="text-muted-foreground"
                    />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      labelFormatter={(value) => new Date(value).toLocaleDateString('pl-PL')}
                      formatter={(value, name) => [value, name === 'current' ? 'Aktualny okres' : 'Poprzedni okres']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      name="current"
                    />
                    <Line
                      type="monotone"
                      dataKey="previous"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="previous"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Competitor Breakdown */}
            <Card className="col-span-1 shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-secondary" />
                  Podział konkurentów
                </CardTitle>
                <CardDescription>Liczba publikowanych pozycji na platformach</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={competitorData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="platform" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar
                      dataKey="positions"
                      fill="hsl(var(--primary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Tables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Competitor Table */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle>Ranking konkurentów</CardTitle>
                <CardDescription>Aktywność platform w ostatnich 7 dniach</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platforma</TableHead>
                      <TableHead className="text-right">Pozycje</TableHead>
                      <TableHead className="text-right">Zmiana</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitorData.map((competitor, index) => (
                      <TableRow key={competitor.platform}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Badge variant={index < 3 ? "default" : "secondary"} className={index < 3 ? "bg-gradient-primary" : ""}>
                              {index + 1}
                            </Badge>
                            {competitor.platform}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {competitor.positions}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`flex items-center justify-end gap-1 ${
                            competitor.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {competitor.trend === 'up' ?
                              <TrendingUp className="w-3 h-3" /> :
                              <TrendingDown className="w-3 h-3" />
                            }
                            {competitor.change}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Role-specific Insights */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle>Insights według stanowisk</CardTitle>
                <CardDescription>Analiza procesów rekrutacyjnych</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stanowisko</TableHead>
                      <TableHead className="text-right">Pozycje</TableHead>
                      <TableHead className="text-right">Rozmowy</TableHead>
                      <TableHead className="text-right">Screening</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roleInsights.map((role) => (
                      <TableRow key={role.role}>
                        <TableCell className="font-medium">{role.role}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline">{role.positions}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-secondary text-secondary-foreground">{role.interviews}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-gradient-primary text-white">{role.screening}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
