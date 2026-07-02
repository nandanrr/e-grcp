# Enterprise Governance, Risk, Compliance & Procurement (e-GRCP)

A modern enterprise-grade Governance, Risk, Compliance and Procurement (e-GRCP) platform built using **React**, **Redux Toolkit**, **React Router**, and **Material UI**. The application demonstrates role-based access control, enterprise workflows, dashboard analytics, procurement lifecycle management, compliance tracking, audit management, reporting, and notification services.

---

## Live Demo

**Live Application**
https://e-grcp-eta.vercel.app/

**GitHub Repository**
https://github.com/nandanrr/e-grcp

---

# Business Problem

Large organizations manage Procurement, Vendors, Risk, Compliance, Audit, Approvals, Reports, and Notifications using multiple disconnected systems.

This project centralizes all these business functions into a single enterprise dashboard with role-based access, enabling different users to perform their responsibilities efficiently while maintaining governance and compliance standards.

---

# Product Vision

Build a scalable enterprise web application that enables:

- Secure role-based access
- Procurement request management
- Vendor management
- Risk monitoring
- Compliance tracking
- Audit management
- Approval workflow
- Notification center
- Enterprise reporting
- Dashboard analytics

---

# Features

## Authentication

- Login
- Forgot Password
- Reset Password
- Session Expiry Handling
- Protected Routes

---

## Role Based Access Control (RBAC)

Supported Roles:

- Administrator
- Employee
- Manager
- Procurement Officer
- Vendor Manager
- Risk Manager
- Compliance Officer
- Auditor

Each role has dedicated:

- Dashboard
- Sidebar Navigation
- Permissions
- Functional Modules

---

## Dashboard

- Dynamic KPIs
- Role-specific statistics
- Recent activities timeline
- Charts & Analytics
- Notifications summary

---

## Procurement Module

- Create Procurement Request
- Procurement Listing
- Search Requests
- Filter Requests
- Sort Requests
- Approval Status
- Export CSV
- Export Excel

---

## Vendor Management

- Vendor Directory
- Vendor Profiles
- Vendor Status
- Vendor Information

---

## Risk Management

- Risk Dashboard
- Risk Matrix
- Department Risk Analysis
- Risk Trends

---

## Compliance Module

- Compliance Dashboard
- Compliance Monitoring
- Violations
- Missing Documents
- Compliance Statistics

---

## Audit Module

- Audit Center
- Audit History
- Activity Logs
- Report Generation

---

## Approval Workflow

- Pending Requests
- Approved Requests
- Rejected Requests
- Approval Tracking

---

## Reports

- Report Center
- Report Generation
- Export Reports
- Saved Reports

---

## Notifications

- Real-Time Notifications
- Priority Alerts
- Read / Unread Tracking
- Notification Statistics

---

## Settings

- Dark / Light Theme
- User Preferences

---

# Technology Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Redux Toolkit
- React Redux
- Material UI (MUI)

---

## Charts

- Recharts

---

## State Management

- Redux Toolkit
- Redux Slices

---

## Styling

- Material UI
- CSS3

---

## Testing

- Jest
- React Testing Library

---

## Deployment

- Vercel

---

# Project Structure

```
src
│
├── components
│   ├── cards
│   ├── charts
│   ├── common
│   └── layouts
│
├── features
│   ├── approval
│   ├── audit
│   ├── auth
│   ├── compliance
│   ├── dashboard
│   ├── notification
│   ├── procurement
│   ├── reports
│   ├── risk
│   ├── settings
│   ├── users
│   └── vendors
│
├── services
├── store
├── hooks
├── mocks
├── routes
├── utils
└── tests
```

---

# Architecture Overview

```
User
   │
   ▼
React UI
   │
   ▼
React Router
   │
   ▼
Protected Routes
   │
   ▼
Redux Store
   │
   ▼
Feature Slice
   │
   ▼
Service Layer
   │
   ▼
Mock Data / API
```

---

# Redux Architecture

```
Redux Store
│
├── authSlice
├── dashboardSlice
├── procurementSlice
├── vendorSlice
├── riskSlice
├── complianceSlice
├── auditSlice
├── reportSlice
├── notificationSlice
└── uiSlice
```

---

# Routing Flow

```
Login
   │
   ▼
Authentication
   │
   ▼
Protected Routes
   │
   ▼
Role Dashboard
   │
   ├── Procurement
   ├── Vendors
   ├── Risk
   ├── Compliance
   ├── Audit
   ├── Reports
   ├── Notifications
   └── Settings
```

---

# Testing Strategy

The project includes unit testing for:

- Components
- Redux Slices
- Services
- Hooks
- Authentication
- Routing
- Layout Components

Testing Frameworks:

- Jest
- React Testing Library

---

# Performance Optimizations

- Lazy Routing
- Redux State Separation
- Component Reusability
- Modular Folder Structure
- Material UI Optimization
- Local Mock API Simulation
- Reusable Layout Components

---

# Installation

Clone the repository

```bash
git clone https://github.com/nandanrr/e-grcp.git
```

Navigate to project

```bash
cd e-grcp
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Run tests

```bash
npm test
```

Create production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# Future Enhancements

- Backend Integration
- JWT Authentication
- REST API Integration
- Database Connectivity
- Real-Time Notifications
- Email Integration
- File Uploads
- Audit Trail Enhancements
- Dashboard Analytics
- Mobile Responsive Improvements

---

# Learning Outcomes

This project demonstrates practical implementation of:

- Enterprise React Architecture
- Redux Toolkit
- React Router
- Role Based Access Control
- State Management
- Component Reusability
- Material UI
- Mock API Integration
- Unit Testing
- Deployment using Vercel

---

# Developer

**Nandan R**

Information Science Engineering

Enterprise React Application developed as part of the **Incture React Competency Assessment Project**.

---

# License

This project is developed for educational and training purposes.
