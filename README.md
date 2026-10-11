# Paper Tree CBT Website

This is a standalone static website project containing the supplied Paper Tree CBT homepage HTML, preserved as-is to keep its original design and content intact. It is completely separate from Infinity Classes.

## Local preview

You can preview it with any static file server. For example:

```bash
npx serve public
```

Then open the local URL shown in the terminal.

## Deploy to Vercel

1. Extract this folder.
2. Create a new, separate GitHub repository named `paper-tree-website` and push these files to it.
3. Import that repository in Vercel.
4. Framework preset: **Other**. Build command: leave empty. Output directory: `public`.
5. Deploy. Once deployed, open the Vercel project’s **Settings → Domains** to connect your custom domain and follow the DNS records Vercel provides.

## Important note

The source HTML is an exported bundled document and has been preserved to match the provided reference. Before public launch, test it on the Vercel preview URL, especially the demo form and all links. The demo form in the supplied source is currently visual-only unless connected to a submission destination.
