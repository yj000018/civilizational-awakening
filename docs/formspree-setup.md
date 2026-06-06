# Formspree — Contact Form Setup

## Form details

| Field | Value |
|---|---|
| Account | yannick.jolliet@gmail.com |
| Form name | Civilizational Awakening — Connect |
| Form ID | `mbdedwpw` |
| Endpoint | `https://formspree.io/f/mbdedwpw` |
| Dashboard | https://formspree.io/forms |

## Environment variable

The form ID is injected via:

```
VITE_FORMSPREE_ID=mbdedwpw
```

Set in Manus project secrets (`.project-config.json` → `secrets` block, gitignored).

## How it works

`client/src/pages/Connect.tsx` reads `import.meta.env.VITE_FORMSPREE_ID` at build time.
If the variable is absent, the form renders an ⚠ unconfigured warning instead of the submit button.

## Fields submitted

- `name` — full name
- `email` — reply-to address
- `domain` — area of inquiry (dropdown)
- `intention` — purpose of contact (dropdown)
- `message` — free text

## Notifications

Formspree sends email notifications to `yannick.jolliet@gmail.com` on every submission.
Configure notification preferences at https://formspree.io/forms/mbdedwpw/settings.
