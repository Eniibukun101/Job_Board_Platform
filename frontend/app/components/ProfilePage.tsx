'use client'
import { useState } from "react";
import { 
  User, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Edit, 
  Upload, 
  Check, 
  Globe, 
  Briefcase, 
  Phone,
  ArrowLeft,
  Trash2,
  Plus
} from "lucide-react";

interface ProfileState {
  name: string;
  email: string;
  phone: string;
  location: string;
  aboutMe: string;
  skills: string[];
  linkedin: string;
  portfolio: string;
  experiences: {
    title: string;
    location: string;
    company: string;
  }[];
}

interface ProfilePageProps {
  onBackToHome: () => void;
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  isPhotoUploaded: boolean;
  setIsPhotoUploaded: (val: boolean) => void;
  isCvUploaded: boolean;
  setIsCvUploaded: (val: boolean) => void;
  isAboutMeCompleted: boolean;
  setIsAboutMeCompleted: (val: boolean) => void;
  toast: (msg: string) => void;
}

export default function ProfilePage({
  onBackToHome,
  profile,
  setProfile,
  isPhotoUploaded,
  setIsPhotoUploaded,
  isCvUploaded,
  setIsCvUploaded,
  isAboutMeCompleted,
  setIsAboutMeCompleted,
  toast
}: ProfilePageProps) {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [tempPersonal, setTempPersonal] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone
  });

  const [locationInput, setLocationInput] = useState(profile.location);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [tempAbout, setTempAbout] = useState(profile.aboutMe);

  // Editing state for Skills
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [tempSkills, setTempSkills] = useState<string[]>(profile.skills);
  const [newSkillText, setNewSkillText] = useState("");

  // Editing state for Links
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [tempLinkedin, setTempLinkedin] = useState(profile.linkedin);
  const [tempPortfolio, setTempPortfolio] = useState(profile.portfolio);

  // Editing state for Experience
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [tempExperiences, setTempExperiences] = useState(profile.experiences);

  // Helper functions for updating
  const handleSkillsSave = () => {
    setProfile(prev => ({
      ...prev,
      skills: tempSkills
    }));
    setIsEditingSkills(false);
    toast("Skills updated successfully!");
  };

  const handleAddSkill = () => {
    if (newSkillText.trim()) {
      setTempSkills(prev => [...prev, newSkillText.trim()]);
      setNewSkillText("");
    }
  };

  const handleDeleteSkill = (idx: number) => {
    setTempSkills(prev => prev.filter((_, i) => i !== idx));
  };

  const handleLinksSave = () => {
    setProfile(prev => ({
      ...prev,
      linkedin: tempLinkedin,
      portfolio: tempPortfolio
    }));
    setIsEditingLinks(false);
    toast("Links updated successfully!");
  };

  const handleExperiencesSave = () => {
    setProfile(prev => ({
      ...prev,
      experiences: tempExperiences
    }));
    setIsEditingExperience(false);
    toast("Work experience updated successfully!");
  };

  const handleAddExperience = () => {
    setTempExperiences(prev => [
      ...prev,
      { title: "New Job Title", location: "City, Country", company: "Company Name" }
    ]);
  };

  const handleDeleteExperience = (idx: number) => {
    setTempExperiences(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateExperience = (idx: number, field: "title" | "location" | "company", value: string) => {
    setTempExperiences(prev => prev.map((exp, i) => i === idx ? { ...exp, [field]: value } : exp));
  };

  // Dynamic weights scaled to 100% without questions answered
  const weights = {
    personalInfo: 15,
    uploadPhoto: 5,
    aboutMe: 30,
    skills: 15,
    uploadCv: 20,
    experience: 10,
    location: 5
  };

  // Dynamic conditions based on actual state fields so the changes physically affect completion!
  const hasPersonalInfo = profile.name.trim().length > 0 && profile.email.trim().length > 0 && profile.phone.trim().length > 0;
  const hasPhoto = isPhotoUploaded;
  const hasAboutMe = profile.aboutMe.trim().length > 15;
  const hasSkills = profile.skills.length > 0;
  const hasCv = isCvUploaded;
  const hasExperience = profile.experiences.length > 0;
  const hasLocation = profile.location.trim().length > 2;

  const progressPercent = 
    (hasPersonalInfo ? weights.personalInfo : 0) +
    (hasPhoto ? weights.uploadPhoto : 0) +
    (hasAboutMe ? weights.aboutMe : 0) +
    (hasSkills ? weights.skills : 0) +
    (hasCv ? weights.uploadCv : 0) +
    (hasExperience ? weights.experience : 0) +
    (hasLocation ? weights.location : 0);

  const handlePersonalSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      name: tempPersonal.name,
      email: tempPersonal.email,
      phone: tempPersonal.phone
    }));
    setIsEditingPersonal(false);
    toast("Personal Info updated successfully!");
  };

  const handleLocationSave = () => {
    setProfile(prev => ({
      ...prev,
      location: locationInput
    }));
    toast("Location details updated successfully!");
  };

  const handleAboutSave = () => {
    setProfile(prev => ({
      ...prev,
      aboutMe: tempAbout
    }));
    setIsEditingAbout(false);
    setIsAboutMeCompleted(true); // Marks about me as completed for progress!
    toast("About Me updated!");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsPhotoUploaded(true);
      toast("Profile photo uploaded successfully (+5% Strength)!");
    }
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsCvUploaded(true);
      toast("Resume / CV uploaded successfully (+20% Strength)!");
    }
  };

  const scrollAndHighlight = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-4", "ring-emerald-400", "ring-offset-2");
      setTimeout(() => {
        el.classList.remove("ring-4", "ring-emerald-400", "ring-offset-2");
      }, 2000);
    }
  };

  return (
    <div className="bg-[#f4f5f7] min-h-screen text-gray-800 pb-20 font-sans antialiased">
      {/* Mini Breadcrumb bar */}
      <div className="bg-white/50 border-b border-gray-150 py-3 px-6 select-none shadow-3xs max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-black text-[#212230] uppercase tracking-wider hover:text-indigo-600 transition-colors cursor-pointer border-0 bg-transparent"
          id="btn-back-home-profile"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Career Desk
        </button>
        <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest bg-gray-100/80 px-2.5 py-1 rounded-full">
          Secure Profile Hub
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Title Heading representing Screenshot ("Profile Page") */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight font-sans">
            Profile Page
          </h1>
        </div>

        {/* Responsive Grid Panel matching layout exactly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 2/3 COLUMN: User profile parts */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* CARD 1: Large circular photo uploader page */}
            <div id="card-upload-photo" className="bg-white rounded-2xl shadow-xs p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8 transition-all duration-300">
              {/* Photo Avatar circle placeholder */}
              <div className="relative">
                {isPhotoUploaded ? (
                  <div className="w-[150px] h-[150px] rounded-full overflow-hidden bg-slate-100 border-4 border-emerald-50 shadow-sm flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                      alt="Daniel Adeyemi" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>
                ) : (
                  <div className="w-[150px] h-[150px] rounded-full bg-gray-250 flex items-center justify-center text-gray-400 font-bold shadow-3xs hover:bg-gray-300/85 transition-colors duration-250">
                    <User className="w-16 h-16 text-gray-350" />
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="space-y-3.5 text-left flex-1">
                <div className="relative inline-block">
                  <input 
                    type="file" 
                    id="profile-photo-selector" 
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label 
                    htmlFor="profile-photo-selector"
                    className="px-6 py-2.5 bg-white border border-gray-300 hover:border-gray-800 text-gray-950 text-xs font-semibold rounded-lg shadow-3xs cursor-pointer transition-all active:scale-97 flex items-center justify-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload new photo
                  </label>
                </div>
                <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-sm">
                  At least 800 x 800px recommended <br />
                  JPG or PNG is allowed
                </p>
              </div>
            </div>

            {/* CARD 2: Personal Info showing Name, Email, Phone */}
            <div id="card-personal-info" className="bg-white rounded-2xl shadow-xs p-6 md:p-8 text-left transition-all duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="text-sm font-extrabold text-[#212230] tracking-tight uppercase">
                  Personal Info
                </h3>
                
                <button
                  onClick={() => {
                    if (isEditingPersonal) {
                      setTempPersonal({
                        name: profile.name,
                        email: profile.email,
                        phone: profile.phone
                      });
                    }
                    setIsEditingPersonal(!isEditingPersonal);
                  }}
                  className="px-5 py-1.5 bg-white border border-gray-300 hover:border-gray-800 text-gray-950 text-xs font-semibold rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
                  id="btn-edit-personal"
                >
                  <Edit className="w-3 h-3" />
                  {isEditingPersonal ? "Cancel" : "Edit"}
                </button>
              </div>

              {isEditingPersonal ? (
                <form onSubmit={handlePersonalSave} className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={tempPersonal.name}
                      onChange={(e) => setTempPersonal({...tempPersonal, name: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 focus:border-gray-800 focus:bg-white rounded-xl text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Email Name</label>
                    <input 
                      type="email" 
                      required
                      value={tempPersonal.email}
                      onChange={(e) => setTempPersonal({...tempPersonal, email: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 focus:border-gray-800 focus:bg-white rounded-xl text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      required
                      value={tempPersonal.phone}
                      onChange={(e) => setTempPersonal({...tempPersonal, phone: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 focus:border-gray-800 focus:bg-white rounded-xl text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-[#212230] text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Save Personal info
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold mb-1.5">Full Name</p>
                    <p className="text-sm font-bold text-[#212230]">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold mb-1.5">Email</p>
                    <p className="text-sm font-bold text-[#212230] break-all">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold mb-1.5">Phone</p>
                    <p className="text-sm font-bold text-[#212230]">{profile.phone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 3: Location Card with grey background */}
            <div id="card-location" className="bg-[#E2E2E6] rounded-2xl p-6 md:p-8 text-left transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#212230]">
                    <CheckCircle className="w-4 h-4 text-[#212230]" />
                  </span>
                  <input 
                    type="text" 
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Lagos"
                    className="w-full bg-white pl-11 pr-4 py-3 rounded-xl text-xs font-bold text-gray-800 focus:outline-none shadow-3xs"
                    id="location-profile-input"
                  />
                </div>
                
                <button 
                  onClick={handleLocationSave}
                  className="px-6 py-3 bg-[#212230] hover:bg-slate-800 text-white rounded-xl text-xs font-black tracking-tight cursor-pointer shadow-sm transition-all active:scale-97 border-0"
                  id="btn-save-location"
                >
                  save changes
                </button>
              </div>
            </div>

            {/* CARD 4: About Me Card */}
            <div id="card-about-me" className="bg-white rounded-2xl shadow-xs p-6 md:p-8 text-left transition-all duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4 select-none">
                <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  About me
                </h4>
                
                <button
                  onClick={() => {
                    if (isEditingAbout) setTempAbout(profile.aboutMe);
                    setIsEditingAbout(!isEditingAbout);
                  }}
                  className="p-1 px-3.5 bg-gray-50 hover:bg-gray-100 text-[#212230] text-[10px] font-bold rounded-lg transition-all border-0 cursor-pointer"
                >
                  {isEditingAbout ? "Cancel" : "Edit Message"}
                </button>
              </div>

              {isEditingAbout ? (
                <div className="space-y-3">
                  <textarea 
                    value={tempAbout}
                    onChange={(e) => setTempAbout(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-gray-200 focus:border-gray-800 focus:bg-white rounded-xl text-xs font-semibold focus:outline-none min-h-[100px]"
                  />
                  <button 
                    onClick={handleAboutSave}
                    className="px-5 py-2 bg-[#212230] text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Save About Me (Increase progress)
                  </button>
                </div>
              ) : (
                <p className="text-xs md:text-sm font-semibold text-gray-700 leading-relaxed max-w-3xl">
                  {profile.aboutMe}
                </p>
              )}
            </div>

            {/* Grid of 2 Cards: Skills (Left) + Links (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* CARD 5: Skills */}
              <div id="card-skills" className="bg-white rounded-2xl shadow-xs p-6 md:p-8 text-left transition-all duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4 select-none">
                  <h3 className="text-xs font-extrabold text-[#212230] uppercase tracking-wider">
                    Skills
                  </h3>
                  <button
                    onClick={() => {
                      if (isEditingSkills) {
                        setTempSkills(profile.skills);
                      }
                      setIsEditingSkills(!isEditingSkills);
                    }}
                    className="p-1 px-3 bg-gray-50 hover:bg-gray-100 text-[#212230] text-[10px] font-bold rounded-lg transition-all border-0 cursor-pointer"
                  >
                    {isEditingSkills ? "Cancel" : "Edit"}
                  </button>
                </div>
                
                {isEditingSkills ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Add a skill (e.g., Vue.js)..."
                        value={newSkillText}
                        onChange={(e) => setNewSkillText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-gray-200 focus:border-gray-800 focus:bg-white rounded-lg text-xs font-semibold focus:outline-none"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="p-1.5 bg-[#212230] text-white hover:bg-slate-800 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center border-0"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {tempSkills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                          <span className="text-xs font-semibold text-gray-700">{skill}</span>
                          <button
                            onClick={() => handleDeleteSkill(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer border-0 bg-transparent"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleSkillsSave}
                      className="w-full px-4 py-2 bg-[#212230] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all border-0 cursor-pointer"
                    >
                      Save Skills
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-2 text-xs font-bold text-gray-700">
                    {profile.skills.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-650 rounded-full shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* CARD 6: Links */}
              <div id="card-links" className="bg-white rounded-2xl shadow-xs p-6 md:p-8 text-left transition-all duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4 select-none">
                  <h3 className="text-xs font-extrabold text-[#212230] uppercase tracking-wider">
                    Links
                  </h3>
                  <button
                    onClick={() => {
                      if (isEditingLinks) {
                        setTempLinkedin(profile.linkedin);
                        setTempPortfolio(profile.portfolio);
                      }
                      setIsEditingLinks(!isEditingLinks);
                    }}
                    className="p-1 px-3 bg-gray-50 hover:bg-gray-100 text-[#212230] text-[10px] font-bold rounded-lg transition-all border-0 cursor-pointer"
                  >
                    {isEditingLinks ? "Cancel" : "Edit"}
                  </button>
                </div>
                
                {isEditingLinks ? (
                  <div className="space-y-3 animate-fade-in">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">LinkedIn URL</label>
                      <input 
                        type="text"
                        value={tempLinkedin}
                        onChange={(e) => setTempLinkedin(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-gray-200 focus:border-gray-800 focus:bg-white rounded-lg text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Portfolio (Behance, etc.)</label>
                      <input 
                        type="text"
                        value={tempPortfolio}
                        onChange={(e) => setTempPortfolio(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-gray-200 focus:border-gray-800 focus:bg-white rounded-lg text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    
                    <button
                      onClick={handleLinksSave}
                      className="w-full px-4 py-2 bg-[#212230] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all border-0 cursor-pointer"
                    >
                      Save Links
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-400">LinkedIn:</span>
                      <a 
                        href={`https://${profile.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-900 font-extrabold hover:text-indigo-600 transition-colors"
                      >
                        {profile.linkedin}
                      </a>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-400">Portfolio:</span>
                      <a 
                        href={`https://${profile.portfolio}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-900 font-extrabold hover:text-indigo-600 transition-colors"
                      >
                        {profile.portfolio}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CARD 7: Experience */}
            <div id="card-experience" className="bg-white rounded-2xl shadow-xs p-6 md:p-8 text-left transition-all duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-6 select-none">
                <h3 className="text-sm font-extrabold text-[#212230] tracking-tight uppercase">
                  Experience
                </h3>
                <button
                  onClick={() => {
                    if (isEditingExperience) {
                      setTempExperiences(profile.experiences);
                    }
                    setIsEditingExperience(!isEditingExperience);
                  }}
                  className="p-1 px-3 bg-gray-50 hover:bg-gray-100 text-[#212230] text-[10px] font-bold rounded-lg transition-all border-0 cursor-pointer"
                >
                  {isEditingExperience ? "Cancel" : "Edit"}
                </button>
              </div>
              
              {isEditingExperience ? (
                <div className="space-y-6 animate-fade-in">
                  {tempExperiences.map((exp, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-xl border border-gray-150 relative space-y-3">
                      <button
                        onClick={() => handleDeleteExperience(index)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-center"
                        title="Delete Experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div>
                        <label className="text-[9px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Job Title / Role</label>
                        <input 
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleUpdateExperience(index, "title", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 focus:border-gray-800 rounded-lg text-xs font-semibold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Company Name</label>
                        <input 
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(index, "company", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 focus:border-gray-800 rounded-lg text-xs font-semibold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Location Details</label>
                        <input 
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleUpdateExperience(index, "location", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 focus:border-gray-800 rounded-lg text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleAddExperience}
                    className="w-full py-2.5 bg-white border border-dashed border-gray-300 hover:border-gray-850 text-gray-700 hover:text-gray-900 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Work Experience
                  </button>

                  <button
                    onClick={handleExperiencesSave}
                    className="w-full px-4 py-2 bg-[#212230] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all cursor-pointer border-0"
                  >
                    Save Experience
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {profile.experiences.map((exp, index) => (
                    <div key={index} className="space-y-2.5">
                      <h4 className="text-sm font-black text-gray-900 leading-none">
                        {exp.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium font-mono leading-relaxed">
                        {exp.location}
                      </p>
                      <p className="text-xs text-gray-500 font-semibold font-mono">
                        {exp.company}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Layout Box matching screenshot exactly: Empty box with an "Upload cv" button on top-left of the box */}
            <div id="card-upload-document" className="bg-white rounded-2xl shadow-xs p-6 md:p-8 text-left space-y-4 transition-all duration-300">
              <div className="border border-dashed border-gray-200 rounded-xl p-8 relative flex flex-col justify-start items-start min-h-[140px]">
                <div className="absolute top-4 left-4">
                  <input 
                    type="file" 
                    id="cv-uploader-profile" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvUpload}
                    className="hidden"
                  />
                  <label 
                    htmlFor="cv-uploader-profile" 
                    className="px-4 py-2 bg-[#212230] hover:bg-slate-800 text-white text-[10px] font-extrabold rounded-lg tracking-wider uppercase cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload cv
                  </label>
                </div>

                {isCvUploaded ? (
                  <div className="pt-10 flex items-center gap-2 text-emerald-600 text-xs font-mono font-bold animate-fade-in">
                    <CheckCircle className="w-4 h-4" />
                    CV_Document_Submitted.pdf (20% Complete!)
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-400 font-mono font-bold pt-12">
                    No active CV attached yet. Upload matching files to unlock 20% profile stats.
                  </p>
                )}
              </div>

              <p className="text-xs font-semibold text-gray-900 leading-relaxed max-w-lg">
                Please note that information here will be available to company viewing your profile. Avoid sensitive information.
              </p>
            </div>

          </div>

          {/* RIGHT 1/3 COLUMN: Synced "Complete your Profile" widget */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            
            <div className="bg-white rounded-2xl shadow-xs p-6 md:p-8 text-center space-y-6">
              
              {/* Card Title Matches exactly */}
              <h3 className="text-sm font-extrabold text-[#212230] uppercase tracking-wider text-left border-b border-gray-100 pb-3">
                Complete your profile
              </h3>

              {/* Huge circular progress with SVG */}
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center select-none">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background track circle */}
                  <circle
                    className="text-gray-100"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="50"
                    cy="50"
                  />
                  {/* Foreground progress circle */}
                  <circle
                    className="text-[#3eda5f] transition-all duration-500 ease-out"
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 38}`}
                    strokeDashoffset={`${2 * Math.PI * 38 * (1 - progressPercent / 100)}`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="50"
                    cy="50"
                  />
                </svg>
                
                {/* Text 30% indicator */}
                <span className="absolute text-3xl font-black text-[#212230] tracking-tight">
                  {progressPercent}%
                </span>
              </div>

              {/* Checklist list and weights */}
              <div className="space-y-3.5 text-left pt-2 border-t border-gray-100">
                
                {/* Personal Info */}
                <button
                  onClick={() => {
                    scrollAndHighlight("card-personal-info");
                    setIsEditingPersonal(true);
                  }}
                  className="w-full flex items-center justify-between text-xs bg-transparent border-0 p-1 text-left cursor-pointer hover:bg-slate-50 rounded transition-all"
                >
                  <span className={`flex items-center gap-2 font-extrabold text-[#212230] hover:text-[#5850ec] text-xs transition-colors ${hasPersonalInfo ? "text-emerald-700" : ""}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${hasPersonalInfo ? "bg-emerald-500" : "bg-gray-900"}`} />
                    Personal Info
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${hasPersonalInfo ? "text-emerald-600 font-extrabold" : "text-gray-950"}`}>
                    {hasPersonalInfo ? "Done (15%)" : "15%"}
                  </span>
                </button>

                {/* Upload your photo */}
                <button 
                  onClick={() => {
                    scrollAndHighlight("card-upload-photo");
                  }}
                  className="w-full flex items-center justify-between text-xs bg-transparent border-0 p-1 text-left cursor-pointer hover:bg-slate-50 rounded transition-all"
                >
                  <span className={`flex items-center gap-2 font-extrabold text-[#212230] hover:text-[#5850ec] text-xs transition-colors ${hasPhoto ? "text-emerald-700" : ""}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${hasPhoto ? "bg-emerald-500" : "bg-gray-900"}`} />
                    Upload your photo
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${hasPhoto ? "text-emerald-600 font-extrabold" : "text-gray-950"}`}>
                    {hasPhoto ? "Done (5%)" : "5%"}
                  </span>
                </button>

                {/* About me */}
                <button 
                  onClick={() => {
                    scrollAndHighlight("card-about-me");
                    setIsEditingAbout(true);
                  }}
                  className="w-full flex items-center justify-between text-xs bg-transparent border-0 p-1 text-left cursor-pointer hover:bg-slate-50 rounded transition-all"
                >
                  <span className={`flex items-center gap-2 font-extrabold text-[#212230] hover:text-[#5850ec] text-xs transition-colors ${hasAboutMe ? "text-emerald-700" : ""}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${hasAboutMe ? "bg-emerald-500" : "bg-gray-900"}`} />
                    About me
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${hasAboutMe ? "text-emerald-600 font-extrabold" : "text-gray-950"}`}>
                    {hasAboutMe ? "Done (30%)" : "30%"}
                  </span>
                </button>

                {/* Skills */}
                <button 
                  onClick={() => {
                    scrollAndHighlight("card-skills");
                    setIsEditingSkills(true);
                  }}
                  className="w-full flex items-center justify-between text-xs bg-transparent border-0 p-1 text-left cursor-pointer hover:bg-slate-50 rounded transition-all"
                >
                  <span className={`flex items-center gap-2 font-extrabold text-[#212230] hover:text-[#5850ec] text-xs transition-colors ${hasSkills ? "text-emerald-700" : ""}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${hasSkills ? "bg-emerald-500" : "bg-gray-900"}`} />
                    Skills
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${hasSkills ? "text-emerald-600 font-extrabold" : "text-gray-950"}`}>
                    {hasSkills ? "Done (15%)" : "15%"}
                  </span>
                </button>

                {/* Upload document */}
                <button 
                  onClick={() => {
                    scrollAndHighlight("card-upload-document");
                  }}
                  className="w-full flex items-center justify-between text-xs bg-transparent border-0 p-1 text-left cursor-pointer hover:bg-slate-50 rounded transition-all"
                >
                  <span className={`flex items-center gap-2 font-extrabold text-[#212230] hover:text-[#5850ec] text-xs transition-colors ${hasCv ? "text-emerald-700" : ""}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${hasCv ? "bg-emerald-500" : "bg-gray-900"}`} />
                    Upload document
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${hasCv ? "text-emerald-600 font-extrabold" : "text-gray-950"}`}>
                    {hasCv ? "Done (20%)" : "20%"}
                  </span>
                </button>

                {/* Work experience */}
                <button 
                  onClick={() => {
                    scrollAndHighlight("card-experience");
                    setIsEditingExperience(true);
                  }}
                  className="w-full flex items-center justify-between text-xs bg-transparent border-0 p-1 text-left cursor-pointer hover:bg-slate-50 rounded transition-all"
                >
                  <span className={`flex items-center gap-2 font-extrabold text-[#212230] hover:text-[#5850ec] text-xs transition-colors ${hasExperience ? "text-emerald-700" : ""}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${hasExperience ? "bg-emerald-500" : "bg-gray-900"}`} />
                    Work experience
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${hasExperience ? "text-emerald-600 font-extrabold" : "text-gray-950"}`}>
                    {hasExperience ? "Done (10%)" : "10%"}
                  </span>
                </button>

                {/* Location */}
                <button 
                  onClick={() => {
                    scrollAndHighlight("card-location");
                  }}
                  className="w-full flex items-center justify-between text-xs bg-transparent border-0 p-1 text-left cursor-pointer hover:bg-slate-50 rounded transition-all"
                >
                  <span className={`flex items-center gap-2 font-extrabold text-[#212230] hover:text-[#5850ec] text-xs transition-colors ${hasLocation ? "text-emerald-700" : ""}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${hasLocation ? "bg-emerald-500" : "bg-gray-900"}`} />
                    Location
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${hasLocation ? "text-emerald-600 font-extrabold" : "text-gray-950"}`}>
                    {hasLocation ? "Done (5%)" : "5%"}
                  </span>
                </button>

              </div>

              {/* Dynamic Action suggestion banner */}
              <div className="bg-[#fcf8e3] border border-[#fbeed5] rounded-xl p-3 text-left">
                <span className="text-[10px] text-[#c09853] font-bold font-mono block">PRO TIP</span>
                <p className="text-[10px] text-[#c09853] leading-snug font-semibold mt-0.5">
                  Click on the checklist buttons above or the uploader boxes to toggle and calculate milestones instantly!
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
