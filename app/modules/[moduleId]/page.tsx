'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { 
  CheckCircle, 
  Lock, 
  Play, 
  Clock, 
  ArrowLeft, 
  BookOpen, 
  Target,
  Users,
  Award,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface ModuleData {
  id: number;
  title: string;
  description: string;
  total_sessions: number;
  estimated_time: string;
}

interface SessionData {
  id: number;
  session_number: number;
  title: string;
  subtitle: string;
  estimated_time: string;
  is_completed?: boolean;
  is_current?: boolean;
  is_locked?: boolean;
}

interface UserProgress {
  [sessionId: number]: {
    completed: boolean;
    completion_date?: string;
    progress_percentage?: number;
  };
}

interface ModulePageProps {
  params: {
    moduleId: string;
  };
}

export default function ModuleOverviewPage({ params }: ModulePageProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Load module data, sessions, and user progress
  useEffect(() => {
    const loadModuleData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        // Fetch module data
        const { data: module, error: moduleError } = await supabase
          .from('modules')
          .select('*')
          .eq('id', parseInt(params.moduleId))
          .single();

        if (moduleError) {
          console.error('Module error:', moduleError);
          // If modules table doesn't exist, create mock data
          setModuleData({
            id: parseInt(params.moduleId),
            title: `Module ${params.moduleId}: Foundational Principles`,
            description: "Building biblical foundations for marketplace ministry",
            total_sessions: 4,
            estimated_time: "2 hours"
          });
        } else {
          setModuleData(module);
        }

        // Fetch sessions for this module
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('sessions')
          .select('*')
          .eq('module_id', parseInt(params.moduleId))
          .order('session_number');

        if (sessionsError) {
          console.error('Sessions error:', sessionsError);
          // Create mock sessions data
          setSessions([
            {
              id: 1,
              session_number: 1,
              title: "Business is a Good Gift from God",
              subtitle: "Understanding God's design for business",
              estimated_time: "30 min"
            },
            {
              id: 2,
              session_number: 2,
              title: "Business Leaders Work with Church Leaders",
              subtitle: "Collaboration between marketplace and ministry",
              estimated_time: "25 min"
            },
            {
              id: 3,
              session_number: 3,
              title: "Godly Guidelines for Managing Business",
              subtitle: "Biblical principles for business operations",
              estimated_time: "35 min"
            },
            {
              id: 4,
              session_number: 4,
              title: "Faith-Driven Business",
              subtitle: "Integrating faith with business practices",
              estimated_time: "30 min"
            }
          ]);
        } else {
          setSessions(sessionsData || []);
        }

        // Fetch user progress if user is logged in
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('module_id', parseInt(params.moduleId));

          if (!progressError && progressData) {
            const progressMap: UserProgress = {};
            progressData.forEach(progress => {
              progressMap[progress.session_id] = {
                completed: progress.look_back_completed && progress.look_up_completed && progress.look_forward_completed,
                completion_date: progress.updated_at,
                progress_percentage: calculateProgressPercentage(progress)
              };
            });
            setUserProgress(progressMap);
          }
        }

      } catch (err: any) {
        console.error('Error loading module data:', err);
        setError(err.message || 'Failed to load module');
      } finally {
        setLoading(false);
      }
    };

    loadModuleData();
  }, [params.moduleId, supabase]);

  // Calculate progress percentage from completion data
  const calculateProgressPercentage = (progress: any) => {
    const sections = ['look_back_completed', 'look_up_completed', 'look_forward_completed'];
    const completedSections = sections.filter(section => progress[section]).length;
    return Math.round((completedSections / sections.length) * 100);
  };

  // Determine session accessibility - FIXES THE LOCKOUT BUG
  const getSessionStatus = (sessionNumber: number, sessionId: number) => {
    const progress = userProgress[sessionId];
    
    // ALLOW: Access to completed sessions (backward navigation)
    if (progress?.completed) {
      return { 
        status: 'completed', 
        accessible: true, 
        icon: CheckCircle, 
        color: 'text-green-600 bg-green-50',
        label: 'Completed'
      };
    }

    // ALLOW: Access to current session (first incomplete session)
    const currentSessionNumber = getCurrentSessionNumber();
    if (sessionNumber === currentSessionNumber) {
      return { 
        status: 'current', 
        accessible: true, 
        icon: Play, 
        color: 'text-blue-600 bg-blue-50',
        label: 'Current'
      };
    }

    // PREVENT: Access to future sessions (maintain progression)
    if (sessionNumber > currentSessionNumber) {
      return { 
        status: 'locked', 
        accessible: false, 
        icon: Lock, 
        color: 'text-gray-400 bg-gray-50',
        label: 'Locked'
      };
    }

    // Default to accessible for edge cases
    return { 
      status: 'available', 
      accessible: true, 
      icon: BookOpen, 
      color: 'text-blue-600 bg-blue-50',
      label: 'Available'
    };
  };

  // Get the current session number (first incomplete session)
  const getCurrentSessionNumber = () => {
    for (const session of sessions) {
      if (!userProgress[session.id]?.completed) {
        return session.session_number;
      }
    }
    // If all sessions are complete, allow access to the last session
    return sessions.length;
  };

  // Handle session click
  const handleSessionClick = (session: SessionData) => {
    const sessionStatus = getSessionStatus(session.session_number, session.id);
    
    if (sessionStatus.accessible) {
      router.push(`/modules/${params.moduleId}/sessions/${session.id}`);
    }
  };

  // Navigation functions
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Calculate module completion
  const getModuleCompletion = () => {
    if (sessions.length === 0) return { completed: 0, total: 0, percentage: 0 };
    
    const completedSessions = sessions.filter(session => 
      userProgress[session.id]?.completed
    ).length;
    
    return {
      completed: completedSessions,
      total: sessions.length,
      percentage: Math.round((completedSessions / sessions.length) * 100)
    };
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading module...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !moduleData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => navigateTo('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const completion = getModuleCompletion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => navigateTo('/dashboard')}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            
            <div className="flex gap-3">
              <button 
                onClick={() => navigateTo('/business-plan')}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                💼 Business Planner
              </button>
            </div>
          </div>

          {/* Module Header */}
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">
              Faith-Driven Business Mastery
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {moduleData?.title || `Module ${params.moduleId}`}
            </h1>
            <p className="text-gray-600 text-lg">
              {moduleData?.description || "Foundational principles for faith-driven business"}
            </p>
          </div>

          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Your Progress</h3>
                <p className="text-green-100">
                  {completion.completed} of {completion.total} sessions completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{completion.percentage}%</div>
                <div className="text-green-100 text-sm">Complete</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 bg-white/20 rounded-full h-3">
              <div 
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${completion.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Module Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">{sessions.length}</div>
            <div className="text-gray-600">Sessions</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Clock className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">
              {moduleData?.estimated_time || '2 hours'}
            </div>
            <div className="text-gray-600">Estimated Time</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Award className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">{completion.completed}</div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h2 className="text-2xl font-bold mb-2">📚 Module Sessions</h2>
            <p className="text-blue-100">
              Click on any available session to start learning. Completed sessions can be revisited anytime!
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {sessions.map((session) => {
              const sessionStatus = getSessionStatus(session.session_number, session.id);
              const IconComponent = sessionStatus.icon;
              
              return (
                <div 
                  key={session.id}
                  className={`p-6 transition-all cursor-pointer ${
                    sessionStatus.accessible 
                      ? 'hover:bg-gray-50 hover:shadow-md' 
                      : 'cursor-not-allowed opacity-60'
                  }`}
                  onClick={() => handleSessionClick(session)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Session Icon */}
                      <div className={`p-3 rounded-full ${sessionStatus.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      {/* Session Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Session {session.session_number}: {session.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${sessionStatus.color}`}>
                            {sessionStatus.label}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{session.subtitle}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {session.estimated_time}
                          </div>
                          {userProgress[session.id]?.completion_date && (
                            <div className="text-green-600">
                              Completed {new Date(userProgress[session.id].completion_date!).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="text-right">
                      {userProgress[session.id]?.progress_percentage && (
                        <div className="text-sm text-gray-600 mb-1">
                          {userProgress[session.id].progress_percentage}% complete
                        </div>
                      )}
                      {sessionStatus.accessible ? (
                        <div className="text-blue-600 font-medium">
                          {sessionStatus.status === 'completed' ? 'Review' : 'Start'} →
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          Complete previous sessions first
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module Completion */}
        {completion.percentage === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg shadow-lg text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">🎉 Module Complete!</h3>
            <p className="text-green-100 mb-4">
              Congratulations! You've completed all sessions in this module.
            </p>
            <button 
              onClick={() => navigateTo('/dashboard')}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors"
            >
              Continue to Next Module
            </button>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
          <h4 className="font-bold text-blue-800 mb-2">📖 Learning Path Guide</h4>
          <ul className="text-blue-700 space-y-1">
            <li>• <strong>Completed sessions</strong> (✅) can be accessed anytime for review</li>
            <li>• <strong>Current session</strong> (▶️) is your next step in the learning journey</li>
            <li>• <strong>Locked sessions</strong> (🔒) unlock as you complete previous sessions</li>
            <li>• Each session includes biblical foundations, practical content, and action planning</li>
          </ul>
        </div>
      </div>
    </div>
  );
}