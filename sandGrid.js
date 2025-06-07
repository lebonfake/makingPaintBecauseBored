var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var sizeOfCellInPixels = 40;
var numberOfColumns = canvasWidth / sizeOfCellInPixels;
var numberOfLines = canvasHeight / sizeOfCellInPixels;

var spaceBetweenLines = canvasHeight / sizeOfCellInPixels;

var matrix = createMatrix(numberOfLines, numberOfColumns);
var previousSquare = null;

var interval = null;
console.log(matrix[0][0] == 1);

drawGrid2(matrix, sizeOfCellInPixels);

canvas.addEventListener("click", fillRectByClick);

canvas.addEventListener("mousedown", () => {
  canvas.addEventListener("mousemove", fillRectByClick);
});

canvas.addEventListener("mouseup", () => {
    canvas.removeEventListener('mousemove',fillRectByClick)
});
/*





drawGrid(numberOfLines,numberOfColumns,spaceBetweenLines,canvasWidth,canvasHeight)
*/
console.log(matrix);

function drawGrid2(matrix, sizeOfCell) {
  n = matrix.length;
  m = matrix[0].length;

  y = 0;
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < n; i++) {
    x = 0;
    for (let j = 0; j < m; j++) {
      context.beginPath();
      if (matrix[i][j] == 1) {
        context.fillStyle = "black";
        context.strokeStyle = "black";

        context.fillRect(x, y, sizeOfCell, sizeOfCell);
      } else {
        context.fillStyle = "white";
        context.strokeStyle = "black";

        context.strokeRect(x, y, sizeOfCell, sizeOfCell);
      }

      context.stroke();
      x += sizeOfCell;
    }
    y += sizeOfCell;
  }
}

function fillRectByClick(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  console.log("clicked on : (", mouseX, ",", mouseY, ")");

  [i, j] = getCellCordinatesByMouse(mouseX, mouseY);
    console.log(previousSquare);
    
  if(previousSquare != null)
 { if ( previousSquare[0] == i && previousSquare[1]==j) 
    return;
}
  if (matrix[i][j] == 1)
    matrix[i][j] = 0;
  else 
    matrix[i][j] = 1;

  drawGrid2(matrix, sizeOfCellInPixels);
  previousSquare = [i, j];
}
function getCellCordinatesByMouse(mouseX, mouseY) {
  i = null;
  j = null;

  j = Math.floor(mouseX / sizeOfCellInPixels);
  i = Math.floor(mouseY / sizeOfCellInPixels);
  console.log("it s cell :  (", j, ",", i, ")");

  return [i, j];
}

function drawGrid(
  numberOfLines,
  numberOfColumns,
  spaceBetweenLines,
  width,
  height
) {
  console.log("drawing");
  console.log("number of line : ", numberOfLines);
  console.log("space between lines : ", spaceBetweenLines);
  console.log("width : ", width);

  y = 0;
  for (let i = 0; i < numberOfLines; i++) {
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
    y += spaceBetweenLines;
  }

  x = 0;
  for (let i = 0; i < numberOfColumns; i++) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
    x += spaceBetweenLines;
  }
}

function createMatrix(n, m) {
  matrix = [];
  for (let i = 0; i < n; i++) {
    row = new Array(m).fill(0);
    matrix.push(row);
  }
  return matrix;
}
