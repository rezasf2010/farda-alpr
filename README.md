This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Backend API Integration

The user creation form posts to a configurable endpoint so the backend group can validate their APIs without modifying UI code.

### Quick Setup

1. Duplicate `.env.example` into `.env.local`.
2. Choose one of the two configuration knobs:
   - `NEXT_PUBLIC_API_BASE_URL` — supply the host (e.g. `http://localhost:8080`). The form will call `${BASE_URL}/api/users`.
   - `NEXT_PUBLIC_USERS_ENDPOINT` — supply the full URL (e.g. `http://localhost:8080/custom-users`). This overrides the path completely.
3. Restart the dev server (`npm run dev`) so Next.js picks up the new variables.

### Expected Payload

`services/userService.ts` shapes the request body. A typical POST looks like:

```json
{
  "f_name": "Sara",
  "l_name": "Doe",
  "user_name": "sara.doe",
  "password": "Passw0rd!",
  "permission": {
    "1": true,
    "2": false,
    "3": false,
    "4": true
  }
}
```

If you need to replay this from a backend tool, run the app once and grab the same payload from the browser network tab, or re-use `userService.toPayload` in a test harness.

### Testing the Integration

1. Start your backend on the configured host.
2. From the project root run `npm run dev`.
3. Visit `http://localhost:3000/users/create`, fill the form, and submit.
4. Success and error banners in the UI mirror the HTTP status:
   - A 2xx response clears the form.
   - Any other status surfaces `UsersCreatePage.form.feedback.error`.
5. If something fails, check the terminal/devtools console for the thrown error message (`User create failed with status ...`).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
