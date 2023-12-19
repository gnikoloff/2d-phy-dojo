import GLBench from "gl-bench/dist/gl-bench";

const Phy2DModule = await import("./lib/2d-phy/Phy2D");
const { Vec2, Body, World, vector$Vec2$ } = await Phy2DModule.default();

import {
	OrthographicCamera,
	createProgram,
	createCircle,
	createLineCircle,
	createPlane,
	createLinePlane,
	createTriangle,
} from "./lib/hwoa-rang-gl2";

import vertexShaderSrc from "./uberShader.vert";
import fragmentShaderSrc from "./uberShader.frag";

const BOX_SHAPE = 0;
const CIRCLE_SHAPE = 1;
const TRIANGLE_SHAPE = 2;
const OUT_OF_SCREEN_VEC2 = new Vec2(-1000, -1000);
const SIM_WIDTH = Math.min(innerWidth, 1920);
const INTRO_DELAY = 300;
const TOTAL_AREA = innerWidth * innerHeight;
const MOBILE_AREA = 500_000;
const IS_SMALL_SCREEN = TOTAL_AREA < MOBILE_AREA;

const widthDelta = innerWidth - SIM_WIDTH;
const tempVector = new Vec2(-1000, -1000);

let oldTime = 0;

//////////////////////////////////////////////////////////////////////////
// Set up GL
//////////////////////////////////////////////////////////////////////////

const c = document.getElementById("c") as HTMLCanvasElement;
resize();
const gl = c.getContext("webgl2");

const bench = new GLBench(gl);

const orthoCamera = new OrthographicCamera(
	0,
	innerWidth,
	0,
	innerHeight,
	0.1,
	10,
);
orthoCamera.position[2] = 1;
orthoCamera.updateProjectionViewMatrix();

const shapeProgram = createProgram(gl, vertexShaderSrc, fragmentShaderSrc, {});
const lineProgram = createProgram(gl, vertexShaderSrc, fragmentShaderSrc, {
	LINES: true,
});

const instanceTransformAttrib = gl.getAttribLocation(
	shapeProgram,
	"aInstanceTransform",
);
const positionAttrib = gl.getAttribLocation(shapeProgram, "aPosition");
const uvAttrib = gl.getAttribLocation(shapeProgram, "aUV");
const instanceColorAttrib = gl.getAttribLocation(shapeProgram, "aColor");
let uProjectionMatrixUniform = gl.getUniformLocation(
	shapeProgram,
	"uProjectionViewMatrix",
);
gl.useProgram(shapeProgram);
gl.uniformMatrix4fv(
	uProjectionMatrixUniform,
	false,
	orthoCamera.projectionViewMatrix,
);
uProjectionMatrixUniform = gl.getUniformLocation(
	lineProgram,
	"uProjectionViewMatrix",
);
gl.useProgram(lineProgram);
gl.uniformMatrix4fv(
	uProjectionMatrixUniform,
	false,
	orthoCamera.projectionViewMatrix,
);

//////////////////////////////////////////////////////////////////////////
// Set up text positions
//////////////////////////////////////////////////////////////////////////
const wordPositions = [];
const cc = document.createElement("canvas");
cc.width = SIM_WIDTH;
cc.height = innerHeight;
cc.style.setProperty("position", "fixed");
cc.style.setProperty("top", `${-innerHeight * 0.1}px`);
cc.style.setProperty("left", `${widthDelta * 0.5}px`);
cc.style.setProperty("z-index", "999");
// cc.style.setProperty("border", "1px solid blue");
cc.classList.add("fadeable");
// cc.style.setProperty("display", "none");
document.body.appendChild(cc);
const ctx = cc.getContext("2d");
const relFontSize = 1;
ctx.font = `bold ${relFontSize}px Helvetica`;
const word = "2024";
const fontSize =
	relFontSize * ((cc.width * 0.77) / ctx.measureText(word).width);
// const fontSize = relFontSize * ((cc.width * 1) / ctx.measureText(word).width);
ctx.font = `bold ${fontSize}px Helvetica`;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "white";
ctx.save();
ctx.translate(cc.width * 0.5, cc.height * 0.5);
ctx.scale(1, 1);
ctx.fillStyle = "black";
ctx.fillText(word, 0, 0);
ctx.restore();
const idata = new Uint32Array(
	ctx.getImageData(0, 0, cc.width, cc.height).data.buffer,
);
// ctx.clearRect(0, 0, cc.width, cc.height);
const gridX = 10;
const gridY = 10;
ctx.globalAlpha = 0.2;
for (let x = 0; x < cc.width; x += gridX) {
	for (let y = 0; y < cc.height; y += gridY) {
		if (idata[y * cc.width + x]) {
			wordPositions.push({ x: x + widthDelta * 0.5, y });
		}
	}
}

