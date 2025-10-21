import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Briefcase,
  DollarSign,
  Users,
  Calendar,
  Send,
  Eye,
  TrendingUp,
  Award,
  Target,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Percent,
} from 'lucide-react';

interface HeadhunterOpportunity {
  id: string;
  company: string;
  position: string;
  level: string;
  category: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'Office';
  salaryMin: number;
  salaryMax: number;
  urgency: 'high' | 'medium' | 'low';
  commission: number; // percentage
  commissionType: 'percentage' | 'fixed';
  candidatesNeeded: number;
  candidatesSubmitted: number;
  requirements: string[];
  niceToHave: string[];
  postedDate: string;
  deadline: string;
  contactPerson: string;
  contactEmail: string;
  status: 'open' | 'closing-soon' | 'hot';
}

// Mock data for headhunter opportunities
const MOCK_HEADHUNTER_OPPORTUNITIES: HeadhunterOpportunity[] = [
  {
    id: 'HH-001',
    company: 'Google Poland',
    position: 'Senior Backend Engineer',
    level: 'Senior',
    category: 'IT / Software Development',
    location: 'Warszawa',
    workMode: 'Hybrid',
    salaryMin: 18000,
    salaryMax: 24000,
    urgency: 'high',
    commission: 20,
    commissionType: 'percentage',
    candidatesNeeded: 3,
    candidatesSubmitted: 1,
    requirements: ['5+ years Java/Kotlin', 'Spring Boot', 'Microservices', 'Cloud (GCP preferred)'],
    niceToHave: ['Kubernetes', 'CI/CD', 'Leadership experience'],
    postedDate: '2025-01-15',
    deadline: '2025-02-15',
    contactPerson: 'Anna Kowalska',
    contactEmail: 'anna.kowalska@google.com',
    status: 'hot',
  },
  {
    id: 'HH-002',
    company: 'Microsoft',
    position: 'AI/ML Engineer',
    level: 'Mid/Senior',
    category: 'AI / Machine Learning',
    location: 'Remote',
    workMode: 'Remote',
    salaryMin: 20000,
    salaryMax: 28000,
    urgency: 'high',
    commission: 25,
    commissionType: 'percentage',
    candidatesNeeded: 2,
    candidatesSubmitted: 0,
    requirements: ['Python', 'TensorFlow/PyTorch', 'ML algorithms', 'Azure ML'],
    niceToHave: ['PhD in CS/AI', 'Published papers', 'LLM experience'],
    postedDate: '2025-01-18',
    deadline: '2025-02-28',
    contactPerson: 'Piotr Nowak',
    contactEmail: 'piotr.nowak@microsoft.com',
    status: 'hot',
  },
  {
    id: 'HH-003',
    company: 'Deloitte',
    position: 'Senior Financial Analyst',
    level: 'Senior',
    category: 'Księgowość / Finanse',
    location: 'Kraków',
    workMode: 'Hybrid',
    salaryMin: 12000,
    salaryMax: 16000,
    urgency: 'medium',
    commission: 15,
    commissionType: 'percentage',
    candidatesNeeded: 5,
    candidatesSubmitted: 3,
    requirements: ['CFA/ACCA', '5+ years experience', 'Financial modeling', 'English C1'],
    niceToHave: ['Big4 experience', 'SAP', 'Power BI'],
    postedDate: '2025-01-10',
    deadline: '2025-02-20',
    contactPerson: 'Maria Wiśniewska',
    contactEmail: 'maria.wisniewska@deloitte.com',
    status: 'open',
  },
  {
    id: 'HH-004',
    company: 'Amazon',
    position: 'DevOps Engineer',
    level: 'Mid',
    category: 'DevOps / Cloud',
    location: 'Wrocław',
    workMode: 'Hybrid',
    salaryMin: 16000,
    salaryMax: 22000,
    urgency: 'high',
    commission: 18,
    commissionType: 'percentage',
    candidatesNeeded: 4,
    candidatesSubmitted: 2,
    requirements: ['AWS', 'Docker/Kubernetes', 'Terraform', 'CI/CD pipelines'],
    niceToHave: ['Python/Go', 'Monitoring tools', 'Security'],
    postedDate: '2025-01-12',
    deadline: '2025-02-10',
    contactPerson: 'Jakub Lewandowski',
    contactEmail: 'jakub.lewandowski@amazon.com',
    status: 'closing-soon',
  },
  {
    id: 'HH-005',
    company: 'Meta',
    position: 'Product Manager',
    level: 'Senior',
    category: 'Project Management',
    location: 'Warszawa',
    workMode: 'Hybrid',
    salaryMin: 22000,
    salaryMax: 30000,
    urgency: 'medium',
    commission: 22,
    commissionType: 'percentage',
    candidatesNeeded: 2,
    candidatesSubmitted: 1,
    requirements: ['5+ years PM experience', 'Tech background', 'Agile/Scrum', 'Stakeholder management'],
    niceToHave: ['MBA', 'B2C products', 'Data-driven approach'],
    postedDate: '2025-01-14',
    deadline: '2025-03-01',
    contactPerson: 'Katarzyna Zielińska',
    contactEmail: 'katarzyna.zielinska@meta.com',
    status: 'open',
  },
  {
    id: 'HH-006',
    company: 'NVIDIA',
    position: 'Computer Vision Engineer',
    level: 'Senior',
    category: 'AI / Machine Learning',
    location: 'Remote',
    workMode: 'Remote',
    salaryMin: 24000,
    salaryMax: 32000,
    urgency: 'high',
    commission: 25,
    commissionType: 'percentage',
    candidatesNeeded: 1,
    candidatesSubmitted: 0,
    requirements: ['OpenCV', 'Deep Learning', 'CUDA', 'C++/Python'],
    niceToHave: ['PhD', 'Published research', 'Automotive/Robotics'],
    postedDate: '2025-01-16',
    deadline: '2025-02-25',
    contactPerson: 'Tomasz Kowalczyk',
    contactEmail: 'tomasz.kowalczyk@nvidia.com',
    status: 'hot',
  },
  {
    id: 'HH-007',
    company: 'PwC',
    position: 'IT Auditor',
    level: 'Mid',
    category: 'Księgowość / Finanse',
    location: 'Gdańsk',
    workMode: 'Hybrid',
    salaryMin: 10000,
    salaryMax: 14000,
    urgency: 'low',
    commission: 12,
    commissionType: 'percentage',
    candidatesNeeded: 6,
    candidatesSubmitted: 4,
    requirements: ['CISA/CIA', '3+ years audit', 'IT systems knowledge', 'English B2+'],
    niceToHave: ['Big4 experience', 'GDPR', 'Risk management'],
    postedDate: '2025-01-08',
    deadline: '2025-03-15',
    contactPerson: 'Agnieszka Dąbrowska',
    contactEmail: 'agnieszka.dabrowska@pwc.com',
    status: 'open',
  },
  {
    id: 'HH-008',
    company: 'Salesforce',
    position: 'Senior Solution Architect',
    level: 'Senior',
    category: 'IT / Software Development',
    location: 'Poznań',
    workMode: 'Hybrid',
    salaryMin: 20000,
    salaryMax: 26000,
    urgency: 'medium',
    commission: 20,
    commissionType: 'percentage',
    candidatesNeeded: 2,
    candidatesSubmitted: 1,
    requirements: ['Salesforce certifications', 'Solution architecture', '5+ years', 'CRM'],
    niceToHave: ['Technical Architect cert', 'Integration patterns', 'Apex'],
    postedDate: '2025-01-11',
    deadline: '2025-02-28',
    contactPerson: 'Paweł Jankowski',
    contactEmail: 'pawel.jankowski@salesforce.com',
    status: 'open',
  },
];

