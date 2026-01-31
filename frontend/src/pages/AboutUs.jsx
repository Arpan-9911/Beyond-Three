import React, { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../context/LanguageContext'
import Founder from '../components/aboutUs/Founder'
import WhoWeAre from '../components/aboutUs/WhoWeAre'
import MissionAndVision from '../components/aboutUs/MissionAndVision'
import LegalDocuments from '../components/aboutUs/LegalDocuments'
import Faqs from '../components/aboutUs/Faqs'

const AboutUs = () => {
  const { lang } = useLanguage();
  const tabs = [
    {en: "Founder", hi: "संस्थापक"},
    {en: "Who We Are", hi: "हमारे बारे में"},
    {en: "Mission & Vision", hi: "मिशन और दृष्टिकोण"},
    {en: "Legal Documents", hi: "कानूनी दस्तावेज़"},
    {en: "FAQS", hi: "सामान्य प्रश्न"},
  ]
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className='bg-gray-100'>
      <Header />
      <div className='max-w-7xl mx-auto px-4 py-10 min-h-dvh'>
        <h1 className='border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 mb-8'>
          {lang === "hi" ? "हमारे बारे में" : "About Us"}
        </h1>
        <div className='flex flex-wrap gap-2 items-center mb-8'>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full cursor-pointer ${activeTab === index ? "bg-amber-700 text-white" : "hover:bg-yellow-200"}`}
              onClick={() => setActiveTab(index)}
            >
              {lang === "hi" ? tab.hi : tab.en}
            </button>
          ))}
        </div>
        {activeTab == 0 && <Founder />}
        {activeTab == 1 && <WhoWeAre />}
        {activeTab == 2 && <MissionAndVision />}
        {activeTab == 3 && <LegalDocuments />}
        {activeTab == 4 && <Faqs />}
      </div>

      <Footer />
    </div>
  )
}

export default AboutUs