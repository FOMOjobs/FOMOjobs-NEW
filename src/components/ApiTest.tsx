/**
 * API Test Component
 * Simple component to test Laravel API integration
 */

import { useEffect, useState } from 'react';
import { offersAPI, alertsAPI, referenceAPI } from '../api';
import type { Offer, Alert, Company, Position } from '../types/api';

export function ApiTest() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [offersData, alertsData, companiesData, positionsData] = await Promise.all([
          offersAPI.getLatest(),
          alertsAPI.getAll(),
          referenceAPI.getCompanies(),
          referenceAPI.getPositions(),
        ]);

        setOffers(offersData);
        setAlerts(alertsData);
        setCompanies(companiesData);
        setPositions(positionsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Testing API Integration...</h1>
        <p className="text-gray-600">Loading data from {import.meta.env.VITE_USE_MOCKS === 'true' ? 'mock data' : 'Laravel API'}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">API Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">API Integration Test</h1>
        <p className="text-gray-600">
          Mode: <span className="font-semibold">{import.meta.env.VITE_USE_MOCKS === 'true' ? 'Mock Data' : 'Laravel API'}</span>
        </p>
        <p className="text-gray-600">
          API URL: <span className="font-mono text-sm">{import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}</span>
        </p>
      </div>

      {/* Latest Offers */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Offers ({offers.length})</h2>
        <div className="grid gap-4">
          {offers.slice(0, 3).map((offer) => (
            <div key={offer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg">{offer.title}</h3>
              <p className="text-sm text-gray-600">
                {offer.company.name} • {offer.position.name} • {offer.level?.name || 'Any level'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {offer.location} {offer.remote && '• Remote'}
                {offer.salary_min && offer.salary_max && ` • ${offer.salary_min} - ${offer.salary_max} PLN`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* User Alerts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Alerts ({alerts.length})</h2>
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">Keywords: {alert.keywords || 'None'}</p>
                  {alert.excluded_keywords && (
                    <p className="text-sm text-red-600">Excluded: {alert.excluded_keywords}</p>
                  )}
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {alert.frequency}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Positions: {alert.positions.map(p => p.name).join(', ')}</p>
                <p>Companies: {alert.companies.map(c => c.name).join(', ')}</p>
                <p>Levels: {alert.levels.map(l => l.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reference Data */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Reference Data</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Companies ({companies.length})</h3>
            <div className="flex flex-wrap gap-2">
              {companies.slice(0, 10).map((company) => (
                <span key={company.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {company.name}
                </span>
              ))}
              {companies.length > 10 && (
                <span className="text-xs text-gray-500">+{companies.length - 10} more</span>
              )}
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Positions ({positions.length})</h3>
            <div className="flex flex-wrap gap-2">
              {positions.slice(0, 10).map((position) => (
                <span key={position.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {position.name}
                </span>
              ))}
              {positions.length > 10 && (
                <span className="text-xs text-gray-500">+{positions.length - 10} more</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
