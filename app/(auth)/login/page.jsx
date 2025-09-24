'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoading } from '@/contexts/LoadingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ButtonLoader } from '@/components/ui/loader';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Leaf, Users, Shield } from 'lucide-react';
import { FaBookOpen as BookOpen } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuthStore();
  const { startLoading, stopLoading } = useLoading();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
    
    // Clear role error when user selects a role
    if (errors.role) {
      setErrors(prev => ({
        ...prev,
        role: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }
    
    setIsLoading(true);
    startLoading('Authenticating...', 'dots', true);

    // Simulate API call delay with progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    try {
      // Mock authentication - In real app, this would be an API call
      if (formData.email && formData.password) {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          email: formData.email,
          name: formData.email.split('@')[0],
          role: formData.role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
          joinedDate: new Date().toISOString(),
          preferences: {
            language: 'en',
            theme: 'light',
            ecoMode: false,
          }
        };

        login(userData);
        toast.success(`Welcome back! Logged in as ${formData.role}`);
        
        // Redirect based on role with loading message
        switch (formData.role) {
          case 'admin':
            startLoading('Redirecting to Admin Dashboard...', 'default');
            router.push('/admin');
            break;
          case 'teacher':
            startLoading('Redirecting to Teacher Dashboard...', 'default');
            router.push('/teacher');
            break;
          default:
            startLoading('Redirecting to Student Dashboard...', 'default');
            router.push('/student');
        }
      } else {
        toast.error('Please fill in all fields');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      stopLoading();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    setFormData({
      email: `demo.${role}@ruralstemsaga.com`,
      password: 'demo123',
      role: role
    });
    
    // Auto-submit after setting demo data
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: `demo.${role}@ruralstemsaga.com`,
        name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=demo${role}`,
        joinedDate: new Date().toISOString(),
        preferences: {
          language: 'en',
          theme: 'light',
          ecoMode: false,
        }
      };

      login(userData);
      toast.success(`Welcome! Logged in as Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`);
      
      switch (role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'teacher':
          router.push('/teacher');
          break;
        default:
          router.push('/student');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center p-4 rural-pattern">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">RuralSTEM Saga</h1>
          <p className="text-muted-foreground">Empowering Rural Education Through Gaming</p>
        </div>

        <Card className="glass-effect shadow-xl">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue your STEM learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'border-red-500 focus:border-red-500' : ''}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Login as</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className={errors.role ? 'border-red-500 focus:border-red-500' : ''}>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Student
                      </div>
                    </SelectItem>
                    <SelectItem value="teacher">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Teacher
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-500 mt-1">{errors.role}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <ButtonLoader />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Login Buttons */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground text-center mb-3">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('student')}
                  className="text-xs"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Student
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('teacher')}
                  className="text-xs"
                >
                  <Users className="h-3 w-3 mr-1" />
                  Teacher
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="text-xs"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don&apos;t have an account? </span>
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Smart India Hackathon 2025 | Problem Statement 25048</p>
          <p className="mt-1">Government of Odisha - Electronics & IT Department</p>
        </div>
      </div>
    </div>
  );
}