//////////////////////////////////////////////////////////////////////////
// Set up physics world
//////////////////////////////////////////////////////////////////////////
const boxAnimatedBodies = [];
const circleAnimatedBodies = [];
const triangleAnimatedBodies = [];
const world = new World(-4.5, innerWidth, innerHeight);
world.gravity = -1;
const floor = new Body(innerWidth, 1, innerWidth * 0.5, innerHeight, 0);
floor.restitution = 1;
const leftWall = new Body(1, innerHeight * 2, 0, innerHeight * 0.5, 0);
const rightWall = new Body(
	1,
	innerHeight * 2,
	innerWidth - 1,
	innerHeight * 0.5,
	0,
);
world.AddBody(floor);
world.AddBody(leftWall);
world.AddBody(rightWall);

const mouseCircle = new Body(60, -1000, -100, 0);
mouseCircle.restitution = 0.3;
world.AddBody(mouseCircle);

//////////////////////////////////////////////////////////////////////////
// Instances set up
//////////////////////////////////////////////////////////////////////////
let offsetY = 0;
let stepYIdx = 0;
const coverHeight = innerHeight;
while (offsetY < coverHeight) {
	let biggestRowScale = 0;
	let offsetX = 0;
	const maxScaleAllowed = Math.cos((offsetY / coverHeight) * Math.PI * 2);
	while (offsetX < SIM_WIDTH) {
		// on mobile it is 16 -> 10 and 30 -> 20
		const a = IS_SMALL_SCREEN ? 11 : 21;
		const b = IS_SMALL_SCREEN ? 25 : 36;
		let halfScaleAllowed = (maxScaleAllowed * a + b) * 0.5;
		// if (offsetY > coverHeight * 0.16 && offsetY < coverHeight * 0.85) {
		// 	halfScaleAllowed = (maxScaleAllowed * 12 + 25) * 0.5;
		// }
		let scale = halfScaleAllowed + Math.random() * halfScaleAllowed;

		const circleX = scale * 0.5 + offsetX + widthDelta * 0.5;
		const circleY = offsetY;

		let body;

		let shapeType = Math.random() < 0.9 ? CIRCLE_SHAPE : TRIANGLE_SHAPE;
		if (offsetY > coverHeight * 0.3 && offsetY < coverHeight * 0.7) {
			shapeType = Math.floor(Math.random() * 2);
		}
		const adjustedOffsetY = offsetY - innerHeight * 0.1;
		if (shapeType === CIRCLE_SHAPE) {
			body = new Body(scale * 1.015, circleX, adjustedOffsetY, 1);
			body.scale = scale;
			circleAnimatedBodies.push(body);
		} else if (shapeType === BOX_SHAPE) {
			body = new Body(
				scale * 2 * 1.015,
				scale * 2 * 1.015,
				circleX,
				adjustedOffsetY,
				2,
			);
			body.scale = scale * 2;
			boxAnimatedBodies.push(body);
		} else if (shapeType === TRIANGLE_SHAPE) {
			const vertices = new vector$Vec2$();

			vertices.push_back(new Vec2(-0.5 * scale * 2, 0.5 * scale * 2));
			vertices.push_back(new Vec2(0 * scale * 2, -0.5 * scale * 2));
			vertices.push_back(new Vec2(0.5 * scale * 2, 0.5 * scale * 2));

			body = new Body(vertices, circleX, adjustedOffsetY, 10, 0, 0);
			body.scale = scale * 2;
			triangleAnimatedBodies.push(body);
		}

		if (scale > biggestRowScale) {
			biggestRowScale = scale;
		}

		body.restitution = 0.1;
		body.color = 1;
		world.AddBody(body);

		for (let n = 0; n < wordPositions.length; n++) {
			const { x, y } = wordPositions[n];
			const dx = x - circleX;
			const dy = y - circleY * 1;
			const dist = Math.sqrt(dx * dx + dy * dy);
			const minDist = 10;
			if (dist < minDist) {
				body.color = 0;
			}
		}
		offsetX += scale * 2;
	}
	offsetY += biggestRowScale * 1.4;
	stepYIdx++;
}

