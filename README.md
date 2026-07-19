# Legacy GME Decks — Owlbear Rodeo Extension

A small popover extension for Owlbear Rodeo that lets you draw cards from
both the **Legacy GME** and **Legacy Explorer** decks during a session —
shuffle, draw, and flip cards face up/down, all client-side (nothing is
synced to other players; it's a private GM tool).

## What's in this folder

```
manifest.json     the extension's entry point
index.html        the popover UI
style.css
app.js            deck / shuffle / draw logic
icon.svg          toolbar icon
images/gme/       36 card fronts + 1 back for Legacy GME
images/explorer/  36 card fronts + 1 back for Legacy Explorer
```

Owlbear Rodeo extensions are just a small static website — there's no
server code and nothing to build. You only need to host these files
somewhere reachable over HTTPS, then point Owlbear Rodeo at the
`manifest.json` URL.

## 1. Host the files

Pick whichever is easiest for you — both are free.

### Option A — Netlify Drop (no account, easiest)
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. Netlify gives you a URL like `https://random-name-123.netlify.app`.
   Your manifest will be at
   `https://random-name-123.netlify.app/manifest.json`.

### Option B — GitHub Pages (free, keeps a permanent URL)
1. Create a new GitHub repository (e.g. `legacy-gme-obr`).
2. Upload every file in this folder to the repo (drag-and-drop on
   github.com works, or `git push`), keeping the `images/` folder structure.
3. In the repo, go to **Settings → Pages**, set **Source** to your main
   branch (root), and save.
4. After a minute or two your site is live at
   `https://<your-username>.github.io/legacy-gme-obr/`.
   Your manifest will be at
   `https://<your-username>.github.io/legacy-gme-obr/manifest.json`.

## 2. Install it in Owlbear Rodeo

1. In Owlbear Rodeo, open your profile menu and click **Add Extension**.
2. Paste in the manifest URL from step 1 (the one ending in
   `manifest.json`) and confirm.
3. Open (or create) a room, and in the room's extension list make sure
   **Legacy GME Decks** is enabled.
4. You'll see a new icon in the top-left action bar — click it to open
   the card popover.

## Using it

- Use the two tabs at the top to switch between **Legacy GME** and
  **Legacy Explorer**.
- **Draw Card** deals the next card from that deck's shuffled order.
- Click the card image to flip it face down/up again without drawing a
  new one.
- **Reshuffle** resets that deck back to 36 cards in a new random order.
  The Draw button also turns into a Reshuffle button automatically once
  a deck runs out.
- Each deck's progress is remembered locally (via your browser's
  storage) so it survives closing and reopening the popover.

## Notes / limitations

- This is a personal GM tool — draws are only visible to you, the same
  as any other extension popover; it doesn't broadcast to players.
- If you ever want to update the card art or text, regenerate the PNGs
  in `images/gme` / `images/explorer` (named `card_01.png`…`card_36.png`
  plus `back.png`) and re-upload — no code changes needed.
