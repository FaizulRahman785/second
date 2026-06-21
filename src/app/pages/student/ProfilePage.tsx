import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Loader2, Save, User, Lock, Eye, EyeOff } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [form, setForm] = useState({ phone: '', parentName: '', parentPhone: '', address: '' });
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    api.student.getProfile().then((r) => {
      if (r.success) {
        setProfile(r.data);
        setForm({ phone: r.data.phone || '', parentName: r.data.parentName || '', parentPhone: r.data.parentPhone || '', address: r.data.address || '' });
      }
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.student.updateProfile(form);
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
      await api.student.changePassword({ currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword });
      toast.success('Password changed successfully');
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) { toast.error(err.message); } finally { setChangingPwd(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your personal information and security</p>
      </div>
      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profile?.name}</h2>
                  <p className="text-muted-foreground">{profile?.email}</p>
                  <p className="text-sm text-blue-600 mt-1 font-medium">Student</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Update Profile</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Phone Number</Label><Input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} /></div>
                  <div><Label>Parent/Guardian Name</Label><Input value={form.parentName} onChange={(e) => setForm({...form, parentName: e.target.value})} /></div>
                  <div><Label>Parent Phone</Label><Input value={form.parentPhone} onChange={(e) => setForm({...form, parentPhone: e.target.value})} /></div>
                  <div><Label>Address</Label><Input value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} /></div>
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
