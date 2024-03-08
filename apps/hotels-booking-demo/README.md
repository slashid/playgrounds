# /id Hotels booking demo

A webapp that demonstrates the core features and the value that our customers get from `/id`.

Uses [Remix](https://remix.run/docs).

## Design

- [app](https://www.figma.com/file/rYNybodp32LNzyHsWyzDy5/SlashID-Playground-%E2%80%93-Design-by-Significa?node-id=0%3A1&t=qrzo9EBcHt33shyC-1)
- [components](https://www.figma.com/file/wVemMJNy0We2NwpkePhQEE/Slash-ID-%E2%80%93-App-Components?node-id=0%3A1&t=pOPEnjKFPcEZIn2E-1)
- [tokens](https://www.figma.com/file/Fxd0lokBdzc60hTOp7pcOb/Slash-ID-%E2%80%93-App-Tokens?node-id=0%3A1&t=gsQIkNeriE9pEy1a-1)

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
cd ../../
pnpm vercel build
pnpm vercel deploy --prebuilt
```

You have to be logged in to Vercel CLI and also have linked the project.

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Known issues

### Remix server code pruning, Vercel and images

Remix will remove any code contained in a file with `.server` suffix from the client bundle. This has different results when running the build command locally VS in Vercel's pipeline. When running the build on Vercel, image files do not get copied over when imported from modules with `.server` suffix.

Reference:

- [Remix docs](https://remix.run/docs/en/1.15.0/guides/constraints#server-code-pruning) explaining the concept behind `{name}.server.{ts|tsx}`

## Development

Follow the top level [README](../../README.md) instructions.

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.
