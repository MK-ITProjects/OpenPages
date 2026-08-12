import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../entities/user/model/AuthContext.jsx";
import { AuthModalProvider } from "./providers/AuthModalContext.jsx";
import { AuthModal } from "../features/auth-by-email/ui/AuthModal.jsx";

import { AppLayout } from "./providers/AppLayout.jsx";
import { RootRoute } from "./providers/RootRoute.jsx";
import { ProtectedRoute } from "./providers/ProtectedRoute.jsx";
import AdminRoute from "./providers/AdminRoute.jsx";

import { HomePage } from "../pages/home/HomePage.jsx";
import { FeedPage } from "../pages/feed/FeedPage.jsx";
import { SearchPage } from "../pages/search/SearchPage.jsx";
import { BookmarksPage } from "../pages/bookmarks/BookmarksPage.jsx";
import { WritePage } from "../pages/write/WritePage.jsx";
import { PostDetailPage } from "../pages/post-detail/PostDetailPage.jsx";
import { ProfilePage } from "../pages/profile/ProfilePage.jsx";
import { StoriesPage } from "../pages/stories/StoriesPage.jsx";
import { StatsPage } from "../pages/stats/StatsPage.jsx";
import { SettingsPage } from "../pages/settings/SettingsPage.jsx";
import { LoginPage } from "../pages/auth/LoginPage.jsx";
import { RegisterPage } from "../pages/auth/RegisterPage.jsx";

import Membership from "../pages/Membership.jsx";
import About from "../pages/About.jsx";

import AdminDashboard from "../admin/AdminDashboard.jsx";
import ManagePosts from "../admin/ManagePosts.jsx";
import ManageUsers from "../admin/ManageUsers.jsx";
import ManageComments from "../admin/ManageComments.jsx";
import Analytics from "../admin/Analytics.jsx";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthModalProvider>

          <AuthModal />

          <Routes>

            {/* Landing Page */}
            <Route path="/" element={<RootRoute />} />

            {/* Main Layout */}
            <Route element={<AppLayout />}>

              {/* Public Pages */}
              <Route path="/read" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/posts/:slug" element={<PostDetailPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/membership" element={<Membership />} />

              {/* Authentication */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected User Pages */}
              <Route
                path="/feed"
                element={
                  <ProtectedRoute>
                    <FeedPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <BookmarksPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/stories"
                element={
                  <ProtectedRoute>
                    <StoriesPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/stats"
                element={
                  <ProtectedRoute>
                    <StatsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/write"
                element={
                  <ProtectedRoute>
                    <WritePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/write/:slug"
                element={
                  <ProtectedRoute>
                    <WritePage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/posts" element={<ManagePosts />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/comments" element={<ManageComments />} />
              <Route path="/admin/analytics" element={<Analytics />} />

            </Route>

          </Routes>

        </AuthModalProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}