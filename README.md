# AEM Angular Test

Sign In + protected Dashboard built with Angular 14,
consuming the AEM test-demo API.

## Features
- Sign in with reactive form validation (required, email format)
- Token stored in localStorage, attached to every API call via HttpInterceptor
- Auto sign-out when the API returns 401 (expired/invalid token)
- Route guards: AuthGuard protects /dashboard, GuestGuard keeps signed-in users off /sign-in
- Dashboard: donut + bar chart (D3) and user table

## Tech Stack
Angular 14, Bootstrap 4.6, D3.js, RxJS

## Prerequisites
- Node.js 16 (see `.nvmrc`; run `nvm use` if you have nvm)
- Angular CLI 14: `npm install -g @angular/cli@14`

## Getting Started
    git clone https://github.com/arifazfar99/aem-angular-test.git
    cd aem-angular-test
    npm install
    ng serve
Then open http://localhost:4200

## Test Credentials
Provided in the assessment brief (`Angular.md`):

Username: `user@aemenersol.com` and
Password: `Test@123`

## Project Structure
    src/app/core        auth service, interceptor, guards, dashboard service + model
    src/app/pages       sign-in, dashboard
    src/app/components  navbar, donut-chart, bar-chart

## Notes
- The API returns `chartBar`, not `chartbar` as written in the brief, so the model is typed from the real response.
- 401 handling is deliberately skipped on the unauthenticated login request, so a wrong password shows an error instead of triggering a logout redirect.
- `@types/node` and `@types/d3-dispatch` are pinned via `overrides`, because newer versions require TypeScript 5 and Angular 14 ships TS 4.7.
