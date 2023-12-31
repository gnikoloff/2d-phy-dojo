# 2D-Phy Dojo

2D physics from scratch with WebGL2, JS and C++

[See live](https://gnikoloff.github.io/2d-phy-dojo/)

![export image](https://github.com/gnikoloff/2d-phy-dojo/blob/main/public/preview-2024.png?raw=true)

## Dependencies

- [2d-phy](https://github.com/gnikoloff/2d-phy) - lightweight 2D physics engine written in C++. Constructs and methods are exposed to JS via [embind](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html)
- [hwoa-rang-gl2](https://github.com/gnikoloff/hwoa-rang-gl2) - drawing utilities for WebGL2

## Rendering

This demo instances all shapes aggressively by shape type:

### Boxes

![boxes only](https://github.com/gnikoloff/2d-phy-dojo/blob/main/public/boxes.png?raw=true)

### Circles

![circles only](https://github.com/gnikoloff/2d-phy-dojo/blob/main/public/circles.png?raw=true)

### Triangles

![triangles only](https://github.com/gnikoloff/2d-phy-dojo/blob/main/public/triangles.png?raw=true)

### Outline

![outline only](https://github.com/gnikoloff/2d-phy-dojo/blob/main/public/outline.png?raw=true)

## Running locally

Clone the repo, `npm install` and `npm run dev`

## References and readings

- [Game Physics Engine Programming](https://pikuma.com/courses/game-physics-engine-programming)
- [Game Physics Engine Development](https://www.amazon.de/-/en/Ian-Millington/dp/0123819768)
