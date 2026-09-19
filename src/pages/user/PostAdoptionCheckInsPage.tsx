import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { PostAdoptionCheckIn } from '../../types/checkIn';
import { translateDynamicText } from '../../utils/dataTranslator';
import { 
  Sparkles, 
  Camera, 
  CheckCircle2, 
  Calendar, 
  Heart, 
  Clock, 
  Plus, 
  Upload, 
  Image as ImageIcon 
} from 'lucide-react';

interface PostAdoptionCheckInsPageProps {
  navigate: (path: string) => void;
}

export const PostAdoptionCheckInsPage: React.FC<PostAdoptionCheckInsPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { checkIns, addCheckIn, pets } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState('');
  const [milestone, setMilestone] = useState<'WEEK_1' | 'MONTH_1' | 'MONTH_3' | 'MONTH_6' | 'YEAR_1'>('WEEK_1');
  const [healthNotes, setHealthNotes] = useState('');
  const [behaviorNotes, setBehaviorNotes] = useState('');
  const [samplePhoto, setSamplePhoto] = useState('https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800');

  if (!currentUser) return null;

  const myCheckIns = checkIns.filter(
    c => c.adopterId === currentUser.id || c.originalOwnerId === currentUser.id
  );

  const adoptedPets = pets.filter(p => p.status === 'ADOPTED' || p.status === 'UNDER_REVIEW');

  const handleSubmitCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const petObj = pets.find(p => p.id === selectedPetId) || pets[0];

    addCheckIn({
      applicationId: 'app-auto',
      petId: petObj.id,
      petName: petObj.name,
      adopterId: currentUser.id,
      adopterName: currentUser.name,
      originalOwnerId: petObj.creatorUserId,
      milestone,
      photos: [samplePhoto],
      healthNotes,
      behaviorNotes,
      status: 'SUBMITTED'
    });

    setIsSubmitModalOpen(false);
    setHealthNotes('');
    setBehaviorNotes('');
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 font-display">
            {isEn ? 'Post-Adoption Follow-ups (Check-ins)' : 'Theo dõi sau nhận nuôi (Check-in)'}
          </h1>
          <p className="text-xs text-stone-500">
            {isEn 
              ? 'Submit periodic photos and progress updates of your adopted pets (1 week, 1 month, 3 months, 6 months).' 
              : 'Cập nhật hình ảnh và tình trạng phát triển của bé định kỳ (1 tuần, 1 tháng, 3 tháng, 6 tháng).'}
          </p>
        </div>

        <button
          onClick={() => {
            if (adoptedPets.length > 0) setSelectedPetId(adoptedPets[0].id);
            setIsSubmitModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/20"
        >
          <Camera className="w-4 h-4" />
          <span>{isEn ? 'Submit New Check-in' : 'Gửi cập nhật Check-in mới'}</span>
        </button>
      </div>

      {/* Check-ins Timeline / Feed */}
      {myCheckIns.length > 0 ? (
        <div className="space-y-6">
          {myCheckIns.map(c => (
            <div 
              key={c.id}
              className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-4 hover:border-emerald-700/30 transition"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">
                      {isEn ? `Check-in for ` : `Check-in bé `}
                      <span className="text-emerald-900">{c.petName}</span> • {isEn ? 'Milestone:' : 'Cột mốc:'} {
                        c.milestone === 'WEEK_1' ? (isEn ? 'First Week' : 'Tuần đầu tiên') :
                        c.milestone === 'MONTH_1' ? (isEn ? 'Month 1' : 'Tháng thứ 1') :
                        c.milestone === 'MONTH_3' ? (isEn ? 'Month 3' : 'Tháng thứ 3') : (isEn ? 'Month 6' : '6 Tháng')
                      }
                    </h3>
                    <span className="text-[11px] text-stone-400">
                      {isEn ? 'Submitted by:' : 'Người gửi:'} {c.adopterName} • {new Date(c.submittedAt || c.createdAt || Date.now()).toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900">
                  {isEn ? '✓ Recorded' : '✓ Đã ghi nhận'}
                </span>
              </div>

              {/* Photos Gallery */}
              <div className="flex gap-3 overflow-x-auto py-2">
                {c.photos.map((p, idx) => (
                  <img
                    key={idx}
                    src={p}
                    alt=""
                    className="w-44 h-32 rounded-2xl object-cover border border-stone-200 shadow-sm"
                  />
                ))}
              </div>

              {/* Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200/70">
                <div>
                  <span className="font-bold text-stone-900 block mb-1">
                    {isEn ? 'Health Condition & Diet:' : 'Tình trạng sức khỏe & Ăn uống:'}
                  </span>
                  <p className="text-stone-600 leading-relaxed">{translateDynamicText(c.healthNotes, language)}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block mb-1">
                    {isEn ? 'Adaptation & Personality:' : 'Thích nghi & Tính cách:'}
                  </span>
                  <p className="text-stone-600 leading-relaxed">{translateDynamicText(c.behaviorNotes, language)}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-stone-300 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-2xl">
            📸
          </div>
          <h3 className="font-bold text-stone-900 text-base">
            {isEn ? 'No check-in updates yet' : 'Chưa có bài check-in nào'}
          </h3>
          <p className="text-xs text-stone-500">
            {isEn 
              ? 'After bringing your pet home, you can submit health & wellness progress updates here.' 
              : 'Sau khi nhận thú cưng về nhà, bạn có thể gửi hình ảnh cập nhật sức khỏe định kỳ tại đây.'}
          </p>
        </div>
      )}

      {/* SUBMIT CHECK-IN MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-stone-900 text-base">
                {isEn ? 'Submit Pet Health & Wellness Check-in' : 'Gửi cập nhật tình trạng thú cưng'}
              </h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleSubmitCheckIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Select Pet *' : 'Chọn thú cưng *'}
                </label>
                <select
                  value={selectedPetId}
                  onChange={(e) => setSelectedPetId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-stone-50"
                >
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>
                      {isEn ? `Pet ${p.name} (${p.species === 'DOG' ? 'Dog' : 'Cat'})` : `Bé ${p.name} (${p.species === 'DOG' ? 'Chó' : 'Mèo'})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Milestone Timeline *' : 'Cột mốc thời gian *'}
                </label>
                <select
                  value={milestone}
                  onChange={(e: any) => setMilestone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50"
                >
                  <option value="WEEK_1">{isEn ? '1 Week Post-Adoption (Initial settling in)' : '1 Tuần sau nhận nuôi (Thích nghi bước đầu)'}</option>
                  <option value="MONTH_1">{isEn ? '1 Month Post-Adoption' : '1 Tháng sau nhận nuôi'}</option>
                  <option value="MONTH_3">{isEn ? '3 Months Post-Adoption (Booster shots/wellness)' : '3 Tháng sau nhận nuôi (Tiêm nhắc lại/sức khỏe)'}</option>
                  <option value="MONTH_6">{isEn ? '6 Months Post-Adoption' : '6 Tháng sau nhận nuôi'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Health Condition & Diet *' : 'Tình trạng sức khỏe & Ăn uống *'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={healthNotes}
                  onChange={(e) => setHealthNotes(e.target.value)}
                  placeholder={isEn ? 'e.g., Eating 2 meals a day, gained 0.5kg, healthy digestion...' : 'Ví dụ: Bé ăn ngoan ngày 2 bữa hạt, tăng được 0.5kg, phân tốt...'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Personality & Social Adaptation *' : 'Tính cách & Khả năng hòa nhập *'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={behaviorNotes}
                  onChange={(e) => setBehaviorNotes(e.target.value)}
                  placeholder={isEn ? 'e.g., Settled well into the new home, very affectionate and loves playing...' : 'Ví dụ: Bé đã quen nhà mới, rất quấn chủ và thích chơi bóng...'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Attached Photos' : 'Hình ảnh đính kèm'}
                </label>
                <div className="flex gap-2">
                  <img src={samplePhoto} alt="" className="w-16 h-16 rounded-xl object-cover border border-stone-200" />
                  <input
                    type="text"
                    value={samplePhoto}
                    onChange={(e) => setSamplePhoto(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold"
                >
                  {isEn ? 'Cancel' : 'Hủy'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Submit Check-in' : 'Gửi Check-in'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
