import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockAnalyticsData, mockCompanies } from '@/lib/mockAnalyticsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet-async';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import { GradientHeader } from '@/components/shared/GradientHeader';
import {
  TrendingUp,
  Briefcase,
  Bell,
  Filter
} from 'lucide-react';

// Import chart components
import HiringActivityChart from './components/HiringActivityChart';
import CategoryBreakdown from './components/CategoryBreakdown';
import LocationMap from './components/LocationMap';
import AlertInsights from './components/AlertInsights';
import TrendingRoles from './components/TrendingRoles';
import CompetitorCard from './components/CompetitorCard';

// TODO: Replace mock data with real API calls when Laravel backend is ready
// import api from '@/lib/api';

export default function Analytics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [competitors, setCompetitors] = useState<any[]>([]);

  // Filters
  const [selectedCompetitors, setSelectedCompetitors] = useState<number[]>([]);
  const [timeRange, setTimeRange] = useState(searchParams.get('range') || '30'); // days
  const [category, setCategory] = useState(searchParams.get('category') || 'all');

  useEffect(() => {
    fetchAnalytics();
    fetchCompetitors();
  }, [selectedCompetitors, timeRange, category]);

  const fetchAnalytics = async () => {
    // TODO: Replace with real API call
    // const { data } = await api.get('/b2b/analytics', {
    //   params: {
    //     competitors: selectedCompetitors.join(','),
    //     range: timeRange,
    //     category: category !== 'all' ? category : undefined
    //   }
    // });

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setAnalyticsData(mockAnalyticsData);
      setLoading(false);
    }, 500);
  };

  const fetchCompetitors = async () => {
    // TODO: Replace with real API call
    // const { data } = await api.get('/companies');
    // setCompetitors(data.data || []);

    setCompetitors(mockCompanies);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Analytics - FOMOjobs</title>
        </Helmet>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>FOMO.analytics - Competitive Intelligence | FOMOjobs</title>
        <meta
          name="description"
          content="Analiza konkurencji na rynku pracy. Monitoruj aktywność rekrutacyjną, porównuj wynagrodzenia i śledź trendy w branży."
        />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-background pt-16">
        <GradientHeader
          title="📊 FOMO.analytics"
          subtitle="Analiza rynku pracy dla HR - dane, trendy i insights w jednym miejscu"
          showBackButton
        />

        <div className="container mx-auto px-4 py-12">
          {/* Filters */}
          <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-600" />
              <CardTitle>Filtry Analizy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Competitor Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Konkurenci do porównania
                </label>
                <Select
                  value={selectedCompetitors.join(',')}
                  onValueChange={(val) => setSelectedCompetitors(val.split(',').map(Number))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz konkurentów" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitors.map(comp => (
                      <SelectItem key={comp.id} value={comp.id.toString()}>
                        {comp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Okres czasu
                </label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Ostatnie 7 dni</SelectItem>
                    <SelectItem value="30">Ostatnie 30 dni</SelectItem>
                    <SelectItem value="90">Ostatnie 3 miesiące</SelectItem>
                    <SelectItem value="365">Ostatni rok</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Kategoria stanowisk
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie kategorie</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="finance">Finanse</SelectItem>
                    <SelectItem value="sales">Sprzedaż</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Aktywne Ogłoszenia
              </CardTitle>
              <Briefcase className="w-5 h-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{analyticsData?.total_jobs || 0}</div>
              <p className="text-xs text-green-600 mt-2 font-medium">
                +{analyticsData?.jobs_growth || 0}% vs poprzedni okres
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Najaktywniejsza Firma
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-blue-600">
                {analyticsData?.top_hiring_company?.name || 'N/A'}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {analyticsData?.top_hiring_company?.job_count || 0} aktywnych ogłoszeń
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Najpopularniejsza Pozycja
              </CardTitle>
              <Bell className="w-5 h-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-yellow-600">
                {analyticsData?.top_position?.name || 'N/A'}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {analyticsData?.top_position?.count || 0} ogłoszeń
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                Tempo Rekrutacji
                <span className="text-xs text-gray-400 font-normal" title="Średnia liczba nowych ogłoszeń publikowanych miesięcznie przez wszystkie monitorowane firmy">
                  ⓘ
                </span>
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {analyticsData?.hiring_velocity || 0}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                nowych ofert miesięcznie
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs - Enhanced */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Wybierz Analizę</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Eksploruj dane konkurencji z różnych perspektyw - aktywność rekrutacyjna, kategorie stanowisk, lokalizacje i więcej
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 h-auto bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white h-20 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-200 data-[state=active]:border-purple-600 shadow-sm hover:shadow-md transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Przegląd</span>
            </TabsTrigger>
            <TabsTrigger
              value="hiring"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white h-20 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-200 data-[state=active]:border-blue-600 shadow-sm hover:shadow-md transition-all"
            >
              <Briefcase className="w-5 h-5" />
              <span className="font-semibold">Aktywność</span>
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-600 data-[state=active]:to-yellow-700 data-[state=active]:text-white h-20 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-200 data-[state=active]:border-yellow-600 shadow-sm hover:shadow-md transition-all"
            >
              <Filter className="w-5 h-5" />
              <span className="font-semibold">Kategorie</span>
            </TabsTrigger>
            <TabsTrigger
              value="locations"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white h-20 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-200 data-[state=active]:border-indigo-600 shadow-sm hover:shadow-md transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Lokalizacje</span>
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-600 data-[state=active]:to-orange-700 data-[state=active]:text-white h-20 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-200 data-[state=active]:border-orange-600 shadow-sm hover:shadow-md transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="font-semibold">Alerty</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Competitor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyticsData?.competitors?.map((comp: any) => (
                <CompetitorCard key={comp.id} competitor={comp} />
              ))}
            </div>

            {/* Trending Roles */}
            <TrendingRoles data={analyticsData?.trending_roles || []} />
          </TabsContent>

          {/* Hiring Activity Tab */}
          <TabsContent value="hiring">
            <HiringActivityChart data={analyticsData?.hiring_timeline || []} />
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <CategoryBreakdown data={analyticsData?.category_breakdown || []} />
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations">
            <LocationMap data={analyticsData?.location_data || []} />
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <AlertInsights data={analyticsData?.alert_insights || {}} />
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </>
  );
}
