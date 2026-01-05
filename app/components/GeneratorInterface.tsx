'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, AlertCircle, CheckCircle, Clock, Image as ImageIcon, Zap } from 'lucide-react';
import { useToast } from './hooks/use-toast';
import { PaymentModal } from './PaymentModal';

interface Variable {
  id: string;
  name: string;
  type: 'text' | 'slider' | 'checkbox' | 'select' | 'multi-select';
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; promptValue: string }[];
  defaultValue?: any;
}

interface Prompt {
  id: string;
  title: string;
  description?: string;
  price?: string; // Price in LYX
  creatorAddress?: string; // LUKSO address for payments
  variables: Variable[];
}

interface GenerationRequest {
  promptId: string;
  variableValues: Record<string, any>;
  settings?: {
    aspectRatio?: string;
    numImages?: number;
    modelVersion?: string;
  };
  transactionHash?: string; // For paid generations
}

interface Generation {
  id: string;
  status: 'pending' | 'payment_verified' | 'generating' | 'completed' | 'failed';
  imageUrls?: string[];
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

interface GenerationStatus {
  status: string;
  progress?: number;
  estimatedTimeRemaining?: number;
  errorMessage?: string;
}

export function GeneratorInterface({ prompt }: { prompt: Prompt }) {
  const { toast } = useToast();

  // Form state
  const [variableValues, setVariableValues] = useState<Record<string, any>>({});
  const [settings, setSettings] = useState({
    aspectRatio: '1:1',
    numImages: 1,
    modelVersion: 'gemini-pro-vision'
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingGenerationData, setPendingGenerationData] = useState<any>(null);

  // Initialize variable values
  useEffect(() => {
    const initialValues: Record<string, any> = {};
    prompt.variables.forEach(variable => {
      if (variable.defaultValue !== undefined) {
        initialValues[variable.name] = variable.defaultValue;
      } else {
        switch (variable.type) {
          case 'text':
            initialValues[variable.name] = '';
            break;
          case 'slider':
            initialValues[variable.name] = variable.min || 0;
            break;
          case 'checkbox':
            initialValues[variable.name] = false;
            break;
          case 'select':
          case 'multi-select':
            initialValues[variable.name] = variable.type === 'multi-select' ? [] : '';
            break;
        }
      }
    });
    setVariableValues(initialValues);
  }, [prompt.variables]);

  // Status polling function
  const pollGenerationStatus = useCallback(async (generationId: string) => {
    try {
      const response = await fetch(`/api/generations/${generationId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch generation status');
      }

      const generation: Generation = await response.json();
      setCurrentGeneration(generation);

      // Update status display
      setGenerationStatus({
        status: generation.status,
        progress: getProgressForStatus(generation.status),
        errorMessage: generation.errorMessage
      });

      // Handle completion
      if (generation.status === 'completed') {
        setIsGenerating(false);
        setPollingInterval(null);
        toast({
          title: 'Generation Complete!',
          description: `Successfully generated ${generation.imageUrls?.length || 0} images.`,
        });
      } else if (generation.status === 'failed') {
        setIsGenerating(false);
        setPollingInterval(null);
        toast({
          title: 'Generation Failed',
          description: generation.errorMessage || 'An unknown error occurred.',
          variant: 'destructive',
        });
      }

      return generation.status;
    } catch (error) {
      console.error('Status polling error:', error);
      return 'error';
    }
  }, [toast]);

  // Start polling when generation begins
  useEffect(() => {
    if (currentGeneration?.id && isGenerating) {
      const interval = setInterval(() => {
        pollGenerationStatus(currentGeneration.id);
      }, 3000); // Poll every 3 seconds

      setPollingInterval(interval);

      return () => {
        clearInterval(interval);
        setPollingInterval(null);
      };
    }
  }, [currentGeneration?.id, isGenerating, pollGenerationStatus]);

  // Helper function to get progress percentage
  const getProgressForStatus = (status: string): number => {
    switch (status) {
      case 'pending': return 10;
      case 'payment_verified': return 25;
      case 'generating': return 75;
      case 'completed': return 100;
      case 'failed': return 0;
      default: return 0;
    }
  };

  // Handle variable value changes
  const handleVariableChange = (variableName: string, value: any) => {
    setVariableValues(prev => ({
      ...prev,
      [variableName]: value
    }));
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (variableName: string, optionValue: string, checked: boolean) => {
    setVariableValues(prev => {
      const currentValues = prev[variableName] || [];
      if (checked) {
        return {
          ...prev,
          [variableName]: [...currentValues, optionValue]
        };
      } else {
        return {
          ...prev,
          [variableName]: currentValues.filter((v: string) => v !== optionValue)
        };
      }
    });
  };

  // Validate form before submission
  const validateForm = (): string[] => {
    const errors: string[] = [];

    prompt.variables.forEach(variable => {
      const value = variableValues[variable.name];
      
      if (variable.required) {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          errors.push(`${variable.label} is required`);
        }
      }

      // Type-specific validation
      if (variable.type === 'slider' && variable.min !== undefined && variable.max !== undefined && value !== undefined) {
        const numValue = Number(value);
        if (numValue < variable.min || numValue > variable.max) {
          errors.push(`${variable.label} must be between ${variable.min} and ${variable.max}`);
        }
      }
    });

    return errors;
  };

  // Handle generation submission
  const handleGenerate = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: 'Validation Error',
        description: errors.join(', '),
        variant: 'destructive',
      });
      return;
    }

    // Check if payment is required
    if (prompt.price && parseFloat(prompt.price) > 0) {
      // Show payment modal
      const generationData = {
        promptId: prompt.id,
        variableValues,
        settings
      };
      setPendingGenerationData(generationData);
      setShowPaymentModal(true);
      return;
    }

    // No payment required, proceed directly
    await createGeneration({
      promptId: prompt.id,
      variableValues,
      settings
    });
  };

  // Handle payment completion
  const handlePaymentComplete = async (transactionHash: string) => {
    if (!pendingGenerationData) return;

    await createGeneration({
      ...pendingGenerationData,
      transactionHash
    });

    setPendingGenerationData(null);
  };

  // Create generation (called after payment or for free prompts)
  const createGeneration = async (requestData: GenerationRequest) => {
    setIsGenerating(true);
    setCurrentGeneration(null);
    setGenerationStatus(null);

    try {
      const response = await fetch('/api/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create generation');
      }

      const generation: Generation = await response.json();
      setCurrentGeneration(generation);

      toast({
        title: 'Generation Started',
        description: requestData.transactionHash
          ? 'Payment verified! Your AI images are being generated...'
          : 'Your AI images are being generated...',
      });

      // Start polling immediately
      pollGenerationStatus(generation.id);

    } catch (error: any) {
      console.error('Generation error:', error);
      setIsGenerating(false);
      toast({
        title: 'Generation Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // Render variable input controls
  const renderVariableInput = (variable: Variable) => {
    const value = variableValues[variable.name];

    switch (variable.type) {
      case 'text':
        return (
          <div key={variable.name} className="space-y-2">
            <Label htmlFor={variable.name}>
              {variable.label}
              {variable.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={variable.name}
              value={value || ''}
              onChange={(e) => handleVariableChange(variable.name, e.target.value)}
              placeholder={`Enter ${variable.label.toLowerCase()}`}
            />
          </div>
        );

      case 'slider':
        return (
          <div key={variable.name} className="space-y-2">
            <Label htmlFor={variable.name}>
              {variable.label}: {value}
              {variable.required && <span className="text-red-500">*</span>}
            </Label>
            <Slider
              id={variable.name}
              min={variable.min || 0}
              max={variable.max || 100}
              step={variable.step || 1}
              value={[value || variable.min || 0]}
              onValueChange={(values) => handleVariableChange(variable.name, values[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{variable.min || 0}</span>
              <span>{variable.max || 100}</span>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div key={variable.name} className="flex items-center space-x-2">
            <Checkbox
              id={variable.name}
              checked={value || false}
              onCheckedChange={(checked) => handleVariableChange(variable.name, checked)}
            />
            <Label htmlFor={variable.name}>
              {variable.label}
              {variable.required && <span className="text-red-500">*</span>}
            </Label>
          </div>
        );

      case 'select':
        return (
          <div key={variable.name} className="space-y-2">
            <Label htmlFor={variable.name}>
              {variable.label}
              {variable.required && <span className="text-red-500">*</span>}
            </Label>
            <Select
              value={value || ''}
              onValueChange={(newValue) => handleVariableChange(variable.name, newValue)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${variable.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {variable.options?.map((option) => (
                  <SelectItem key={option.promptValue} value={option.promptValue}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'multi-select':
        return (
          <div key={variable.name} className="space-y-2">
            <Label>
              {variable.label}
              {variable.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="space-y-2">
              {variable.options?.map((option) => (
                <div key={option.promptValue} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${variable.name}-${option.promptValue}`}
                    checked={(value || []).includes(option.promptValue)}
                    onCheckedChange={(checked) =>
                      handleMultiSelectChange(variable.name, option.promptValue, checked as boolean)
                    }
                  />
                  <Label htmlFor={`${variable.name}-${option.promptValue}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {(value || []).length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {(value || []).map((selectedValue: string) => {
                  const option = variable.options?.find(o => o.promptValue === selectedValue);
                  return (
                    <Badge key={selectedValue} variant="secondary">
                      {option?.label || selectedValue}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Get status icon and color
  const getStatusDisplay = () => {
    if (!generationStatus) return null;

    const { status, progress, errorMessage } = generationStatus;

    let icon = <Clock className="h-4 w-4" />;
    let color = 'text-blue-500';
    let text = 'Processing...';

    switch (status) {
      case 'pending':
        icon = <Clock className="h-4 w-4" />;
        color = 'text-yellow-500';
        text = 'Waiting for payment verification...';
        break;
      case 'payment_verified':
        icon = <CheckCircle className="h-4 w-4" />;
        color = 'text-green-500';
        text = 'Payment verified, starting generation...';
        break;
      case 'generating':
        icon = <Zap className="h-4 w-4 animate-pulse" />;
        color = 'text-blue-500';
        text = 'Generating images with AI...';
        break;
      case 'completed':
        icon = <CheckCircle className="h-4 w-4" />;
        color = 'text-green-500';
        text = 'Generation complete!';
        break;
      case 'failed':
        icon = <AlertCircle className="h-4 w-4" />;
        color = 'text-red-500';
        text = errorMessage || 'Generation failed';
        break;
    }

    return (
      <div className={`flex items-center space-x-2 ${color}`}>
        {icon}
        <span>{text}</span>
        {progress !== undefined && (
          <div className="flex-1 ml-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        promptTitle={prompt.title}
        promptPrice={prompt.price || '0'}
        creatorAddress={prompt.creatorAddress || '0x0000000000000000000000000000000000000000'}
        onPaymentComplete={handlePaymentComplete}
      />

      {/* Prompt Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>{prompt.title}</span>
          </CardTitle>
          {prompt.description && (
            <p className="text-gray-600">{prompt.description}</p>
          )}
          {prompt.price && parseFloat(prompt.price) > 0 && (
            <Badge variant="outline" className="w-fit">
              {prompt.price} LYX + 3% fee
            </Badge>
          )}
        </CardHeader>
      </Card>

      {/* Variable Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Customize Your Generation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {prompt.variables.map(renderVariableInput)}
        </CardContent>
      </Card>

      {/* Generation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Generation Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aspectRatio">Aspect Ratio</Label>
              <Select
                value={settings.aspectRatio}
                onValueChange={(value) => setSettings(prev => ({ ...prev, aspectRatio: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">Square (1:1)</SelectItem>
                  <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                  <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                  <SelectItem value="4:3">Classic (4:3)</SelectItem>
                  <SelectItem value="3:4">Tall (3:4)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numImages">Number of Images</Label>
              <Select
                value={settings.numImages.toString()}
                onValueChange={(value) => setSettings(prev => ({ ...prev, numImages: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Image</SelectItem>
                  <SelectItem value="2">2 Images</SelectItem>
                  <SelectItem value="3">3 Images</SelectItem>
                  <SelectItem value="4">4 Images</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelVersion">AI Model</Label>
              <Select
                value={settings.modelVersion}
                onValueChange={(value) => setSettings(prev => ({ ...prev, modelVersion: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-pro-vision">Gemini Pro Vision</SelectItem>
                  <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Generate Images
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generation Status */}
      {generationStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Generation Status</CardTitle>
          </CardHeader>
          <CardContent>
            {getStatusDisplay()}
          </CardContent>
        </Card>
      )}

      {/* Generated Images */}
      {currentGeneration?.status === 'completed' && currentGeneration.imageUrls && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentGeneration.imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {generationStatus?.status === 'failed' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {generationStatus.errorMessage || 'Generation failed. Please try again.'}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
