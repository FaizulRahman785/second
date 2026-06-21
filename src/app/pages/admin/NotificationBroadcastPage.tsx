import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Send, Users, GraduationCap, UsersRound, Loader2, Megaphone, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export const NotificationBroadcastPage: React.FC = () => {
  const [batches, setBatches] = useState<any[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    title: '',
    message: '',
    type: 'info',
    targetRole: 'all',
    batchId: '',
  });

  useEffect(() => {
    api.admin.getBatches().then((r) => { if (r.success) setBatches(r.data); }).catch(console.error);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    try {
      const payload: any = { title: form.title, message: form.message, type: form.type };
      if (form.targetRole === 'batch' && form.batchId) {
        payload.batchId = form.batchId;
      } else if (form.targetRole !== 'all') {
        payload.targetRole = form.targetRole;
      }
      const res = await api.admin.broadcastNotification(payload);
      toast.success(res.message || 'Notification sent!');
      setSent(true);
      setForm({ title: '', message: '', type: 'info', targetRole: 'all', batchId: '' });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  const targetLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    all: { label: 'Everyone (all students + teachers)', icon: <Users className="h-4 w-4" />, color: 'bg-blue-100 text-blue-700' },
    student: { label: 'All Students', icon: <GraduationCap className="h-4 w-4" />, color: 'bg-green-100 text-green-700' },
    teacher: { label: 'All Teachers', icon: <UsersRound className="h-4 w-4" />, color: 'bg-purple-100 text-purple-700' },
    batch: { label: 'Specific Batch', icon: <Users className="h-4 w-4" />, color: 'bg-orange-100 text-orange-700' },
  };

  const typeOptions = [
    { value: 'info', label: 'ℹ️ Info', color: 'bg-blue-100 text-blue-700' },
    { value: 'success', label: '✅ Success', color: 'bg-green-100 text-green-700' },
    { value: 'warning', label: '⚠️ Warning', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'error', label: '🔴 Urgent', color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Megaphone className="h-8 w-8 text-blue-600" />
          Broadcast Notification
        </h1>
        <p className="text-muted-foreground mt-2">Send announcements, reminders, and alerts to students and teachers</p>
      </div>

      {sent && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">Notification sent successfully!</p>
        </div>
      )}

      <Card>
        <CardHeader><CardTitle>Compose Notification</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSend} className="space-y-5">
            <div>
              <Label>Recipients *</Label>
              <Select value={form.targetRole} onValueChange={(v) => setForm({ ...form, targetRole: v, batchId: '' })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">👥 Everyone (Students + Teachers)</SelectItem>
                  <SelectItem value="student">🎓 All Students</SelectItem>
                  <SelectItem value="teacher">👨‍🏫 All Teachers</SelectItem>
                  <SelectItem value="batch">📋 Specific Batch</SelectItem>
                </SelectContent>
              </Select>
              {form.targetRole && (
                <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${targetLabels[form.targetRole]?.color}`}>
                  {targetLabels[form.targetRole]?.icon}
                  {targetLabels[form.targetRole]?.label}
                </div>
              )}
            </div>

            {form.targetRole === 'batch' && (
              <div>
                <Label>Select Batch *</Label>
                <Select value={form.batchId} onValueChange={(v) => setForm({ ...form, batchId: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a batch…" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Notification Type</Label>
              <div className="flex gap-2 mt-1 flex-wrap">
                {typeOptions.map((t) => (
                  <button
                    type="button"
                    key={t.value}
                    onClick={() => setForm({ ...form, type: t.value })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                      form.type === t.value ? `${t.color} border-current` : 'bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Title *</Label>
              <Input
                className="mt-1"
                placeholder="e.g., Class rescheduled for tomorrow"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground mt-1">{form.title.length}/100</p>
            </div>

            <div>
              <Label>Message *</Label>
              <Textarea
                className="mt-1 min-h-[120px]"
                placeholder="Write your message here…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">{form.message.length}/500</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={sending || (form.targetRole === 'batch' && !form.batchId)}
            >
              {sending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</>
              ) : (
                <><Send className="mr-2 h-4 w-4" />Send Notification</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm text-muted-foreground">How it works</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {[
            { icon: '🔔', text: 'Notifications appear in the bell icon in the top bar for each recipient' },
            { icon: '📱', text: 'Recipients see the notification instantly in real-time via live connection — no refresh needed' },
            { icon: '✅', text: 'Recipients can mark notifications as read individually or all at once' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="text-base">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
