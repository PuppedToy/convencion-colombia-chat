// Raz: PIXI code goes here
// Raz: I'd recommend using semicolons just like you would in C#
// Raz: I'd also recommend you open up the Chrome Developer tools to check for JavaScript & PIXI errors

// use the WebGL Browser rendering technology by default as it's faster than HTML5 Canvas
var type = "WebGL";

// if it's not supported, then
if (!PIXI.utils.isWebGLSupported()) {
  // use the HTML5 Canvas Browser rendering technology
  type = "canvas";
}

// test PIXI, should output a test message in the Console
PIXI.utils.sayHello(type);

// Aliases to be used from this point forward, simplifies the code
// use http://pixijs.download/release/docs/index.html for more info on each of these
var
  Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  Graphics = PIXI.Graphics,
  Texture = PIXI.Texture,
  Text = PIXI.Text,
  collisionDetection = new Bump(); // collision detection

// Create a Pixi stage and renderer
var
  stage,
  containerElement = $("#stage"), // jQuery object, grab a handle on the <div id="stage"></div> from index.html
  containerWidth, containerHeight, // actual container height/width, determined later
  stageWidth, stageHeight, // stage height/width, determined later
  renderer = autoDetectRenderer(0, 0); // PIXI graphical renderer, don't care about size here

// attach the drawing board to the View
containerElement.html(renderer.view);

// get the actual height and width of the HTML container from index.html
containerWidth = containerElement.innerWidth();
containerHeight = containerElement.innerHeight();

// set the stage height and width
stageWidth = containerWidth;
stageHeight = containerHeight;

// create a JSON object container to use when checking stage wall collisions
var stageContainer = {
  x: 0, // top left corner X position
  y: 0, // top left corner Y position
  height: stageHeight,
  width: stageWidth
};

// allow renderer to resize itself as needed
renderer.autoResize = true;

// make sure the drawing board has the size we want, width first, then height
renderer.resize(stageWidth, stageHeight);

// build a PIXI.js stage
stage = new Container();

// the text object to be used later on
// defined here so it behaves like a global variable for all functions created below
var text, rectangle;

// simple function that builds a text object and adds it to the stage
function buildTextObject() {

  // build some text
  text = new Text(
    "Hello World!", { // "Hello World!" will be the initial text value
      fontFamily: "Arial",
      fontSize: 14,
      fill: "white"
    }
  );

  // set the text position roughly at the centre of the stage
  text.position.set(stageWidth / 2, stageHeight / 2);
  
  // set the text movement speed
  text.vx = 5;
  text.vy = 5;

  // add the text to the stage so it becomes visible once rendered below
  stage.addChild(text);

}

function buildSquare()
{
  rectangle = new Graphics();
  rectangle.lineStyle(4, 0xFF3300, 1);
  rectangle.beginFill(0x66CCFF);
  rectangle.drawRect(0, 0, 64, 64);
  rectangle.endFill();
  rectangle.x = 170;
  rectangle.y = 170;
  rectangle.vx = 7;
  rectangle.vy = 7;
  stage.addChild(rectangle);
};

// the actual animation test
function animateText() {
  
  // first a bit of logic to determine whether the movement direction should be changed
  
  // if the (text + text's width) is already at or just outside the stage's right border
  // or if it's at or just outside the stage's left border, then ...
  if (
    ( text.x + text.width ) >= stageWidth ||
    ( text.x <= 0 )
  ) {
    
    // reverse the direction by changing the text.vx value to negative
    // multiply the existing value by -1
    text.vx *= -1;
    
  }
  
  // now do the same check for the top and bottom stage borders
  if (
    ( text.y + text.height ) >= stageHeight ||
    ( text.y <= 0 )
  ) {
    
    // reverse the direction by changing the text.vx value to negative
    // multiply the existing value by -1
    text.vy *= -1;
    
  }
  
  // add the text's movement speed to the text's horizontal position
  text.x += text.vx;
  // add the text's movement speed to the text's vertical position
  text.y += text.vy;
  
}


function animateRectangle() {
  
  // first a bit of logic to determine whether the movement direction should be changed
  
  // if the (text + text's width) is already at or just outside the stage's right border
  // or if it's at or just outside the stage's left border, then ...
  if (
    ( rectangle.x + rectangle.width ) >= stageWidth ||
    ( rectangle.x <= 0 )
  ) {
    
    // reverse the direction by changing the text.vx value to negative
    // multiply the existing value by -1
    rectangle.vx *= -1;
    
  }
  
  // now do the same check for the top and bottom stage borders
  if (
    ( rectangle.y + rectangle.height ) >= stageHeight ||
    ( rectangle.y <= 0 )
  ) {
    
    // reverse the direction by changing the text.vx value to negative
    // multiply the existing value by -1
    rectangle.vy *= -1;
    
  }
  
  // add the text's movement speed to the text's horizontal position
  rectangle.x += rectangle.vx;
  // add the text's movement speed to the text's vertical position
  rectangle.y += rectangle.vy;
  
}


// a test function to set up a stage with text and render it
function runAnimationTest() {

  // Loop this function at a default rate of 60 frames per second
  requestAnimationFrame(runAnimationTest);
  
  // perform animation
  animateText();
  animateRectangle();

  // render the stage a.k.a. construct the stage graphically
  renderer.render(stage);

}

// build the text object - call the function defined above
buildTextObject();

buildSquare();

// call the above animation test function
runAnimationTest();

