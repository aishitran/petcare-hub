import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AdoptionCommitment } from '../../types/commitment';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  PenTool, 
  Upload, 
  Camera, 
  Sparkles,
  Heart,
  Info
} from 'lucide-react';

interface CommitmentPageProps {
  navigate: (path: string) => void;
}

export const CommitmentPage: React.FC<CommitmentPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { commitments, signCommitment, updatePet } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [signingCommitment, setSigningCommitment] = useState<AdoptionCommitment | null>(null);
  const [signatureText, setSignatureText] = useState('');
  const [agreedAllClauses, setAgreedAllClauses] = useState(false);
  const [handoverSuccess, setHandoverSuccess] = useState(false);

  if (!currentUser) return null;

  const myCommitments = commitments.filter(
    c => c.adopterId === currentUser.id || c.originalOwnerId === currentUser.id
  );

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signingCommitment) return;

    signCommitment(signingCommitment.id, signatureText || currentUser.name);
    setHandoverSuccess(true);
    setTimeout(() => {
      setHandoverSuccess(false);
      setSigningCommitment(null);
      setSignatureText('');
      setAgreedAllClauses(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl font-black text-stone-900 font-display">
          {isEn ? 'Adoption Commitments & Handover Protocols' : 'Cam kết & Biên bản bàn giao'}
        </h1>
        <p className="text-xs text-stone-500">
          {isEn 
            ? 'Legally binding welfare agreements ensuring lifelong responsibility and non-profit ethics after adoption.' 
            : 'Văn bản pháp lý và phúc lợi bắt buộc nhằm đảm bảo trách nhiệm trọn đời đối với thú cưng sau nhận nuôi.'}
        </p>
      </div>

      {/* Commitments List */}
      {myCommitments.length > 0 ? (
        <div className="space-y-4">
          {myCommitments.map(c => {
            const isAdopter = c.adopterId === currentUser.id;
            const roleBadge = isAdopter 
              ? (isEn ? 'Adopter' : 'Người nhận nuôi') 
              : (isEn ? 'Pet Rescuer / Poster' : 'Người trao thú cưng');

            return (
              <div 
                key={c.id}
                className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-5 hover:border-emerald-700/30 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-stone-900 text-base">
                          {isEn ? `Adoption Commitment for ${c.petName}` : `Bản cam kết nhận nuôi bé ${c.petName}`}
                        </h3>
                        <StatusBadge status={c.status} />
                      </div>
                      <span className="text-xs text-stone-500">
                        {isEn ? `Your role: ` : `Vai trò của bạn: `}<b className="text-emerald-900">{roleBadge}</b> • {isEn ? 'Protocol ID:' : 'Mã biên bản:'} #{c.id}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-400 font-semibold block">{isEn ? 'Created date:' : 'Ngày lập:'}</span>
                    <span className="text-xs font-bold text-stone-800">
                      {new Date(c.createdAt).toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}
                    </span>
                  </div>
                </div>

                {/* Terms Summary Box */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 uppercase block">
                      {isEn ? 'Signed Animal Welfare & Anti-Profiteering Clauses:' : 'Các điều khoản phúc lợi & Không trục lợi đã ký:'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                      {isEn ? 'Non-Commercial' : 'Phi thương mại'}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-stone-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <b>{isEn ? 'ANTI-PROFITEERING COMMITMENT:' : 'Cam kết KHÔNG TRỤC LỢI:'}</b>{' '}
                        {isEn 
                          ? 'Strictly zero commercial reselling, commercial breeding, or transferring for financial gain.' 
                          : 'Tuyệt đối không mua bán lại, không chuyển nhượng thương mại, không nhân giống sinh sản vì mục đích kinh doanh.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <b>{isEn ? 'ZERO ABANDONMENT COMMITMENT:' : 'Cam kết KHÔNG BỎ RƠI:'}</b>{' '}
                        {isEn 
                          ? 'Lifelong responsible care, safe living environment, and zero dangerous unsupervised roaming.' 
                          : 'Nuôi dưỡng trọn đời có trách nhiệm, không thả rông nguy hiểm ngoài đường.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <b>{isEn ? 'VETERINARY CARE COMMITMENT:' : 'Cam kết CHĂM SÓC Y TẾ:'}</b>{' '}
                        {isEn 
                          ? 'Ensure annual rabies and core vaccinations, plus timely medical treatment whenever unwell.' 
                          : 'Đảm bảo tiêm phòng dại và tiêm vaccine định kỳ hàng năm cho thú cưng.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <b>{isEn ? 'TRANSPARENCY COMMITMENT:' : 'Cam kết MINH BẠCH:'}</b>{' '}
                        {isEn 
                          ? 'Submit post-adoption photo check-ins periodically (1 week, 1 month, 3 months).' 
                          : 'Cập nhật hình ảnh tình trạng sức khỏe của bé định kỳ (Check-in 1 tuần, 1 tháng, 3 tháng).'}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Signatures status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <span className="text-stone-500 text-[11px] block font-semibold">
                      {isEn ? 'Pet Poster Signature:' : 'Chữ ký người trao nuôi (Poster):'}
                    </span>
                    <span className="font-bold text-stone-900">
                      {c.originalOwnerSignature || (isEn ? 'Signed digitally' : 'Đã ký điện tử')}
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <span className="text-stone-500 text-[11px] block font-semibold">
                      {isEn ? 'Adopter Signature:' : 'Chữ ký người nhận nuôi (Adopter):'}
                    </span>
                    <span className="font-bold text-stone-900">
                      {c.adopterSignature ? c.adopterSignature : (isEn ? 'Pending digital signature' : 'Chưa ký điện tử')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                  {c.status === 'PENDING_SIGNATURE' && isAdopter && (
                    <button
                      onClick={() => setSigningCommitment(c)}
                      className="px-5 py-2 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-md animate-pulse"
                    >
                      <PenTool className="w-4 h-4" />
                      <span>{isEn ? 'Sign digital contract now' : 'Ký cam kết điện tử ngay'}</span>
                    </button>
                  )}
                  {c.status === 'SIGNED' && (
                    <button
                      onClick={() => navigate('/check-ins')}
                      className="px-4 py-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{isEn ? 'Go to Post-Adoption Check-ins' : 'Đến trang Check-in hậu nhận nuôi'}</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-stone-300 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-2xl">
            📜
          </div>
          <h3 className="font-bold text-stone-900 text-base">
            {isEn ? 'No adoption commitments yet' : 'Chưa có biên bản cam kết nào'}
          </h3>
          <p className="text-xs text-stone-500">
            {isEn 
              ? 'Commitment protocols will be generated automatically once an application is officially approved by the poster.' 
              : 'Biên bản cam kết sẽ được khởi tạo tự động khi đơn nhận nuôi được người đăng tin duyệt chính thức.'}
          </p>
        </div>
      )}

      {/* SIGN COMMITMENT MODAL */}
      {signingCommitment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl border border-stone-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-stone-900 text-base">
                {isEn ? `Sign Adoption Commitment for ${signingCommitment.petName}` : `Ký bản cam kết nhận nuôi bé ${signingCommitment.petName}`}
              </h3>
              <button onClick={() => setSigningCommitment(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            {handoverSuccess ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-emerald-950 text-base">
                  {isEn ? 'Commitment Signed Successfully!' : 'Đã ký cam kết thành công!'}
                </h4>
                <p className="text-xs text-emerald-800">
                  {isEn 
                    ? `Congratulations on officially welcoming ${signingCommitment.petName} into your loving family.` 
                    : `Chúc mừng bạn đã chính thức đón bé ${signingCommitment.petName} về với gia đình mới.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSign} className="space-y-4">
                <div className="p-4 bg-stone-50 rounded-2xl text-xs space-y-2 border border-stone-200 text-stone-700">
                  <span className="font-bold text-emerald-900 uppercase block">
                    {isEn ? 'Lifelong Responsibility & Anti-Profiteering Clauses:' : 'Cam kết trách nhiệm & Không trục lợi:'}
                  </span>
                  <p>1. <b>{isEn ? 'STRICTLY NON-COMMERCIAL:' : 'TUYỆT ĐỐI KHÔNG TRỤC LỢI:'}</b> {isEn ? 'No reselling, no commercial transfer, no profit breeding.' : 'Không bán lại, không chuyển nhượng thương mại, không nhân giống kinh doanh.'}</p>
                  <p>2. <b>{isEn ? 'ZERO ABANDONMENT:' : 'KHÔNG BỎ RƠI:'}</b> {isEn ? 'Provide proper nutrition, safe indoor living; no dangerous outdoor roaming.' : 'Cung cấp điều kiện dinh dưỡng, chỗ ở vệ sinh, an toàn; không thả rông ngoài đường.'}</p>
                  <p>3. <b>{isEn ? 'RESPONSIBILITY & TRANSPARENCY:' : 'TRÁCH NHIỆM & MINH BẠCH:'}</b> {isEn ? 'In case of insurmountable hardship, reach back to the previous owner/shelter for solutions, never resell or abandon.' : 'Nếu gặp trở ngại bất khả kháng, sẽ liên hệ lại chủ cũ/trạm để tìm giải pháp, tuyệt đối không đem bán hoặc bỏ rơi.'}</p>
                  <p>4. <b>{isEn ? 'PERIODIC CHECK-INS:' : 'CHECK-IN ĐỊNH KỲ:'}</b> {isEn ? 'Agree to upload health and wellness check-in updates on PetCare Hub.' : 'Đồng ý gửi cập nhật hình ảnh sức khỏe của bé định kỳ trên ứng dụng PetCare Hub.'}</p>
                </div>

                <label className="flex items-center gap-2 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 cursor-pointer text-xs text-emerald-900 font-bold">
                  <input
                    type="checkbox"
                    required
                    checked={agreedAllClauses}
                    onChange={(e) => setAgreedAllClauses(e.target.checked)}
                    className="w-4 h-4 text-emerald-800 rounded"
                  />
                  <span>
                    {isEn ? 'I have carefully read and agree to all terms and conditions above.' : 'Tôi đã đọc kỹ và đồng ý với tất cả điều khoản cam kết trên.'}
                  </span>
                </label>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    {isEn ? 'Digital Signature (Enter your full legal name) *' : 'Ký tên điện tử (Nhập họ và tên đầy đủ) *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={currentUser.name}
                    value={signatureText}
                    onChange={(e) => setSignatureText(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs font-bold focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setSigningCommitment(null)}
                    className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold"
                  >
                    {isEn ? 'Cancel' : 'Hủy'}
                  </button>
                  <button
                    type="submit"
                    disabled={!agreedAllClauses}
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 shadow-md"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Confirm & Sign Protocol' : 'Xác nhận ký biên bản'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
