import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Loader2, Save, User, Lock, Eye, EyeOff } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';

export const TeacherProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [nameForm, setNameForm] = useState({ name: user?.name || '', phone: '' });
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    api.teacher.getProfile().then((r) => {
      if (r.success) {
        setNameForm({ name: r.data.name || '', phone: r.data.phone || '' });
      }
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.teacher.updateProfile({ name: nameForm.name, phone: nameForm.phone });
      toast.success('Profile updated successfully');
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (pwdForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    setChangingPwd(true);
    try {
      await api.auth.changePassword({ currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword });
      toast.success('Password changed successfully');
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) { toast.error(err.message); } finally { setChangingPwd(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your information and account security</p>
      </div>

      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="p-6 bg-gradient-to-br from-green-600 to-teal-600 rounded-full">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <p className="text-sm text-green-600 mt-1 font-medium">Teacher</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Update Profile</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSaveName} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input className="mt-1" value={nameForm.name} onChange={(e) => setNameForm({...nameForm, name: e.target.value})} required />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input className="mt-1" value={nameForm.phone} onChange={(e) => setNameForm({...nameForm, phone: e.target.value})} />
                  </div>
                </div>
                <Button type="submit" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" />Save Changes</>}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5" />Change Password</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <Label>Current Password</Label>
                  <div className="relative mt-1">
                    <Input
                      type={showCurrentPwd ? 'text' : 'password'}
                      value={pwdForm.currentPassword}
                      onChange={(e) => setPwdForm({...pwdForm, currentPassword: e.target.value})}
                      required
                      placeholder="Enter your current password"
                    />
                    <button type="button" onClick={() => setShowCurrentPwd(!showCurrentPwd)} className="absolute right-3 top-2.5 text-muted-foreground hover:text-gray-900">
                      {showCurrentPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label>New Password</Label>
                  <div className="relative mt-1">
                    <Input
                      type={showNewPwd ? 'text' : 'password'}
                      value={pwdForm.newPassword}
                      onChange={(e) => setPwdForm({...pwdForm, newPassword: e.target.value})}
                      required
                      minLength={6}
                      placeholder="Min. 6 characters"
                    />
                    <button type="button" onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-3 top-2.5 text-muted-foreground hover:text-gray-900">
                      {showNewPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    className="mt-1"
                    value={pwdForm.confirmPassword}
                    onChange={(e) => setPwdForm({...pwdForm, confirmPassword: e.target.value})}
                    required
                    placeholder="Re-enter new password"
                  />
                  {pwdForm.confirmPassword && pwdForm.newPassword !== pwdForm.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>
                <Button type="submit" disabled={changingPwd} variant="outline">
                  {changingPwd ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Changing...</> : <><Lock className="mr-2 h-4 w-4" />Change Password</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