const boxTransforms = new Float32Array(boxAnimatedBodies.length * 4);
const boxColors = new Float32Array(boxAnimatedBodies.length * 3);
const circleTransforms = new Float32Array(circleAnimatedBodies.length * 4);
const circleColors = new Float32Array(circleAnimatedBodies.length * 3);
const triangleTransforms = new Float32Array(triangleAnimatedBodies.length * 4);
const triangleColors = new Float32Array(triangleAnimatedBodies.length * 3);

for (let i = 0; i < boxAnimatedBodies.length; i++) {
	const body = boxAnimatedBodies[i];
	boxTransforms[i * 4 + 0] = body.position.x;
	boxTransforms[i * 4 + 1] = body.position.y;
	boxTransforms[i * 4 + 2] = 0;
	boxTransforms[i * 4 + 3] = body.scale;

	boxColors[i * 3 + 0] = 0;
	boxColors[i * 3 + 1] = body.color;
	boxColors[i * 3 + 2] = 0;
}

for (let i = 0; i < circleAnimatedBodies.length; i++) {
	const circle = circleAnimatedBodies[i];
	circleTransforms[i * 4 + 0] = circle.position.x;
	circleTransforms[i * 4 + 1] = circle.position.y;
	circleTransforms[i * 4 + 2] = 0;
	circleTransforms[i * 4 + 3] = circle.scale;

	circleColors[i * 3 + 0] = 0;
	circleColors[i * 3 + 1] = circle.color;
	circleColors[i * 3 + 2] = 0;
}

for (let i = 0; i < triangleAnimatedBodies.length; i++) {
	const triangle = triangleAnimatedBodies[i];
	triangleTransforms[i * 4 + 0] = triangle.position.x;
	triangleTransforms[i * 4 + 1] = triangle.position.y;
	triangleTransforms[i * 4 + 2] = 0;
	triangleTransforms[i * 4 + 3] = triangle.scale;

	triangleColors[i * 3 + 0] = 0;
	triangleColors[i * 3 + 1] = triangle.color;
	triangleColors[i * 3 + 2] = 0;
}

//////////////////////////////////////////////////////////////////////////
// Boxes set up
//////////////////////////////////////////////////////////////////////////
const boxGeometry = createPlane();
const boxLineGeometry = createLinePlane();

const boxInstancedBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, boxInstancedBuffer);
gl.bufferData(gl.ARRAY_BUFFER, boxTransforms, gl.DYNAMIC_DRAW);

const boxInstanceColorsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, boxInstanceColorsBuffer);
gl.bufferData(gl.ARRAY_BUFFER, boxColors, gl.STATIC_DRAW);

const boxVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, boxGeometry.interleavedArray, gl.STATIC_DRAW);

const boxLineVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, boxLineVertexBuffer);
gl.bufferData(
	gl.ARRAY_BUFFER,
	boxLineGeometry.interleavedArray,
	gl.STATIC_DRAW,
);

const boxIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBuffer);
gl.bufferData(
	gl.ELEMENT_ARRAY_BUFFER,
	boxGeometry.indicesArray,
	gl.STATIC_DRAW,
);

//////////////////////////////////////////////////////////////////////////
// Circles set up
//////////////////////////////////////////////////////////////////////////
const circleGeometry = createCircle();
const circleLineGeometry = createLineCircle();

const circleInstanceTransformsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, circleInstanceTransformsBuffer);
gl.bufferData(gl.ARRAY_BUFFER, circleTransforms, gl.DYNAMIC_DRAW);

const circleInstanceColorsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, circleInstanceColorsBuffer);
gl.bufferData(gl.ARRAY_BUFFER, circleColors, gl.STATIC_DRAW);

const circleVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, circleGeometry.interleavedArray, gl.STATIC_DRAW);

const circleLineVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, circleLineVertexBuffer);
gl.bufferData(
	gl.ARRAY_BUFFER,
	circleLineGeometry.interleavedArray,
	gl.STATIC_DRAW,
);

const circleIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, circleIndexBuffer);
gl.bufferData(
	gl.ELEMENT_ARRAY_BUFFER,
	circleGeometry.indicesArray,
	gl.STATIC_DRAW,
);

//////////////////////////////////////////////////////////////////////////
// Triangles set up
//////////////////////////////////////////////////////////////////////////
const triangleGeometry = createTriangle(-0.5, 0.5, 0, -0.5, 0.5, 0.5);

const triangleInstanceTransformsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleInstanceTransformsBuffer);
gl.bufferData(gl.ARRAY_BUFFER, triangleTransforms, gl.DYNAMIC_DRAW);

const triangleInstanceColorsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleInstanceColorsBuffer);
gl.bufferData(gl.ARRAY_BUFFER, triangleColors, gl.STATIC_DRAW);

const triangleVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
gl.bufferData(
	gl.ARRAY_BUFFER,
	triangleGeometry.interleavedArray,
	gl.STATIC_DRAW,
);

//////////////////////////////////////////////////////////////////////////
// Init
//////////////////////////////////////////////////////////////////////////
const orientationMdq = matchMedia("(orientation: portrait)");
const startedPortrait = orientationMdq.matches;
orientationMdq.addEventListener("change", () => {
	if (startedPortrait && !orientationMdq.matches) {
		location.reload();
	}
});
setTimeout(() => {
	cc.classList.add("faded");
	requestAnimationFrame(drawFrame);
	cc.addEventListener("transitionend", () => {
		// cc.parentNode.removeChild(cc);
	});
}, INTRO_DELAY);
document.body.addEventListener("mousedown", onMouseDown);
document.body.addEventListener("mouseup", onMouseUp);
document.body.addEventListener("touchmove", onTouchMove);
document.body.addEventListener("touchend", onTouchEnd);

function onMouseDown() {
	document.body.addEventListener("mousemove", onMouseMove);
}

function onMouseMove(e) {
	const x = adjustScreenPointerX(e.pageX);
	const y = adjustScreenPointerY(e.pageY);

	tempVector.x = x;
	tempVector.y = y;
	mouseCircle.position = tempVector;
}

function onMouseUp() {
	document.body.removeEventListener("mousemove", onMouseMove);
	mouseCircle.position = OUT_OF_SCREEN_VEC2;
}

function onTouchMove(e) {
	const x = adjustScreenPointerX(e.pageX);
	const y = adjustScreenPointerY(e.pageY);
	tempVector.x = x;
	tempVector.y = y;
	mouseCircle.position = tempVector;
	e.preventDefault();
}

function onTouchEnd() {
	mouseCircle.position = OUT_OF_SCREEN_VEC2;
}

