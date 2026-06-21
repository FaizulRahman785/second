# ⚡ Quick Start Guide - Coaching Platform

## 🎯 Get Started in 60 Seconds

### Step 1: Open the App
The app is now running! You should see a login screen.

### Step 2: Choose Your Role

Click one of the quick demo login buttons:

```
┌─────────────────────────────────────┐
│  📚 Login as Student               │  → Student Portal
├─────────────────────────────────────┤
│  👨‍🏫 Login as Teacher               │  → Teacher Portal
├─────────────────────────────────────┤
│  ⚙️  Login as Admin                 │  → Admin Panel
└─────────────────────────────────────┘
```

Or manually enter:
- Email: `student@demo.com` (or `teacher@demo.com` or `admin@demo.com`)
- Password: `demo123`

### Step 3: Explore Your Dashboard

You'll be automatically redirected to the correct dashboard based on your role!

---

## 📱 What to Test

### As a **Student** (Orange/Pink Theme)

1. **Dashboard** - See your daily tasks
   - Upcoming classes
   - Pending tests
   - Recent materials

2. **Study Materials** - Fully functional!
   - Search for materials
   - Filter by subject
   - Browse by file type (PDF/Video/Image)
   - View material details
   - Download files (UI ready)

3. **Navigation**
   - My Courses
   - Live Classes
   - Tests
   - Results
   - Assignments
   - Ask Doubt
   - Fees

### As a **Teacher** (Green/Teal Theme)

1. **Dashboard** - Your teaching overview
   - Your batches
   - Today's classes
   - Pending doubts to answer
   - Recent tests

2. **Quick Actions**
   - Upload Material button
   - Create Test button

3. **Navigation**
   - My Batches
   - Materials
   - Live Classes
   - Tests
   - Assignments
   - Doubts
   - Analytics

### As an **Admin** (Blue/Purple Theme)

1. **Dashboard** - System overview
   - 8 key metrics
   - Recent activities
   - Upcoming classes
   - System stats

2. **Student Management** - Fully functional!
   - View all students
   - Search by name/email/phone
   - Filter by course, status, fee
   - See student details
   - Action menu (View/Edit/Block/Delete)

3. **Navigation**
   - Dashboard
   - Students ✅ (Complete)
   - Teachers
   - Courses
   - Batches
   - Materials
   - Tests
   - Fees
   - Settings

---

## 🎨 Visual Guide

### Color Coding

| Role | Primary Color | When You See It |
|------|---------------|-----------------|
| **Student** | 🟠 Orange → Pink | Student portal sidebar, buttons |
| **Teacher** | 🟢 Green → Teal | Teacher portal sidebar, buttons |
| **Admin** | 🔵 Blue → Purple | Admin panel sidebar, buttons |

### Layout Structure

All three portals share the same structure:

```
┌──────────────────────────────────────────┐
│  Sidebar (Role Color)   │   Top Bar      │
│  • Dashboard            │   🔔 👤 Logout  │
│  • Page 1               │                │
│  • Page 2               │   Main Content │
│  • Page 3               │                │
│  • ...                  │                │
└──────────────────────────────────────────┘
```

On mobile, sidebar collapses to a hamburger menu ☰

---

## 🔐 Authentication Flow

### Login
1. Enter email and password
2. Click "Sign In"
3. System detects role
4. Auto-redirect to correct portal

### Logout
1. Click your avatar (top right)
2. Select "Logout"
3. Redirected back to login

### Security
- ✅ Wrong role can't access other portals
- ✅ Automatic session check
- ✅ Protected routes
- ✅ Logout clears session

---

## 📊 Data You'll See

### Currently Using Mock Data

All data shown is **demo/mock data** for demonstration:
- Student lists
- Course information
- Test results
- Materials
- Classes
- Analytics

**This will be replaced with real data once the backend is connected (Phase 2).**

---

## 🧪 Test Scenarios

### Scenario 1: Student Learning Flow
1. Login as student
2. View dashboard - see today's tasks
3. Navigate to "Study Materials"
4. Search for "Calculus"
5. Filter by "Mathematics"
6. Click "View" or "Download" on any material

### Scenario 2: Admin Management
1. Login as admin
2. View dashboard - see system stats
3. Navigate to "Students"
4. Search for a student name
5. Filter by course or status
6. Click action menu (⋮) on any student

### Scenario 3: Teacher Overview
1. Login as teacher
2. View dashboard - see workload
3. Check today's classes
4. Review pending doubts
5. Navigate through sidebar

### Scenario 4: Role Protection
1. Login as student
2. Try to access `/admin` in URL
3. ❌ Automatically redirected back to `/student`
4. Same for teacher trying `/student` routes

---

## 🎯 Key Features to Explore

### ✅ Fully Functional Pages

