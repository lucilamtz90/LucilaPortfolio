---
name: add-case-asset
description: Wire a real media asset (GIF/video/image) from Lucila into a case study — optimizes it, connects it in both locales, verifies, and deploys. Use when Lucila shares a file path or asset for a specific case (e.g. "for the X case, use this file").
---

# Add a case asset

Lucila will give you a local file path (usually somewhere in `~/Downloads`) and tell you which case it's for, and sometimes which slot (`heroMedia` for the home-grid card, or a specific section's `image` inside `sections[]`, e.g. a `processStep` or `heroImage`). If she doesn't say the slot, assume `heroMedia`.

## Steps

1. **Inspect the source file.**
   ```
   file "<path>"
   ffprobe -v error -show_entries stream=width,height,r_frame_rate,duration,nb_frames -of default=noprint_wrappers=1 "<path>"
   ```

2. **Convert if it's a GIF (or any oversized video).** GIFs are always converted to MP4 — never left as `.gif`, they're 5-10x larger for no visual benefit. Target: H.264, no audio, `crf 26`, `preset slow`, `+faststart`, `yuv420p`.
   - If width or height is odd, `yuv420p` will fail to encode — add `-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2"`.
   - If the source resolution is much larger than it will ever render at (grid cards are ~316-340px wide), downscale — `-vf "scale=480:-2"` is the going default (matches the other case assets already in the repo, keeps things visually consistent too).
   ```
   ffmpeg -y -i "<source>" -vf "scale=480:-2" -c:v libx264 -profile:v main -pix_fmt yuv420p \
     -crf 26 -preset slow -movflags +faststart -an "<slug>-cover.mp4"
   ```
   - If the source is already a reasonably small static image (jpg/png/webp), it can be used as-is — just copy it in, no conversion needed.
   - Animated WebP was tried as an alternative and isn't available (`ffmpeg` on this machine has no `libwebp` encoder) — MP4 is the standing choice, and it's more broadly compatible anyway.

3. **Move the converted file into the project**, named `<slug>-cover.<ext>` (or a more specific name if it's for a section, not the card), under `src/assets/images/`.

4. **Wire it into the data.** Both `src/data/cases.en.ts` and `src/data/cases.es.ts` need the same change (they're separate per-locale files, not shared):
   - Add an `import <name>Cover from '../assets/images/<slug>-cover.mp4';` at the top.
   - Replace the relevant field (`heroMedia:` or a section's `image:`) with the new import, for the matching case entry (find it by `slug:`).

5. **Crop position — check this every time, don't skip it.** `Media` (`src/components/Media/Media.tsx`) does `object-fit: cover`, which crops symmetrically (centered) by default. The grid card frame is much shorter/wider than a typical tall phone-mockup recording, so a centered crop almost always cuts off the top of the device (notch/status bar) and the bottom in equal measure — every asset wired so far (`etsy-insider-rewards`, `rappi-card`) has needed `heroMediaPosition: 'top'` for exactly this reason. **Default assumption: if the source is a phone/device mockup taller than it is wide, set `heroMediaPosition: 'top'` up front** rather than waiting to be told — then confirm it in the verification screenshot (step 7) and adjust to `'bottom'` or unset (centered) only if `'top'` visibly looks wrong for that particular asset. Set it on that case's entry in **both** locale files — it flows through automatically (`Home.tsx` → `ProjectCard` → `Media`'s `objectPosition` prop).

6. **Video vs image is automatic** — `Media` detects `.mp4`/`.webm`/`.mov` by extension and renders a looping, muted, autoplaying `<video>` instead of an `<img>`; nothing else to configure.

7. **Verify before shipping:**
   ```
   npm run build && npm run lint
   ```
   Then serve the build (`npm run preview -- --port 5183`) and screenshot the relevant page with Playwright (Chrome channel) to confirm the asset actually renders/plays and looks right — don't just trust the build succeeding. Kill the preview server after.

8. **Commit and deploy**, same as any other change in this project: `git add`, commit with a message describing what asset went where and why (e.g. why it was resized/repositioned), `git push`, then watch the GitHub Actions run with `gh run watch <id> --exit-status` until it succeeds. Report the live URL back to Lucila: `https://lucilamtz90.github.io/LucilaPortfolio/`.

## Reference: assets already wired this way
- `dynamic-units` case → `dynamic-units-cover.mp4` (converted from GIF, 2.9MB → 454KB)
- `etsy-insider-rewards` case → `etsy-insider-rewards-cover.mp4` (converted from GIF, 8.09MB → 874KB, scaled to 480px wide, `heroMediaPosition: 'top'`)
- `rappi-card` case → `rappi-card-cover.mp4` (source `.mov`, background cropped out via `cropdetect` — see below — 4.4MB → 420KB, `heroMediaPosition: 'top'`)

## If the source has background around a device mockup to remove
"Remove the background" from a screen recording means crop out the empty space around a phone/device mockup — not real background removal/rotoscoping. Use ffmpeg's `cropdetect` to find the mockup's exact bounding box against the surrounding (usually solid-color) backdrop, then bake that crop into the same encode as step 2:
```
ffmpeg -i "<source>" -vf "cropdetect=limit=24:round=2:reset=1" -f null - 2>&1 | grep -o "crop=[0-9:]*" | sort | uniq -c | sort -rn
```
Take whichever `crop=W:H:X:Y` value the overwhelming majority of sampled frames agree on, then add `-vf "crop=W:H:X:Y"` (combine with a `scale` filter in the same `-vf` chain, comma-separated, if downscaling too) to the encode command.
