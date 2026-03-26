import React, { useState } from 'react';
import { Database, Plus, Search, Link as LinkIcon, FileText, Video, Trash2, Edit2, FolderOpen } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  topic: string;
  type: 'video' | 'document' | 'link';
  url: string;
  cohorts: string[];
}

const AdminResources = () => {
  const [resources, setResources] = useState<Resource[]>([
    { id: '1', title: "Newton's Laws Masterclass", topic: 'Kinematics', type: 'video', url: '#', cohorts: ['Class 11'] },
    { id: '2', title: 'Thermodynamics Cheat Sheet', topic: 'Thermodynamics', type: 'document', url: '#', cohorts: ['Class 11', 'Class 12'] },
    { id: '3', title: 'Advanced Calculus Overview', topic: 'Math', type: 'link', url: '#', cohorts: ['Class 12', 'Droppers'] },
  ]);

  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newResource, setNewResource] = useState<Partial<Resource>>({ type: 'document', cohorts: [] });

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="text-red-500" size={20} />;
      case 'document': return <FileText className="text-blue-500" size={20} />;
      default: return <LinkIcon className="text-indigo-500" size={20} />;
    }
  };

  const handleCreate = () => {
    if (newResource.title && newResource.topic && newResource.url) {
      setResources([...resources, { ...newResource, id: Date.now().toString() } as Resource]);
      setIsAddModalOpen(false);
      setNewResource({ type: 'document', cohorts: [] });
    }
  };

  const filtered = resources.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.topic.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-fade-in relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Database className="text-indigo-600" /> Resource Library
          </h1>
          <p className="text-slate-500">Manage links, PDFs, and videos attached to weak areas.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 flex items-center gap-2 shadow-lg transition-colors"
        >
          <Plus size={18} /> Add Resource
        </button>
      </header>

      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search resources by title or topic..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="All Cohorts">All Cohorts</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 12">Class 12</option>
            <option value="Droppers">Droppers</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-slate-200">
              <FolderOpen size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">No resources found</h3>
            <p className="text-slate-500 mt-1 max-w-sm mb-4">You haven't added any physical resources or links matching this query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(res => (
              <div key={res.id} className="p-4 border rounded-xl hover:shadow-md hover:border-indigo-200 transition-all group bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-slate-50 rounded-lg border">{getIcon(res.type)}</div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50"><Edit2 size={14} /></button>
                    <button onClick={() => setResources(resources.filter(r => r.id !== res.id))} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50"><Trash2 size={14} /></button>
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 line-clamp-1">{res.title}</h4>
                <div className="flex items-center gap-2 mt-2 font-medium">
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{res.topic}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {res.cohorts.length > 0 ? res.cohorts.join(', ') : 'All Cohorts'}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <a href={res.url} className="text-sm text-indigo-600 font-bold flex items-center gap-1 hover:underline">
                    View Resource <LinkIcon size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Create New Resource</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Resource Title</label>
                <input type="text" value={newResource.title || ''} onChange={e => setNewResource({...newResource, title: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="e.g. Gravity Crash Course" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Topic Tag</label>
                  <input type="text" value={newResource.topic || ''} onChange={e => setNewResource({...newResource, topic: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="e.g. Physics" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
                  <select value={newResource.type} onChange={e => setNewResource({...newResource, type: e.target.value as any})} className="w-full border rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                    <option value="document">Document (PDF)</option>
                    <option value="video">Video</option>
                    <option value="link">Web Link</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">URL / Link</label>
                <input type="url" value={newResource.url || ''} onChange={e => setNewResource({...newResource, url: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="https://" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 font-semibold text-slate-500 hover:text-slate-800">Cancel</button>
              <button onClick={handleCreate} disabled={!newResource.title || !newResource.url || !newResource.topic} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50">Save Resource</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResources;