function drawFrame(now) {
	const dt = Math.min((now - oldTime) * 0.001, 0.01667);
	oldTime = now;

	bench.begin("Simulation");

	// step through the physics sim
	world.Update(dt);

	// sync instances buffer with rigid bodies
	for (let i = 0; i < circleAnimatedBodies.length; i++) {
		const circleBody = circleAnimatedBodies[i];
		circleTransforms[i * 4 + 0] = circleBody.position.x;
		circleTransforms[i * 4 + 1] = circleBody.position.y;
		circleTransforms[i * 4 + 2] = circleBody.rotation;
	}

	for (let i = 0; i < boxAnimatedBodies.length; i++) {
		const boxBody = boxAnimatedBodies[i];
		boxTransforms[i * 4 + 0] = boxBody.position.x;
		boxTransforms[i * 4 + 1] = boxBody.position.y;
		boxTransforms[i * 4 + 2] = boxBody.rotation;
	}

	for (let i = 0; i < triangleAnimatedBodies.length; i++) {
		const triangle = triangleAnimatedBodies[i];
		triangleTransforms[i * 4 + 0] = triangle.position.x;
		triangleTransforms[i * 4 + 1] = triangle.position.y;
		triangleTransforms[i * 4 + 2] = triangle.rotation;
	}

	// global GL state
	gl.viewport(0, 0, c.width, c.height);
	gl.clearColor(0.6, 0.6, 0.6, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.enableVertexAttribArray(instanceTransformAttrib);
	gl.enableVertexAttribArray(instanceColorAttrib);
	gl.enableVertexAttribArray(positionAttrib);
	gl.enableVertexAttribArray(uvAttrib);

	drawScene();

	bench.end("Simulation");
	bench.nextFrame(now);
	requestAnimationFrame(drawFrame);
}

function drawScene() {
	gl.useProgram(shapeProgram);

	// box instances transform buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, boxInstancedBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, boxTransforms, gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(instanceTransformAttrib, 4, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(instanceTransformAttrib, 1);

	// box instances color buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, boxInstanceColorsBuffer);
	gl.vertexAttribPointer(instanceColorAttrib, 3, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(instanceColorAttrib, 1);

	// box interleaved buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBuffer);
	// box position
	gl.vertexAttribPointer(
		positionAttrib,
		3,
		gl.FLOAT,
		false,
		boxGeometry.vertexStride * Float32Array.BYTES_PER_ELEMENT,
		0,
	);
	// box uvs
	gl.vertexAttribPointer(
		uvAttrib,
		2,
		gl.FLOAT,
		false,
		boxGeometry.vertexStride * Float32Array.BYTES_PER_ELEMENT,
		3 * Float32Array.BYTES_PER_ELEMENT,
	);
	// box index buffer
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBuffer);

	// draw boxes
	gl.drawElementsInstanced(
		gl.TRIANGLES,
		boxGeometry.vertexCount,
		gl.UNSIGNED_SHORT,
		0,
		boxAnimatedBodies.length,
	);

	gl.useProgram(lineProgram);

	gl.bindBuffer(gl.ARRAY_BUFFER, boxLineVertexBuffer);
	gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);
	gl.drawArraysInstanced(
		gl.LINE_LOOP,
		0,
		boxLineGeometry.vertexCount,
		boxAnimatedBodies.length,
	);

	gl.useProgram(shapeProgram);

	// circle instance transforms buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, circleInstanceTransformsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, circleTransforms, gl.DYNAMIC_DRAW);

	gl.vertexAttribPointer(instanceTransformAttrib, 4, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(instanceTransformAttrib, 1);

	// circle instance colors buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, circleInstanceColorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, circleColors, gl.STATIC_DRAW);

	gl.vertexAttribPointer(instanceColorAttrib, 3, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(instanceColorAttrib, 1);

	// circles interleaved buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexBuffer);
	// circles position

	gl.vertexAttribPointer(
		positionAttrib,
		3,
		gl.FLOAT,
		false,
		circleGeometry.vertexStride * Float32Array.BYTES_PER_ELEMENT,
		0,
	);
	// circles uvs

	gl.vertexAttribPointer(
		uvAttrib,
		2,
		gl.FLOAT,
		false,
		circleGeometry.vertexStride * Float32Array.BYTES_PER_ELEMENT,
		3 * Float32Array.BYTES_PER_ELEMENT,
	);

	// circles index buffer
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, circleIndexBuffer);

	// draw filled circle
	gl.drawElementsInstanced(
		gl.TRIANGLES,
		circleGeometry.vertexCount,
		gl.UNSIGNED_SHORT,
		0,
		circleAnimatedBodies.length,
	);

	gl.useProgram(lineProgram);

	// draw outline circle
	gl.bindBuffer(gl.ARRAY_BUFFER, circleLineVertexBuffer);
	gl.drawArraysInstanced(
		gl.LINE_LOOP,
		1,
		circleLineGeometry.vertexCount,
		circleAnimatedBodies.length,
	);

	// draw triangles
	gl.useProgram(shapeProgram);

	// triangle instance transforms buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleInstanceTransformsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, triangleTransforms, gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(instanceTransformAttrib, 4, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(instanceTransformAttrib, 1);

	// triangle instance colors buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleInstanceColorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, triangleColors, gl.STATIC_DRAW);
	gl.vertexAttribPointer(instanceColorAttrib, 3, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(instanceColorAttrib, 1);

	// triangle interleaved buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);

	// triangle position
	gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);

	gl.drawArraysInstanced(
		gl.TRIANGLES,
		0,
		triangleGeometry.vertexCount,
		triangleAnimatedBodies.length,
	);

	gl.useProgram(lineProgram);
	gl.drawArraysInstanced(
		gl.LINE_LOOP,
		0,
		triangleGeometry.vertexCount,
		triangleAnimatedBodies.length,
	);
}

function resize() {
	c.width = innerWidth;
	c.height = innerHeight;
	c.style.setProperty("width", `${innerWidth}px`);
	c.style.setProperty("height", `${innerHeight}px`);
}

function adjustScreenPointerX(x: number) {
	const offsetLeft = IS_SMALL_SCREEN ? 0.2 : 0.1;
	const offsetRight = IS_SMALL_SCREEN ? 0.8 : 0.9;
	if (x > innerWidth * offsetRight) {
		x = innerWidth * offsetRight;
	}
	if (x < innerWidth * offsetLeft) {
		x = innerWidth * offsetLeft;
	}
	return x;
}

function adjustScreenPointerY(y: number) {
	const offsetTop = IS_SMALL_SCREEN ? 0.25 : 0.15;
	const offsetBottom = IS_SMALL_SCREEN ? 0.75 : 0.85;

	if (y > innerHeight * offsetBottom) {
		y = innerHeight * offsetBottom;
	}
	if (y < innerHeight * offsetTop) {
		y = innerHeight * offsetTop;
	}
	return y;
}
