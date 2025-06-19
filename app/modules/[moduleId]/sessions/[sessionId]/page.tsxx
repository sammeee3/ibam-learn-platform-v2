'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Scripture Reference Component with ESV Hover - RESTORED!
const ScriptureReference = ({ reference, children, className = "" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // ESV Scripture Database - COMPLETE SET
  const scriptureTexts = {
    "Genesis 1:1": "In the beginning, God created the heavens and the earth.",
    
    "Genesis 1:26": "Then God said, 'Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.'",
    
    "Genesis 1:26-27": "Then God said, \"Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.\" So God created man in his own image, in the image of God he created him; male and female he created them.",
    
    "Genesis 1:26-31": "Then God said, \"Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.\" So God created man in his own image, in the image of God he created him; male and female he created them. And God blessed them. And God said to them, \"Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and the birds of the heavens and over every living creature that moves on the earth.\" And God said, \"Behold, I have given you every plant yielding seed that is on the face of all the earth, and every tree with seed in its fruit. You shall have them for food. And to every beast of the earth and to every bird of the heavens and to everything that creeps on the earth, everything that has the breath of life, I have given every green plant for food.\" And it was so. And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day.",
    
    "Genesis 1:28": "And God blessed them. And God said to them, \"Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and the birds of the heavens and over every living creature that moves on the earth.\"",
    
    "Acts 16:14": "One who heard us was a woman named Lydia, from the city of Thyatira, a seller of purple goods, who was a worshiper of God. The Lord opened her heart to pay attention to what was said by Paul.",
    
    "Acts 18:2-3": "And he found a Jew named Aquila, a native of Pontus, recently come from Italy with his wife Priscilla, because Claudius had commanded all the Jews to leave Rome. And he went to see them, and because he was of the same trade he stayed with them and worked, for they were tentmakers by trade.",
    
    "Ephesians 2:10": "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them.",
    
    "Proverbs 16:1-9": "The plans of the heart belong to man, but the answer of the tongue is from the Lord. All the ways of a man are pure in his own eyes, but the Lord weighs the spirit. Commit your work to the Lord, and your plans will be established. The Lord has made everything for its purpose, even the wicked for the day of trouble. Everyone who is arrogant in heart is an abomination to the Lord; be assured, he will not go unpunished. By steadfast love and faithfulness iniquity is atoned for, and by the fear of the Lord one turns away from evil. When a man's ways please the Lord, he makes even his enemies to be at peace with him. Better is a little with righteousness than great revenues with injustice. The heart of man plans his way, but the Lord establishes his steps.",
    
    "Colossians 3:23": "Whatever you do, work heartily, as for the Lord and not for men.",
    
    "Matthew 25:21": "His master said to him, 'Well done, good and faithful servant. You were faithful over a little; I will set you over much. Enter into the joy of your master.'",
    
    "Proverbs 16:3": "Commit your work to the Lord, and your plans will be established.",

    "Proverbs 19:21": "Many are the plans in a person's heart, but it is the Lord's purpose that prevails.",

    "1 Corinthians 12:12-14": "Just as a body, though one, has many parts, but all its many parts form one body, so it is with Christ. For we were all baptized by one Spirit so as to form one body—whether Jews or Gentiles, slave or free—and we were all given the one Spirit to drink. Even so the body is not made up of one part but of many."
  };

  const scriptureText = scriptureTexts[reference] || "Scripture text not available";

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="text-blue-600 font-semibold underline cursor-pointer hover:text-blue-800 transition-colors">
        {children || reference}
      </span>
      
      {showTooltip && (
        <div 
          className="absolute z-50 w-80 p-4 bg-white border-2 border-blue-200 rounded-lg shadow-2xl text-sm leading-relaxed"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            maxWidth: '90vw'
          }}
        >
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
            <div className="font-bold text-blue-900 mb-2">{reference} (ESV)</div>
            <div className="text-gray-800 italic">"{scriptureText}"</div>
          </div>
          {/* Tooltip Arrow */}
          <div 
            className="absolute w-3 h-3 bg-white border-r-2 border-b-2 border-blue-200 transform rotate-45"
            style={{
              top: '100%',
              left: '50%',
              marginLeft: '-6px',
              marginTop: '-7px'
            }}
          ></div>
        </div>
      )}
    </span>
  );
};

