# AllServ – Service Provider Front-End Overview

## Overview
AllServ is a web application connecting users with trusted service professionals. This README focuses on the front-end design of the Service Provider section, detailing the pages, key UI components, and interactions that ensure a smooth experience for service providers.

## Front-End Features (Service Provider)
- **User Authentication:** Secure login and registration with multi-step verification.
- **Dashboard & Analytics:** Visual display of service requests, completed jobs, and earnings.
- **Service Request Management:** Clear listing of new, accepted, and canceled booking requests.
- **Service History:** Detailed log of completed services along with customer feedback.
- **Service Management:** Easy CRUD operations for adding, editing, and removing offered services.
- **Earnings & Transactions:** Visualization of earnings with transaction history and withdrawal options.
- **Profile & Settings:** User-friendly forms for profile updates, account settings, and notification preferences.
- **Support & Help:** Integrated support form and live chat for real-time assistance.

## Detailed Page Descriptions

### 1. Service Provider Login & Registration Page
- **Purpose:**  
  - Enable service providers to securely log in or sign up.
- **Components:**
  - **Login Form:** Fields for Email/Phone and Password, plus a "Forgot Password?" link.
  - **Registration Form:** Multi-step process including:
    - **Step 1:** Basic information (Name, Email, Phone, Address, Service Category).
    - **Step 2:** Upload verification documents (Government ID, Service License).
    - **Step 3:** Set password and OTP/email verification.
- **Workflow:**
  - Data is validated at each step.
  - Successful registration sets a pending status until admin approval.

### 2. Service Provider Dashboard
- **Purpose:**  
  - Provide an overview of activity, quick access to key metrics, and navigation to other sections.
- **Components:**
  - **Sidebar Navigation:** Links to Dashboard, Service Requests, Service History, Earnings, and Profile & Settings.
  - **Main Dashboard Area:**  
    - Personalized welcome banner.
    - Quick summary cards (e.g., New Requests, Accepted Bookings, Completed Services).
    - Data visualization (charts/graphs) for monthly earnings and performance.
- **Workflow:**
  - Dynamic data fetch (via AJAX/Django templates) and interactive elements for real-time updates.

### 3. Service Requests Page
- **Purpose:**  
  - Manage incoming booking requests efficiently.
- **Components:**
  - **New Booking Requests:**  
    - Cards displaying customer details, service type, address, and time slot.
    - Action buttons to "Accept" or "Reject" a request.
  - **Accepted & Ongoing Bookings:**  
    - List of confirmed requests with a “Mark as Completed” option.
  - **Canceled Requests:**  
    - Historical view of canceled bookings with reasons.
- **Workflow:**
  - Actions update the status, moving requests between sections and reflecting changes in real time.

### 4. Service History Page
- **Purpose:**  
  - Provide a detailed log of completed services and display customer reviews.
- **Components:**
  - **Service History List:**  
    - Accordion-style entries for each service showing details like service name, customer, date, and status.
    - Download Invoice and Rate/Review options.
- **Workflow:**
  - Expandable entries offer additional details and feedback on completed services.

### 5. Manage Services Page
- **Purpose:**  
  - Allow providers to add, edit, or remove the services they offer.
- **Components:**
  - **Current Services List:**  
    - Cards or table rows with service name, description, pricing, and availability.
    - "Edit" and "Remove" actions for each service.
  - **Add New Service:**  
    - Modal form with fields for service name, description, price, availability, and image upload.
- **Workflow:**
  - Changes are validated and saved, with instant UI updates reflecting the provider’s offerings.

### 6. Earnings & Transactions Page
- **Purpose:**  
  - Offer a clear view of earnings, transaction history, and provide withdrawal options.
- **Components:**
  - **Earnings Summary:**  
    - Graphs or charts illustrating monthly and total earnings.
  - **Transaction History:**  
    - List view detailing each transaction (date, amount, service linked).
  - **Withdraw Option:**  
    - Button to trigger a withdrawal form for bank or UPI details.
- **Workflow:**
  - Data is fetched dynamically to keep the provider informed of their financial status.

### 7. Profile & Settings Page
- **Purpose:**  
  - Allow service providers to update personal details, account settings, and notification preferences.
- **Components:**
  - **Profile Information:**  
    - Display profile photo, name, contact details, and service category.
    - “Edit Profile” functionality.
  - **Account Settings:**  
    - Sections for changing password, updating address, and bank details.
  - **Notification Preferences:**  
    - Toggle settings for email, SMS, and push notifications.
- **Workflow:**
  - Changes are applied immediately with inline confirmation messages.

### 8. Support & Help Page
- **Purpose:**  
  - Provide a support channel for troubleshooting and queries.
- **Components:**
  - **Support Form:**  
    - Fields for Issue Category, Subject, and detailed message.
  - **Live Chat:**  
    - Integrated chat window (modal) for real-time communication with support staff.
- **Workflow:**
  - Submitted issues create support tickets, and live chat offers immediate assistance.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, Bootstrap

