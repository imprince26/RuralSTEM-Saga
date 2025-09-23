'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { 
  Menu, 
  X, 
  Home, 
  Gamepad2, 
  Users, 
  Trophy, 
  BarChart3,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Star,
  Zap,
  Target,
  Award,
  BookOpen,
  Globe,
  TrendingUp,
  Shield,
  GraduationCap
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGameStore } from '@/stores/useGameStore';

const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Store hooks
  const { user, logout } = useAuthStore();
  const { totalPoints, level, streak } = useGameStore();

  // Mock notifications for demo
  useEffect(() => {
    setNotifications([
      { id: 1, title: 'New Achievement!', message: 'You unlocked a new badge', time: '2m ago', type: 'achievement' },
      { id: 2, title: 'Game Completed', message: 'Number Quest completed successfully', time: '1h ago', type: 'game' },
      { id: 3, title: 'Level Up!', message: `You reached level ${level}`, time: '2h ago', type: 'level' }
    ]);
  }, [level]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/games?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { href: '/', label: 'Home', icon: Home },
      { href: '/games', label: 'Games', icon: Gamepad2 },
      { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    ];

    if (!user) return baseItems;

    const roleItems = {
      student: [
        ...baseItems,
        { href: '/student', label: 'Dashboard', icon: BarChart3 },
        { href: '/progress', label: 'Progress', icon: TrendingUp },
        { href: '/achievements', label: 'Achievements', icon: Award },
      ],
      teacher: [
        ...baseItems,
        { href: '/teacher', label: 'Dashboard', icon: BarChart3 },
        { href: '/progress', label: 'Analytics', icon: TrendingUp },
      ],
      admin: [
        ...baseItems,
        { href: '/admin', label: 'Admin', icon: Shield },
        { href: '/teacher', label: 'Analytics', icon: BarChart3 },
      ]
    };

    return roleItems[user.role] || baseItems;
  };

  const navItems = getNavItems();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  // User stats component for authenticated users
  const UserStats = () => {
    if (!user) return null;

    return (
      <div className="hidden xl:flex items-center space-x-3 mr-4">
        {/* Points */}
        <div className="flex items-center space-x-1 bg-primary/10 rounded-full px-3 py-1.5 border border-primary/20">
          <Star className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">{totalPoints || 0}</span>
        </div>

        {/* Level */}
        <div className="flex items-center space-x-1 bg-blue-500/10 rounded-full px-3 py-1.5 border border-blue-500/20">
          <Zap className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-blue-500">{level || 1}</span>
        </div>

        {/* Streak */}
        <div className="flex items-center space-x-1 bg-orange-500/10 rounded-full px-3 py-1.5 border border-orange-500/20">
          <Target className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-semibold text-orange-500">{streak || 0}</span>
        </div>
      </div>
    );
  };

  // Mobile navigation sheet
  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center space-x-3">
            <div className="relative">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <span className="text-primary font-bold text-lg">RuralSTEM</span>
              <span className="text-muted-foreground font-normal text-lg"> Saga</span>
            </div>
          </SheetTitle>
          <SheetDescription>
            Gamified learning platform for rural STEM education
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col space-y-4 mt-6">
          {/* User info in mobile */}
          {user && (
            <div className="flex items-center space-x-3 p-4 bg-accent/50 rounded-lg border">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <Badge variant="secondary" className="text-xs capitalize">
                  {user.role}
                </Badge>
              </div>
            </div>
          )}

          {/* User stats in mobile */}
          {user && (
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                <Star className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Points</p>
                <p className="font-bold text-primary text-sm">{totalPoints || 0}</p>
              </div>
              <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Zap className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="font-bold text-blue-500 text-sm">{level || 1}</p>
              </div>
              <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <Target className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Streak</p>
                <p className="font-bold text-orange-500 text-sm">{streak || 0}</p>
              </div>
            </div>
          )}

          {/* Navigation items */}
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant={active ? "secondary" : "ghost"} 
                    className={`w-full justify-start ml-3 h-11 ${active ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Auth buttons for mobile */}
          {!user ? (
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Link href="/login">
                <Button className="w-full bg-primary hover:bg-primary/90">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="w-full">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t">
              <Button onClick={handleLogout} variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left section: Mobile menu + Logo */}
          <div className="flex items-center space-x-4">
            <MobileNav />
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                  RuralSTEM
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">Saga</p>
              </div>
            </Link>
          </div>

          {/* Center section: Desktop navigation (md and above) */}
          <nav className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant={active ? "secondary" : "ghost"} 
                    size="sm"
                    className={`flex items-center space-x-2 px-3 py-2 h-9 ${
                      active 
                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="md:hidden xl:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right section: User stats + Actions */}
          <div className="flex items-center space-x-2">
            {/* <UserStats /> */}

            {/* Search button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden xl:flex h-9 w-9"
              title="Search games and topics"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-9 w-9">
                    <Bell className="h-4 w-4" />
                    {notifications.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500">
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                      <div className="flex items-center space-x-2 w-full">
                        <Award className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="font-medium text-sm">{notification.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 ml-6">{notification.message}</p>
                      <span className="text-xs text-muted-foreground mt-1 ml-6">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Theme toggle */}
            <ThemeToggle />

            {/* User menu or auth buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-8 w-8 border-2 border-primary/20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <Badge variant="secondary" className="w-fit mt-1 capitalize text-xs">
                        {user.role}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.role}`} className="cursor-pointer">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/progress" className="cursor-pointer">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      <span>Progress</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/achievements" className="cursor-pointer">
                      <Award className="mr-2 h-4 w-4" />
                      <span>Achievements</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login">
                  <Button size="sm" variant="outline">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Search bar */}
        {isSearchOpen && (
          <div className="pb-4 border-t">
            <form onSubmit={handleSearch} className="max-w-md mx-auto mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search games, topics, subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-10 bg-accent/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;