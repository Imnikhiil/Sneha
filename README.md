# Birthday Surprise Website

Premium starlit birthday site — sister & friend edition.

## Run

```bash
npm install
npm run dev
```

## Content kaise add karein

Full guide: [ADD_CONTENT.md](ADD_CONTENT.md)

Short version — edit `src/config/birthday.ts`:

| Type | Folder | Config key |
|------|--------|------------|
| Photos | `public/photos/` | `photos[]` |
| Videos | `public/videos/` | `videos[]` |
| Quotes | (text only) | `quotes[]` |
| Funny | optional media | `funny[]` |

Example photo:

```ts
{ id: 'p7', src: '/photos/diwali.jpg', caption: 'Festival smile', tag: 'Festive' }
```

## Journey

Seal → Hero → Countdown → Timeline → **Photos** → **Videos** → **Quotes** → **Funny** → Memories → Reasons → Quiz → Vault → Stars → Candle → Gift → Letter
