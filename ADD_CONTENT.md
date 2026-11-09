# Kaise add karein — Photos, Videos, Quotes, Funny

Sab kuch ek hi file se control hota hai: `src/config/birthday.ts`

## 1) Photos

1. Photo copy karo folder mein: `public/photos/`
2. Config mein add / edit:

```ts
{
  id: 'p7',
  src: '/photos/diwali.jpg',  // file name yahan
  caption: 'Festival wali smile',
  tag: 'Festive',
}
```

## 2) Videos

1. Video rakho: `public/videos/` (mp4 ya webm best)
2. Config:

```ts
{
  id: 'v4',
  src: '/videos/laugh.mp4',
  poster: '/photos/thumb.jpg', // optional
  title: 'The laugh clip',
  caption: 'Yeh wali hansi legendary hai',
}
```

## 3) Quotes

Sirf text — koi file nahi:

```ts
{
  id: 'q7',
  text: 'Tumhara birthday = mere calendar ka highlight',
  by: 'Nikhil',
  vibe: 'soft', // soft | loud | chaos
}
```

## 4) Funny / inside jokes

```ts
{
  id: 'f7',
  title: 'Exhibit B',
  punchline: '“Bas 5 minute” — still loading…',
  image: '/photos/funny1.jpg', // optional
  video: '/videos/roast.mp4',  // optional
}
```

## Tips

- Jitni chaaho entries add karo — sections automatically badhengi
- Naam / nickname / letter / vault code bhi isi file mein hai
- Memory polaroids ke liye `memories[].image` use karo (alag section)