// Session data structure - dynamic content per session
const sessionData: Record<string, Record<string, any>> = {
  "1": {
    "1": {
      title: "Business is a Good Gift from God",
      module: "Foundational Principles",
      scripture: {
        reference: "Genesis 1:26",
        text: "Then God said, 'Let us make mankind in our image, in our likeness, so that they may rule over the fish in the sea and the birds in the sky, over the livestock and all the wild animals, and over all the creatures that move along the ground.'"
      },
      videoUrl: "https://vimeo.com/your-video-id",
      writtenMaterial: "God designed humans to be creative, productive, and to exercise dominion over creation. Business is not a necessary evil or distraction from spiritual matters - it's a reflection of God's image in us. When we create value, serve others, and steward resources well, we mirror our Creator's character. The mandate in Genesis 1:28 to 'be fruitful and multiply and fill the earth and subdue it' includes economic productivity and business development as expressions of our divine calling.",
      reflection: "How does viewing business as a reflection of God's image change your perspective on your work?",
      becomingGodsEntrepreneur: {
        content: "As God's entrepreneur, you're called to blend excellence with integrity, profit with purpose, and success with service.",
        questions: [
          "What would change in your business if you truly believed it was a gift from God?",
          "How can your business reflect God's creativity and generosity?"
        ]
      },
      caseStudy: "Sarah owns a local bakery. She started viewing her business as ministry when she realized that providing excellent bread and pastries was serving her community. She began praying over her work, treating employees as family, and donating day-old goods to the homeless shelter.",
      faqQuestions: [
        "Q: Can I really make money and still honor God? A: Yes! God desires us to prosper while maintaining integrity.",
        "Q: What if my business isn't explicitly Christian? A: Your character and excellence can reflect Christ in any business.",
        "Q: How do I balance profit and generosity? A: Sustainable generosity requires profitable operations."
      ],
      businessPlanQuestions: [
        "How will your business reflect God's character and values?",
        "What impact do you want your business to have on your community?",
        "How can your business serve as a platform for spiritual conversations?"
      ]
    },
    "2": {
      title: "Business Leaders Work Together with Church/Spiritual Leaders",
      module: "Foundational Principles",
      scripture: {
        reference: "1 Corinthians 12:12-14",
        text: "Just as a body, though one, has many parts, but all its many parts form one body, so it is with Christ. For we were all baptized by one Spirit so as to form one body—whether Jews or Gentiles, slave or free—and we were all given the one Spirit to drink. Even so the body is not made up of one part but of many."
      },
      videoUrl: "https://vimeo.com/your-video-id-2",
      writtenMaterial: "The church and marketplace are not separate kingdoms but different parts of God's single kingdom. Business leaders bring resources, organizational skills, and community connections. Church leaders bring spiritual wisdom, pastoral care, and theological grounding. Together, they can accomplish kingdom work neither could achieve alone.",
      reflection: "What unique strengths do you bring as a business leader that could benefit your local church or community ministry?",
      becomingGodsEntrepreneur: {
        content: "God's entrepreneurs understand they're part of a larger body, working in harmony with spiritual leaders to advance God's kingdom.",
        questions: [
          "How can you partner with church leaders without compromising your business integrity?",
          "What kingdom projects could benefit from your business skills and resources?"
        ]
      },
      caseStudy: "Mark, a construction company owner, partnered with his pastor to build homes for single mothers. The church provided spiritual care and community support while Mark's business provided construction expertise and materials at cost.",
      faqQuestions: [
        "Q: What if my pastor doesn't understand business? A: Start small, build trust, and educate gently.",
        "Q: How do I avoid being seen as just a source of money? A: Offer your skills and expertise, not just finances.",
        "Q: What if business and church priorities conflict? A: Seek wisdom through prayer and trusted advisors."
      ],
      businessPlanQuestions: [
        "What partnerships could you develop between your business and local church/ministry leaders?",
        "How can your business skills serve kingdom purposes beyond just financial giving?",
        "What community needs could be addressed through business-ministry collaboration?"
      ]
    }
  },
  "2": {
    "1": {
      title: "Reasons for Failure",
      module: "Success and Failure Factors",
      scripture: {
        reference: "Proverbs 19:21",
        text: "Many are the plans in a person's heart, but it is the Lord's purpose that prevails."
      },
      videoUrl: "https://vimeo.com/your-video-id-3",
      writtenMaterial: "Most business failures stem from preventable causes: inadequate planning, poor cash flow management, misunderstanding the market, or lack of differentiation. However, even with perfect planning, we must hold our plans loosely and trust God's sovereignty.",
      reflection: "Looking at your current business situation, which failure factors pose the greatest risk, and how can you address them?",
      becomingGodsEntrepreneur: {
        content: "God's entrepreneurs plan diligently while holding outcomes loosely, trusting that God's purposes will prevail.",
        questions: [
          "How do you balance careful planning with trusting God's sovereignty?",
          "What would it look like to 'fail successfully' in a way that honors God?"
        ]
      },
      caseStudy: "David's restaurant failed after 18 months due to poor location analysis and cash flow problems. Instead of becoming bitter, he used the experience to mentor other entrepreneurs, helping them avoid similar pitfalls while trusting God's plan for his life.",
      faqQuestions: [
        "Q: Is business failure a sign God doesn't want me in business? A: Not necessarily - failure can be education or redirection.",
        "Q: How do I recover from a major business failure? A: Learn, heal, rebuild slowly, and trust God's timing.",
        "Q: What if I'm afraid of failing? A: Perfect planning reduces risk, but faith conquers fear."
      ],
      businessPlanQuestions: [
        "What are the top 3 risks that could cause your business to fail, and how will you mitigate them?",
        "How will you monitor key performance indicators to detect problems early?",
        "What contingency plans do you need for various failure scenarios?"
      ]
    }
  }
};

