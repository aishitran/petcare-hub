import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { AdoptionFeedback } from '../../types/feedback';
import { translateDynamicText } from '../../utils/dataTranslator';
import { Star, MessageSquare, Award, CheckCircle2, User, Send } from 'lucide-react';

interface FeedbackPageProps {
  navigate: (path: string) => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { feedbacks, addFeedback, pets } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedPetId, setSelectedPetId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!currentUser) return null;

  const myFeedbacks = feedbacks.filter(
    f => f.fromUserId === currentUser.id || f.toUserId === currentUser.id
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const petObj = pets.find(p => p.id === selectedPetId) || pets[0];

    addFeedback({
      applicationId: 'app-fb',
      petId: petObj.id,
      fromUserId: currentUser.id,
      fromUserName: currentUser.name,
      toUserId: petObj.creatorUserId,
      toUserName: petObj.creatorUserName,
      rating,
      comment
    });

    setSubmitted(true);
    setComment('');
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl font-black text-stone-900 font-display">
          {isEn ? 'Ratings & Reviews' : 'Đánh giá & Phản hồi'}
        </h1>
        <p className="text-xs text-stone-500">
          {isEn 
            ? 'Share your experience regarding interview communication, guidance, and post-adoption support.' 
            : 'Chia sẻ cảm nhận về trải nghiệm phỏng vấn, sự hỗ trợ và mức độ hài lòng trong quá trình nhận nuôi.'}
        </p>
      </div>

      {/* Grid: Create review + Reviews history */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Submit review box */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{isEn ? 'Submit Adoption Experience Review' : 'Gửi đánh giá trải nghiệm nhận nuôi'}</span>
          </h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-950 text-sm">
                {isEn ? 'Thank you for your review!' : 'Cảm ơn đánh giá của bạn!'}
              </h4>
              <p className="text-xs text-emerald-800">
                {isEn 
                  ? 'Your feedback helps our community become more trustworthy and united.' 
                  : 'Ý kiến đóng góp giúp cộng đồng ngày càng gắn kết và văn minh hơn.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Select Pet *' : 'Chọn thú cưng *'}
                </label>
                <select
                  value={selectedPetId}
                  onChange={(e) => setSelectedPetId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 font-bold"
                >
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>
                      {isEn ? `Pet ${p.name} (Poster: ${p.creatorUserName})` : `Bé ${p.name} (Người đăng: ${p.creatorUserName})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Satisfaction Rating (1 - 5 Stars) *' : 'Mức độ hài lòng (1 - 5 Sao) *'}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl transition hover:scale-110"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isEn ? 'Review Comments & Message *' : 'Nội dung đánh giá & Lời nhắn *'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={isEn ? 'Share about the poster attitude, transparency of medical records and pet wellbeing...' : 'Chia sẻ về thái độ hướng dẫn, sự minh bạch trong sổ y tế và sức khỏe của bé...'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isEn ? 'Submit Review' : 'Gửi đánh giá'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Reviews List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-bold text-stone-900 text-sm">
            {isEn ? `Review History (${myFeedbacks.length})` : `Lịch sử đánh giá (${myFeedbacks.length})`}
          </h3>
          
          {myFeedbacks.length > 0 ? (
            <div className="space-y-3">
              {myFeedbacks.map(f => (
                <div key={f.id} className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-xs">
                        {(f.fromUserName || f.adopterName || 'U').charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs">{f.fromUserName || f.adopterName || (isEn ? 'Anonymous' : 'Ẩn danh')}</h4>
                        <span className="text-[10px] text-stone-400">{new Date(f.createdAt).toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}</span>
                      </div>
                    </div>

                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= (f.rating || f.ratingStars || 5) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-2xl">
                    "{translateDynamicText(f.comment, language)}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-stone-300 text-center text-xs text-stone-400">
              {isEn ? 'No review history yet.' : 'Chưa có lịch sử đánh giá nào.'}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
