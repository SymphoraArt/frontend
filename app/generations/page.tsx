'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  Download,
  RefreshCw,
  Calendar,
  DollarSign,
  Zap,
  Filter
} from 'lucide-react';
import { useToast } from '../components/hooks/use-toast';

interface Generation {
  id: string;
  status: 'pending' | 'payment_verified' | 'generating' | 'completed' | 'failed';
  imageUrls?: string[];
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
  amountPaid?: string;
  promptId?: string;
  promptTitle?: string; // We'll need to fetch this
}

interface GenerationStats {
  total: number;
  completed: number;
  failed: number;
  pending: number;
  totalSpent: string;
}

export default function MyGenerationsPage() {
  const { toast } = useToast();

  const [generations, setGenerations] = useState<Generation[]>([]);
  const [stats, setStats] = useState<GenerationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  // Fetch generations on mount
  useEffect(() => {
    fetchGenerations();
  }, []);

  const fetchGenerations = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/generations');
      if (!response.ok) {
        throw new Error('Failed to fetch generations');
      }

      const data = await response.json();
      setGenerations(data.generations || []);

      // Calculate stats
      calculateStats(data.generations || []);
    } catch (error: any) {
      console.error('Fetch generations error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your generations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const calculateStats = (gens: Generation[]) => {
    const stats = {
      total: gens.length,
      completed: gens.filter(g => g.status === 'completed').length,
      failed: gens.filter(g => g.status === 'failed').length,
      pending: gens.filter(g => ['pending', 'payment_verified', 'generating'].includes(g.status)).length,
      totalSpent: gens
        .filter(g => g.amountPaid)
        .reduce((sum, g) => sum + parseFloat(g.amountPaid || '0'), 0)
        .toFixed(4)
    };
    setStats(stats);
  };

  const retryGeneration = async (generationId: string) => {
    try {
      // For now, we'll just show a message since retry logic would need to be implemented
      toast({
        title: 'Retry Not Implemented',
        description: 'Retry functionality will be available in the next update.',
      });
    } catch (error: any) {
      console.error('Retry error:', error);
      toast({
        title: 'Retry Failed',
        description: 'Failed to retry generation. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: 'Download Started',
        description: 'Your image download has begun.',
      });
    } catch (error: any) {
      console.error('Download error:', error);
      toast({
        title: 'Download Failed',
        description: 'Failed to download image. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadAllImages = async (generation: Generation) => {
    if (!generation.imageUrls) return;

    for (let i = 0; i < generation.imageUrls.length; i++) {
      const imageUrl = generation.imageUrls[i];
      const filename = `generation-${generation.id}-${i + 1}.png`;
      await downloadImage(imageUrl, filename);

      // Small delay between downloads to avoid overwhelming the browser
      if (i < generation.imageUrls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    toast({
      title: 'All Downloads Started',
      description: `Downloading ${generation.imageUrls.length} images.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'generating':
        return <Zap className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'payment_verified':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      failed: 'destructive',
      generating: 'secondary',
      payment_verified: 'default',
      pending: 'secondary'
    } as const;

    const labels = {
      completed: 'Completed',
      failed: 'Failed',
      generating: 'Generating',
      payment_verified: 'Paid',
      pending: 'Pending'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  const filteredGenerations = generations.filter(generation => {
    if (filter === 'all') return true;
    return generation.status === filter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-gray-600">Loading your generations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Generations</h1>
              <p className="text-lg text-gray-600 mt-2">
                View and manage your AI-generated images
              </p>
            </div>
            <Button onClick={fetchGenerations} disabled={refreshing}>
              {refreshing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.total}</p>
                      <p className="text-sm text-gray-600">Total Generations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.completed}</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.failed}</p>
                      <p className="text-sm text-gray-600">Failed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalSpent} LYX</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Filters */}
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filter:</span>
            {['all', 'completed', 'failed', 'generating', 'pending'].map(status => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(status)}
              >
                {status === 'all' ? 'All' : getStatusBadge(status).props.children}
              </Button>
            ))}
          </div>
        </div>

        {/* Generations Grid */}
        {filteredGenerations.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No generations yet' : `No ${filter} generations`}
            </h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all'
                ? 'Start by generating your first AI image!'
                : `You don't have any ${filter} generations.`
              }
            </p>
            {filter !== 'all' && (
              <Button variant="outline" onClick={() => setFilter('all')}>
                Show All Generations
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGenerations.map(generation => (
              <Card key={generation.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(generation.status)}
                      <CardTitle className="text-lg">
                        Generation #{generation.id.slice(-8)}
                      </CardTitle>
                    </div>
                    {getStatusBadge(generation.status)}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(generation.createdAt)}</span>
                    </div>
                    {generation.amountPaid && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{generation.amountPaid} LYX</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Error Message */}
                  {generation.errorMessage && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{generation.errorMessage}</AlertDescription>
                    </Alert>
                  )}

                  {/* Images Grid */}
                  {generation.imageUrls && generation.imageUrls.length > 0 ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {generation.imageUrls.map((url, index) => (
                          <div key={index} className="relative group aspect-square">
                            <img
                              src={url}
                              alt={`Generated image ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => downloadImage(url, `generation-${generation.id}-${index + 1}.png`)}
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Download All Button */}
                      {generation.imageUrls.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadAllImages(generation)}
                          className="w-full"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download All ({generation.imageUrls.length} images)
                        </Button>
                      )}
                    </div>
                  ) : generation.status === 'completed' ? (
                    <div className="text-center py-8 text-gray-500">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Images not available</p>
                    </div>
                  ) : generation.status === 'generating' ? (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
                      <p className="text-gray-600">Generating your images...</p>
                    </div>
                  ) : null}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    {generation.status === 'failed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => retryGeneration(generation.id)}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                      </Button>
                    )}

                    {generation.status === 'completed' && generation.imageUrls && generation.imageUrls.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadAllImages(generation)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download All
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
