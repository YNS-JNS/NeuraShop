import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { User } from '@/types';
import { ArrowLeft, Edit, Mail, Calendar, Shield, Clock } from 'lucide-react';
import { toast } from 'sonner';

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      const foundUser = state.users.find(u => u.id === id);
      if (foundUser) {
        setUser(foundUser);
      } else {
        toast.error('User not found');
        navigate('/users');
      }
    }
  }, [id, state.users, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">User Profile</h1>
        </div>
        <Button asChild>
          <Link to={`/users/edit/${user.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit User
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <CardTitle className="text-2xl sm:text-3xl">{user.name}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant={
                      user.role === 'admin' ? 'default' : 
                      user.role === 'manager' ? 'secondary' : 'outline'
                    }>
                      {user.role}
                    </Badge>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {user.lastLogin && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Last login {new Date(user.lastLogin).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Shield className="h-5 w-5" />
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.permissions.map((permission) => (
                  <Badge key={permission} variant="outline">
                    {permission}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total Logins</span>
                  <span className="font-medium">127</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Products Created</span>
                  <span className="font-medium">23</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Orders Processed</span>
                  <span className="font-medium">156</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last Activity</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Reset Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Activity Log
              </Button>
              <Button 
                variant={user.status === 'active' ? 'destructive' : 'default'} 
                className="w-full justify-start"
              >
                {user.status === 'active' ? 'Deactivate User' : 'Activate User'}
              </Button>
            </CardContent>
          </Card>

          {/* User Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">User Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-muted-foreground">Task Completion Rate</div>
              </div>
              <Separator />
              <div className="text-center">
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <Separator />
              <div className="text-center">
                <div className="text-3xl font-bold">42</div>
                <div className="text-sm text-muted-foreground">Days Active</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;