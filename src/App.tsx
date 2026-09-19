import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { DemoRoleBar } from './components/common/DemoRoleBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BackgroundPattern } from './components/layout/BackgroundPattern';
import { UserLayout } from './components/layout/UserLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { FloatingChatWidget } from './components/chat/FloatingChatWidget';
import { AdoptionProcessModal } from './components/common/AdoptionProcessModal';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { PetListingPage } from './pages/public/PetListingPage';
import { PetDetailPage } from './pages/public/PetDetailPage';
import { RescueListingPage } from './pages/public/RescueListingPage';
import { RescueDetailPage } from './pages/public/RescueDetailPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// User Workspace Pages
import { UserDashboardPage } from './pages/user/UserDashboardPage';
import { MyPetPostsPage } from './pages/user/MyPetPostsPage';
import { CreatePetPostPage } from './pages/user/CreatePetPostPage';
import { MyApplicationsPage } from './pages/user/MyApplicationsPage';
import { ApplicationsForMyPetsPage } from './pages/user/ApplicationsForMyPetsPage';
import { AppointmentsPage } from './pages/user/AppointmentsPage';
import { CommitmentPage } from './pages/user/CommitmentPage';
import { PostAdoptionCheckInsPage } from './pages/user/PostAdoptionCheckInsPage';
import { FeedbackPage } from './pages/user/FeedbackPage';
import { MyRescuePostsPage } from './pages/user/MyRescuePostsPage';
import { ReportSubmissionPage } from './pages/user/ReportSubmissionPage';
import { NotificationsPage } from './pages/user/NotificationsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUserManagementPage } from './pages/admin/AdminUserManagementPage';
import { AdminPetManagementPage } from './pages/admin/AdminPetManagementPage';
import { AdminPetApprovalsPage } from './pages/admin/AdminPetApprovalsPage';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminRescuePage } from './pages/admin/AdminRescuePage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminStatisticsPage } from './pages/admin/AdminStatisticsPage';
import { AdminSystemLogsPage } from './pages/admin/AdminSystemLogsPage';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const { role } = useAuth();
  const [isAdoptionGuideOpen, setIsAdoptionGuideOpen] = useState<boolean>(() => {
    return localStorage.getItem('petcare_hide_adoption_onboarding') !== 'true';
  });

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const navigate = (path: string) => {
    setCurrentPath(path);
  };

  // Route matching helpers
  const isAdminRoute = currentPath.startsWith('/admin');
  
  const userWorkspacePaths = [
    '/dashboard',
    '/my-pets',
    '/my-pets/create',
    '/applications',
    '/my-pet-applications',
    '/appointments',
    '/commitments',
    '/check-ins',
    '/feedback',
    '/my-rescue-posts',
    '/reports',
    '/notifications'
  ];
  const isUserWorkspaceRoute = userWorkspacePaths.some(p => currentPath === p || currentPath.startsWith(`${p}?`));

  // Dynamic route parameter parsing for detail pages
  let petDetailId: string | null = null;
  if (currentPath.startsWith('/pets/') && currentPath !== '/pets') {
    petDetailId = currentPath.replace('/pets/', '');
  }

  let rescueDetailId: string | null = null;
  if (currentPath.startsWith('/rescue/') && currentPath !== '/rescue') {
    rescueDetailId = currentPath.replace('/rescue/', '');
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f7f3ed] dark:bg-[#151419] text-[#2b2523] dark:text-[#ede4db] selection:bg-amber-200 selection:text-amber-950 relative transition-colors duration-200">
      {/* Dynamic Warm Ambient & Watermark Background */}
      <BackgroundPattern />
      
      {/* RENDER VIEW ACCORDING TO ROLE & ROUTE */}
      {isAdminRoute ? (
        /* ADMIN WORKSPACE (Dark Slate / Teal Theme) */
        <div className="min-h-screen flex flex-col">
          <div className="sticky top-0 z-50 w-full shrink-0">
            <DemoRoleBar />
          </div>
          <AdminLayout currentPath={currentPath} navigate={navigate}>
            {currentPath === '/admin' && <AdminDashboardPage navigate={navigate} />}
            {currentPath === '/admin/users' && <AdminUserManagementPage navigate={navigate} />}
            {currentPath === '/admin/pets' && <AdminPetManagementPage navigate={navigate} />}
            {currentPath === '/admin/pet-approvals' && <AdminPetApprovalsPage navigate={navigate} />}
            {currentPath === '/admin/applications' && <AdminApplicationsPage navigate={navigate} />}
            {currentPath === '/admin/rescue' && <AdminRescuePage navigate={navigate} />}
            {currentPath === '/admin/reports' && <AdminReportsPage navigate={navigate} />}
            {currentPath === '/admin/statistics' && <AdminStatisticsPage navigate={navigate} />}
            {currentPath === '/admin/logs' && <AdminSystemLogsPage navigate={navigate} />}
          </AdminLayout>
        </div>
      ) : isUserWorkspaceRoute ? (
        /* USER WORKSPACE (Fixed Header + UserLayout Sidebar + Content + Footer) */
        <div className="flex-1 flex flex-col justify-between">
          <div className="sticky top-0 z-50 w-full shrink-0 shadow-xs bg-[#faf4ee]/95 dark:bg-[#1e1c24]/95 backdrop-blur-md">
            <DemoRoleBar />
            <Header currentPath={currentPath} navigate={navigate} onOpenAdoptionGuide={() => setIsAdoptionGuideOpen(true)} />
          </div>
          
          <main className="flex-1">
            <UserLayout currentPath={currentPath} navigate={navigate}>
              {currentPath === '/dashboard' && <UserDashboardPage navigate={navigate} />}
              {currentPath === '/my-pets' && <MyPetPostsPage navigate={navigate} />}
              {currentPath === '/my-pets/create' && <CreatePetPostPage navigate={navigate} />}
              {currentPath === '/applications' && <MyApplicationsPage navigate={navigate} />}
              {currentPath === '/my-pet-applications' && <ApplicationsForMyPetsPage navigate={navigate} />}
              {currentPath === '/appointments' && <AppointmentsPage navigate={navigate} />}
              {currentPath === '/commitments' && <CommitmentPage navigate={navigate} />}
              {currentPath === '/check-ins' && <PostAdoptionCheckInsPage navigate={navigate} />}
              {currentPath === '/feedback' && <FeedbackPage navigate={navigate} />}
              {currentPath === '/my-rescue-posts' && <MyRescuePostsPage navigate={navigate} />}
              {currentPath.startsWith('/reports') && <ReportSubmissionPage navigate={navigate} />}
              {currentPath === '/notifications' && <NotificationsPage navigate={navigate} />}
            </UserLayout>
          </main>

          <Footer navigate={navigate} />
        </div>
      ) : (
        /* PUBLIC LAYOUT (Fixed Header + Public Content + Footer) */
        <div className="flex-1 flex flex-col justify-between">
          <div className="sticky top-0 z-50 w-full shrink-0 shadow-xs bg-[#faf4ee]/95 dark:bg-[#1e1c24]/95 backdrop-blur-md">
            <DemoRoleBar />
            <Header currentPath={currentPath} navigate={navigate} onOpenAdoptionGuide={() => setIsAdoptionGuideOpen(true)} />
          </div>

          <main className="flex-1">
            {currentPath === '/' && <HomePage navigate={navigate} onOpenAdoptionGuide={() => setIsAdoptionGuideOpen(true)} />}
            {currentPath === '/pets' && <PetListingPage navigate={navigate} />}
            {petDetailId && <PetDetailPage petId={petDetailId} navigate={navigate} />}
            {currentPath === '/rescue' && <RescueListingPage navigate={navigate} />}
            {rescueDetailId && <RescueDetailPage rescueId={rescueDetailId} navigate={navigate} />}
            {currentPath === '/login' && <LoginPage navigate={navigate} />}
            {currentPath === '/register' && <RegisterPage navigate={navigate} />}
          </main>

          <Footer navigate={navigate} />
        </div>
      )}

      {/* Floating 24/7 Live Chat & Online Support Widget */}
      <FloatingChatWidget />

      {/* First-Time Welcome & Requirement-Based Adoption Process Modal */}
      <AdoptionProcessModal
        isOpen={isAdoptionGuideOpen}
        onClose={() => setIsAdoptionGuideOpen(false)}
        onExplorePets={() => {
          setIsAdoptionGuideOpen(false);
          navigate('/pets');
        }}
      />

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <DataProvider>
            <AppContent />
          </DataProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
