# ToonEval Human Alignment Study

Static GitHub Pages interface for the **ToonEval** human alignment study:
96 Ground-Truth vs Generated talking-avatar pairs (63 art styles), blinded 5-dimension rating.

## Local preview

```bash
python3 -m http.server 4173
# open http://127.0.0.1:4173/
```

## Protocol

- Pair order is deterministically randomized per anonymous session.
- For each pair: rate overall quality 1-5, then label S/D/C/T/M with Yes / No / Unobservable.
- Progress is auto-saved in browser localStorage; export the result JSON at the end.
- Generating methods and automatic scores are concealed; media file names are randomized ids.

## Data layout

- `data/trials.json` — trial manifest (video paths, no scores inside)
- `media/` — GT and generated mp4 files (renamed flat)

Built from the ToonEval benchmark (1,198 clips / 63 styles / 19 methods).
