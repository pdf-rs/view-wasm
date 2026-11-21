# view-wasm — the pdf-rs viewer in the browser

This is the published build of `pdf_render`'s `web/` crate (`pdf_web.wasm`): a
PDF fetched by HTTP range, rendered to SVG page by page, with no imports in the
module at all — the code that parses a stranger's file cannot reach the network,
the DOM or `eval`.

<https://pdf-rs.github.io/view-wasm/>

## What is here

| file | |
|---|---|
| `index.html` | the front door: sends a bare visit to the sample document |
| `viewer.html` | the viewer, copied verbatim from `pdf_render/web/www/index.html` |
| `doc.js`, `assets.js`, `seal.js` | its scripts |
| `pdf_web.wasm` | the module, name section stripped |
| `standard_fonts.br` | the standard fonts, brotli |
| `logo.pdf` | the sample |

## Rebuilding

```sh
cd pdf_render/web
cargo build --release
cargo run --target x86_64-unknown-linux-gnu -p pdf_web --bin wasm_strip -- \
    "$CARGO_TARGET_DIR/wasm32-unknown-unknown/release/pdf_web.wasm" /tmp/pdf_web.wasm
```

`web/.cargo/config.toml` sets the target to `wasm32-unknown-unknown`, so the
stripper (a host binary) needs the `--target` spelled out. Copy the result and
the four `www/` files here; `index.html` is the only file written by hand.
