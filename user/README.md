# AllServ - User Interface

A modern service marketplace platform that connects users with service providers.

## Project Structure

```
allserv/user/
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── services/
│   │   └── icons/
├── css/
│   ├── styles.css
│   ├── auth.css
│   └── dashboard.css
├── js/
│   ├── main.js
│   ├── auth.js
│   └── dashboard.js
├── pages/
│   ├── auth/
│   │   ├── login.html
│   │   └── register.html
│   ├── dashboard/
│   │   └── user.html
│   ├── services/
│   │   ├── list.html
│   │   ├── details.html
│   │   └── booking.html
│   ├── history/
│   │   └── bookings.html
│   └── profile/
│       └── settings.html
└── index.html
```

## Pages Overview

1. **Landing Page** (`index.html`)
   - Hero section with search
   - Popular services
   - How it works
   - Testimonials
   - Footer

2. **Authentication**
   - Login (`pages/auth/login.html`)
   - Registration (`pages/auth/register.html`)

3. **Dashboard** (`pages/dashboard/user.html`)
   - Overview statistics
   - Upcoming bookings
   - Recent services
   - Quick actions

4. **Services**
   - Service Listing (`pages/services/list.html`)
     - Search and filters
     - Category-wise services
     - Service cards
   - Service Details (`pages/services/details.html`)
     - Service information
     - Provider details
     - Reviews and ratings
   - Service Booking (`pages/services/booking.html`)
     - Date and time selection
     - Service customization
     - Payment integration

5. **History** (`pages/history/bookings.html`)
   - Past bookings
   - Ongoing services
   - Cancelled bookings
   - Review submission

6. **Profile Settings** (`pages/profile/settings.html`)
   - Personal information
   - Preferences
   - Payment methods
   - Notifications

## Design Guidelines

### Colors
- Primary Blue: `#024CAA`
- Orange Accent: `#EC8305`
- Light Grey: `#DBD3D3`
- Success: `#28a745`
- Warning: `#ffc107`
- Danger: `#dc3545`

### Typography
- Font Family: 'Inter', sans-serif
- Headings: 
  - H1: 2.5rem
  - H2: 2rem
  - H3: 1.75rem
  - H4: 1.5rem
- Body: 1rem
- Small: 0.875rem

### Components
- Cards with rounded corners (8px)
- Consistent padding (1rem, 1.5rem, 2rem)
- Interactive hover states
- Smooth transitions (0.3s)
- Shadow effects for depth

## Development Guidelines

### CSS
- Use BEM naming convention
- Mobile-first approach
- CSS variables for consistency
- Flexbox/Grid for layouts
- Maintain responsive breakpoints

### JavaScript
- ES6+ features
- Event delegation
- Form validation
- Async/await for API calls
- Error handling

### Best Practices
- Semantic HTML
- Accessibility standards
- Cross-browser compatibility
- Performance optimization
- Clean code structure

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Navigate through different pages
4. Test responsiveness

## Upcoming Features

- [ ] Real-time chat with service providers
- [ ] Advanced search filters
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Service provider dashboard
- [ ] Mobile app integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.