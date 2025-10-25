# 🌾 AgriConnect

A modern agricultural marketplace platform connecting farmers directly with consumers, featuring robust admin management, secure authentication, and real-time product management.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.3.0-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Authentication](#-authentication)
- [User Roles](#-user-roles)
- [Admin Panel](#-admin-panel)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Testing Guide](#-testing-guide)

---

## ✨ Features

### For Farmers 🚜
- **Product Management**: Add, edit, and delete agricultural products
- **Order Tracking**: View and manage incoming orders
- **Revenue Analytics**: Track sales and revenue in real-time
- **Profile Management**: Update contact information and view statistics
- **Verification Status**: Display verification badge

### For Consumers 🛒
- **Product Marketplace**: Browse fresh products from local farmers
- **Shopping Cart**: Add multiple items with quantity management
- **Checkout System**: Complete orders with delivery information
- **Payment Options**: Cash on Delivery (COD) or Online Payment
- **Order History**: Track past purchases

### For Admins 👨‍💼
- **User Management**: View all registered users (farmers, consumers, admins)
- **Verification System**: Verify/unverify users with real-time updates
- **Live Database**: All changes saved to MongoDB immediately
- **Role-based Access**: Secure admin-only endpoints

### General Features ⚡
- **Secure Authentication**: JWT tokens with bcrypt password hashing
- **Dark Theme**: Beautiful, modern UI with consistent dark theme
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Profile Pages**: Personalized dashboards for all user types
- **Support System**: Contact form and FAQs
- **Reviews**: User feedback and rating system

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.4.6 (Pages Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.x with custom utilities
- **UI Components**: Custom React components
- **Animations**: CSS transitions and transforms

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: MongoDB 6.3.0
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3

### Development Tools
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript 5.x
- **Package Manager**: npm

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js (v18 or higher)
MongoDB (v6 or higher)
MongoDB Compass (recommended)
```

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd agriconnect
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env.local` in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/agriconnect
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

> **Note**: Change `JWT_SECRET` to a random secure string in production!

4. **Start MongoDB**

- Open MongoDB Compass
- Connect to `mongodb://localhost:27017`
- Database `agriconnect` will be created automatically

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 🔐 Authentication

### How It Works

1. **Signup**: User creates account (farmer/consumer/admin)
   - Password hashed with bcrypt (10 rounds)
   - User stored in MongoDB
   - JWT token generated (7-day expiry)
   - Auto-redirect to appropriate dashboard

2. **Login**: User authenticates
   - Phone + Password + Role validation
   - Password verified with bcrypt
   - JWT token issued
   - Token stored in localStorage

3. **Protected Routes**: Authentication required
   - Token validated on each request
   - Role-based access control
   - Admin-only endpoints secured

### Security Features

- ✅ **Password Hashing**: Bcrypt with 10 salt rounds
- ✅ **JWT Tokens**: Secure, expiring tokens
- ✅ **Input Validation**: Server-side validation
- ✅ **SQL Injection Prevention**: MongoDB parameterized queries
- ✅ **XSS Protection**: React automatic escaping

---

## 👥 User Roles

### 1. Farmer (Green)

**Access**: `/farmer`

**Capabilities**:
- Add/edit/delete products
- View orders
- Track sales and revenue
- Manage profile
- Await verification

**Test Account**:
```
Phone: 2222222222
Password: farmer123
Role: Farmer
```

### 2. Consumer (Blue)

**Access**: `/consumer`

**Capabilities**:
- Browse marketplace
- Add to cart
- Checkout and place orders
- View order history
- Write reviews

**Test Account**:
```
Phone: 3333333333
Password: consumer123
Role: Consumer
```

### 3. Admin (Purple)

**Access**: `/admin/users`

**Capabilities**:
- View all users
- Verify/unverify farmers and consumers
- Manage user accounts
- Access admin panel
- Auto-verified on signup

**Create Admin Account**:
```
1. Go to /auth/signup
2. Click purple "Admin" button
3. Fill in details
4. Admin is auto-verified
```

---

## 🎛 Admin Panel

### Features

**User Management Dashboard**
- Real-time user list from MongoDB
- Filter by role (Farmer/Consumer/Admin)
- Verification status display
- One-click verify/unverify

**User Table Columns**:
- Name
- Phone Number
- Role (color-coded badges)
- Verification Status (✓ Verified / ⏳ Pending)
- Actions (Verify/Unverify buttons)

### How to Use

1. **Login as Admin**
```
Phone: <your-admin-phone>
Password: <your-password>
Role: Admin
```

2. **View Users**
- Redirected to `/admin/users`
- See all registered users
- Check verification status

3. **Verify Users**
- Find pending user
- Click "Verify" button
- Status updates immediately
- Saved to MongoDB

4. **User Sees Changes**
- User logs in
- Badge changes to "✓ Verified" (green)
- Persists across sessions

---

## 📁 Project Structure

```
agriconnect/
├── src/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── login.tsx          # Login page
│   │   │   └── signup.tsx         # Signup page
│   │   ├── farmer/
│   │   │   └── index.tsx          # Farmer dashboard
│   │   ├── consumer/
│   │   │   └── index.tsx          # Consumer marketplace
│   │   ├── admin/
│   │   │   └── users.tsx          # Admin user management
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login.ts       # Login API
│   │   │   │   ├── signup.ts      # Signup API
│   │   │   │   └── verify-user.ts # User verification API
│   │   │   └── admin/
│   │   │       └── users.ts       # Get all users API
│   │   ├── profile.tsx            # User profile page
│   │   ├── checkout.tsx           # Checkout page
│   │   ├── support.tsx            # Support/contact page
│   │   ├── reviews.tsx            # Reviews page
│   │   ├── guidance.tsx           # Guidance/help page
│   │   └── index.tsx              # Landing page
│   ├── components/
│   │   ├── Navbar.tsx             # Navigation bar
│   │   └── RoleToggle.tsx         # Role selection component
│   ├── lib/
│   │   ├── mongodb.ts             # MongoDB connection
│   │   └── auth.ts                # Auth utilities
│   ├── models/
│   │   └── User.ts                # User TypeScript interfaces
│   └── styles/
│       └── globals.css            # Global styles
├── public/                        # Static assets
├── .env.local                     # Environment variables (create this)
├── .gitignore
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
**Description**: Register a new user

**Request Body**:
```json
{
  "name": "John Doe",
  "phone": "1234567890",
  "password": "secure123",
  "role": "farmer" | "consumer" | "admin"
}
```

**Response** (201):
```json
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "phone": "1234567890",
    "role": "farmer",
    "verified": false
  },
  "token": "jwt-token..."
}
```

**Errors**:
- 400: Invalid input / Phone must be 10 digits
- 409: User already exists

---

#### POST `/api/auth/login`
**Description**: Authenticate user

**Request Body**:
```json
{
  "phone": "1234567890",
  "password": "secure123",
  "role": "farmer" | "consumer" | "admin"
}
```

**Response** (200):
```json
{
  "message": "Login successful",
  "user": { ... },
  "token": "jwt-token..."
}
```

**Errors**:
- 401: Invalid credentials or role
- 400: Missing fields

---

### Admin Endpoints

#### GET `/api/admin/users`
**Description**: Get all users (Admin only)

**Headers**:
```
Authorization: Bearer <jwt-token>
```

**Response** (200):
```json
{
  "users": [
    {
      "id": "...",
      "name": "John Doe",
      "phone": "1234567890",
      "role": "farmer",
      "verified": false,
      "createdAt": "2024-10-24T..."
    }
  ]
}
```

**Errors**:
- 401: Unauthorized
- 403: Admin access required

---

#### POST `/api/auth/verify-user`
**Description**: Verify/unverify a user (Admin only)

**Headers**:
```
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "userId": "mongodb-object-id",
  "verified": true | false
}
```

**Response** (200):
```json
{
  "message": "User verified successfully"
}
```

**Errors**:
- 401: Unauthorized
- 403: Admin access required
- 404: User not found

---

## 🧪 Testing Guide

### Quick Start Testing

**1. Create Test Accounts**

```bash
# Farmer
Phone: 2222222222
Password: farmer123

# Consumer
Phone: 3333333333
Password: consumer123

# Admin
Phone: 1111111111
Password: admin123
```

**2. Test Farmer Flow**
```
1. Signup as farmer
2. Add 3 products
3. Edit a product
4. Delete a product
5. Check "⏳ Pending" verification badge
```

**3. Test Consumer Flow**
```
1. Signup as consumer
2. Browse marketplace
3. Add 5 items to cart
4. Go to checkout
5. Fill delivery details
6. Place order
7. See success screen
```

**4. Test Admin Flow**
```
1. Signup/login as admin
2. See all users in table
3. Verify the farmer
4. Verify the consumer
5. Check status changes immediately
```

**5. Verify Changes**
```
1. Logout from admin
2. Login as farmer again
3. See "✓ Verified" badge (green)
4. Badge persists in profile
```

### Feature Checklist

- [ ] User signup (all 3 roles)
- [ ] User login with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Farmer can add products
- [ ] Farmer can edit products
- [ ] Farmer can delete products
- [ ] Consumer can add to cart
- [ ] Consumer can checkout
- [ ] Order success page displays
- [ ] Admin can see all users
- [ ] Admin can verify users
- [ ] Verification badge updates
- [ ] Profile page shows correct info
- [ ] Support page works
- [ ] Reviews can be added
- [ ] Dark theme consistent
- [ ] Mobile responsive

---

## 💾 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  phone: "1234567890",        // Unique, 10 digits
  password: "$2a$10$...",     // Bcrypt hashed
  role: "farmer",             // farmer | consumer | admin
  createdAt: ISODate("..."),
  verified: false,            // true for admin, false for others
  verifiedAt: ISODate("...") // null if not verified
}
```

**Indexes**:
- `phone`: Unique index for fast lookup
- `role`: Index for filtering

---

## 🎨 UI/UX Features

### Design System

**Colors**:
- Background: Dark slate gradient (#0f172a to #1e293b)
- Cards: Slate 800 with 50% opacity + backdrop blur
- Primary: Green (#22c55e) for farmers
- Secondary: Blue (#3b82f6) for consumers  
- Admin: Purple (#9333ea) for admins
- Text: White/light gray for readability

**Typography**:
- Headings: Poppins font family
- Body: System default
- Sizes: Responsive (mobile-first)

**Animations**:
- Smooth transitions (300ms)
- Hover scale effects
- Loading states
- Button interactions

**Components**:
- Consistent dark theme across all pages
- Glassmorphism effects (backdrop blur)
- Glowing shadows
- Responsive grid layouts

---

## 🚢 Deployment

### Environment Variables

Ensure these are set in production:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agriconnect
JWT_SECRET=<extremely-secure-random-string>
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

**Important**: Update MongoDB connection string to use MongoDB Atlas for production.

---

## 🔒 Security Best Practices

- ✅ Never commit `.env.local` to git
- ✅ Use strong JWT secrets (min 32 characters)
- ✅ Keep dependencies updated
- ✅ Validate all inputs server-side
- ✅ Use HTTPS in production
- ✅ Implement rate limiting for APIs
- ✅ Regular security audits
- ✅ MongoDB connection string encryption

---

## 🐛 Common Issues

### "Cannot connect to MongoDB"
**Solution**: 
- Ensure MongoDB is running
- Check connection string in `.env.local`
- Verify MongoDB Compass shows green connection

### "Invalid role" error on signup
**Solution**:
- Make sure backend accepts admin role
- Check `src/pages/api/auth/signup.ts` line 27

### Admin panel shows no users
**Solution**:
- Verify you're logged in as admin
- Check JWT token is valid
- Create some test accounts first

### Products don't persist after refresh
**Solution**:
- Currently using state management (demo)
- For production, create product APIs and database

---

## 📄 License

This project is for educational purposes.

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📞 Support

For issues and questions:
- Email: support@agriconnect.com
- Visit: `/support` page in the app

---

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the robust database
- TailwindCSS for beautiful styling
- All contributors and testers

---

**Built with ❤️ for connecting farmers and consumers**
