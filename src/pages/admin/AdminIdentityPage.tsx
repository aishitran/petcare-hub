import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { UserProfile } from '../../types/user';
import { 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Shield, 
  Lock, 
  Clock, 
  X,
  AlertTriangle
} from 'lucide-react';

interface AdminIdentityPageProps {
  navigate: (path: string) => void;
}

export const AdminIdentityPage: React.FC<AdminIdentityPageProps> = ({ navigate }) => {
  const { users, updateIdentityStatus } = useData();

  const [inspectUser, setInspectUser] = useState<UserProfile | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const pendingUsers = users.filter(u => u.identityStatus === 'PENDING');
  const verifiedUsers = users.filter(u => u.identityStatus === 'VERIFIED');

  const handleApprove = (userId: string) => {
    updateIdentityStatus(userId, 'VERIFIED');
    setInspectUser(null);
  };

  const handleReject = (userId: string) => {
    updateIdentityStatus(userId, 'REJECTED');
    setIsRejecting(false);
    setInspectUser(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl font-black text-white font-display">Thẩm định Danh tính Căn Cước Công Dân (eKYC)</h1>
        <p className="text-xs text-stone-400">Kiểm tra thông tin số CCCD, hình ảnh mặt trước/sau và xác thực tính chính danh người dùng.</p>
      </div>

      {/* Pending Queue Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-300">
            Hồ sơ đang chờ duyệt ({pendingUsers.length})
          </h2>
        </div>

        {pendingUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingUsers.map(user => (
              <div 
                key={user.id}
                className="bg-stone-900 rounded-3xl border border-stone-800 p-5 shadow-lg space-y-4"
              >
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt="" className="w-12 h-12 rounded-2xl object-cover ring-1 ring-stone-700" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{user.name}</h3>
                    <span className="text-xs text-stone-400">{user.email}</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800/80 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Số CCCD:</span>
                    <span className="font-mono font-bold text-stone-200">{user.identityData?.idNumber || '079201004567'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Số điện thoại:</span>
                    <span className="text-stone-200">{user.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInspectUser(user)}
                    className="flex-1 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem ảnh CCCD</span>
                  </button>

                  <button
                    onClick={() => handleApprove(user.id)}
                    className="flex-1 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Duyệt ngay</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-stone-900/50 p-8 rounded-3xl border border-stone-800 text-center text-xs text-stone-500">
            Không có hồ sơ nào đang chờ kiểm duyệt.
          </div>
        )}
      </div>

      {/* Verified Users Directory */}
      <div className="space-y-4 pt-6 border-t border-stone-800">
        <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
          Danh sách đã xác minh thành công ({verifiedUsers.length})
        </h2>

        <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 text-[11px] uppercase font-bold border-b border-stone-800">
              <tr>
                <th className="px-5 py-3">Người dùng</th>
                <th className="px-4 py-3">Số CCCD</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-5 py-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {verifiedUsers.map(u => (
                <tr key={u.id} className="hover:bg-stone-800/40">
                  <td className="px-5 py-3 font-bold text-white flex items-center gap-2">
                    <img src={u.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <span>{u.name}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-stone-400">
                    {u.identityData?.idNumber ? `${u.identityData.idNumber.slice(0, 4)}••••${u.identityData.idNumber.slice(-4)}` : '0792••••4567'}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={u.identityStatus} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setInspectUser(u)}
                      className="text-teal-400 hover:underline font-bold"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT MODAL */}
      {inspectUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-stone-900 rounded-3xl max-w-xl w-full p-6 space-y-5 border border-stone-800 text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-bold text-white text-base">Hồ sơ CCCD: {inspectUser.name}</h3>
              <button onClick={() => setInspectUser(null)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-xs space-y-1">
                <div><span className="text-stone-500">Họ và tên:</span> <b className="text-white">{inspectUser.name}</b></div>
                <div><span className="text-stone-500">Số CCCD:</span> <b className="text-teal-300 font-mono">{inspectUser.identityData?.idNumber || '079201004567'}</b></div>
                <div><span className="text-stone-500">Email:</span> <span className="text-stone-300">{inspectUser.email}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-stone-400 block">Mặt trước CCCD:</span>
                  <img
                    src={inspectUser.identityData?.frontImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600'}
                    alt="Front"
                    className="w-full h-36 object-cover rounded-xl border border-stone-700"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-stone-400 block">Mặt sau CCCD:</span>
                  <img
                    src={inspectUser.identityData?.backImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600'}
                    alt="Back"
                    className="w-full h-36 object-cover rounded-xl border border-stone-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
              <button
                onClick={() => handleReject(inspectUser.id)}
                className="px-4 py-2 rounded-xl bg-rose-900/50 hover:bg-rose-800 text-rose-200 text-xs font-bold"
              >
                Từ chối hồ sơ
              </button>
              <button
                onClick={() => handleApprove(inspectUser.id)}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Phê duyệt danh tính</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
