# Translation workflow compatibility

The read-only compatibility lane verifies that translation source triggers, monthly
schedule, manual force input, provider command, secret references, bot-loop guard
and translated-file commit behavior remain unchanged. It exercises official action
runtimes with Node 22 and pnpm 10, without reading credentials or calling DeepL.
The baseline contains workflow configuration, not provider content or credentials.

Intentional future translation-contract changes require review and a baseline update
in the same PR. Passing compatibility does not prove translation, provider quota,
external publication or editorial acceptance.
