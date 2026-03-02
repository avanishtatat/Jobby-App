# Jobby App

A production-style React application for authenticated job discovery with multi-dimensional filtering, protected navigation, and resilient API-state handling.

## Project Summary

Jobby App enables users to log in, discover relevant jobs, and inspect detailed job information in a clean and responsive UI. The project demonstrates practical frontend engineering patterns commonly evaluated in interviews: route protection, token-based auth, filter composition, async state management, and failure recovery.

## Key Features

- JWT-based authentication flow (login, session persistence, logout)
- Protected routes for secure pages
- Jobs listing with composed filters:
  - Type of Employment (multi-select)
  - Salary Range (single-select)
  - Location (multi-select): Hyderabad, Bangalore, Chennai, Delhi, Mumbai
  - Keyword Search
- Filter composition behavior:
  - Location filtering works together with Type of Employment and Salary Range
  - Existing filters remain applied while toggling additional filters
- Sticky UI enhancements:
  - Sticky header across application routes using the shared Header component
  - Sticky jobs sidebar for persistent access to filters while browsing
- API state coverage:
  - Loading, success, empty, and failure views
  - Retry handling for profile and jobs requests
- Job details page with skills, life-at-company section, and similar jobs

## Interview-Focused Highlights

- **Component architecture:** Clear separation of concerns (`Header`, `Jobs`, `Profile`, `JobCard`, `JobItemDetails`, `SimilarJobs`, `ProtectedRoute`)
- **State modeling:** Dedicated state slices for API status, filters, and result sets
- **Filter logic:** Controlled inputs + composed query/filter pipeline for predictable UX
- **UX resilience:** Explicit rendering for async lifecycle states and API failures
- **Routing discipline:** Guarded routes and user flow enforcement via redirects

## Tech Stack

- React (Class Components)
- React Router DOM
- JavaScript (ES6+)
- CSS3
- js-cookie
- react-icons
- react-loader-spinner

## API Endpoints

- `POST https://apis.ccbp.in/login`
- `GET https://apis.ccbp.in/profile`
- `GET https://apis.ccbp.in/jobs`
- `GET https://apis.ccbp.in/jobs/:id`

## Authentication (Demo Credentials)

- Username: `rahul` | Password: `rahul@2021`
- Username: `raja` | Password: `raja@2021`

## Local Setup

1. Clone the repository:
   - `git clone https://github.com/avanishtatat/Jobby-App.git`
2. Move into project directory:
   - `cd Jobby-App`
3. Install dependencies:
   - `pnpm install`
4. Start development server:
   - `pnpm start`

If your environment uses npm instead of pnpm, use `npm install` and `npm start`.

## Available Scripts

- `pnpm start` – Runs app in development mode
- `pnpm test` – Runs test suite
- `pnpm run build` – Builds production bundle

## Folder Structure (High Level)

```text
src/
  components/
    Header/
    Home/
    Jobs/
    JobCard/
    JobItemDetails/
    SimilarJobs/
    Profile/
    LoginForm/
    ProtectedRoute/
    NotFound/
  App.js
  index.js
```

## What This Project Demonstrates

- Building authenticated single-page applications
- Managing multiple concurrent filters without breaking existing state
- Designing robust UI for unreliable network conditions
- Implementing maintainable component-level architecture suitable for scaling

## Future Improvements

- Migrate to functional components with hooks
- Add unit/integration tests for filter composition and route guards
- Add debounced search for reduced API calls
- Add pagination/infinite scroll for larger datasets
