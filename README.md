
---

# Spotify Clone

A clone of the popular music streaming service Spotify, built using Next.js, TypeScript, Tailwind CSS, Supabase, and Stripe.

## Overview

This project aims to replicate the core functionalities of Spotify, allowing users to browse, search for, and listen to music. It utilizes modern web technologies and services to provide a seamless user experience.

## Features

- User authentication with Supabase
- Music playback and streaming
- Search functionality to find songs, artists, and albums
- Integration with Stripe for premium subscriptions
- Responsive design with Tailwind CSS

## Technologies Used

- [Next.js](https://nextjs.org/): React framework for server-rendered React applications.
- [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds static types.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for building custom designs.
- [Supabase](https://supabase.io/): An open-source alternative to Firebase, providing backend services and a PostgreSQL database.
- [Stripe](https://stripe.com/): Payment processing platform for online businesses.

## Getting Started

1. Clone the repository:

```
git clone <repository_url>
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the following environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<your_stripe_public_key>
   ```

4. Start the development server:

```
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

To deploy the application, follow the deployment instructions for your chosen hosting platform. Ensure you set up environment variables for production as well.


## License

This project is licensed under the [MIT License](LICENSE).

---