1. **Login Page** - All roles
2. **Admin Dashboard** - Stats and overview
3. **Admin Students Page** - Complete CRUD interface
4. **Teacher Dashboard** - Workload overview
5. **Student Dashboard** - Daily tasks
6. **Student Materials** - Full search/filter/view

### ⏳ Coming Soon Pages

All other navigation items show "Coming Soon" placeholders, which will be implemented in Phase 2.

---

## 📱 Mobile Testing

### How to Test on Mobile

1. **Desktop Browser**
   - Resize window to mobile width
   - Or open DevTools (F12) → Toggle device toolbar

2. **Actual Mobile Device**
   - Access via local network IP
   - Or deploy to Vercel for testing

3. **PWA Installation**
   - Desktop: Click install icon in address bar
   - Mobile: "Add to Home Screen" from browser menu
   - App opens in full screen!

---

## 🎨 Design System

### Buttons
- **Primary**: Gradient background (role color)
- **Secondary**: Outline style
- **Ghost**: Transparent

### Cards
- White background
- Subtle shadow
- Rounded corners
- Hover effects

### Tables
- Sortable headers
- Striped rows
- Hover highlights
- Action menus

### Forms
- Label + Input pairs
- Validation ready
- Error states
- Loading states

---

## 🔍 Search & Filter Examples

### In Student Management (Admin)

**Search**: Type in search box
- "Rahul" → Shows Rahul Sharma
- "9876" → Shows students with that phone number
- "example.com" → Shows students with that email domain

**Filter by Course**:
- Select "JEE 2025" → Shows only JEE students

**Filter by Status**:
- Select "Active" → Shows only active students
- Select "Blocked" → Shows blocked accounts

**Combine**: Search + Multiple filters work together!

### In Study Materials (Student)

**Search**: Type in search box
- "Calculus" → Shows calculus materials
- "Chapter 5" → Shows Chapter 5 content

**Filter by Subject**:
- "Mathematics" → Only math materials
- "Physics" → Only physics materials

**Filter by Type** (Tabs):
- All Files → Everything
- PDFs → Only PDF documents
- Videos → Only video files
- Images → Only image files

---

## 🚀 Performance Tips

### Fast Navigation
- Use sidebar links (no page reload)
- All routes are client-side

### Responsive Layout
- Sidebar auto-collapses on mobile
- Tables scroll horizontally if needed
- Cards stack on small screens

### Loading States
- Spinners during actions
- Skeleton screens for data loading (ready for backend)

---

## 💡 Pro Tips

1. **Try Different Roles**
   - Each has completely different UI
   - Different navigation
   - Different features

2. **Check Mobile**
   - Sidebar becomes hamburger menu
   - Touch-friendly buttons
   - Optimized layouts

3. **Test Filters**
   - Combine search + filters
   - See instant results
   - Clear filters easily

4. **Explore Dashboards**
   - Each shows role-relevant data
   - Quick action buttons
   - Real-time stats (will be live in Phase 2)

5. **Install as PWA**
   - Works like native app
   - Launches in full screen
   - Faster than browser

---

## 🐛 Troubleshooting

### Can't Login?
- Use demo credentials: `student@demo.com` / `demo123`
- Or click quick login buttons
- Clear browser cache if stuck

### Wrong Dashboard?
- Check email contains correct role (`admin`, `teacher`, or `student`)
- Logout and login again

### Sidebar Not Showing?
- On mobile: Click hamburger menu (☰)
- On desktop: Should auto-show

### Page Says "Coming Soon"?
- Feature planned for Phase 2
- See PROJECT_README.md for roadmap

---

## 🎓 What This Demonstrates

This is **NOT a template or tutorial project**.

This is a **production-foundation** showing:
- ✅ Multi-tenant architecture
- ✅ Role-based access control
- ✅ Enterprise-level structure
- ✅ Professional UI/UX
- ✅ Type-safe codebase
- ✅ Responsive design
- ✅ PWA capabilities

Phase 1 = **Foundation Complete**
Phase 2 = Backend integration (next)

---

## 📚 Learn More

- **Full Documentation**: See `PROJECT_README.md`
- **Implementation Status**: See `IMPLEMENTATION_STATUS.md`
- **Code Structure**: Explore `/src/app` folder

---

## 🎯 Quick Reference

| Role | Email | Dashboard URL | Color |
|------|-------|---------------|-------|
| Student | `student@demo.com` | `/student` | 🟠 Orange |
| Teacher | `teacher@demo.com` | `/teacher` | 🟢 Green |
| Admin | `admin@demo.com` | `/admin` | 🔵 Blue |

**Password for all**: `demo123`

---

**Ready to explore? Click a demo login button and dive in!** 🚀

---

*For questions or issues, see the main documentation files.*
