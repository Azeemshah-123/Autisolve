# Autisolve Companion — Prototype

A React prototype of a parent-support app for children with autism / developmental
differences: 3-in-1 login (email + password + biometric), onboarding with a
therapist-report upload and a short Q&A (including a gender preference field), and a
4-tab main app (Chat, Activities, Community, Progress).

## Run it

```
npm install
npm start
```

Then open http://localhost:3000

## Features

- **Login** — email, password, and biometric verification combined on one screen.
- **Onboarding** — therapist report upload, child name/age/gender, focus areas, notes.
- **Companion Chat** — calls the real Anthropic API (model `claude-sonnet-4-6`)
  directly from the browser, grounded in the child's profile. Supports real web search
  (toggle), real image upload + understanding, and real voice input/output via the
  browser's Web Speech APIs.
- **Activities** — daily activity tracker, including a real working "Speaking Practice"
  mini-activity (text-to-speech + speech recognition for words like Mom/Dad/Water).
- **Community** — specialist directory + parent/doctor story feed.
- **Progress** — weekly activity chart, generated report, and an AQ-10-inspired
  screening checklist (informal and clearly non-diagnostic).

## Notes

- **Companion Chat's API call** works out-of-the-box inside Claude.ai's own artifact
  preview (which injects the auth for you). Running this standalone, point that fetch
  call at your own backend/proxy holding an Anthropic API key — never ship an API key
  in client-side code.
- **Voice input/output** and **microphone permission prompts** need a real browser tab
  — they're often blocked inside sandboxed embedded previews.
- The screening checklist is informal and non-diagnostic — not the official clinical
  AQ-10 instrument, and not a replacement for a professional evaluation.
- There is no backend/database — all state (profile, chat history, activities,
  community posts) lives in React state and resets on refresh.

## What to extend next

1. Real authentication (Firebase/Auth0) + WebAuthn for biometrics.
2. Persist the onboarding profile and chat history to a backend.
3. A small backend proxy for the Anthropic API call, so the key isn't exposed
   client-side.
4. Real therapist-report parsing instead of just storing the filename.
5. Real doctor verification + geolocation for the Community tab.
