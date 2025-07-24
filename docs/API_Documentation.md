# Google Cloud Translation API (v2) — Developer Notes

| Item            | Detail                                                                             |
| --------------- | ---------------------------------------------------------------------------------- |
| **Provider**    | **Google LLC** — Cloud Translation Service                                         |
| **Endpoint**    | `POST https://translation.googleapis.com/language/translate/v2`                    |
| **Auth**        | API key via `key` query param                                                      |
| **Pricing**     | First 500 000 characters free each billing account; ¢20 per additional 1 000 chars |
| **Rate Limits** | 10 QPS by default (can request quota raise)                                        |

---

## Typical Request

```http
GET /language/translate/v2
     ?key=YOUR_KEY
     &q=Good%20morning
     &source=en
     &target=yo
```

> Tip – Omit `source` to let Google auto-detect; response includes `detectedSourceLanguage`.

---

## Response Shape

```jsonc
{
  "data": {
    "translations": [
      {
        "translatedText": "E kaaro",
        "detectedSourceLanguage": "en" // only if 'source' omitted
      }
    ]
  }
}
```

### Common Errors

| **Code** | **Meaning**                                   | **Fix**                                  |
| -------- | --------------------------------------------- | ---------------------------------------- |
| `400`    | Malformed params (e.g. invalid `source code`) | Use ISO-639-1 (`en`, `yo`, …)            |
| `403`    | Invalid API key or not enabled                | Enable API + restrict to Translation API |
| `429`    | Quota exceeded                                | Wait for quota reset or request increase |

---

## Supported-Languages Endpoint

`GET /language/translate/v2/languages?key=YOUR_KEY&target=en`
Returns array of:

```json
{ "language": "yo", "name": "Yoruba" }
```

Used to build `src/constants/googleLanguages.js`.

---

## Best Practices Applied

- `Key restricted` to HTTP referrers (localhost + Vercel domain).

- Error feedback surfaced via toast notifications.

- Character counts will enable future usage telemetry.