type SortOption = 'commission' | 'salary' | 'urgency' | 'deadline';
type FilterUrgency = 'all' | 'high' | 'medium' | 'low';
type FilterCategory = 'all' | string;

export default function HeadhunterBoardPanel() {
  const [sortBy, setSortBy] = useState<SortOption>('commission');
  const [filterUrgency, setFilterUrgency] = useState<FilterUrgency>('all');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered and sorted opportunities
  const opportunities = useMemo(() => {
    let filtered = [...MOCK_HEADHUNTER_OPPORTUNITIES];

    // Filter by urgency
    if (filterUrgency !== 'all') {
      filtered = filtered.filter((opp) => opp.urgency === filterUrgency);
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter((opp) => opp.category === filterCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (opp) =>
          opp.position.toLowerCase().includes(query) ||
          opp.company.toLowerCase().includes(query) ||
          opp.category.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'commission':
          return b.commission - a.commission;
        case 'salary':
          return (b.salaryMax + b.salaryMin) / 2 - (a.salaryMax + a.salaryMin) / 2;
        case 'urgency':
          const urgencyOrder = { high: 3, medium: 2, low: 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [sortBy, filterUrgency, filterCategory, searchQuery]);

  const getUrgencyBadge = (urgency: string) => {
    const config = {
      high: { text: 'High Priority', color: 'bg-red-100 text-red-700 border-red-300' },
      medium: { text: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      low: { text: 'Low Priority', color: 'bg-gray-100 text-gray-700 border-gray-300' },
    };
    return config[urgency as keyof typeof config];
  };

  const getStatusBadge = (status: string) => {
    const config = {
      hot: { text: '🔥 HOT', color: 'bg-orange-100 text-orange-700 border-orange-300' },
      'closing-soon': { text: '⏰ Closing Soon', color: 'bg-purple-100 text-purple-700 border-purple-300' },
      open: { text: '✅ Open', color: 'bg-green-100 text-green-700 border-green-300' },
    };
    return config[status as keyof typeof config];
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">💼 Headhunter Opportunities Board</h2>
            <p className="text-indigo-100 mt-1">
              Exclusive opportunities for recruitment agencies and headhunters
            </p>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Total Opportunities</p>
              <p className="text-4xl font-bold mt-1">{MOCK_HEADHUNTER_OPPORTUNITIES.length}</p>
              <p className="text-indigo-100 text-xs mt-2">Active positions</p>
            </div>
            <Target className="w-10 h-10 text-indigo-200" />
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm">Avg Commission</p>
              <p className="text-4xl font-bold mt-1">
                {Math.round(
                  MOCK_HEADHUNTER_OPPORTUNITIES.reduce((sum, opp) => sum + opp.commission, 0) /
                    MOCK_HEADHUNTER_OPPORTUNITIES.length
                )}%
              </p>
              <p className="text-green-100 text-xs mt-2">On placement</p>
            </div>
            <Percent className="w-10 h-10 text-green-200" />
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-orange-100 text-sm">Hot Opportunities</p>
              <p className="text-4xl font-bold mt-1">
                {MOCK_HEADHUNTER_OPPORTUNITIES.filter((o) => o.status === 'hot').length}
              </p>
              <p className="text-orange-100 text-xs mt-2">High priority</p>
            </div>
            <Award className="w-10 h-10 text-orange-200" />
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Candidates Needed</p>
              <p className="text-4xl font-bold mt-1">
                {MOCK_HEADHUNTER_OPPORTUNITIES.reduce((sum, opp) => sum + opp.candidatesNeeded, 0)}
              </p>
              <p className="text-purple-100 text-xs mt-2">Across all positions</p>
            </div>
            <Users className="w-10 h-10 text-purple-200" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <Label className="mb-2 block text-sm">Search</Label>
            <Input
              placeholder="Position, company, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort by */}
          <div>
            <Label className="mb-2 block text-sm">Sort by</Label>
            <Select value={sortBy} onValueChange={(val: SortOption) => setSortBy(val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commission">Highest Commission</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
                <SelectItem value="urgency">Urgency</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter by urgency */}
          <div>
            <Label className="mb-2 block text-sm">Urgency</Label>
            <Select value={filterUrgency} onValueChange={(val: FilterUrgency) => setFilterUrgency(val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter by category */}
          <div>
            <Label className="mb-2 block text-sm">Category</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="IT / Software Development">IT / Software</SelectItem>
                <SelectItem value="AI / Machine Learning">AI / ML</SelectItem>
                <SelectItem value="DevOps / Cloud">DevOps / Cloud</SelectItem>
                <SelectItem value="Księgowość / Finanse">Finance</SelectItem>
                <SelectItem value="Project Management">Project Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Opportunities List */}
      <div className="space-y-4">
        {opportunities.map((opp) => {
          const daysLeft = getDaysUntilDeadline(opp.deadline);
          const fillRate = (opp.candidatesSubmitted / opp.candidatesNeeded) * 100;

          return (
            <Card
              key={opp.id}
              className="p-6 bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-xl transition-all"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {opp.position}
                      </h3>
                      <Badge variant="outline" className={getStatusBadge(opp.status).color}>
                        {getStatusBadge(opp.status).text}
                      </Badge>
                      <Badge variant="outline" className={getUrgencyBadge(opp.urgency).color}>
                        {getUrgencyBadge(opp.urgency).text}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {opp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {opp.location} • {opp.workMode}
                      </span>
                      <Badge variant="secondary">{opp.level}</Badge>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-indigo-600">{opp.commission}%</div>
                    <div className="text-xs text-gray-500">Commission</div>
                  </div>
                </div>

                {/* Salary & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Salary Range</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {(opp.salaryMin / 1000).toFixed(0)}k - {(opp.salaryMax / 1000).toFixed(0)}k PLN
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Candidates</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {opp.candidatesSubmitted} / {opp.candidatesNeeded} submitted
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{ width: `${fillRate}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Deadline</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {daysLeft} days left
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(opp.deadline).toLocaleDateString('pl-PL')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Must Have:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {opp.requirements.map((req, idx) => (
                        <Badge key={idx} variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Nice to Have:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {opp.niceToHave.map((nice, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 text-xs">
                          {nice}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Contact: </span>
                    <span className="font-semibold text-gray-900 dark:text-white">{opp.contactPerson}</span>
                    <span className="text-gray-500 ml-2">{opp.contactEmail}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                      Submit Candidate
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {opportunities.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">No opportunities match your filters</p>
        </Card>
      )}
    </div>
  );
}
