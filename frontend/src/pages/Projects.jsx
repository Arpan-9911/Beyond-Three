import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Img from "../assets/HeroBG.jpg";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Youth from "../components/project_foms/Youth";
import Other from "../components/project_foms/Other";

const truncateText = (text, limit = 90) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const Projects = () => {
  const { lang } = useLanguage();
  const projectCategories = [
    {
      id: 1,
      title: { en: "Youth Projects", hi: "युवा परियोजनाएँ" },
      projects: [
        {
          id: 101,
          title: {
            en: "Youth Empowerment Program",
            hi: "युवा सशक्तिकरण कार्यक्रम",
          },
          desc: {
            en: `Objective:
The objective of this project is to empower youth, especially students who have completed 12th grade, with Beyond Three techniques so they can achieve personal growth and community upliftment. Through this initiative, we will help youth live a healthy, anxiety-free, and depression-free life and give them an opportunity to contribute to the well-being of society.

Target Group:
• Youth who have passed 12th grade
• Individuals interested in personal development, health, and wellness
• Youth willing to contribute to society

Duration:
15-day training program + 6 months of community sessions

Program Structure:
1. Initial Training (15 Days):
In the first 15 days, youth will be given comprehensive training. Participants will learn Beyond Three techniques and ways to live a healthy and anxiety-free life. This will include:
• Physical Health: Maintaining a healthy lifestyle through exercise, diet, sleep, etc.
• Mental Health: Stress management, controlling anxiety, and emotional resilience
• Confidence & Leadership: Developing self-esteem and leadership skills
• Social Connection: Freedom from loneliness and strengthening social bonds
• Personal Development: Goal setting, time management, and self-motivation

Benefits to Participants:
• Healthy body and mind
• Increase in confidence and self-esteem
• Freedom from stress and anxiety
• Readiness to lead and help others

2. Community Work After Training:
After completing the training, participants will teach these techniques to others in the community. They will form small groups and provide training:
• Group 1 (20 people) - 1 hour
• Group 2 (20 people) - 1 hour
• Similarly, sessions will be organized every month

Role of Participant:
• Conducting training sessions for different groups
• Sharing learned techniques with peers and community members
• Guiding people to achieve mental peace, health, and confidence

Participant Income:
• Up to ₹8000–₹10,000 per month (3 hours contribution - 2 sessions × 1 hour)
• Flexible working hours and connection with the community
• Opportunity to develop leadership and teaching skills

3. Key Benefits:
• Training & Personal Development: Deep progress in health, wellness, and leadership
• Social Impact: Direct contribution to the well-being of society
• Income: Opportunity for basic earning with less time commitment
• Experience: Real experience of leadership and teaching
• Wellness Transformation: Adopting a confident, healthy, and happy lifestyle
• Flexible Time: Income opportunity in just 3 hours per month

4. How to Apply:
• Eligibility: All 12th pass students can apply who are enthusiastic about personal development and social service.
• Application Process: Interested candidates can contact by filling the form on our website or via WhatsApp/Email.
• Selection Criteria: Selection will be based on interest, willingness to learn, and effective communication skills.

Program Timeline:
• Phase 1: Training Program - Learning Beyond Three Techniques (15 Days)
• Phase 2: Community Sessions - Teaching groups of 20 (Continuous 3 hours/month)

Why Join?
• Life Transformation: Learn physical, mental, and emotional balance
• Earn While Learn: Get rewarded for time and contribution
• Make a Difference: Empower people in the community
• Career Building: Growth in leadership, teaching, and communication skills
• Flexible Hours: Work only a few hours per month

Contact Us:
Contact for more information and application:
Email: hello@beyondthree.org
Phone/WhatsApp: +91 9876543210

Conclusion:
This project is not just for earning money, but an effort to bring positive change in society. By joining the Beyond Three Youth Empowerment Program, you will not only improve your life but also inspire others to live a healthy and happy life. Come, let's create a wave of change in our community together.`,
            hi: `उद्देश्य:
इस परियोजना का उद्देश्य युवाओं को, विशेषकर 12वीं कक्षा पूरी कर चुके छात्रों को, बियॉन्ड थ्री की तकनीकों से सशक्त बनाना है ताकि वे व्यक्तिगत विकास और सामुदायिक उन्नति कर सकें। इस पहल के माध्यम से हम युवाओं को स्वस्थ, चिंता-मुक्त और अवसाद-मुक्त जीवन जीने में मदद करेंगे और उन्हें समाज की भलाई में योगदान करने का अवसर देंगे।

लक्षित समूह:
• 12वीं कक्षा पास कर चुके युवा
• व्यक्तिगत विकास, स्वास्थ्य और वेलनेस में रुचि रखने वाले व्यक्ति
• समाज में योगदान देने के इच्छुक युवा

अवधि:
15 दिन का प्रशिक्षण कार्यक्रम + 6 महीने तक चलने वाले सामुदायिक सत्र

कार्यक्रम की संरचना:
1. प्रारंभिक प्रशिक्षण (15 दिन):
पहले 15 दिन युवाओं को व्यापक प्रशिक्षण दिया जाएगा। इसमें प्रतिभागी बियॉन्ड थ्री तकनीकें सीखेंगे और स्वस्थ व चिंता-मुक्त जीवन जीने के तरीके जानेंगे। इसमें शामिल होगा:
• शारीरिक स्वास्थ्य: व्यायाम, आहार, नींद आदि से स्वस्थ जीवनशैली बनाए रखना
• मानसिक स्वास्थ्य: तनाव प्रबंधन, चिंता पर काबू और भावनात्मक सहनशीलता
• आत्मविश्वास व नेतृत्व: आत्म-सम्मान और नेतृत्व कौशल विकसित करना
• सामाजिक जुड़ाव: अकेलेपन से मुक्ति और सामाजिक संबंध मजबूत करना
• व्यक्तिगत विकास: लक्ष्य निर्धारण, समय प्रबंधन और आत्म-प्रेरणा

प्रतिभागियों के लाभ:
• स्वस्थ शरीर और मन
• आत्मविश्वास और आत्म-सम्मान में वृद्धि
• तनाव और चिंता से मुक्ति
• दूसरों का नेतृत्व करने और मदद करने की तैयारी

2. प्रशिक्षण के बाद सामुदायिक कार्य:
प्रशिक्षण पूरा करने के बाद प्रतिभागी समुदाय में दूसरों को भी यह तकनीकें सिखाएंगे। वे छोटे-छोटे समूह बनाकर प्रशिक्षण देंगे:
• समूह 1 (20 लोग) - 1 घंटा
• समूह 2 (20 लोग) - 1 घंटा
• इसी प्रकार हर महीने सत्र आयोजित होंगे

प्रतिभागी की भूमिका:
• विभिन्न समूहों के लिए प्रशिक्षण सत्र संचालित करना
• सीखी हुई तकनीकें साथियों व समुदाय के सदस्यों से साझा करना
• लोगों को मानसिक शांति, स्वास्थ्य और आत्मविश्वास पाने में मार्गदर्शन करना

प्रतिभागी की आय:
• प्रतिमाह ₹8000–₹10,000 तक (3 घंटे का योगदान - 2 सत्र × 1 घंटा)
• लचीले कार्य घंटे और समुदाय से जुड़ाव
• नेतृत्व और शिक्षण कौशल विकसित करने का अवसर

3. मुख्य लाभ:
• प्रशिक्षण व व्यक्तिगत विकास: स्वास्थ्य, वेलनेस और नेतृत्व में गहराई से प्रगति
• सामाजिक प्रभाव: सीधे समाज की भलाई में योगदान
• आय: कम समय देकर बुनियादी कमाई का अवसर
• अनुभव: नेतृत्व व शिक्षण का वास्तविक अनुभव
• वेलनेस परिवर्तन: आत्मविश्वासी, स्वस्थ और प्रसन्न जीवनशैली अपनाना
• लचीला समय: केवल 3 घंटे प्रतिमाह में आय का अवसर

4. आवेदन कैसे करें:
• पात्रता: सभी 12वीं पास छात्र आवेदन कर सकते हैं जो व्यक्तिगत विकास व समाज सेवा के प्रति उत्साही हों।
• आवेदन प्रक्रिया: इच्छुक उम्मीदवार हमारी वेबसाइट पर फॉर्म भरकर या व्हाट्सएप/ईमेल से संपर्क कर सकते हैं।
• चयन मानदंड: रुचि, सीखने की इच्छा और प्रभावी संवाद क्षमता के आधार पर चयन होगा।

कार्यक्रम की समय-रेखा
• चरण 1: प्रशिक्षण कार्यक्रम - बियॉन्ड थ्री तकनीकें सीखना (15 दिन)
• चरण 2: सामुदायिक सत्र - 20 के समूहों को सिखाना (निरंतर 3 घंटे/माह)

क्यों जुड़ें?
• जीवन परिवर्तन: शारीरिक, मानसिक और भावनात्मक संतुलन सीखें
• कमाते-सीखते रहें: समय और योगदान का प्रतिफल पाएं
• फर्क पैदा करें: समुदाय के लोगों को सशक्त बनाएं
• करियर निर्माण: नेतृत्व, शिक्षण और संचार कौशल में वृद्धि
• लचीले घंटे: केवल कुछ घंटे प्रतिमाह कार्य

संपर्क करें:
अधिक जानकारी व आवेदन हेतु संपर्क करें:
ईमेल: hello@beyondthree.org
फोन/व्हाट्सएप्प: +91 9876543210

निष्कर्ष:
यह परियोजना केवल पैसे कमाने के लिए नहीं है, बल्कि समाज में सकारात्मक परिवर्तन लाने का प्रयास है। बियॉन्ड थ्री युवा सशक्तिकरण कार्यक्रम से जुड़कर आप न केवल अपना जीवन संवारेंगे बल्कि दूसरों को भी स्वस्थ और खुशहाल जीवन जीने की प्रेरणा देंगे। आइए, मिलकर अपने समुदाय में परिवर्तन की लहर पैदा करें।`,
          },
          image: Img,
        },
        {
          id: 102,
          title: {
            en: "Skill Development Initiative",
            hi: "कौशल विकास पहल",
          },
          desc: {
            en: "A structured initiative to enhance technical and soft skills among young individuals to prepare them for future opportunities.",
            hi: "युवाओं के तकनीकी और सॉफ्ट स्किल्स को विकसित करने के लिए एक संरचित पहल।",
          },
          image: Img,
        },
      ],
    },
    {
      id: 2,
      title: { en: "Disease Free Campaign", hi: "रोग मुक्त अभियान" },
      projects: [
        {
          id: 201,
          title: {
            en: "Health Awareness Drive",
            hi: "स्वास्थ्य जागरूकता अभियान",
          },
          desc: {
            en: "A campaign aimed at spreading awareness about healthy lifestyle, disease prevention, and holistic well-being.",
            hi: "स्वस्थ जीवनशैली, रोग रोकथाम और समग्र कल्याण के बारे में जागरूकता फैलाने के लिए अभियान।",
          },
          image: Img,
        },
      ],
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [showFormFor, setShowFormFor] = useState(null);
  useEffect(() => {
    if (activeProject || showFormFor) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject, showFormFor]);

  return (
    <div className="bg-amber-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {lang === "hi" ? "हमारी परियोजनाएँ" : "Our Projects"}
        </h1>
        <div className="flex flex-wrap max-md:text-xs gap-2 md:mb-8 mb-4">
          {projectCategories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-1 rounded-full cursor-pointer font-medium ${activeTab === index
                ? "bg-amber-700 text-white"
                : "bg-white hover:bg-yellow-200"
                }`}
            >
              {lang === "hi" ? cat.title.hi : cat.title.en}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
          {projectCategories[activeTab].projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-4xl shadow-xl hover:shadow-2xl overflow-hidden flex flex-col group"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-110 duration-300"
                />
              </div>
              <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-semibold text-amber-700 mb-2">
                  {project.title[lang]}
                </h3>
                <p className="text-gray-600 text-sm mb-4 grow">
                  {truncateText(project.desc[lang])}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-amber-700 font-medium hover:underline text-sm cursor-pointer"
                  >
                    {lang === "hi" ? "और पढ़ें" : "Read More"}
                  </button>
                  <button
                    onClick={() => setShowFormFor(project)}
                    className="bg-amber-700 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-amber-800 transition cursor-pointer"
                  >
                    {lang === "hi" ? "अभी आवेदन करें" : "Apply Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      {activeProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20 cursor-pointer"
            >
              ✕
            </button>
            <div className="bg-white rounded-4xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              <img
                src={activeProject.image}
                alt={activeProject.title[lang]}
                className="w-full max-h-[60vh] object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="sm:text-2xl text-xl font-bold text-amber-700 mb-3">
                  {activeProject.title[lang]}
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {activeProject.desc[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showFormFor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowFormFor(null)}
              className="absolute top-4 right-4 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20 cursor-pointer"
            >
              ✕
            </button>
            <div className="bg-amber-100 rounded-4xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              {showFormFor.id === 101 ? <Youth /> : <Other />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;