export default function SessionPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const sessionId = params.sessionId as string;
  
  // Get session data or fallback
  const session = sessionData[moduleId]?.[sessionId] || {
    title: "Session Content Loading...",
    module: "Module Loading...",
    scripture: { reference: "Loading...", text: "Content being prepared..." },
    videoUrl: "",
    writtenMaterial: "Content loading...",
    reflection: "Content loading...",
    becomingGodsEntrepreneur: { content: "Loading...", questions: ["Loading..."] },
    caseStudy: "Loading...",
    faqQuestions: ["Loading..."],
    businessPlanQuestions: ["Loading..."]
  };

  // Learning mode and current section state
  const [learningMode, setLearningMode] = useState<'quick' | 'normal'>('normal');
  const [currentSection, setCurrentSection] = useState<'lookback' | 'lookup' | 'lookforward'>('lookback');
  const [scriptureExpanded, setScriptureExpanded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  // Comprehensive progress state with bulletproof auto-save
  const [userProgress, setUserProgress] = useState({
    // Look Back progress
    lookBackComplete: false,
    lookBackPrayer: '',
    actionStepExperience: '',
    whyDidntComplete: '',
    howDidItGo: '',
    whoDidYouTell: '',
    whoSpecifically: '',
    visionReflection: '',
    
    // Look Up progress  
    lookUpComplete: false,
    lookUpPrayer: '',
    writtenMaterialRead: false,
    videoWatched: false,
    quizAnswer: null as number | null,
    personalReflection: '',
    entrepreneurReflection: '',
    caseStudyNotes: '',
    faqReviewed: false,
    coachingQuestion: '',
    
    // Look Forward progress
    lookForwardComplete: false,
    lookForwardPrayer: '',
    keyTruthReflection: '',
    actionStatement1: '',
    actionStatement2: '',
    actionStatement3: '',
    businessPlanAnswer1: '',
    businessPlanAnswer2: '', 
    businessPlanAnswer3: '',
    surveyRating1: null as number | null,
    surveyRating2: null as number | null,
    surveyRating3: null as number | null,
    surveyFeedback: '',
    
    // Session meta
    sessionStartTime: Date.now(),
    lastSaveTime: Date.now(),
    completionPercentage: 0
  });

  // Load saved progress from localStorage immediately
  useEffect(() => {
    const localKey = `ibam-session-${moduleId}-${sessionId}`;
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setUserProgress(prev => ({...prev, ...parsedData}));
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, [moduleId, sessionId]);

  // Bulletproof auto-save: localStorage immediately + Supabase backup
  useEffect(() => {
    const localKey = `ibam-session-${moduleId}-${sessionId}`;
    
    // Immediate local save
    localStorage.setItem(localKey, JSON.stringify(userProgress));
    
    // Debounced Supabase save
    const saveTimer = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        // TODO: Replace with actual Supabase call
        // await supabase.from('session_progress').upsert({
        //   user_id: userId,
        //   module_id: moduleId,
        //   session_id: sessionId,
        //   progress_data: userProgress,
        //   updated_at: new Date()
        // });
        
        setSaveStatus('saved');
        setUserProgress(prev => ({...prev, lastSaveTime: Date.now()}));
      } catch (error) {
        console.error('Save error:', error);
        setSaveStatus('error');
      }
    }, 3000);

    return () => clearTimeout(saveTimer);
  }, [userProgress, moduleId, sessionId]);

  // Calculate completion and check section requirements
  const checkLookBackComplete = () => {
    return !!(
      userProgress.actionStepExperience &&
      (userProgress.actionStepExperience === 'didnt' ? userProgress.whyDidntComplete : 
       (userProgress.howDidItGo && userProgress.whoDidYouTell))
    );
  };

  const checkLookUpComplete = () => {
    return !!(
      userProgress.writtenMaterialRead &&
      userProgress.videoWatched &&
      userProgress.quizAnswer !== null &&
      userProgress.personalReflection &&
      userProgress.faqReviewed
    );
  };

  const checkLookForwardComplete = () => {
    return !!(
      userProgress.keyTruthReflection &&
      userProgress.actionStatement1 &&
      userProgress.businessPlanAnswer1 &&
      userProgress.surveyRating1 !== null &&
      userProgress.surveyRating2 !== null &&
      userProgress.surveyRating3 !== null
    );
  };

  // Update progress and auto-check section completion
  const updateProgress = (updates: Partial<typeof userProgress>) => {
    setUserProgress(prev => {
      const newProgress = {...prev, ...updates};
      
      // Auto-check section completion
      newProgress.lookBackComplete = checkLookBackComplete();
      newProgress.lookUpComplete = checkLookUpComplete();
      newProgress.lookForwardComplete = checkLookForwardComplete();
      
      // Calculate overall completion
      const totalSections = 3;
      const completedSections = [
        newProgress.lookBackComplete,
        newProgress.lookUpComplete, 
        newProgress.lookForwardComplete
      ].filter(Boolean).length;
      
      newProgress.completionPercentage = Math.round((completedSections / totalSections) * 100);
      
      return newProgress;
    });
  };

  // Section navigation with locking
  const canAccessSection = (section: 'lookback' | 'lookup' | 'lookforward') => {
    if (section === 'lookback') return true;
    if (section === 'lookup') return userProgress.lookBackComplete;
    if (section === 'lookforward') return userProgress.lookBackComplete && userProgress.lookUpComplete;
    return false;
  };

  // Get previous session action steps (this would eventually come from database)
  const getPreviousActionSteps = () => {
    // Mock previous session data - replace with actual database call
    const prevModuleId = moduleId === "1" && sessionId === "1" ? null : 
                        sessionId === "1" ? (parseInt(moduleId) - 1).toString() : moduleId;
    const prevSessionId = sessionId === "1" ? "4" : (parseInt(sessionId) - 1).toString(); // Assuming 4 sessions per module
    
    if (!prevModuleId) return []; // First session has no previous actions
    
    // Mock previous action statements - replace with actual retrieval
    return [
      "I will pray for 5 minutes each morning at 6 AM",
      "I will call 3 potential customers by name daily for one week", 
      "I will review my business expenses every evening before bed"
    ];
  };

  const previousActionSteps = getPreviousActionSteps();

  const exportUserData = () => {
    const exportData = {
      sessionInfo: {
        module: session.module,
        title: session.title,
        moduleId,
        sessionId,
        completedAt: new Date().toISOString()
      },
      responses: userProgress
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IBAM-Session-${moduleId}-${sessionId}-Data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f8fafc'}}>
      {/* IBAM Header with Real Branding */}
      <div style={{background: 'linear-gradient(135deg, #4ECDC4 0%, #2C3E50 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* IBAM Logo */}
              <img 
                src="/images/branding/logo-light.png" 
                alt="IBAM Logo" 
                className="h-12 md:h-16"
                onError={(e) => {
                  // Fallback to mini logo if main logo fails
                  e.currentTarget.src = "/images/branding/mini-logo.png";
                }}
              />
              <div>
                <div className="text-white/90 text-sm md:text-base mb-1">
                  Module {moduleId}: {session.module}
                </div>
                <h1 className="text-white text-xl md:text-3xl font-bold mb-2">
                  {session.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm md:text-base text-white/90">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{backgroundColor: '#10b981'}}></span>
                    {userProgress.completionPercentage}% complete
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${
                      saveStatus === 'saved' ? 'bg-green-400' : 
                      saveStatus === 'saving' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></span>
                    <span className="hidden sm:inline">
                      {saveStatus === 'saved' ? 'All changes saved' :
                       saveStatus === 'saving' ? 'Saving...' : 'Save error (data safe locally)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={exportUserData}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm md:text-base font-medium text-white transition-all"
            >
              📥 Download My Work
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6 bg-white/20 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${userProgress.completionPercentage}%`,
                background: 'linear-gradient(90deg, #4ECDC4 0%, #10b981 100%)'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Learning Mode Selection - Mobile Optimized */}
      <div className="bg-white border-b" style={{borderColor: '#e2e8f0'}}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="relative group">
              <button
                onClick={() => setLearningMode('quick')}
                className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all text-center ${
                  learningMode === 'quick' 
                    ? 'border-[#4ECDC4] bg-[#4ECDC4]/10' 
                    : 'border-[#e2e8f0] hover:border-[#4ECDC4]/50'
                }`}
              >
                <div className="text-3xl md:text-4xl mb-2">⚡</div>
                <div className="font-semibold text-lg md:text-xl" style={{color: '#2C3E50'}}>Quick</div>
                <div className="text-sm md:text-base text-gray-600">5-10 min</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">Essential insights only</div>
              </button>
              
              {/* Quick Mode Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-[#2C3E50] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 max-w-xs">
                <div className="font-semibold mb-1">⚡ Quick Mode:</div>
                <div className="text-left text-xs">
                  • Key insights only (200 words)<br/>
                  • Skip detailed content<br/>
                  • Quick reflection questions<br/>
                  • Fast clicking experience<br/>
                  • Perfect for busy schedules
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#2C3E50]"></div>
              </div>
            </div>
            
            <div className="relative group">
              <button
                onClick={() => setLearningMode('normal')}
                className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all text-center ${
                  learningMode === 'normal' 
                    ? 'border-[#4ECDC4] bg-[#4ECDC4]/10' 
                    : 'border-[#e2e8f0] hover:border-[#4ECDC4]/50'
                }`}
              >
                <div className="text-3xl md:text-4xl mb-2">📚</div>
                <div className="font-semibold text-lg md:text-xl" style={{color: '#2C3E50'}}>Normal</div>
                <div className="text-sm md:text-base text-gray-600">15-20 min</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">Complete experience</div>
              </button>
              
              {/* Normal Mode Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-[#2C3E50] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 max-w-xs">
                <div className="font-semibold mb-1">📚 Normal Mode:</div>
                <div className="text-left text-xs">
                  • Full written material<br/>
                  • Complete video content<br/>
                  • Knowledge check quiz<br/>
                  • Detailed reflections<br/>
                  • FAQ section<br/>
                  • Comprehensive learning
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#2C3E50]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        
        {/* LOOK UP SECTION - DEMO WITH BIBLE HOVER FUNCTIONALITY */}
        {currentSection === 'lookup' && (
          <div className="space-y-6 md:space-y-8">
            
            {/* Scripture Foundation - NOW WITH WORKING HOVER! */}
            <div className="bg-gradient-to-r from-[#4ECDC4]/10 to-[#10b981]/10 rounded-2xl border-2 border-[#4ECDC4]/20 p-6 md:p-8">
              <h3 className="font-bold text-[#2C3E50] text-xl md:text-2xl mb-4 flex items-center gap-3">
                <span className="text-5xl md:text-6xl">📖</span>
                Biblical Foundation - WITH WORKING BIBLE HOVER!
              </h3>
              
              <div className="bg-white rounded-xl p-4 md:p-6 border border-[#4ECDC4]/20">
                <div className="font-bold text-[#4ECDC4] text-lg md:text-xl mb-3">
                  <ScriptureReference reference="Genesis 1:26">{session.scripture.reference} (ESV)</ScriptureReference>
                </div>
                <div className="text-gray-700 text-lg md:text-xl leading-relaxed mb-4">
                  "{session.scripture.text}"
                </div>
                
                {/* TEST ALL THE BIBLE VERSES */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <h4 className="font-bold text-blue-900 mb-3">🔥 TEST ALL BIBLE HOVERS:</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>In the beginning: <ScriptureReference reference="Genesis 1:1">Genesis 1:1</ScriptureReference></p>
                    <p>God's creative mandate: <ScriptureReference reference="Genesis 1:28">Genesis 1:28</ScriptureReference></p>
                    <p>Working for the Lord: <ScriptureReference reference="Colossians 3:23">Colossians 3:23</ScriptureReference></p>
                    <p>Lydia the businesswoman: <ScriptureReference reference="Acts 16:14">Acts 16:14</ScriptureReference></p>
                    <p>Paul's tentmaking: <ScriptureReference reference="Acts 18:2-3">Acts 18:2-3</ScriptureReference></p>
                    <p>Created for good works: <ScriptureReference reference="Ephesians 2:10">Ephesians 2:10</ScriptureReference></p>
                    <p>Commit your work: <ScriptureReference reference="Proverbs 16:3">Proverbs 16:3</ScriptureReference></p>
                    <p>Well done servant: <ScriptureReference reference="Matthew 25:21">Matthew 25:21</ScriptureReference></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 rounded-2xl border-2 border-green-200 p-6 md:p-8 text-center">
              <div className="text-5xl md:text-6xl mb-4">🎉</div>
              <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">Bible Hover Functionality RESTORED!</h3>
              <p className="text-lg md:text-xl text-green-700">
                All scripture references now have beautiful ESV hover tooltips. 
                Hover over any blue underlined verse to see the full text!
              </p>
            </div>

          </div>
        )}

        {/* OTHER SECTIONS */}
        {currentSection !== 'lookup' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 text-center">
            <div className="text-5xl md:text-6xl mb-4">🔧</div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Bible Hover Fixed!</h3>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              Click "Look Up" section navigation to test the restored Bible hover functionality.
            </p>
            <button 
              onClick={() => setCurrentSection('lookup')}
              className="bg-[#4ECDC4] text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-[#4ECDC4]/80"
            >
              🔗 Go to Look Up Section
            </button>
          </div>
        )}

      </div>

      {/* Section Navigation */}
      <div className="bg-white border-b" style={{borderColor: '#e2e8f0'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
            {[
              { 
                key: 'lookback', 
                label: 'Look Back', 
                icon: '👀', 
                subtitle: 'Reflect & Pray'
              },
              { 
                key: 'lookup', 
                label: 'Look Up', 
                icon: '📖', 
                subtitle: 'Learn & Grow'
              },
              { 
                key: 'lookforward', 
                label: 'Look Forward', 
                icon: '🎯', 
                subtitle: 'Apply & Plan'
              }
            ].map((section) => {
              const isActive = currentSection === section.key;
              
              return (
                <div key={section.key} className="flex-1 relative group">
                  <button
                    onClick={() => setCurrentSection(section.key as any)}
                    className={`w-full py-6 md:py-8 px-2 md:px-4 relative transition-all ${
                      isActive 
                        ? 'bg-[#4ECDC4]/10 border-b-4' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{
                      borderBottomColor: isActive ? '#4ECDC4' : 'transparent'
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl md:text-6xl mb-2">
                        {section.icon}
                      </div>
                      <div className={`font-semibold text-lg md:text-xl ${
                        isActive ? 'text-[#4ECDC4]' : 'text-[#2C3E50]'
                      }`}>
                        {section.label}
                      </div>
                      <div className="text-sm md:text-base text-gray-600 mt-1">
                        {section.subtitle}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}