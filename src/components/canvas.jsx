/* eslint-disable eqeqeq */
/* eslint-disable default-case */
import React from "react";
import Sketch from "react-p5";
import PropTypes from 'prop-types';

let choices = ['down', 'left', 'right']; // initial choices
let x = 0;
let y = 0;
let img1, up, down, left, right, upLeft, downLeft, leftUp, rightUp, upRight, downRight, leftDown, rightDown, endU, endD, endL, endR;

const Canvas = ({ canvasSize }) => {
  let size = canvasSize; // canvas size
  let img_size = canvasSize / 10; // image size

  const setup = (p5, canvasParentRef) => {
    // Load Image
    img1 = p5.loadImage('/images/Body_Top.jpg');
    up = p5.loadImage('/images/Body_V.jpg');
    down = p5.loadImage('/images/Body_V.jpg');
    left = p5.loadImage('/images/Body_H.jpg');
    right = p5.loadImage('/images/Body_H.jpg');

    upLeft = p5.loadImage('/images/UL.jpg');
    downLeft = p5.loadImage('/images/DL.jpg');
    leftUp = p5.loadImage('/images/DR.jpg');
    rightUp = p5.loadImage('/images/DL.jpg');

    upRight = p5.loadImage('/images/UR.jpg');
    downRight = p5.loadImage('/images/DR.jpg');
    leftDown = p5.loadImage('/images/UR.jpg');
    rightDown = p5.loadImage('/images/UL.jpg');

    endU = p5.loadImage('/images/Body_Bottom_U.jpg');
    endD = p5.loadImage('/images/Body_Bottom_D.jpg');
    endL = p5.loadImage('/images/Body_Bottom_L.jpg');
    endR = p5.loadImage('/images/Body_Bottom_R.jpg');

    // Create Canvas
    p5.frameRate(1);
    p5.createCanvas(size, size, p5.WEBGL).parent(canvasParentRef);
    p5.background(61, 66, 72);
    p5.stroke(61, 66, 72);
  };

  function goUp() {
    y -= img_size;
    return y;
  }

  function goDown() {
    y += img_size;
    return y;
  }

  function goLeft() {
    x -= img_size;
    return x;
  }

  function goRight() {
    x += img_size;
    return x;
  }

  let prev_r = 'right';
  let r; // only allows choice 'down' on first draw

  const draw = (p5) => {
    if (p5.frameCount == 1) {
      p5.texture(img1); // begin with starting image
      p5.rect(x, y, img_size, img_size);

      // then, go to the next image (Artem's body going down)
      goDown();
      r = p5.random(choices); // enable p5.random to take all choices avail
      switch (r) {
        case 'down':
          p5.texture(down);
          break;
        case 'left':
          p5.texture(downLeft);
          break;
        case 'right':
          p5.texture(downRight);
          break;
      }
      p5.rect(x, y, img_size, img_size);
      prev_r = r;
    } else {
      if (p5.frameCount == 2) {
        choices.push('up'); // add 'up' after first draw (only do this once at p5.frameCount 2)
      }
      if (p5.frameCount >= 2) {
        // Stop the code when it hits the corners
        if (((x + (img_size * 2) >= size / 2) && prev_r == 'right') ||
          ((y + (img_size * 2) >= size / 2) && prev_r == 'down') ||
          ((x - (img_size) <= -size / 2) && prev_r == 'left') ||
          ((y - (img_size) <= -size / 2) && prev_r == 'up')) {
          // eslint-disable-next-line default-case
          switch (prev_r) {
            case 'up':
              goUp();
              p5.texture(endU);
              break;
            case 'down':
              goDown();
              p5.texture(endD);
              break;
            case 'left':
              goLeft();
              p5.texture(endL);
              break;
            case 'right':
              goRight();
              p5.texture(endR);
              break;
          }
          p5.rect(x, y, img_size, img_size);
          return;
        };

        r = p5.random(choices); // enable p5.random to take all choices avail

        // Draw the images
        switch (prev_r) {
          case 'up':
            goUp();
            switch (r) {
              case 'up':
                p5.texture(up);
                prev_r = 'up';
                break;
              case 'left':
                p5.texture(upLeft);
                prev_r = 'left';
                break;
              case 'right':
                p5.texture(upRight);
                prev_r = 'right';
                break;
              case 'down':
                p5.texture(up);
                prev_r = 'up'; // prevents down
                break;
            }
            break;

          case 'down':
            goDown();
            switch (r) {
              case 'up':
                p5.texture(down);
                prev_r = 'down'; // prevents from going up
                break;
              case 'left':
                p5.texture(downLeft);
                prev_r = 'left';
                break;
              case 'right':
                p5.texture(downRight);
                prev_r = 'right';
                break;
              case 'down':
                p5.texture(down);
                prev_r = 'down';
                break;
            }
            break;

          case 'left':
            goLeft();
            switch (r) {
              case 'up':
                p5.texture(leftUp);
                prev_r = 'up';
                break;
              case 'left':
                p5.texture(left);
                prev_r = 'left';
                break;
              case 'right':
                p5.texture(left);
                prev_r = 'left'; // prevents from going right
                break;
              case 'down':
                p5.texture(leftDown);
                prev_r = 'down';
                break;
            }
            break;

          case 'right':
            goRight();
            // eslint-disable-next-line default-case
            switch (r) {
              case 'up':
                p5.texture(rightUp);
                prev_r = 'up';
                break;
              case 'left':
                p5.texture(down);
                prev_r = 'right'; // prevents from going right
                break;
              case 'right':
                p5.texture(right);
                prev_r = 'right';
                break;
              case 'down':
                p5.texture(rightDown);
                prev_r = 'down';
                break;
            }
            break;
        }
      }
      p5.rect(x, y, img_size, img_size); //generate image every frame
    }
  };

  return (
    <div style={{ border: '1px solid rgba(27,27,27,0.5)' }}>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Canvas;

Canvas.propTypes = {
  canvasSize: PropTypes.number.isRequired,
}
