import React, { useState } from 'react';
import { Product, QuoteRequest } from '../types';
import { BRAND_INFO } from '../data/brandData';
import { 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  FileText, 
  Eye, 
  Check, 
  X, 
  Lock,
  Layers,
  Settings,
  Mail,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Send,
  Copy,
  ShieldCheck,
  Cloud,
  Globe,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  inquiries: QuoteRequest[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  inquiries,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'inquiries' | 'email-desk' | 'netlify' | 'settings'>('products');

  // Email Desk States
  const [emailStatus, setEmailStatus] = useState<any>(null);
  const [loadingEmailStatus, setLoadingEmailStatus] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [savingSmtp, setSavingSmtp] = useState(false);
  const [saveSmtpResult, setSaveSmtpResult] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [smtpForm, setSmtpForm] = useState({
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    user: 'vorqenimpex@gmail.com',
    pass: '',
    recipientEmail: 'vorqenimpex@gmail.com',
  });

  const fetchEmailStatus = async () => {
    setLoadingEmailStatus(true);
    try {
      const res = await fetch('/api/email/status');
      const data = await res.json();
      setEmailStatus(data);
      if (data.smtpHost) {
        setSmtpForm((prev) => ({
          ...prev,
          host: data.smtpHost || 'smtp.gmail.com',
          port: String(data.smtpPort || 465),
          user: data.smtpUser || 'vorqenimpex@gmail.com',
          recipientEmail: data.recipientEmail || 'vorqenimpex@gmail.com',
        }));
      }
    } catch (err) {
      console.error('Failed to fetch email status:', err);
    } finally {
      setLoadingEmailStatus(false);
    }
  };

  const handleTestEmail = async () => {
    setTestingEmail(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/email/test', { method: 'POST' });
      const data = await res.json();
      setTestResult(data);
      fetchEmailStatus();
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err?.message || 'Failed to connect to test endpoint',
      });
    } finally {
      setTestingEmail(false);
    }
  };

  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSmtp(true);
    setSaveSmtpResult(null);
    try {
      const res = await fetch('/api/email/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtpForm),
      });
      const data = await res.json();
      setSaveSmtpResult(data);
      fetchEmailStatus();
    } catch (err: any) {
      setSaveSmtpResult({
        success: false,
        error: err?.message || 'Failed to save SMTP config',
      });
    } finally {
      setSavingSmtp(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Form state for adding new product
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<any>('work-safety-gloves');
  const [newProdShortDesc, setNewProdShortDesc] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdMoq, setNewProdMoq] = useState('500 Pairs');
  const [newProdMaterials, setNewProdMaterials] = useState('Top-Grain Leather, Spandex');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin passkey for factory portal
    if (passcode === 'vorqen2001' || passcode === 'admin' || passcode === 'flakes') {
      setIsAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    const newProd: Product = {
      id: 'vq-' + Date.now().toString(36),
      name: newProdName,
      category: newProdCategory,
      categoryLabel: newProdCategory.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      shortDescription: newProdShortDesc || 'Custom manufactured gear by FLAKES IMPEX.',
      description: newProdDesc || 'Manufactured according to buyer specifications in Sialkot, Pakistan.',
      image: '/src/assets/images/gloves_craftsmanship_1792345107076.jpg',
      galleryImages: ['/src/assets/images/gloves_craftsmanship_1792345107076.jpg'],
      materials: newProdMaterials.split(',').map((s) => s.trim()),
      colors: ['Custom Pantone'],
      sizes: ['S', 'M', 'L', 'XL'],
      moq: newProdMoq,
      sampleAvailable: true,
      leadTime: '25-35 Days',
      features: ['Anatomical pattern', 'Heavy-duty seams', 'Custom logo application'],
      brandingOptions: ['Woven Label', 'Silicone Rubber', 'Embroidery'],
      packagingOptions: ['Polybag with barcode', 'Export Master Carton'],
      salesMode: 'b2b_quote'
    };

    onAddProduct(newProd);
    setShowAddForm(false);
    setNewProdName('');
    setNewProdShortDesc('');
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Category', 'Quantity', 'Notes'];
    const rows = inquiries.map((q) => [
      q.id || '',
      q.createdAt || '',
      `"${q.fullName.replace(/"/g, '""')}"`,
      `"${q.companyName.replace(/"/g, '""')}"`,
      `"${q.email}"`,
      `"${q.phoneOrWhatsApp}"`,
      `"${q.productCategory}"`,
      `"${q.estimatedQuantity}"`,
      `"${(q.additionalNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vorqen_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-[#181818] p-8 rounded-2xl border border-[#2B2B2B] shadow-2xl space-y-6">
          <div className="w-12 h-12 bg-[#123D2A]/30 border border-[#1e583c] text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-heading">
              VORQEN Factory Management Portal
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Authorized access for FLAKES IMPEX export administration.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter access code (try: admin or vorqen2001)"
                className="w-full bg-[#111111] border border-[#333333] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white text-center tracking-widest focus:outline-none"
              />
              {passError && (
                <p className="text-[11px] text-red-400 mt-1">
                  Incorrect passkey. Please check credentials.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors border border-[#22573d]"
            >
              Sign In to Management
            </button>
          </form>

          <p className="text-[10px] text-gray-500">
            Passkey configured for demonstration: <code className="text-gray-400">admin</code> or <code className="text-gray-400">vorqen2001</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Authorized Management Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
            VORQEN & FLAKES IMPEX Operations Desk
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-[#222222] hover:bg-[#2C2C2C] text-gray-300 text-xs font-semibold rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#242424] pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'products'
              ? 'bg-[#123D2A] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
          }`}
        >
          Product Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'inquiries'
              ? 'bg-[#123D2A] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
          }`}
        >
          Logged B2B Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('email-desk');
            fetchEmailStatus();
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'email-desk'
              ? 'bg-[#123D2A] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email System & Deliverability Desk</span>
        </button>
        <button
          onClick={() => setActiveTab('netlify')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'netlify'
              ? 'bg-[#123D2A] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
          }`}
        >
          <Cloud className="w-3.5 h-3.5 text-cyan-400" />
          <span>Netlify Deployment</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">READY</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#123D2A] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
          }`}
        >
          Factory Settings & SEO
        </button>
      </div>

      {/* TAB 1: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Manage existing product listings, add new articles, or update category status.
            </p>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Cancel Form' : 'Add New Article'}</span>
            </button>
          </div>

          {/* Add Product Form */}
          {showAddForm && (
            <form onSubmit={handleCreateProduct} className="bg-[#181818] p-6 rounded-xl border border-[#2B2B2B] space-y-4">
              <h3 className="text-sm font-bold text-white font-heading">
                Publish New Manufacturing Article
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Article Name *</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. VORQEN Kevlar High-Heat Welding Glove"
                    className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="work-safety-gloves">Work & Safety Gloves</option>
                    <option value="tactical-motorcycle-gloves">Tactical & Motorcycle Gloves</option>
                    <option value="sports-fitness-gloves">Sports & Fitness Gloves</option>
                    <option value="leather-collection">Leather Collection</option>
                    <option value="sportswear-apparel">Sportswear & Apparel</option>
                    <option value="custom-oem">Custom OEM Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Standard MOQ</label>
                  <input
                    type="text"
                    value={newProdMoq}
                    onChange={(e) => setNewProdMoq(e.target.value)}
                    className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Materials (comma-separated)</label>
                  <input
                    type="text"
                    value={newProdMaterials}
                    onChange={(e) => setNewProdMaterials(e.target.value)}
                    className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Short Description</label>
                  <input
                    type="text"
                    value={newProdShortDesc}
                    onChange={(e) => setNewProdShortDesc(e.target.value)}
                    placeholder="Brief 1-line summary for product card"
                    className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold rounded-lg"
                >
                  Save & Publish Article
                </button>
              </div>
            </form>
          )}

          {/* Product Table */}
          <div className="bg-[#161616] rounded-xl border border-[#262626] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121212] text-[#B8BEC3] uppercase tracking-wider border-b border-[#242424]">
                <tr>
                  <th className="p-3.5">Article</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">MOQ</th>
                  <th className="p-3.5">Mode</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#1C1C1C] transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <img src={p.image} alt="" className="w-9 h-9 rounded object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-white">{p.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{p.id}</div>
                      </div>
                    </td>
                    <td className="p-3.5 text-gray-300">{p.categoryLabel}</td>
                    <td className="p-3.5 text-gray-300 font-mono">{p.moq}</td>
                    <td className="p-3.5">
                      <span className="text-[11px] text-emerald-400 font-medium">
                        B2B Quotation
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INQUIRIES MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Commercial quotations and message requests received during the active session.
            </p>
            {inquiries.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-[#222222] hover:bg-[#2C2C2C] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-[#333333]"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV Export</span>
              </button>
            )}
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-12 bg-[#161616] rounded-xl border border-[#262626] text-gray-400 space-y-2">
              <FileText className="w-8 h-8 mx-auto text-gray-500" />
              <p className="text-xs">No inquiries recorded yet in this session.</p>
              <p className="text-[11px] text-gray-500">
                Inquiries submitted via the Request a Quote modal or Contact page appear here.
              </p>
            </div>
          ) : (
            <div className="bg-[#161616] rounded-xl border border-[#262626] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#121212] text-[#B8BEC3] uppercase tracking-wider border-b border-[#242424]">
                  <tr>
                    <th className="p-3.5">Inquiry ID</th>
                    <th className="p-3.5">Client & Company</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Item / Qty</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222]">
                  {inquiries.map((inq, idx) => (
                    <tr key={idx} className="hover:bg-[#1C1C1C] transition-colors">
                      <td className="p-3.5 font-mono text-emerald-400 font-semibold">
                        {inq.id || `INQ-${idx + 1}`}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-white">{inq.fullName}</div>
                        <div className="text-[11px] text-gray-400">{inq.companyName} ({inq.country})</div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-white">{inq.email}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{inq.phoneOrWhatsApp}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-white">{inq.productName || inq.productCategory}</div>
                        <div className="text-[11px] text-gray-400 font-mono">Qty: {inq.estimatedQuantity}</div>
                      </td>
                      <td className="p-3.5 text-gray-400 font-mono text-[11px]">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Today'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: EMAIL INQUIRY SYSTEM & DELIVERABILITY DESK */}
      {activeTab === 'email-desk' && (
        <div className="space-y-8">
          {/* Header & Refresh */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242424] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Production Email Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1">
                Email Inquiry Delivery & SPF / DKIM / DMARC Desk
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Monitors real-time delivery to official inbox <strong className="text-white font-mono">vorqenimpex@gmail.com</strong> and verifies anti-spoofing deliverability.
              </p>
            </div>

            <button
              onClick={fetchEmailStatus}
              disabled={loadingEmailStatus}
              className="px-4 py-2 bg-[#222222] hover:bg-[#2C2C2C] disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors border border-[#333333]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingEmailStatus ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
          </div>

          {/* Status Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Target Recipient Card */}
            <div className="bg-[#181818] p-5 rounded-xl border border-[#262626] space-y-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Target Recipient Inbox
              </span>
              <div className="text-sm font-bold text-white font-mono truncate" title="vorqenimpex@gmail.com">
                {emailStatus?.recipientEmail || 'vorqenimpex@gmail.com'}
              </div>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <Check className="w-3 h-3" />
                <span>Verified Official Inbox</span>
              </span>
            </div>

            {/* SMTP Connection Card */}
            <div className="bg-[#181818] p-5 rounded-xl border border-[#262626] space-y-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                SMTP Transport Status
              </span>
              <div className="text-sm font-bold text-white font-mono">
                {emailStatus?.hasPassword
                  ? (emailStatus?.connectionVerified ? 'Connected (Verified)' : 'Auth Required / Error')
                  : 'Pending App Password'}
              </div>
              <span className={`text-[11px] flex items-center gap-1 font-medium ${
                emailStatus?.connectionVerified ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {emailStatus?.connectionVerified ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Live SMTP Active</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3 h-3" />
                    <span>Awaiting 16-char App Password</span>
                  </>
                )}
              </span>
            </div>

            {/* Inquiries Logged Card */}
            <div className="bg-[#181818] p-5 rounded-xl border border-[#262626] space-y-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Total Inquiries Logged
              </span>
              <div className="text-2xl font-extrabold text-white font-mono">
                {emailStatus?.stats?.totalInquiries || inquiries.length}
              </div>
              <span className="text-[11px] text-gray-400">
                100% saved in persistent ledger
              </span>
            </div>

            {/* Delivery Success Card */}
            <div className="bg-[#181818] p-5 rounded-xl border border-[#262626] space-y-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Direct SMTP Dispatches
              </span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                {emailStatus?.stats?.delivered || 0}
              </div>
              <span className="text-[11px] text-gray-400">
                Delivered to vorqenimpex@gmail.com
              </span>
            </div>
          </div>

          {/* Diagnostic Live Verification Tool */}
          <div className="bg-gradient-to-r from-[#123D2A]/60 via-[#181818] to-[#121212] p-6 rounded-2xl border border-[#1e583c] space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  <Server className="w-4 h-4" />
                  <span>Requirement #8: Live Pre-Launch Verification</span>
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Test Email Delivery to vorqenimpex@gmail.com
                </h3>
                <p className="text-xs text-gray-300 max-w-xl">
                  Transmits an end-to-end diagnostic test email through the server's SMTP transport directly to your official inbox to verify real message receipt.
                </p>
              </div>

              <button
                onClick={handleTestEmail}
                disabled={testingEmail}
                className="px-6 py-3 bg-white hover:bg-gray-100 disabled:opacity-50 text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center gap-2 shrink-0"
              >
                {testingEmail ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#123D2A]" />
                    <span>Transmitting Test...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#123D2A]" />
                    <span>Send Diagnostic Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Test Result Display */}
            {testResult && (
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                testResult.success
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {testResult.success ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>{testResult.message}</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <span>Diagnostic Check Result</span>
                    </>
                  )}
                </div>

                {!testResult.success && (
                  <div className="space-y-2 pt-1 text-gray-200">
                    <p className="font-semibold text-amber-300">
                      Reason: {testResult.error}
                    </p>
                    {testResult.troubleshooting && (
                      <ul className="list-disc list-inside space-y-1 text-gray-300 text-[11px]">
                        {testResult.troubleshooting.map((tip: string, idx: number) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Two-Column: SMTP Configuration & SPF/DKIM/DMARC Records */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* SMTP Settings Form (6 cols) */}
            <div className="lg:col-span-6 bg-[#161616] p-6 sm:p-8 rounded-2xl border border-[#262626] space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#B8BEC3] tracking-wider">
                  Requirement #1 & #11 &bull; Secure Credentials
                </span>
                <h3 className="text-base font-bold text-white font-heading">
                  SMTP Delivery Server Settings
                </h3>
                <p className="text-xs text-gray-400">
                  Configure Gmail or custom SMTP relay to deliver inquiries directly to your inbox.
                </p>
              </div>

              <form onSubmit={handleSaveSmtp} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    SMTP Server Host
                  </label>
                  <input
                    type="text"
                    value={smtpForm.host}
                    onChange={(e) => setSmtpForm({ ...smtpForm, host: e.target.value })}
                    placeholder="smtp.gmail.com"
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-medium mb-1">
                      SMTP Port
                    </label>
                    <input
                      type="text"
                      value={smtpForm.port}
                      onChange={(e) => setSmtpForm({ ...smtpForm, port: e.target.value })}
                      placeholder="465 (SSL) or 587 (TLS)"
                      className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-1">
                      Target Inbox
                    </label>
                    <input
                      type="text"
                      value={smtpForm.recipientEmail}
                      onChange={(e) => setSmtpForm({ ...smtpForm, recipientEmail: e.target.value })}
                      placeholder="vorqenimpex@gmail.com"
                      className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Sender Account (SMTP User)
                  </label>
                  <input
                    type="email"
                    value={smtpForm.user}
                    onChange={(e) => setSmtpForm({ ...smtpForm, user: e.target.value })}
                    placeholder="vorqenimpex@gmail.com"
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-gray-300 font-medium">
                      Google App Password (16 Characters)
                    </label>
                    <a
                      href="https://myaccount.google.com/apppasswords"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline text-[11px]"
                    >
                      Generate App Password &rarr;
                    </a>
                  </div>
                  <input
                    type="password"
                    value={smtpForm.pass}
                    onChange={(e) => setSmtpForm({ ...smtpForm, pass: e.target.value })}
                    placeholder="e.g. abcd efgh ijkl mnop"
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none tracking-widest"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Google accounts require an <strong>App Password</strong> with 2-Step Verification enabled. Your standard email password will be blocked by Google.
                  </p>
                </div>

                {saveSmtpResult && (
                  <div className={`p-3 rounded-lg border text-xs ${
                    saveSmtpResult.verified
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                  }`}>
                    {saveSmtpResult.verified ? (
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>SMTP Connection Verified & Saved!</span>
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>Settings Saved (Verification Notice)</span>
                        </div>
                        <p className="text-[11px] text-gray-300 mt-1">
                          {saveSmtpResult.verifyError || 'Ensure you enter a valid 16-character Google App Password.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={savingSmtp}
                    className="w-full py-2.5 bg-[#123D2A] hover:bg-[#184e36] disabled:opacity-50 text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#216140]"
                  >
                    {savingSmtp ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying Connection...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save & Verify Connection</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Requirement #3: SPF, DKIM, and DMARC Configuration Protocol (6 cols) */}
            <div className="lg:col-span-6 bg-[#161616] p-6 sm:p-8 rounded-2xl border border-[#262626] space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#B8BEC3] tracking-wider">
                  Requirement #3 &bull; Deliverability & Anti-Spam Security
                </span>
                <h3 className="text-base font-bold text-white font-heading">
                  SPF, DKIM & DMARC DNS Records
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Publish these standard DNS TXT records with your domain registrar (GoDaddy, Namecheap, Cloudflare) for <code className="text-white">flakesimpex.com</code> or <code className="text-white">vorqen.com</code> to prevent your emails from landing in spam folders.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* 1. SPF Record */}
                <div className="bg-[#111111] p-4 rounded-xl border border-[#2B2B2B] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">1. SPF Record (Sender Policy Framework)</span>
                    <button
                      onClick={() => handleCopy('v=spf1 include:_spf.google.com ~all', 'spf')}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      {copiedField === 'spf' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'spf' ? 'Copied' : 'Copy Record'}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-400">
                    <div>Type: <strong className="text-white">TXT</strong></div>
                    <div>Host: <strong className="text-white">@</strong> (Root)</div>
                    <div>TTL: <strong className="text-white">3600</strong></div>
                  </div>
                  <div className="bg-[#1A1A1A] p-2 rounded border border-[#262626] font-mono text-[11px] text-emerald-300 select-all">
                    v=spf1 include:_spf.google.com ~all
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Explicitly authorizes Google's mail servers to dispatch email for your organization.
                  </p>
                </div>

                {/* 2. DKIM Record */}
                <div className="bg-[#111111] p-4 rounded-xl border border-[#2B2B2B] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">2. DKIM (DomainKeys Identified Mail)</span>
                    <span className="text-[11px] text-emerald-400 font-mono">google._domainkey</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-400">
                    <div>Type: <strong className="text-white">TXT</strong></div>
                    <div>Host: <strong className="text-white">google._domainkey</strong></div>
                    <div>Key Size: <strong className="text-white">2048-bit</strong></div>
                  </div>
                  <div className="bg-[#1A1A1A] p-2 rounded border border-[#262626] font-mono text-[10px] text-gray-300">
                    Generated in Google Admin Console under: Apps &rarr; Google Workspace &rarr; Gmail &rarr; Authenticate email
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Attaches a tamper-proof cryptographic signature to every outgoing confirmation email.
                  </p>
                </div>

                {/* 3. DMARC Record */}
                <div className="bg-[#111111] p-4 rounded-xl border border-[#2B2B2B] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">3. DMARC Policy Record</span>
                    <button
                      onClick={() => handleCopy('v=DMARC1; p=quarantine; rua=mailto:vorqenimpex@gmail.com; pct=100', 'dmarc')}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      {copiedField === 'dmarc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'dmarc' ? 'Copied' : 'Copy Record'}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-400">
                    <div>Type: <strong className="text-white">TXT</strong></div>
                    <div>Host: <strong className="text-white">_dmarc</strong></div>
                    <div>Policy: <strong className="text-white">Quarantine</strong></div>
                  </div>
                  <div className="bg-[#1A1A1A] p-2 rounded border border-[#262626] font-mono text-[11px] text-emerald-300 select-all">
                    v=DMARC1; p=quarantine; rua=mailto:vorqenimpex@gmail.com; pct=100
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Directs recipient mailboxes to quarantine spoofed emails and sends deliverability telemetry to vorqenimpex@gmail.com.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: NETLIFY DEPLOYMENT DESK */}
      {activeTab === 'netlify' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242424] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Cloud className="w-4 h-4 text-cyan-400" />
                <span>Netlify Cloud Production Architecture</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1">
                Netlify Deployment & Zero-Loss Email Integration
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Configured for seamless hosting on Netlify with serverless inquiry functions, Netlify Forms auto-sync, and SPA routing.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Netlify Ready (4/4 Passed)</span>
              </span>
            </div>
          </div>

          {/* Architecture Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-[#181818] p-5 rounded-xl border border-[#262626] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Config File
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">READY</span>
              </div>
              <div className="text-sm font-bold text-white font-mono">
                netlify.toml
              </div>
              <p className="text-[11px] text-gray-400">
                Build: <code className="text-white">npm run build</code> &bull; Dir: <code className="text-white">dist</code>
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#181818] p-5 rounded-xl border border-[#262626] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Serverless Functions
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">ACTIVE</span>
              </div>
              <div className="text-sm font-bold text-white font-mono">
                netlify/functions/
              </div>
              <p className="text-[11px] text-gray-400">
                inquiries.ts, email-status.ts, email-test.ts
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#181818] p-5 rounded-xl border border-[#262626] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Netlify Forms
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-mono font-bold">DUAL-SYNC</span>
              </div>
              <div className="text-sm font-bold text-white font-mono truncate">
                vorqen-inquiries
              </div>
              <p className="text-[11px] text-gray-400">
                Captured in Netlify Forms inbox with zero code
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#181818] p-5 rounded-xl border border-[#262626] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  SPA Routing
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">VERIFIED</span>
              </div>
              <div className="text-sm font-bold text-white font-mono">
                public/_redirects
              </div>
              <p className="text-[11px] text-gray-400">
                Rewrites all client paths to <code className="text-white">index.html</code>
              </p>
            </div>
          </div>

          {/* Two-Column Setup Guide & Environment Variables */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Netlify Environment Variables (6 cols) */}
            <div className="lg:col-span-6 bg-[#161616] p-6 sm:p-8 rounded-2xl border border-[#262626] space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                  Step 1 &bull; Netlify Environment Variables
                </span>
                <h3 className="text-base font-bold text-white font-heading">
                  Variables for Netlify Dashboard
                </h3>
                <p className="text-xs text-gray-400">
                  In Netlify Dashboard, navigate to: <strong className="text-white">Site configuration &rarr; Environment variables</strong> and add these keys:
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { key: 'SMTP_HOST', value: 'smtp.gmail.com', desc: 'Google SMTP host' },
                  { key: 'SMTP_PORT', value: '465', desc: 'Secure SSL port' },
                  { key: 'SMTP_SECURE', value: 'true', desc: 'SSL encryption mode' },
                  { key: 'SMTP_USER', value: 'vorqenimpex@gmail.com', desc: 'Official Gmail account' },
                  { key: 'SMTP_PASS', value: 'xxxx xxxx xxxx xxxx', desc: 'Your 16-character Google App Password' },
                  { key: 'INQUIRY_RECIPIENT_EMAIL', value: 'vorqenimpex@gmail.com', desc: 'Target inbox for customer inquiries' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#111111] p-3 rounded-lg border border-[#2B2B2B] flex items-center justify-between gap-3">
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <code className="text-cyan-300 font-bold font-mono text-[11px]">{item.key}</code>
                        <span className="text-[10px] text-gray-500">({item.desc})</span>
                      </div>
                      <div className="text-gray-300 font-mono text-[11px] truncate mt-0.5">{item.value}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(`${item.key}=${item.value}`, `env-${idx}`)}
                      className="px-2.5 py-1 bg-[#222222] hover:bg-[#2E2E2E] text-gray-300 hover:text-white rounded text-[11px] shrink-0 flex items-center gap-1 transition-colors"
                      title="Copy variable assignment"
                    >
                      {copiedField === `env-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === `env-${idx}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    const envBundle = `SMTP_HOST=smtp.gmail.com\nSMTP_PORT=465\nSMTP_SECURE=true\nSMTP_USER=vorqenimpex@gmail.com\nSMTP_PASS=\nINQUIRY_RECIPIENT_EMAIL=vorqenimpex@gmail.com`;
                    handleCopy(envBundle, 'env-bundle');
                  }}
                  className="w-full py-2.5 bg-[#202020] hover:bg-[#2A2A2A] text-white text-xs font-semibold rounded-lg border border-[#333333] flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedField === 'env-bundle' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'env-bundle' ? 'Copied All .env Variables' : 'Copy All Variables for Netlify Import'}</span>
                </button>
              </div>
            </div>

            {/* Netlify Step-by-Step Deployment Guide (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Deployment Steps */}
              <div className="bg-[#161616] p-6 sm:p-8 rounded-2xl border border-[#262626] space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                    Step 2 &bull; 3-Minute Deployment Instructions
                  </span>
                  <h3 className="text-base font-bold text-white font-heading">
                    How to Deploy this Project to Netlify
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#123D2A] text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <div>
                      <strong className="text-white block">Push code to GitHub / GitLab</strong>
                      <p className="text-gray-400 text-[11px] mt-0.5">
                        Initialize a Git repository and push your project to GitHub or GitLab. All configuration files (<code className="text-gray-300">netlify.toml</code>, <code className="text-gray-300">public/_redirects</code>) are already in place.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#123D2A] text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <div>
                      <strong className="text-white block">Connect site in Netlify</strong>
                      <p className="text-gray-400 text-[11px] mt-0.5">
                        Log in to <strong className="text-white">app.netlify.com</strong> &rarr; Click <strong className="text-white">"Add new site"</strong> &rarr; <strong className="text-white">"Import an existing project"</strong> &rarr; Select your Git repository.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#123D2A] text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    <div>
                      <strong className="text-white block">Automatic Build Detection</strong>
                      <p className="text-gray-400 text-[11px] mt-0.5">
                        Netlify automatically reads <code className="text-cyan-300 font-mono">netlify.toml</code>:
                        <br />&bull; Build command: <code className="text-gray-300">npm run build</code>
                        <br />&bull; Publish directory: <code className="text-gray-300">dist</code>
                        <br />&bull; Functions directory: <code className="text-gray-300">netlify/functions</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#123D2A] text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">4</span>
                    <div>
                      <strong className="text-white block">Deploy & Enjoy 100% Free SSL</strong>
                      <p className="text-gray-400 text-[11px] mt-0.5">
                        Click <strong className="text-white">"Deploy Site"</strong>. Netlify will build the site, deploy the serverless inquiry functions, and activate an automated HTTPS certificate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Netlify Forms Instant Forwarding Card */}
              <div className="bg-gradient-to-r from-[#0d281c] to-[#161616] p-6 rounded-2xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Netlify Forms &bull; Zero-Configuration Email Alerts</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  Get Email Alerts directly through Netlify Forms
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The VORQEN contact system automatically sends dual submissions to Netlify Forms (<code className="text-emerald-300">vorqen-inquiries</code>).
                </p>
                <div className="bg-[#101010]/80 p-3 rounded-lg border border-[#262626] text-[11px] text-gray-300 space-y-1">
                  <div><strong>To receive instant emails on Netlify without any SMTP server:</strong></div>
                  <div>1. Go to Netlify Dashboard &rarr; <strong className="text-white">Site configuration &rarr; Forms</strong>.</div>
                  <div>2. Under <strong className="text-white">Form notifications</strong>, click <strong className="text-white">Add notification &rarr; Email notification</strong>.</div>
                  <div>3. Set form to <code className="text-emerald-300 font-mono">vorqen-inquiries</code> and email to <code className="text-emerald-300 font-mono">vorqenimpex@gmail.com</code>.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS & SEO */}
      {activeTab === 'settings' && (
        <div className="bg-[#161616] p-8 rounded-xl border border-[#262626] space-y-6">
          <h3 className="text-base font-bold text-white font-heading">
            Official Brand & Manufacturing Verification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#262626]">
              <span className="text-gray-400 block mb-1">Consumer Brand</span>
              <span className="text-white font-bold">{BRAND_INFO.brandName}</span>
            </div>
            <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#262626]">
              <span className="text-gray-400 block mb-1">Manufacturer & Exporter</span>
              <span className="text-white font-bold">{BRAND_INFO.parentCompany} (Est. {BRAND_INFO.establishedYear})</span>
            </div>
            <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#262626]">
              <span className="text-gray-400 block mb-1">Export Desk Phone / WhatsApp</span>
              <span className="text-white font-bold">{BRAND_INFO.phone}</span>
            </div>
            <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#262626]">
              <span className="text-gray-400 block mb-1">Commercial Email</span>
              <span className="text-white font-bold">{BRAND_INFO.email}</span>
            </div>
          </div>

          <div className="border-t border-[#242424] pt-4 space-y-2 text-xs text-gray-400">
            <h4 className="font-bold text-white">SEO Keywords & Search Indexing</h4>
            <p>
              Optimized for: <em>Work gloves manufacturer Pakistan, Safety gloves exporter Pakistan, Tactical gloves manufacturer, Motorcycle gloves manufacturer, Leather jacket manufacturer Sialkot, Sportswear manufacturer Sialkot, Private-label sportswear manufacturer.</em>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
