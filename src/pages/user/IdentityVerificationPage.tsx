import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  ShieldCheck, 
  UserCheck, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Clock, 
  Sparkles,
  Info
} from 'lucide-react';

interface IdentityVerificationPageProps {
  navigate: (path: string) => void;
}

export const IdentityVerificationPage: React.FC<IdentityVerificationPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { submitIdentityVerification } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [idNumber, setIdNumber] = useState(currentUser?.identityData?.idNumber || '');
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [dob, setDob] = useState('1998-05-15');
  const [frontImage, setFrontImage] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600');
  const [backImage, setBackImage] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600');
  const [submitted, setSubmitted] = useState(false);

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitIdentityVerification(currentUser.id, {
      idNumber,
      frontImage,
      backImage,
      selfieImage: frontImage
    });

    setSubmitted(true);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl font-black text-stone-900 font-display">
          {isEn ? 'Identity Verification (eKYC)' : 'Xác minh Danh tính (eKYC)'}
        </h1>
        <p className="text-xs text-stone-500">
          {isEn 
            ? 'Verify your Citizen ID / National Identity Card to build trust when rehoming and adopting pets.' 
            : 'Xác thực căn cước công dân để nâng cao độ tin cậy khi đăng tin tìm chủ và nhận nuôi thú cưng.'}
        </p>
      </div>

      {/* Current Status Card */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
            currentUser.identityStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-900' :
            currentUser.identityStatus === 'PENDING' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'
          }`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-stone-900 text-base">
                {isEn ? 'Identity Verification Status:' : 'Trạng thái hồ sơ danh tính:'}
              </h3>
              <StatusBadge status={currentUser.identityStatus} />
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {currentUser.identityStatus === 'VERIFIED' ? (isEn ? 'Your account has been securely verified.' : 'Tài khoản của bạn đã được xác thực an toàn.') :
               currentUser.identityStatus === 'PENDING' ? (isEn ? 'Your application is being reviewed by Admin within 24 hours.' : 'Hồ sơ đang được Admin kiểm duyệt trong 24h.') :
               (isEn ? 'Citizen ID verification not yet completed.' : 'Chưa hoàn tất xác thực CCCD.')}
            </p>
          </div>
        </div>

        {currentUser.identityStatus === 'VERIFIED' && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{isEn ? 'Trusted Member Badge Issued' : 'Đã cấp huy hiệu tin cậy'}</span>
          </div>
        )}
      </div>

      {/* Verification Form (if not verified) */}
      {currentUser.identityStatus !== 'VERIFIED' ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-stone-900 text-base">
              {isEn ? 'Submit Citizen ID Verification' : 'Gửi thông tin xác thực CCCD'}
            </h3>
            <p className="text-xs text-stone-500">
              {isEn 
                ? 'Information is securely encrypted and used solely for identity verification purposes.' 
                : 'Thông tin được mã hóa bảo mật và chỉ sử dụng cho mục đích xác minh người dùng.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
              <Clock className="w-12 h-12 text-amber-600 mx-auto animate-spin" style={{ animationDuration: '8s' }} />
              <h4 className="font-bold text-amber-950 text-base">
                {isEn ? 'Verification Request Submitted!' : 'Đã gửi hồ sơ xác minh thành công!'}
              </h4>
              <p className="text-xs text-amber-800">
                {isEn ? 'Admins will review your documents as soon as possible.' : 'Admin sẽ kiểm duyệt hồ sơ của bạn trong thời gian sớm nhất.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isEn ? 'Full Legal Name on ID *' : 'Họ và tên theo CCCD *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isEn ? 'Citizen ID Number (12 digits) *' : 'Số Căn cước công dân (12 số) *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="079201004567"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                  />
                </div>
              </div>

              {/* Photo Upload Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-700">
                    {isEn ? 'Front Photo of Citizen ID *' : 'Ảnh mặt trước CCCD *'}
                  </label>
                  <div className="p-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-center space-y-2">
                    <img src={frontImage} alt="CCCD Front" className="w-full h-32 object-cover rounded-xl border border-stone-200" />
                    <span className="text-[11px] text-stone-400 block">
                      {isEn ? 'Valid sample image selected' : 'Đã chọn ảnh mẫu hợp lệ'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-700">
                    {isEn ? 'Back Photo of Citizen ID *' : 'Ảnh mặt sau CCCD *'}
                  </label>
                  <div className="p-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-center space-y-2">
                    <img src={backImage} alt="CCCD Back" className="w-full h-32 object-cover rounded-xl border border-stone-200" />
                    <span className="text-[11px] text-stone-400 block">
                      {isEn ? 'Valid sample image selected' : 'Đã chọn ảnh mẫu hợp lệ'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Privacy Guarantee Notice */}
              <div className="p-4 bg-emerald-950 text-white rounded-2xl flex items-center gap-3 text-xs">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-[11px] text-stone-200 leading-relaxed">
                  {isEn 
                    ? 'Privacy Guarantee: Your Citizen ID number and scans are strictly encrypted and never shared publicly with other users.' 
                    : 'Cam kết bảo mật dữ liệu riêng tư: Số CCCD và ảnh căn cước sẽ không bao giờ được công khai cho người khác thấy.'}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isEn ? 'Submit Verification Request' : 'Gửi hồ sơ xác minh'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-stone-200 text-center space-y-3">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-stone-900 text-lg">
            {isEn ? 'Your Identity is Fully Verified' : 'Hồ sơ của bạn đã hoàn tất xác minh'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {isEn 
              ? 'Your verified member badge is active across all your pet listings and adoption applications.' 
              : 'Huy hiệu thành viên xác minh đã được kích hoạt trên tất cả bài đăng thú cưng và hồ sơ nhận nuôi của bạn.'}
          </p>
        </div>
      )}

    </div>
  );
};
