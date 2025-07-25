'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Calendar, User, BookOpen, Award, TrendingUp, Play, Clock, CheckCircle, Lock, Users, PlaneTakeoff, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Supabase configuration
const supabaseUrl = 'https://tutrnikhomrgcpkzszvq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dHJuaWtob21yZ2Nwa3pzenZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MTQ4MDEsImV4cCI6MjAyOTM5MDgwMX0.VhWbNcOjwqoOTI32qByfOV46lJKUKiPG0qV3rvYJvlY';
const supabase = createClient(supabaseUrl, supabaseKey);

// IBAM Logo Component
interface IBAMLogoProps {
 size?: 'small' | 'medium' | 'large' | 'xlarge';
 className?: string;
 style?: React.CSSProperties;
}

const IBAMLogo: React.FC<IBAMLogoProps> = ({
 size = 'medium',
 className = '',
 style = {}
}: IBAMLogoProps) => {
 const sizeMap = {
   small: { width: '24px', height: 'auto' },
   medium: { width: '40px', height: 'auto' },
   large: { width: '60px', height: 'auto' },
   xlarge: { width: '120px', height: 'auto' }
 };

 const logoFile = size === 'small'
   ? '/images/branding/mini-logo.png'
   : '/images/branding/ibam-logo.png';

 return (
   <img
     src={logoFile}
     alt="IBAM Logo"
     className={className}
     style={{ ...sizeMap[size], ...style }}
     onError={(e) => {
       e.currentTarget.src = '/images/branding/ibam-logo.png';
     }}
   />
 );
};

// Type Definitions - Fixed to match Supabase return types
interface UserProgressRaw {
 session_id: number;
 completion_percentage: number;
 last_accessed_at: string;
}

interface UserProgress {
 id: number;
 session_id: number;
 completion_percentage: number;
 completed_at: string | null;
 last_accessed_at: string;
 quiz_score: number | null;
}

interface SessionData {
 id: number;
 module_id: number;
 session_number: number;
 title: string;
 subtitle: string;
}

interface ModuleProgress {
 module_id: number;
 total_sessions: number;
 completed_sessions: number;
 completion_percentage: number;
}

interface RecentActivityRaw {
 session_id: number;
 completion_percentage: number;
 last_accessed_at: string;
 sessions: {
   title: string;
   module_id: number;
   session_number: number;
 };
}

interface RecentActivity {
 session_id: number;
 completion_percentage: number;
 last_accessed_at: string;
 sessions: {
   title: string;
   module_id: number;
   session_number: number;
 };
}

// Known module structure from database
const MODULE_CONFIG = [
 { id: 1, title: "Foundational Principles", sessions: 4, color: "from-blue-400 to-blue-600", description: "Biblical foundations for business" },
 { id: 2, title: "Success and Failure Factors", sessions: 4, color: "from-green-400 to-green-600", description: "Learning from setbacks and victories" },
 { id: 3, title: "Marketing Excellence", sessions: 5, color: "from-purple-400 to-purple-600", description: "Ethical marketing and sales strategies" },
 { id: 4, title: "Financial Management", sessions: 4, color: "from-orange-400 to-orange-600", description: "Biblical approach to business finances" },
 { id: 5, title: "Business Planning", sessions: 3, color: "from-indigo-400 to-indigo-600", description: "Strategic planning with divine guidance" }
];

