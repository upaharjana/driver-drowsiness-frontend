import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import ProfileBlock from "./ProfileBlock"
import StatCard from "./StatCard"
import MonthlyChart from "./MonthlyChart"
import AlertBanner from "./AlertBanner"
import AIMapPage from "./AIMapPage"

const Dashboard: React.FC = () => {
    const [isEmergency, setIsEmergency] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [activeTab, setActiveTab] = useState('driving');

    // Mock an emergency state after 15 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsEmergency(true);
        }, 15000); // 15 seconds to critical alert
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#1c2025] text-white font-sans overflow-x-hidden selection:bg-blue-500 p-4 md:p-8">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[250px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] gap-6 xl:gap-8 auto-rows-min">
                
                {/* Left Column - Sidebar */}
                <div className="flex flex-col gap-6">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Dynamic Content Area based on Active Tab */}
                <div className="flex flex-col gap-6 xl:gap-8 min-h-[80vh]">
                    
                    {/* DRIVING MODE TAB */}
                    {activeTab === 'driving' && (
                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_350px] gap-6 xl:gap-8 h-full">
                            {/* Middle Column - Main Stats & Charts */}
                            <div className="flex flex-col gap-4">
                                {/* Top Stat Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <StatCard title="Driving Hours" value="10 hrs" />
                                    <StatCard title="Alertness Score" value="85%" />
                                    <StatCard title="Safe Driving Streak" value="5 Days" />
                                </div>

                                {/* Chart 1 */}
                                <StatCard title="Driving Patterns" className="h-[250px]">
                                    <div className="bg-[#414b5c] w-full h-full rounded flex items-center justify-center opacity-80">
                                        <MonthlyChart />
                                    </div>
                                </StatCard>

                                {/* Chart 2 */}
                                <StatCard title="Fatigue Detection History" className="h-[250px]">
                                    <div className="bg-[#414b5c] w-full h-full rounded flex items-center justify-center opacity-80">
                                        <MonthlyChart />
                                    </div>
                                </StatCard>

                                <div onClick={() => setShowContactModal(true)} className="cursor-pointer transition-transform hover:scale-[1.01]">
                                    <StatCard title="Emergency Contact" value="John Doe: (123) 456-7890" className="hover:border-blue-500 border-dashed" />
                                </div>
                            </div>

                            {/* Right Column - Profile & GPS */}
                            <div className="flex flex-col gap-6">
                                <ProfileBlock />
                                
                                {/* Live GPS Navigation */}
                                <StatCard title="Live GPS Navigation" className="h-[300px]" noPadding={true}>
                                    <div className="w-full h-full flex items-center justify-center p-6">
                                        <div className="text-center">
                                            <p className="text-slate-300 mb-4">Interactive navigation has moved to the AI Map page for a better in-drive experience.</p>
                                            <button onClick={() => setActiveTab('ai')} className="px-4 py-2 bg-blue-600 rounded text-white font-bold hover:bg-blue-700">Open AI Map</button>
                                        </div>
                                    </div>
                                </StatCard>
                            </div>
                        </div>
                    )}

                        {/* AI MAP PAGE */}
                        {activeTab === 'ai' && (
                            <div className="w-full">
                                <AIMapPage onBack={() => setActiveTab('driving')} triggerEmergency={() => setShowContactModal(true)} />
                            </div>
                        )}

                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div className="bg-[#2a303c] p-8 rounded-lg border border-[#444f63] shadow-lg animate-in fade-in duration-300">
                            <h2 className="text-3xl font-bold mb-2">Driver Profile</h2>
                            <p className="text-slate-400 mb-8 border-b border-slate-700 pb-4">Manage your personal information and vehicle details.</p>
                            
                            <div className="max-w-2xl bg-[#1e2329] p-6 rounded-lg shadow-inner">
                                <ProfileBlock />
                            </div>
                        </div>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === 'settings' && (
                        <div className="bg-[#2a303c] p-8 rounded-lg border border-[#444f63] shadow-lg animate-in fade-in duration-300">
                            <h2 className="text-3xl font-bold mb-2">System Settings</h2>
                            <p className="text-slate-400 mb-8 border-b border-slate-700 pb-4">Configure your AI dashboard preferences and safety features.</p>
                            
                            <div className="flex flex-col gap-4 max-w-2xl">
                                <div className="flex items-center justify-between p-5 bg-[#1e2329] rounded border border-slate-600 hover:border-slate-500 transition-colors cursor-pointer">
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Auto-Emergency Dispatch</h4>
                                        <p className="text-sm text-slate-400">Automatically call emergency contact if unresponsive for 15s.</p>
                                    </div>
                                    <div className="w-14 h-7 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow"></div></div>
                                </div>
                                <div className="flex items-center justify-between p-5 bg-[#1e2329] rounded border border-slate-600 hover:border-slate-500 transition-colors cursor-pointer">
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Dark Theme Preference</h4>
                                        <p className="text-sm text-slate-400">Force high-contrast dark theme on dashboard.</p>
                                    </div>
                                    <div className="w-14 h-7 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow"></div></div>
                                </div>
                                <div className="flex items-center justify-between p-5 bg-[#1e2329] rounded border border-slate-600 hover:border-slate-500 transition-colors cursor-pointer">
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Fleet Admin GPS Tracking</h4>
                                        <p className="text-sm text-slate-400">Share continuous live GPS location with your fleet administration.</p>
                                    </div>
                                    <div className="w-14 h-7 bg-slate-600 rounded-full relative"><div className="absolute left-1 top-1 w-5 h-5 bg-slate-300 rounded-full shadow"></div></div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>

            {/* Emergency Contact Modal */}
            {showContactModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-[#2a303c] rounded border border-slate-600 p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-bold mb-4 text-white">Emergency Contact</h2>
                        <div className="flex flex-col gap-2 mb-6">
                            <p className="text-slate-300"><span className="text-slate-500 w-24 inline-block font-bold">Name:</span> John Doe</p>
                            <p className="text-slate-300"><span className="text-slate-500 w-24 inline-block font-bold">Relation:</span> Spouse</p>
                            <p className="text-slate-300"><span className="text-slate-500 w-24 inline-block font-bold">Phone:</span> (123) 456-7890</p>
                            <p className="text-slate-300"><span className="text-slate-500 w-24 inline-block font-bold">Alt Phone:</span> (098) 765-4321</p>
                        </div>
                        <div className="flex justify-end gap-3 text-sm">
                            <button onClick={() => setShowContactModal(false)} className="px-5 py-2 rounded border border-slate-600 text-slate-300 hover:bg-slate-700 font-bold transition-colors">Close</button>
                            <button onClick={() => { alert("Calling Emergency Contact!"); setShowContactModal(false); }} className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-bold shadow-lg transition-colors border border-green-500">Call Now</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Critical Alert Overlay */}
            <AlertBanner isActive={isEmergency} onCancel={() => setIsEmergency(false)} />
        </div>
    )
}

export default Dashboard