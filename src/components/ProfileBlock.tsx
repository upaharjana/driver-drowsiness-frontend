import React, { useState } from 'react';

const ProfileBlock: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "Sumanta manna",
        email: "sumanta@aura.com",
        vehicle: "Tesla Model 3",
        emergency: "(123) 456-7890"
    });
    
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = () => {
        if (isEditing) {
            setIsEditing(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } else {
            setIsEditing(true);
        }
    };

    return (
        <div className="bg-[#2a303c] rounded p-6 shadow border border-slate-700 h-full flex flex-col relative overflow-hidden">
            {showSuccess && (
                <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-center py-1 text-sm font-bold animate-pulse z-10">
                    Profile Updated Successfully!
                </div>
            )}
            
            <div className="bg-white h-12 mb-6 mt-2 rounded flex items-center justify-center text-slate-800 font-bold px-4">
                 Driver Record
            </div>
            
            <div className="flex flex-col gap-4 text-sm flex-grow">
                <div className="flex flex-col gap-1 border-b border-slate-700 py-1">
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Name</span>
                    {isEditing ? (
                        <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="bg-[#1e2329] border border-slate-600 rounded px-2 py-1 text-white outline-none focus:border-blue-500" />
                    ) : (
                        <span className="text-slate-200">{profile.name}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-700 py-1">
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Email</span>
                    {isEditing ? (
                        <input value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="bg-[#1e2329] border border-slate-600 rounded px-2 py-1 text-white outline-none focus:border-blue-500" />
                    ) : (
                        <span className="text-slate-200">{profile.email}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-700 py-1">
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Vehicle Details</span>
                    {isEditing ? (
                        <input value={profile.vehicle} onChange={e => setProfile({...profile, vehicle: e.target.value})} className="bg-[#1e2329] border border-slate-600 rounded px-2 py-1 text-white outline-none focus:border-blue-500" />
                    ) : (
                        <span className="text-slate-200">{profile.vehicle}</span>
                    )}
                </div>
                 <div className="flex flex-col gap-1 py-1">
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Emergency Contact</span>
                    {isEditing ? (
                        <input value={profile.emergency} onChange={e => setProfile({...profile, emergency: e.target.value})} className="bg-[#1e2329] border border-slate-600 rounded px-2 py-1 text-white outline-none focus:border-blue-500" />
                    ) : (
                        <span className="text-slate-200">{profile.emergency}</span>
                    )}
                </div>
            </div>
            
            <button 
                onClick={handleSubmit}
                className={`w-full text-white font-bold py-3 mt-4 rounded transition-colors shadow ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {isEditing ? 'Save Changes' : 'Update Profile'}
            </button>
        </div>
    );
};

export default ProfileBlock;
