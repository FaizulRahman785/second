import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Plus, Loader2, RefreshCw, FileText, Video, Image, File, Upload, Link, Eye, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

const typeIcon = (t: string = '') => ({ pdf: FileText, video: Video, image: Image })[t.toLowerCase()] || File;

const guessType = (mime: string) => {
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime === 'application/pdf') return 'pdf';
  return 'document';
};

const fmt = (bytes: number) => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const TeacherMaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [form, setForm] = useState({ title: '', description: '', type: 'pdf', url: '', batchId: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState<{ fileUrl: string; fileName: string; fileSize: number; mimeType: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    Promise.all([api.teacher.getMaterials(), api.teacher.getBatches()])
      .then(([m, b]) => {
        if (m.success) setMaterials(m.data);
        if (b.success) setBatches(b.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedInfo(null);
    setUploading(true);
    try {
      const info = await api.uploadFile(file);
      setUploadedInfo(info);
      setForm(prev => ({ ...prev, type: guessType(info.mimeType) }));
      toast.success('File uploaded successfully');
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) { toast.error('Title is required'); return; }
    if (!form.batchId) { toast.error('Please select a batch'); return; }
    if (uploadMode === 'file' && !uploadedInfo) { toast.error('Please select a file'); return; }
    if (uploadMode === 'url' && !form.url) { toast.error('URL is required'); return; }

    setSaving(true);
    try {
      const payload = uploadMode === 'file'
        ? { title: form.title, description: form.description, fileUrl: uploadedInfo!.fileUrl, fileType: form.type, fileName: uploadedInfo!.fileName, fileSize: uploadedInfo!.fileSize, batchId: form.batchId }
        : { title: form.title, description: form.description, fileUrl: form.url, fileType: form.type, fileName: form.url.split('/').pop() || form.title, batchId: form.batchId };
      await api.teacher.uploadMaterial(payload);
      toast.success('Material uploaded');
      setAddOpen(false);
      setForm({ title: '', description: '', type: 'pdf', url: '', batchId: '' });
      setUploadedInfo(null);
      setUploadMode('file');
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  const resetDialog = () => {
    setForm({ title: '', description: '', type: 'pdf', url: '', batchId: '' });
    setUploadedInfo(null);
    setUploadMode('file');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-muted-foreground mt-2">Upload and manage study materials for your students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={(v) => { setAddOpen(v); if (!v) resetDialog(); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-600 to-blue-600"><Plus className="h-4 w-4 mr-2" /> Upload Material</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Upload Study Material</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="other">Link / Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Batch *</Label>
                    <Select value={form.batchId} onValueChange={(v) => setForm({ ...form, batchId: v })}>
                      <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                      <SelectContent>{batches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs value={uploadMode} onValueChange={(v) => setUploadMode(v as 'file' | 'url')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="file"><Upload className="h-3.5 w-3.5 mr-1.5" />Upload File</TabsTrigger>
                    <TabsTrigger value="url"><Link className="h-3.5 w-3.5 mr-1.5" />Paste URL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="file" className="mt-3">
                    <input ref={fileRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp,.mp4,.webm,.avi,.mov" onChange={handleFileSelect} />
                    {!uploadedInfo ? (
                      <button type="button" onClick={() => fileRef.current?.click()}
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 hover:bg-teal-50/50 transition-colors cursor-pointer">
                        {uploading ? (
                          <><Loader2 className="h-8 w-8 animate-spin mx-auto text-teal-500 mb-2" /><p className="text-sm text-muted-foreground">Uploading...</p></>
                        ) : (
                          <><Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" /><p className="text-sm font-medium text-gray-700">Click to select file</p><p className="text-xs text-muted-foreground mt-1">PDF, DOC, PPT, Images, Videos up to 50MB</p></>
                        )}
                      </button>
                    ) : (
                      <div className="border rounded-lg p-3 bg-green-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-green-800 truncate max-w-[200px]">{uploadedInfo.fileName}</p>
                            <p className="text-xs text-green-600">{fmt(uploadedInfo.fileSize)} · Uploaded ✓</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => { setUploadedInfo(null); fileRef.current?.click(); }}
                          className="text-xs text-blue-600 hover:underline">Change</button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="url" className="mt-3">
                    <Label>URL / Link *</Label>
                    <Input type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-blue-600" disabled={saving || uploading || !form.batchId}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading...</> : 'Upload Material'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-teal-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((m) => {
            const Icon = typeIcon(m.fileType || m.type);
            return (
              <Card key={m.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-teal-100 rounded-lg"><Icon className="h-5 w-5 text-teal-600" /></div>
                    <Badge variant="outline">{(m.fileType || m.type || 'file').toUpperCase()}</Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{m.title}</h3>
                  {m.description && <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{m.description}</p>}
                  {m.fileSize > 0 && <p className="text-xs text-muted-foreground mb-2">{fmt(m.fileSize)}</p>}
                  {m.fileUrl && (
                    <a href={m.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-teal-600 hover:underline">
                      <Eye className="h-3 w-3" /> Open Material
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {materials.length === 0 && (
            <div className="col-span-3 text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              No materials uploaded yet
            </div>
          )}
        </div>
      )}
    </div>
  );
};
