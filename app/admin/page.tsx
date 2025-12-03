'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Users, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Registration {
  id?: number | string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  selected?: boolean;
  selected_at?: string;
  created_at?: string;
  createdAt?: string;
}

const AdminPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Simple password protection
  const handleAuth = () => {
    if (password === 'tedx2025admin') {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/register');
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data.registrations || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch registrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    let filtered = registrations;

    if (searchTerm) {
      filtered = filtered.filter(reg =>
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.phone.includes(searchTerm)
      );
    }

    if (filterRole) {
      filtered = filtered.filter(reg => reg.role === filterRole);
    }

    setFilteredRegistrations(filtered);
  }, [registrations, searchTerm, filterRole]);

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Message', 'Registration Date', 'Selected'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        `"${reg.name}"`,
        `"${reg.email}"`,
        `"${reg.phone}"`,
        `"${reg.role}"`,
        `"${reg.message.replace(/"/g, '""')}"`,
        `"${new Date(reg.created_at || reg.createdAt || '').toLocaleString()}"`,
        `"${reg.selected ? 'Yes' : 'No'}"`,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tedx-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSelectParticipant = async (participantId: number | string | undefined, currentSelected: boolean) => {
    if (!participantId) return;

    try {
      const response = await fetch('/api/select-participant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId,
          selected: !currentSelected,
        }),
      });

      if (response.ok) {
        // Update local state
        setRegistrations(prev =>
          prev.map(reg =>
            (reg.id || reg._id) === participantId
              ? { ...reg, selected: !currentSelected, selected_at: !currentSelected ? new Date().toISOString() : undefined }
              : reg
          )
        );

        toast({
          title: !currentSelected ? "Participant Selected" : "Selection Removed",
          description: !currentSelected
            ? "Selection confirmation email has been sent to the participant."
            : "Participant selection has been removed.",
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update selection');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update participant selection",
        variant: "destructive",
      });
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              <span className="text-[#E62B1E]">TEDx</span> Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                  placeholder="Enter admin password"
                />
              </div>
              <Button
                onClick={handleAuth}
                className="w-full bg-[#E62B1E] hover:bg-[#c41e0f]"
              >
                Access Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E62B1E]" />
      </div>
    );
  }

  const roleStats = registrations.reduce((acc, reg) => {
    acc[reg.role] = (acc[reg.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-neutral-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-[#E62B1E]">TEDx</span> Admin Dashboard
          </h1>
          <p className="text-neutral-400 mt-2">Manage event registrations and view analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-[#E62B1E] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{registrations.length}</div>
              <div className="text-sm text-neutral-400">Total Registrations</div>
            </CardContent>
          </Card>

          {Object.entries(roleStats).map(([role, count]) => (
            <Card key={role}>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-white">{count}</div>
                <div className="text-sm text-neutral-400">{role}s</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Registrations</Label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, or phone"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="w-full sm:w-48">
                <Label htmlFor="filter">Filter by Role</Label>
                <select
                  id="filter"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-700 bg-neutral-900 text-white rounded-md focus:ring-2 focus:ring-[#E62B1E] focus:border-[#E62B1E]"
                >
                  <option value="">All Roles</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Professional">Professional</option>
                  <option value="Guest">Guest</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={exportToCSV}
                  className="bg-[#E62B1E] hover:bg-[#c41e0f] flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Registrations ({filteredRegistrations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Selected</th>
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold">Role</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((registration) => (
                    <tr key={registration.id || registration._id} className={`border-b border-neutral-800 hover:bg-neutral-800 ${registration.selected ? 'bg-green-900/20' : ''}`}>
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={registration.selected || false}
                          onChange={() => handleSelectParticipant(registration.id || registration._id, registration.selected || false)}
                          className="w-4 h-4 text-[#E62B1E] bg-neutral-900 border-neutral-700 rounded focus:ring-[#E62B1E] focus:ring-2 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium">{registration.name}</td>
                      <td className="py-3 px-4">{registration.email}</td>
                      <td className="py-3 px-4">{registration.phone}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{registration.role}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-400">
                        {new Date(registration.created_at || registration.createdAt || '').toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-sm text-neutral-400 line-clamp-2">
                          {registration.message}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRegistrations.length === 0 && (
                <div className="text-center py-8 text-neutral-400">
                  No registrations found matching your criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;