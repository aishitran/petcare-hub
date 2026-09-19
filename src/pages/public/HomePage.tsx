import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { PetCard } from '../../components/user/PetCard';
import { RescueCard } from '../../components/user/RescueCard';
import { AdoptionWizardModal } from '../../components/user/AdoptionWizardModal';
import { FoodFundDonationSection } from '../../components/common/FoodFundDonationSection';
import { EmergencyRescueBanner } from '../../components/rescue/EmergencyRescueBanner';
import { EmergencyShelterModal } from '../../components/rescue/EmergencyShelterModal';
import { ReportStreetRescueModal } from '../../components/rescue/ReportStreetRescueModal';
import { Pet } from '../../types/pet';
import { RescuePost } from '../../types/rescue';
import { 
  Heart, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Award, 
  Users, 
  AlertTriangle,
  FileCheck,
  Calendar,
  Send,
  PlusCircle,
  Ban,
  Shield,
  HeartHandshake,
  Megaphone,
  Check
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
  onOpenAdoptionGuide?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onOpenAdoptionGuide }) => {
  const { pets, rescuePosts, statistics, supportRescuePost } = useData();
  const { role, currentUser } = useAuth();
  const { language, t } = useLanguage();

  const [selectedPetForAdoption, setSelectedPetForAdoption] = useState<Pet | null>(null);
  const [selectedRescueForSupport, setSelectedRescueForSupport] = useState<RescuePost | null>(null);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);
  
  // Emergency Rescue modals
  const [shelterModalOpen, setShelterModalOpen] = useState(false);
  const [reportStreetModalOpen, setReportStreetModalOpen] = useState(false);
  
  // Anti-dog/cat meat pledge campaign state
  const [hasPledged, setHasPledged] = useState(false);
  const [pledgeCount, setPledgeCount] = useState(18420);
  const [showPledgeToast, setShowPledgeToast] = useState(false);

  const handlePledge = () => {
    if (hasPledged) return;
    setHasPledged(true);
    setPledgeCount(prev => prev + 1);
    setShowPledgeToast(true);
    setTimeout(() => setShowPledgeToast(false), 4000);
  };

  // Filter featured waiting pets (approved & WAITING)
  const waitingPets = pets.filter(p => p.moderationStatus === 'APPROVED' && (p.status === 'WAITING' || p.status === 'UNDER_REVIEW')).slice(0, 6);
  
  // Urgent rescue posts
  const urgentRescues = rescuePosts.filter(r => r.status === 'APPROVED').slice(0, 3);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRescueForSupport) return;
    supportRescuePost(selectedRescueForSupport.id);
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setSelectedRescueForSupport(null);
      setSupportMessage('');
    }, 1800);
  };

  return (
    <div className="space-y-16 pb-20 text-left">
      
      {/* 1. HERO SECTION (CLASSIC 2-COLUMN: LEFT TEXT, RIGHT IMAGE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: TEXT, HEADINGS, CTAs & TRUST BADGES */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fde2cd] dark:bg-amber-950/70 border border-[#f0ceb2] dark:border-amber-900/50 text-[#9c3810] dark:text-amber-300 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#d46b28] animate-pulse" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black font-display tracking-tight text-[#2b2523] dark:text-stone-100 leading-[1.15]">
              {t('hero.titleMain')} <span className="text-[#d46b28] dark:text-amber-400">{t('hero.titleHighlight')}</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#665851] dark:text-stone-300 leading-relaxed max-w-xl">
              {t('hero.desc')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => navigate('/pets')}
                className="px-6 py-3.5 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{t('hero.ctaAdopt')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (role === 'GUEST') {
                    navigate('/login');
                  } else {
                    navigate('/my-pets/create');
                  }
                }}
                className="px-6 py-3.5 rounded-2xl bg-white dark:bg-stone-900 hover:bg-[#fde2cd] dark:hover:bg-stone-800 border border-[#efe2d3] dark:border-stone-800 text-[#2b2523] dark:text-stone-100 font-bold text-xs sm:text-sm transition cursor-pointer shadow-2xs flex items-center gap-2"
              >
                <span>{t('hero.ctaPost')}</span>
              </button>

              {onOpenAdoptionGuide && (
                <button
                  onClick={onOpenAdoptionGuide}
                  className="px-4 py-3.5 rounded-2xl bg-[#faf4ee] dark:bg-stone-800/80 hover:bg-[#fde2cd] dark:hover:bg-stone-700 text-[#9c3810] dark:text-amber-300 border border-[#f0ceb2] dark:border-stone-700 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5"
                  title="Xem quy trình và tiêu chuẩn nhận nuôi"
                >
                  <ShieldCheck className="w-4 h-4 text-[#d46b28] dark:text-amber-400" />
                  <span>{language === 'en' ? 'Adoption Process Guide' : 'Quy trình Nhận nuôi'}</span>
                </button>
              )}
            </div>

            {/* Trust Points / Social Proof Avatar Cluster */}
            <div className="pt-4 border-t border-[#efe2d3] dark:border-stone-800 flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Pet Avatars */}
              <div className="flex items-center -space-x-2.5">
                {[
                  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=200&auto=format&fit=crop',
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white dark:ring-stone-900 shadow-2xs"
                  />
                ))}
                <span className="w-9 h-9 rounded-full bg-[#fde2cd] dark:bg-amber-950 text-[#9c3810] dark:text-amber-300 text-[11px] font-black flex items-center justify-center ring-2 ring-white dark:ring-stone-900 shadow-2xs">
                  +1.4k
                </span>
              </div>

              <div className="text-xs">
                <div className="font-black text-[#2b2523] dark:text-stone-100 flex items-center gap-1">
                  <span>{language === 'en' ? '1,420+ pets found loving forever homes' : '1.420+ bé đã tìm thấy mái ấm yêu thương'}</span>
                </div>
                <span className="text-[11px] text-[#665851] dark:text-stone-400">{language === 'en' ? '100% Non-Profit • Transparent Care Agreement' : '100% Phi lợi nhuận • Hợp đồng bảo trợ minh bạch'}</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HERO IMAGE WITH FLOATING CARDS & SOFT GLOW */}
          <div className="lg:col-span-5 relative">
            {/* Soft decorative background shape */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#fde2cd] via-[#fce2cd]/60 to-[#faf4ee] dark:from-stone-900 dark:via-stone-850 dark:to-stone-950 rounded-[36px] -rotate-1 -z-10 blur-xs" />

            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#efe2d3] dark:border-stone-800 bg-white dark:bg-stone-900 aspect-[4/4.2] sm:aspect-[4/3.8] lg:aspect-[4/4.6]">
              <img
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=900&auto=format&fit=crop"
                alt="Adopter hugging rescued dog"
                className="w-full h-full object-cover"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xs text-[#2b2523] dark:text-stone-100 px-3.5 py-1.5 rounded-2xl shadow-md border border-[#efe2d3] dark:border-stone-800 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === 'en' ? '100% Non-Profit' : '100% Phi Lợi Nhuận'}</span>
              </div>

              {/* Bottom Verified Pledge Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-lg border border-[#efe2d3] dark:border-stone-800 text-left">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 flex items-center justify-center shrink-0">
                      <HeartHandshake className="w-5 h-5 text-[#d46b28] dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#2b2523] dark:text-stone-100 flex items-center gap-1">
                        <span>{t('hero.verifiedBadgeTitle')}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <p className="text-[11px] text-[#665851] dark:text-stone-300 font-medium leading-tight">
                        {t('hero.verifiedBadgeDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right shrink-0">
                    <span className="text-xs font-black text-[#d46b28] dark:text-amber-400 block">98.6%</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400">{language === 'en' ? 'Success Rate' : 'Thành công'}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 1.5. EMERGENCY RESCUE & 24/7 SHELTER DISPATCH (TOP PRIORITY) */}
      <EmergencyRescueBanner
        onOpenDirectory={() => setShelterModalOpen(true)}
        onReportStreetRescue={() => setReportStreetModalOpen(true)}
      />

      {/* 2. STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-[#efe2d3] dark:border-stone-800 shadow-2xs grid grid-cols-2 lg:grid-cols-4 gap-6 text-center transition-colors">
          <div className="space-y-0.5 border-r border-[#efe2d3] dark:border-stone-800 last:border-0">
            <span className="text-2xl sm:text-3xl font-bold text-[#2b2523] dark:text-stone-100 font-display">{statistics.totalWaitingPets}</span>
            <p className="text-xs text-[#665851] dark:text-stone-400">{t('stats.waitingPets')}</p>
          </div>
          <div className="space-y-0.5 sm:border-r border-[#efe2d3] dark:border-stone-800 last:border-0">
            <span className="text-2xl sm:text-3xl font-bold text-[#d46b28] dark:text-amber-400 font-display">{statistics.totalAdoptedPets}</span>
            <p className="text-xs text-[#665851] dark:text-stone-400">{t('stats.foundHome')}</p>
          </div>
          <div className="space-y-0.5 border-r border-[#efe2d3] dark:border-stone-800 last:border-0">
            <span className="text-2xl sm:text-3xl font-bold text-[#9c3810] dark:text-amber-300 font-display">{statistics.totalActiveRescuePosts}</span>
            <p className="text-xs text-[#665851] dark:text-stone-400">{t('stats.activeRescue')}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold text-[#d46b28] dark:text-amber-400 font-display">{statistics.totalVerifiedUsers}</span>
            <p className="text-xs text-[#665851] dark:text-stone-400">{t('stats.verifiedMembers')}</p>
          </div>
        </div>
      </section>

      {/* 2.5. FOOD FUND & SHELTER SUPPLY NEEDS SECTION */}
      <FoodFundDonationSection onViewAllRescue={() => navigate('/rescue')} />

      {/* 2.5. ADVOCACY CAMPAIGN BANNER: NO EATING DOG & CAT MEAT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#2c1209] text-white shadow-md border border-amber-500/20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-11 relative z-10">
            
            {/* Left Column: Core Campaign Messages & CTA */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Campaign Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800/90 border border-stone-700 text-stone-300 text-[11px] font-medium tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>{t('campaign.badge')}</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white leading-snug">
                  {t('campaign.title1')} <span className="text-rose-300">{t('campaign.titleHighlight')}</span>
                  <br />
                  <span className="text-amber-300 text-xl sm:text-2xl font-bold">{t('campaign.title2')}</span>
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                  {t('campaign.desc')}
                </p>
              </div>

              {/* 3 Pillars of Campaign */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-black/25 border border-white/10 p-3.5 rounded-xl space-y-1">
                  <div className="text-stone-100 font-bold text-xs">
                    {t('campaign.pillar1Title')}
                  </div>
                  <p className="text-[11px] text-stone-300 leading-normal">
                    {t('campaign.pillar1Desc')}
                  </p>
                </div>

                <div className="bg-black/25 border border-white/10 p-3.5 rounded-xl space-y-1">
                  <div className="text-stone-100 font-bold text-xs">
                    {t('campaign.pillar2Title')}
                  </div>
                  <p className="text-[11px] text-stone-300 leading-normal">
                    {t('campaign.pillar2Desc')}
                  </p>
                </div>

                <div className="bg-black/25 border border-white/10 p-3.5 rounded-xl space-y-1">
                  <div className="text-stone-100 font-bold text-xs">
                    {t('campaign.pillar3Title')}
                  </div>
                  <p className="text-[11px] text-stone-300 leading-normal">
                    {t('campaign.pillar3Desc')}
                  </p>
                </div>
              </div>

              {/* Pledge Actions & Counter */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={handlePledge}
                  disabled={hasPledged}
                  className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition ${
                    hasPledged
                      ? 'bg-amber-500 text-stone-950 cursor-default'
                      : 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer'
                  }`}
                >
                  {hasPledged ? t('campaign.pledgedBtn') : t('campaign.pledgeBtn')}
                </button>

                <button
                  onClick={() => navigate('/reports')}
                  className="px-4 py-3 rounded-xl bg-black/30 hover:bg-black/50 border border-white/20 text-stone-200 text-xs font-medium hover:text-white transition cursor-pointer"
                >
                  {t('campaign.reportPointBtn')}
                </button>
              </div>

              {/* Live Counter */}
              <div className="text-xs text-stone-300 pt-0.5">
                <span className="text-amber-400 font-bold">{pledgeCount.toLocaleString('vi-VN')}</span> {t('campaign.pledgeCounter')}
              </div>

            </div>

            {/* Right Column: High-Res Visual Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <img
                  src="/campaign-banner.jpg"
                  alt="Say No to Dog and Cat Meat - Pets Are Family Not Food"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-white text-left space-y-0.5">
                  <div className="text-xs font-bold text-stone-100">{t('campaign.imgCaptionTitle')}</div>
                  <p className="text-[11px] text-stone-300 leading-tight">
                    {t('campaign.imgCaptionDesc')}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Toast on pledge click */}
          {showPledgeToast && (
            <div className="absolute bottom-4 right-4 z-30 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-xl border border-amber-500/40 text-left text-xs">
              <div className="font-bold text-amber-300">{t('campaign.pledgeToastTitle')}</div>
              <div className="text-[11px] text-stone-300">{t('campaign.pledgeToastDesc')}</div>
            </div>
          )}

        </div>
      </section>

      {/* 3. FEATURED PETS SECTION (WARM PEACH CONTAINER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fce2cd] dark:bg-stone-900/90 rounded-3xl p-6 sm:p-10 border border-[#f0ceb2] dark:border-stone-800 space-y-6 shadow-2xs transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9c3810] dark:text-amber-400">{t('pets.featuredTag')}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2b2523] dark:text-stone-100 font-display mt-0.5">
                {t('pets.featuredTitle')}
              </h2>
            </div>
            <button
              onClick={() => navigate('/pets')}
              className="text-xs font-bold text-[#d46b28] dark:text-amber-400 hover:text-[#ba591a] hover:underline cursor-pointer"
            >
              {t('pets.viewAll')} ({pets.length}) →
            </button>
          </div>

          {/* Pet Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {waitingPets.map(pet => (
              <PetCard
                key={pet.id}
                pet={pet}
                onViewDetail={(id) => navigate(`/pets/${id}`)}
                onApplyAdopt={(p) => setSelectedPetForAdoption(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESCUE SOS SECTION */}
      <section className="bg-[#2c1209] text-white py-12 px-6 sm:px-10 rounded-3xl max-w-7xl mx-auto shadow-sm space-y-6 border border-amber-500/20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300">{t('rescue.tag')}</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-0.5">
              {t('rescue.title')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {t('rescue.desc')}
            </p>
          </div>
          <button
            onClick={() => navigate('/rescue')}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 hover:underline cursor-pointer"
          >
            {t('pets.viewAll')} →
          </button>
        </div>

        {/* Rescue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {urgentRescues.map(post => (
            <RescueCard
              key={post.id}
              post={post}
              onViewDetail={(id) => navigate(`/rescue/${id}`)}
              onSupport={(p) => setSelectedRescueForSupport(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. 4-STEP ADOPTION WORKFLOW GUIDE (NUMBERED PEACH BADGES) */}
      <section id="guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold text-[#9c3810] dark:text-amber-400 uppercase tracking-widest">{t('workflow.tag')}</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2b2523] dark:text-stone-100 font-display">
            {t('workflow.title')}
          </h2>
          <p className="text-xs sm:text-sm text-[#665851] dark:text-stone-300 font-normal">
            {t('workflow.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-[#efe2d3] dark:border-stone-800 shadow-2xs space-y-4 text-left hover:border-[#d46b28]/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 flex items-center justify-center font-black text-xl border border-[#f0ceb2] dark:border-amber-900/50 shadow-2xs">
              01
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-sm">{t('workflow.s1Title')}</h3>
              <p className="text-xs text-[#665851] dark:text-stone-300 leading-relaxed font-normal">
                {t('workflow.s1Desc')}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-[#efe2d3] dark:border-stone-800 shadow-2xs space-y-4 text-left hover:border-[#d46b28]/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 flex items-center justify-center font-black text-xl border border-[#f0ceb2] dark:border-amber-900/50 shadow-2xs">
              02
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-sm">{t('workflow.s2Title')}</h3>
              <p className="text-xs text-[#665851] dark:text-stone-300 leading-relaxed font-normal">
                {t('workflow.s2Desc')}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-[#efe2d3] dark:border-stone-800 shadow-2xs space-y-4 text-left hover:border-[#d46b28]/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 flex items-center justify-center font-black text-xl border border-[#f0ceb2] dark:border-amber-900/50 shadow-2xs">
              03
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-sm">{t('workflow.s3Title')}</h3>
              <p className="text-xs text-[#665851] dark:text-stone-300 leading-relaxed font-normal">
                {t('workflow.s3Desc')}
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-[#efe2d3] dark:border-stone-800 shadow-2xs space-y-4 text-left hover:border-[#d46b28]/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 flex items-center justify-center font-black text-xl border border-[#f0ceb2] dark:border-amber-900/50 shadow-2xs">
              04
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-sm">{t('workflow.s4Title')}</h3>
              <p className="text-xs text-[#665851] dark:text-stone-300 leading-relaxed font-normal">
                {t('workflow.s4Desc')}
              </p>
            </div>
          </div>

        </div>

        {onOpenAdoptionGuide && (
          <div className="text-center pt-2">
            <button
              onClick={onOpenAdoptionGuide}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#fde2cd] dark:bg-amber-950/70 hover:bg-[#fbd3b6] dark:hover:bg-amber-900/80 text-[#9c3810] dark:text-amber-300 font-bold text-xs sm:text-sm border border-[#f0ceb2] dark:border-amber-900/60 shadow-2xs transition cursor-pointer group"
            >
              <ShieldCheck className="w-4 h-4 text-[#d46b28] dark:text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{language === 'en' ? 'View 5-Step Process & Community Guidelines' : 'Xem Chi tiết 5 Bước & Hướng dẫn Nhận nuôi'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </section>

      {/* 6. TRUST & SAFETY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1c1917] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-left">
            
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">{language === 'en' ? 'Transparency' : 'Minh bạch'}</span>
              <h3 className="text-base font-bold text-white">{language === 'en' ? 'Verified & Trusted' : 'Xác thực & Tin cậy'}</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                {language === 'en' 
                  ? 'All pet posters and adopters undergo phone and identity verification to establish mutual trust and prevent irresponsible abandonment.' 
                  : 'Người đăng bài và người nhận nuôi được xác thực thông tin liên hệ và số điện thoại để nâng cao độ tin cậy và hạn chế tình trạng bỏ rơi.'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">{language === 'en' ? 'Welfare' : 'Phúc lợi'}</span>
              <h3 className="text-base font-bold text-white">{language === 'en' ? 'Anti-Profiteering Pledge' : 'Cam kết Không trục lợi'}</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                {language === 'en'
                  ? 'Strictly prohibiting disguised commercial sales, backyard breeding for profit, or mistreatment of rescued animals.'
                  : 'Tuyệt đối nghiêm cấm mua bán thương mại trá hình, nhân giống vì mục đích lợi nhuận hoặc sử dụng làm thức ăn.'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">{language === 'en' ? 'Protection' : 'Bảo vệ'}</span>
              <h3 className="text-base font-bold text-white">{language === 'en' ? 'Supervision & Reports' : 'Giám sát & Báo cáo'}</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                {language === 'en'
                  ? 'Our community administration promptly investigates all negative reports to maintain a clean, compassionate environment.'
                  : 'Đội ngũ Admin tiếp nhận và xử lý nhanh chóng mọi phản ánh tiêu cực từ cộng đồng nhằm duy trì môi trường lành mạnh.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MODAL 1: ADOPTION WIZARD */}
      {selectedPetForAdoption && (
        <AdoptionWizardModal
          pet={selectedPetForAdoption}
          isOpen={true}
          onClose={() => setSelectedPetForAdoption(null)}
          onSuccessNavigate={(appId) => {
            setSelectedPetForAdoption(null);
            navigate('/applications');
          }}
        />
      )}

      {/* MODAL 2: SUPPORT RESCUE POST */}
      {selectedRescueForSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-stone-200 dark:border-stone-800">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t('rescue.supportModalTitle')}</h3>
              <button
                onClick={() => setSelectedRescueForSupport(null)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {supportSuccess ? (
              <div className="p-6 text-center space-y-3 bg-[#fde2cd]/60 dark:bg-amber-950/40 rounded-2xl border border-[#f0ceb2] dark:border-amber-900/40">
                <CheckCircle2 className="w-12 h-12 text-[#d46b28] dark:text-amber-400 mx-auto animate-bounce" />
                <h4 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">{t('rescue.supportRecorded')}</h4>
                <p className="text-xs text-[#665851] dark:text-stone-300">
                  {t('rescue.supportRecordedSub')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="p-3 bg-[#faf4ee] dark:bg-stone-950 rounded-2xl border border-[#efe2d3] dark:border-stone-800 space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase">{language === 'en' ? 'Case:' : 'Trường hợp:'}</span>
                  <h4 className="font-bold text-[#2b2523] dark:text-stone-100 text-xs">{selectedRescueForSupport.title}</h4>
                  <p className="text-[11px] text-[#d46b28] dark:text-amber-400 font-bold">{language === 'en' ? 'Needed:' : 'Cần:'} {selectedRescueForSupport.quantityNeeded}</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#2b2523] dark:text-stone-200">
                    {t('rescue.supportMessageLabel')}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder={t('rescue.supportPlaceholder')}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2b2523] dark:text-stone-200">{t('auth.fullName')} *</label>
                    <input
                      type="text"
                      required
                      defaultValue={currentUser?.name || ''}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#2b2523] dark:text-stone-200">{t('auth.phone')} *</label>
                    <input
                      type="tel"
                      required
                      defaultValue={currentUser?.phone || ''}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRescueForSupport(null)}
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold cursor-pointer"
                  >
                    {t('common.close')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('rescue.sendSupportBtn')}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Emergency Shelter Directory Modal */}
      <EmergencyShelterModal
        isOpen={shelterModalOpen}
        onClose={() => setShelterModalOpen(false)}
        onReportStreetIncident={() => {
          setShelterModalOpen(false);
          setReportStreetModalOpen(true);
        }}
      />

      {/* Rapid Street Rescue SOS Report Modal */}
      <ReportStreetRescueModal
        isOpen={reportStreetModalOpen}
        onClose={() => setReportStreetModalOpen(false)}
        onSuccessNavigate={(rescueId) => navigate(`/rescue/${rescueId}`)}
        onOpenDirectory={() => {
          setReportStreetModalOpen(false);
          setShelterModalOpen(true);
        }}
      />

    </div>
  );
};