const IBAMDashboard: React.FC = () => {
 const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
 const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
 const [loading, setLoading] = useState<boolean>(true);
 const [showTrainersModal, setShowTrainersModal] = useState<boolean>(false);
 const [userId, setUserId] = useState<string>('');
 const [dataSource, setDataSource] = useState<'real' | 'mock'>('mock');
 const router = useRouter();

  // Continue Where You Left Off State
  const [continueSession, setContinueSession] = useState<{
    module_id: number;
    session_id: number;
    last_section: string;
    completion_percentage: number;
  } | null>(null);

  // Fetch last accessed session
  const fetchLastAccessedSession = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_session_progress')
      .select('module_id, session_id, last_section, last_subsection, completion_percentage')
      .eq('user_id', userId)
      .order('last_accessed', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;
    return data;
  };

 // Mock data for fallback
 const mockModuleProgress: ModuleProgress[] = [
   { module_id: 1, total_sessions: 4, completed_sessions: 4, completion_percentage: 100 },
   { module_id: 2, total_sessions: 4, completed_sessions: 2, completion_percentage: 50 },
   { module_id: 3, total_sessions: 5, completed_sessions: 0, completion_percentage: 0 },
   { module_id: 4, total_sessions: 4, completed_sessions: 0, completion_percentage: 0 },
   { module_id: 5, total_sessions: 3, completed_sessions: 0, completion_percentage: 0 }
 ];

 const mockRecentActivity: RecentActivity[] = [
   {
     session_id: 26,
     completion_percentage: 75,
     last_accessed_at: '2025-06-27T18:30:00Z',
     sessions: { title: 'Reasons for Success - Faith-Driven Principles', module_id: 2, session_number: 2 }
   },
   {
     session_id: 25,
     completion_percentage: 100,
     last_accessed_at: '2025-06-26T14:20:00Z',
     sessions: { title: 'Reasons for Failure - Learning from Mistakes', module_id: 2, session_number: 1 }
   },
   {
     session_id: 4,
     completion_percentage: 100,
     last_accessed_at: '2025-06-25T16:45:00Z',
     sessions: { title: 'Faith-Driven Business - The AVODAH Model', module_id: 1, session_number: 4 }
   }
 ];

 // Updated trainers array with photo paths
 const trainers = [
   { 
     name: "John", 
     experience: "30+ years", 
     expertise: ["Entrepreneurship", "Cross-Cultural Ministry"], 
     background: "Business mentorship across cultures",
     photoPath: "/john.png"
   },
   { 
     name: "Jeff", 
     experience: "30+ years", 
     expertise: ["Business", "Closed Countries Ministry"], 
     background: "Marketplace ministry in challenging environments",
     photoPath: "/jeff.png"
   },
   { 
     name: "Steve", 
     experience: "30+ years", 
     expertise: ["Retail", "Marketplace Ministry"], 
     background: "Retail industry and faith integration",
     photoPath: "/steve.png"
   },
   { 
     name: "Daniel", 
     experience: "30+ years", 
     expertise: ["Consultancy", "Cross-Cultural Living"], 
     background: "International business consultancy",
     photoPath: "/daniel.png"
   },
   { 
     name: "Roy", 
     experience: "30+ years", 
     expertise: ["Business Ownership", "Family Leadership"], 
     background: "Business ownership and leadership development",
     photoPath: "/roy.png"
   },
   { 
     name: "Dan", 
     experience: "30+ years", 
     expertise: ["Diverse Industries", "Discipleship"], 
     background: "Multi-industry experience and discipleship",
     photoPath: "/dan.png"
   }
 ];

// Get the actual logged-in user ID
const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }
    
    if (!user) {
      console.log('No user logged in');
      return null;
    }
    
    return user.id; // Returns the actual logged-in user's ID
  } catch (error) {
    console.error('Error in getCurrentUserId:', error);
    return null;
  }
};

 // Calculate module progress from raw data
 const calculateModuleProgress = (sessions: SessionData[], progress: UserProgressRaw[]): ModuleProgress[] => {
   const progressMap = new Map<number, { total: number; completed: number }>();
  
   // Initialize all modules
   MODULE_CONFIG.forEach(module => {
     progressMap.set(module.id, { total: module.sessions, completed: 0 });
   });

   // Count actual sessions from database
   sessions.forEach(session => {
     const moduleId = Number(session.module_id);
     if (!progressMap.has(moduleId)) {
       progressMap.set(moduleId, { total: 0, completed: 0 });
     }
     // Update total if different from config (use actual database count)
     const current = progressMap.get(moduleId)!;
     progressMap.set(moduleId, { ...current, total: current.total });
   });

   // Count completed sessions
   progress.forEach(p => {
     const session = sessions.find(s => s.id === p.session_id);
     if (session && p.completion_percentage === 100) {
       const moduleId = Number(session.module_id);
       const current = progressMap.get(moduleId);
       if (current) {
         progressMap.set(moduleId, { ...current, completed: current.completed + 1 });
       }
     }
   });

   // Convert to final format
   return Array.from(progressMap.entries())
     .map(([moduleId, stats]) => ({
       module_id: moduleId,
       total_sessions: stats.total,
       completed_sessions: stats.completed,
       completion_percentage: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
     }))
     .sort((a, b) => a.module_id - b.module_id);
 };

 // Load dashboard data with comprehensive error handling
 const loadDashboardData = async (): Promise<void> => {
   try {
     setLoading(true);
    
     // Get user ID
     const currentUserId = await getCurrentUserId();
     if (!userId) {
      return;
}
     if (currentUserId) {
  setUserId(currentUserId);
}
    
     // Try to get sessions data
     const { data: sessions, error: sessionsError } = await supabase
       .from('sessions')
       .select('id, module_id, session_number, title, subtitle');
    
     if (sessionsError) {
       throw new Error(`Sessions query failed: ${sessionsError.message}`);
     }

     if (!sessions || sessions.length === 0) {
       console.log('⚠️ No sessions found in database, using mock data');
       setDataSource('mock');
       setModuleProgress(mockModuleProgress);
       setRecentActivity(mockRecentActivity);
       return;
     }

     // Try to get user progress
     const { data: progress, error: progressError } = await supabase
       .from('user_progress')
       .select('session_id, completion_percentage, last_accessed_at')
       .eq('user_id', currentUserId);

     if (progressError) {
       console.log('⚠️ User progress query failed, using sessions data only');
     }

     // Calculate module progress
     const moduleData = calculateModuleProgress(sessions, progress || []);
     setModuleProgress(moduleData);

     // Get recent activity
     const { data: activityData, error: activityError } = await supabase
       .from('user_progress')
       .select(`
         session_id,
         completion_percentage,
         last_accessed_at,
         sessions!inner(title, module_id, session_number)
       `)
       .eq('user_id', currentUserId)
       .order('last_accessed_at', { ascending: false })
       .limit(5);

     if (!activityError && activityData && activityData.length > 0) {
       console.log('✅ Using real activity data');
       // Transform the data to match our interface
       const transformedActivity: RecentActivity[] = activityData.map((item: any) => ({
         session_id: item.session_id,
         completion_percentage: item.completion_percentage,
         last_accessed_at: item.last_accessed_at,
         sessions: {
           title: item.sessions.title,
           module_id: item.sessions.module_id,
           session_number: item.sessions.session_number
         }
       }));
       setRecentActivity(transformedActivity);
       setDataSource('real');
     } else {
       console.log('ℹ️ No recent activity found, using mock data');
       setRecentActivity(mockRecentActivity);
     }

     console.log('✅ Dashboard data loaded successfully');
    
   } catch (error) {
     console.error('❌ Error loading dashboard data:', error);
     setDataSource('mock');
     setModuleProgress(mockModuleProgress);
     setRecentActivity(mockRecentActivity);
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   loadDashboardData();
 
    // Load continue session data
const loadContinueData = async () => {
  // First, ask Supabase "who is logged in?"
  const { data: { user } } = await supabase.auth.getUser();
  
  // Now we can use 'user' because we just got it from Supabase
  if (user?.id) {
    const lastSession = await fetchLastAccessedSession(user.id);
    setContinueSession(lastSession);
  }
};
    loadContinueData();
}, []);

 // Helper functions
 const getModuleProgress = (moduleId: number): number => {
   const progress = moduleProgress.find(m => m.module_id === moduleId);
   return progress?.completion_percentage ?? 0;
 };

 const getModuleStatus = (moduleId: number): 'completed' | 'in-progress' | 'available' | 'locked' => {
   const progress = getModuleProgress(moduleId);
   if (progress === 100) return 'completed';
   if (progress > 0) return 'in-progress';
   if (moduleId === 1) return 'available';
  
   const prevProgress = getModuleProgress(moduleId - 1);
   return prevProgress === 100 ? 'available' : 'locked';
 };

 const getModuleInfo = (moduleId: number) => {
   return MODULE_CONFIG.find(m => m.id === moduleId) ?? MODULE_CONFIG[0];
 };

 if (loading) {
   return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
       <div className="text-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
         <p className="text-gray-600">Loading your dashboard...</p>
       </div>
     </div>
   );
 }

 return (
   <div className="min-h-screen bg-gray-50">
     {/* Header */}
     <div className="bg-gradient-to-r from-teal-400 to-slate-700 text-white shadow-lg">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
         <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
             <IBAMLogo size="large" />
             <div>
               <h1 className="text-2xl sm:text-3xl font-bold">Welcome Back, Entrepreneur!</h1>
               <p className="text-teal-100 mt-1">Your faith-driven business journey continues</p>
             </div>

      {/* Continue Where You Left Off Section */}
      {continueSession && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <Play className="w-8 h-8 mr-3" />
                Continue Your Journey
              </h2>
              <p className="text-blue-100 text-lg">
                Module {continueSession.module_id}, Session {continueSession.session_id}
              </p>
              <div className="flex items-center mt-2">
                <div className="bg-white/20 rounded-full h-2 w-48 mr-3">
                  <div 
                    className="bg-white rounded-full h-2 transition-all"
                    style={{ width: `${continueSession.completion_percentage}%` }}
                  />
                </div>
                <span className="text-sm text-blue-100">
                  {continueSession.completion_percentage}% complete
                </span>
              </div>
            </div>
            
            <button
              onClick={() => router.push(`/modules/${continueSession.module_id}/sessions/${continueSession.session_id}`)}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg flex items-center"
            >
              Continue Session
              <ArrowRight className="w-6 h-6 ml-2" />
            </button>
          </div>
        </div>
      )}

           </div>
           <div className="hidden sm:flex items-center space-x-4">
             <Calendar className="w-5 h-5" />
             <span className="text-sm">{new Date().toLocaleDateString()}</span>
           </div>
         </div>
       </div>
     </div>

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

       {/* Vision Statement */}
       <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-l-4 border-teal-500">
         <div className="flex items-start space-x-4">
           <div className="bg-teal-100 rounded-lg p-3">
             <TrendingUp className="w-6 h-6 text-teal-600" />
           </div>
           <div>
             <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Mission</h2>
             <p className="text-gray-700 leading-relaxed">
               "Multiplying Followers of Jesus Christ through excellent, Faith-Driven Businesses."
             </p>
           </div>
         </div>
       </div>

       {/* Quick Actions */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <button
           onClick={() => window.location.href = '/business-planner'}
           className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
         >
           <div className="flex items-center space-x-4">
             <PlaneTakeoff className="w-8 h-8" />
             <div className="text-left">
               <h3 className="text-xl font-bold">Business Planner</h3>
               <p className="text-orange-100">Build your faith-driven business plan</p>
             </div>
           </div>
         </button>

         <button
           onClick={() => setShowTrainersModal(true)}
           className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
         >
           <div className="flex items-center space-x-4">
             <Users className="w-8 h-8" />
             <div className="text-left">
               <h3 className="text-xl font-bold">Meet Your Trainers</h3>
               <p className="text-purple-100">180+ years combined experience</p>
             </div>
           </div>
         </button>
       </div>

       {/* Learning Modules */}
       <div className="mb-8">
         <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Journey</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {MODULE_CONFIG.map((module) => {
             const status = getModuleStatus(module.id);
             const progress = getModuleProgress(module.id);
            
             return (
               <div key={module.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
                 <div className={`bg-gradient-to-r ${module.color} p-4`}>
                   <div className="flex items-center justify-between text-white">
                     <div className="flex items-center space-x-2">
                       <BookOpen className="w-5 h-5" />
                       <span className="font-semibold">Module {module.id}</span>
                     </div>
                     {status === 'completed' && <CheckCircle className="w-5 h-5" />}
                     {status === 'locked' && <Lock className="w-5 h-5" />}
                   </div>
                 </div>
                
                 <div className="p-6">
                   <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                   <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                  
                   <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                     <span>{module.sessions} Sessions</span>
                     <span>{progress}% Complete</span>
                   </div>
                  
                   <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                     <div
                       className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-300`}
                       style={{ width: `${progress}%` }}
                     ></div>
                   </div>
                  
                   <button
                     onClick={() => window.location.href = `/modules/${module.id}`}
                     disabled={status === 'locked'}
                     className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                       status === 'locked'
                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                         : `bg-gradient-to-r ${module.color} text-white hover:shadow-lg hover:scale-105`
                     }`}
                   >
                     {status === 'locked' ? 'Complete Previous Module' :
                      status === 'completed' ? 'Review Module' :
                      status === 'in-progress' ? 'Continue Learning' : 'Start Module'}
                   </button>
                 </div>
               </div>
             );
           })}
         </div>
       </div>

       {/* Course Information Link */}
       <div className="mb-8">
         <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
           <div className="flex items-center justify-between">
             <div>
               <h3 className="text-lg font-semibold text-gray-900 mb-2">Want to Learn More?</h3>
               <p className="text-gray-600">Explore our complete course curriculum, meet all trainers, and see success stories.</p>
             </div>
             <button
               onClick={() => window.location.href = '/course-info'}
               className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap ml-4"
             >
               Course Information
             </button>
           </div>
         </div>
       </div>

       {/* Recent Activity */}
       {recentActivity.length > 0 && (
         <div className="bg-white rounded-xl shadow-sm p-6">
           <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
           <div className="space-y-3">
             {recentActivity.map((activity, index) => (
               <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                 <Play className="w-5 h-5 text-teal-600" />
                 <div className="flex-1">
                   <p className="font-medium text-gray-900">{activity.sessions.title}</p>
                   <p className="text-sm text-gray-500">Module {activity.sessions.module_id} • {activity.completion_percentage}% complete</p>
                 </div>
                 <div className="text-sm text-gray-500">
                   {new Date(activity.last_accessed_at).toLocaleDateString()}
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}
     </div>

     {/* Trainers Modal - UPDATED WITH PHOTOS */}
     {showTrainersModal && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-xl max-w-5xl w-full max-h-[80vh] overflow-y-auto">
           <div className="p-6 border-b">
             <div className="flex items-center justify-between">
               <h2 className="text-2xl font-bold text-gray-900">Meet Your Trainers</h2>
               <button
                 onClick={() => setShowTrainersModal(false)}
                 className="text-gray-400 hover:text-gray-600 text-2xl"
               >
                 ✕
               </button>
             </div>
             <p className="text-gray-600 mt-2">180+ years of combined marketplace ministry experience</p>
           </div>
           <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {trainers.map((trainer, index) => (
               <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                 <div className="flex flex-col items-center text-center">
                   {/* Real Photo */}
                   <div className="w-20 h-20 mb-4 relative overflow-hidden rounded-full border-3 border-teal-200">
                     <img 
                       src={trainer.photoPath}
                       alt={`${trainer.name} - IBAM Trainer`}
                       className="w-full h-full object-cover"
                       onLoad={() => console.log(`✅ Trainer photo loaded: ${trainer.photoPath}`)}
                       onError={(e) => {
                         console.log(`❌ Trainer photo failed: ${trainer.photoPath}`);
                         // Fallback to gradient circle with initials
                         const target = e.target as HTMLImageElement;
                         target.style.display = 'none';
                         const fallback = target.nextElementSibling as HTMLElement;
                         if (fallback) fallback.style.display = 'flex';
                       }}
                     />
                     {/* Fallback circle - hidden by default */}
                     <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                       {trainer.name[0]}
                     </div>
                   </div>
                   <div>
                     <h3 className="font-semibold text-gray-900 text-lg">{trainer.name}</h3>
                     <p className="text-sm text-teal-600 font-medium mb-3">{trainer.experience}</p>
                   </div>
                 </div>
                 <p className="text-sm text-gray-700 mb-4 text-center">{trainer.background}</p>
                 <div className="flex flex-wrap justify-center gap-2">
                   {trainer.expertise.map((skill, i) => (
                     <span key={i} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                       {skill}
                     </span>
                   ))}
                 </div>
               </div>
             ))}
           </div>
           <div className="p-6 border-t bg-gray-50 text-center">
             <p className="text-gray-600 mb-4">Ready to learn from these experienced mentors?</p>
             <button
               onClick={() => {
                 setShowTrainersModal(false);
                 window.location.href = '/trainers';
               }}
               className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
             >
               Learn More About Our Team
             </button>
           </div>
         </div>
       </div>
     )}

     {/* IBAM Footer */}
     <footer className="bg-white border-t border-gray-200 py-8 mt-12">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col md:flex-row items-center justify-between">
           <div className="flex items-center space-x-4 mb-4 md:mb-0">
             <IBAMLogo size="medium" />
             <div className="text-sm text-gray-600">
               <p className="font-semibold">International Business As Mission</p>
               <p>Multiplying Followers of Jesus through marketplace entrepreneurship</p>
             </div>
           </div>
           <div className="flex items-center space-x-6 text-sm text-gray-600">
             <span>© 2025 IBAM</span>
             <a
               href="https://www.ibam.org"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:text-teal-600 transition-colors"
             >
               www.ibam.org
             </a>
           </div>
         </div>
       </div>
     </footer>
   </div>
 );
};

export default IBAMDashboard;