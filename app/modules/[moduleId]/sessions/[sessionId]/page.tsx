'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { 
  ChevronDown, 
  ChevronRight, 
  Book, 
  Play, 
  CheckCircle, 
  ArrowRight, 
  Info, 
  Target, 
  Lightbulb, 
  Clock, 
  Users,
  User,
  Loader2,
  AlertCircle,
  Download,
  Heart,
  Zap,
  Star,
  MessageCircle,
  BookOpen,
  Link2
} from 'lucide-react';

// Enhanced Types with new content sections
interface SessionData {
  id: number;
  module_id: number;
  session_number: number;
  title: string;
  subtitle: string;
  transformation_promise: string;
  hook: string;
  fast_track_summary: string;
  scripture_reference: string;
  video_url?: string;
  content: {
    look_back?: {
      vision_statement: string;
      reflection_questions: string[];
    };
    look_forward?: {
      commitment_prompt: string;
      application_questions: string[];
      multiplication_challenges?: string[];
    };
    written_curriculum?: {
      main_content: string;
      key_points: string[];
      illustrations: string[];
    };
    discovery_bible_study?: {
      verse: string;
      questions: string[];
    };
    bringing_together?: {
      integration_points: string[];
      action_steps: string[];
    };
    pathways?: {
      individual: {
        reflection_prompts: string[];
        personal_application: string[];
      };
      small_group: {
        discussion_questions: string[];
        group_activities: string[];
        accountability_partnerships: string[];
      };
    };
  };
  mobile_transformation?: {
    powerInsight: string;
    identityShift: string;
  };
  case_study: string;
  faq_questions: string[];
  business_plan_questions: string[];
  engagement_mechanics?: {
    challenge: string;
    community: string;
  };
  becoming_gods_entrepreneur?: {
    content: string;
    questions: string[];
    video_url?: string;
  };
  extra_materials?: string;
  estimated_time?: string;
}

interface SessionPageProps {
  params: {
    moduleId: string;
    sessionId: string;
  };
}

export default function EnhancedSessionPage({ params }: SessionPageProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  // State management
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState({
    lookback: false,
    lookup: false,
    lookforward: false
  });
  const [hoveredVerse, setHoveredVerse] = useState<string | null>(null);
  const [pathwayMode, setPathwayMode] = useState<'individual' | 'small_group'>('individual');
  const [surveyResponses, setSurveyResponses] = useState({
    content_value: 0,
    learning_experience: 0,
    recommendation: 0
  });

  // Load session data and user
  useEffect(() => {
    const loadSessionData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        // Fetch session data
        const { data: session, error: sessionError } = await supabase
          .from('sessions')
          .select('*')
          .eq('id', parseInt(params.sessionId))
          .single();

        if (sessionError) throw sessionError;
        
        setSessionData(session);

        // Load user progress for this session
        if (user) {
          const { data: progress } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('session_id', parseInt(params.sessionId))
            .single();

          if (progress) {
            setCompletedSections({
              lookback: progress.look_back_completed || false,
              lookup: progress.look_up_completed || false,
              lookforward: progress.look_forward_completed || false
            });
          }
        }

      } catch (err: any) {
        console.error('Error loading session:', err);
        setError(err.message || 'Failed to load session');
      } finally {
        setLoading(false);
      }
    };

    loadSessionData();
  }, [params.sessionId, params.moduleId, supabase]);

  // Handle section completion
  const markSectionComplete = async (section: string) => {
    if (!user || !sessionData) return;

    try {
      const updates = {
        user_id: user.id,
        session_id: sessionData.id,
        module_id: sessionData.module_id,
        [`${section}_completed`]: true,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('user_progress')
        .upsert(updates, { 
          onConflict: 'user_id,session_id',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      setCompletedSections(prev => ({
        ...prev,
        [section]: true
      }));

    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  // Handle survey submission
  const submitSurvey = async () => {
    if (!user || !sessionData) return;

    try {
      const surveyData = {
        user_id: user.id,
        session_id: sessionData.id,
        module_id: sessionData.module_id,
        content_value_rating: surveyResponses.content_value,
        learning_experience_rating: surveyResponses.learning_experience,
        recommendation_rating: surveyResponses.recommendation,
        submitted_at: new Date().toISOString()
      };

      // Store in user_progress for now
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          session_id: sessionData.id,
          module_id: sessionData.module_id,
          survey_data: surveyData,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'user_id,session_id',
          ignoreDuplicates: false 
        });

      if (error) throw error;
      
      alert('Thank you for your feedback! 🙏');
    } catch (err) {
      console.error('Error submitting survey:', err);
    }
  };

  // Navigation functions
  const navigateToSession = (direction: 'prev' | 'next') => {
    if (!sessionData) return;
    
    const targetSession = direction === 'next' 
      ? sessionData.session_number + 1 
      : sessionData.session_number - 1;
      
    router.push(`/modules/${params.moduleId}/sessions/${targetSession}`);
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Vimeo Video Component
  const VimeoVideo = ({ url, title }: { url: string; title: string }) => {
    const getVimeoEmbedUrl = (vimeoUrl: string) => {
      const match = vimeoUrl.match(/vimeo\.com\/(\d+)\/([a-zA-Z0-9]+)/);
      if (match) {
        const [, videoId, hash] = match;
        return `https://player.vimeo.com/video/${videoId}?h=${hash}&badge=0&autopause=0&player_id=0&app_id=58479`;
      }
      return null;
    };

    const embedUrl = getVimeoEmbedUrl(url);
    
    if (!embedUrl) {
      return (
        <div className="bg-gray-200 rounded-lg p-8 text-center">
          <Play className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-600">{title}</p>
          <p className="text-sm text-gray-500 mt-2">Video URL: {url}</p>
        </div>
      );
    }

    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  };

  // Scripture hover component
  const ScriptureReference = ({ reference }: { reference: string }) => {
    const scriptureTexts: { [key: string]: string } = {
      "Genesis 1:1": "In the beginning, God created the heavens and the earth.",
      "Genesis 1:28": "And God blessed them. And God said to them, 'Be fruitful and multiply and fill the earth and subdue it.'",
      "Colossians 3:23": "Whatever you do, work heartily, as for the Lord and not for men.",
      "Genesis 2:15": "The LORD God took the man and put him in the Garden of Eden to work it and take care of it.",
      "Proverbs 13:22": "A good person leaves an inheritance for their children's children.",
      "Deuteronomy 8:18": "But remember the LORD your God, for it is he who gives you the ability to produce wealth."
    };

    const scriptureText = scriptureTexts[reference] || "Scripture text not available";

    return (
      <span 
        className="relative inline-block cursor-pointer text-blue-600 font-semibold border-b border-dotted border-blue-400 hover:text-blue-800 transition-colors"
        onMouseEnter={() => setHoveredVerse(reference)}
        onMouseLeave={() => setHoveredVerse(null)}
      >
        {reference}
        {hoveredVerse === reference && (
          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-4 bg-white border-2 border-blue-200 rounded-lg shadow-xl max-w-sm">
            <div className="text-base font-bold text-blue-800 mb-2">{reference}</div>
            <div className="text-base text-gray-700 italic">
              {scriptureText}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-200"></div>
          </div>
        )}
      </span>
    );
  };
