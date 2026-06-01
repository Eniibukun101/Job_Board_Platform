import React, { useState } from "react";
import {
  Building,
  Mail,
  MapPin,
  Edit,
  Upload,
  Check,
  Globe,
  Briefcase,
  ArrowLeft,
  X,
} from "lucide-react";

interface CompanyProfileState {
  name: string;
  email: string;
  industry: string;
  website: string;
  location: string;
  bio: string;
}

interface CompanyProfilePageProps {
  onBackToHome: () => void;
  profile: CompanyProfileState;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfileState>>;
  logoUrl?: string;
  onPersistProfileUpdate?: (updates: {
    name?: string;
    email?: string;
    industry?: string;
    website?: string;
    location?: string;
    bio?: string;
    photoUrl?: string;
  }) => Promise<void> | void;
  toast: (msg: string) => void;
}

export default function CompanyProfilePage({
  onBackToHome,
  profile,
  setProfile,
  logoUrl = "",
  onPersistProfileUpdate,
  toast,
}: CompanyProfilePageProps) {
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [tempCompany, setTempCompany] = useState({
    name: profile.name,
    email: profile.email,
    industry: profile.industry,
  });

  const [isEditingWebsite, setIsEditingWebsite] = useState(false);
  const [tempWebsite, setTempWebsite] = useState(profile.website);

  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [tempLocation, setTempLocation] = useState(profile.location);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(profile.bio);

  const [localLogoUrl, setLocalLogoUrl] = useState(logoUrl);

  const handleSaveCompanyInfo = async () => {
    setProfile((prev) => ({
      ...prev,
      name: tempCompany.name,
      email: tempCompany.email,
      industry: tempCompany.industry,
    }));

    if (onPersistProfileUpdate) {
      await onPersistProfileUpdate({
        name: tempCompany.name,
        email: tempCompany.email,
        industry: tempCompany.industry,
      });
    }

    setIsEditingCompany(false);
    toast("Company information updated successfully!");
  };

  const handleSaveWebsite = async () => {
    setProfile((prev) => ({ ...prev, website: tempWebsite }));
    if (onPersistProfileUpdate) {
      await onPersistProfileUpdate({ website: tempWebsite });
    }
    setIsEditingWebsite(false);
    toast("Website updated!");
  };

  const handleSaveLocation = async () => {
    setProfile((prev) => ({ ...prev, location: tempLocation }));
    if (onPersistProfileUpdate) {
      await onPersistProfileUpdate({ location: tempLocation });
    }
    setIsEditingLocation(false);
    toast("Location updated!");
  };

  const handleSaveBio = async () => {
    setProfile((prev) => ({ ...prev, bio: tempBio }));
    if (onPersistProfileUpdate) {
      await onPersistProfileUpdate({ bio: tempBio });
    }
    setIsEditingBio(false);
    toast("Company description updated!");
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        setLocalLogoUrl(dataUrl);
        if (onPersistProfileUpdate) {
          await onPersistProfileUpdate({ photoUrl: dataUrl });
        }
        toast("Company logo uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#f3f6fa] min-h-screen pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#21222D] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Workspace
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex items-start gap-6">
            {/* Logo Upload */}
            <div className="relative">
              {localLogoUrl ? (
                <img
                  src={localLogoUrl}
                  alt="Company Logo"
                  className="w-24 h-24 rounded-xl object-cover ring-4 ring-gray-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-4 ring-gray-100">
                  <Building className="w-12 h-12 text-white" />
                </div>
              )}
              <label
                htmlFor="logo-upload"
                className="absolute -bottom-2 -right-2 bg-[#21222D] text-white p-2 rounded-full cursor-pointer hover:bg-[#2c2d39] transition-colors shadow-lg"
              >
                <Upload className="w-4 h-4" />
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Company Name & Email */}
            <div className="flex-1">
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                {profile.name || "Company Name"}
              </h1>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {profile.email || "company@example.com"}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                <Building className="w-3 h-3" />
                Employer Account
              </div>
            </div>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900">
              Company Information
            </h2>
            {!isEditingCompany ? (
              <button
                onClick={() => {
                  setTempCompany({
                    name: profile.name,
                    email: profile.email,
                    industry: profile.industry,
                  });
                  setIsEditingCompany(true);
                }}
                className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveCompanyInfo}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditingCompany(false)}
                  className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {isEditingCompany ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={tempCompany.name}
                  onChange={(e) =>
                    setTempCompany({ ...tempCompany, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={tempCompany.email}
                  onChange={(e) =>
                    setTempCompany({ ...tempCompany, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={tempCompany.industry}
                  onChange={(e) =>
                    setTempCompany({ ...tempCompany, industry: e.target.value })
                  }
                  placeholder="e.g., Technology, Finance, Healthcare"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Industry</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {profile.industry || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Website Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900">Website</h2>
            {!isEditingWebsite ? (
              <button
                onClick={() => {
                  setTempWebsite(profile.website);
                  setIsEditingWebsite(true);
                }}
                className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveWebsite}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditingWebsite(false)}
                  className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {isEditingWebsite ? (
            <input
              type="url"
              value={tempWebsite}
              onChange={(e) => setTempWebsite(e.target.value)}
              placeholder="https://yourcompany.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none"
            />
          ) : (
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                {profile.website || "No website added"}
              </a>
            </div>
          )}
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900">Location</h2>
            {!isEditingLocation ? (
              <button
                onClick={() => {
                  setTempLocation(profile.location);
                  setIsEditingLocation(true);
                }}
                className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveLocation}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditingLocation(false)}
                  className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {isEditingLocation ? (
            <input
              type="text"
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
              placeholder="City, Country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none"
            />
          ) : (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <p className="text-sm font-semibold text-gray-900">
                {profile.location || "No location specified"}
              </p>
            </div>
          )}
        </div>

        {/* Company Description Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900">
              Company Description
            </h2>
            {!isEditingBio ? (
              <button
                onClick={() => {
                  setTempBio(profile.bio);
                  setIsEditingBio(true);
                }}
                className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveBio}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditingBio(false)}
                  className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {isEditingBio ? (
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              placeholder="Tell candidates about your company, culture, and what makes you unique..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none resize-none"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {profile.bio ||
                "No company description added yet. Click Edit to add information about your company."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
