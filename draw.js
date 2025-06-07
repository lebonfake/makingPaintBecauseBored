var canvas = document.getElementById("c");
var clearButton = document.getElementById("clearCanva")
var context = canvas.getContext("2d");
var colorsDiv = document.getElementById("colorsDiv");

var selectedColor = "black";
var colors = ["black", "red", "blue", "purple","green"];
loadColorItems();

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var offsetX = canvas.offsetLeft
var offsetY = canvas.offsetTop


colorItems = document.querySelectorAll(".color-item");
colorItems.forEach((color) => {
  color.addEventListener("click", (e) => selectColor(e));
});

canvas.addEventListener("mousedown", (e) => {
  val = 0;

  x = e.clientX;
  y = e.clientY;
  context.moveTo(x-offsetX, y-offsetY);

  canvas.addEventListener("mousemove", moveFunction);
});

canvas.addEventListener("mouseup", (e) => {
  canvas.removeEventListener("mousemove", moveFunction);
});

clearButton.addEventListener("click",clearCanvas)

function loadColorItems() {
  colors.forEach((color) => {
    div = document.createElement("div");
    div.style.backgroundColor = color;
    div.classList.add("color-item");
    if (color == selectedColor) {
      if (color == "black") div.classList.add("selected-black");
      else div.classList.add("selected");
    }
    colorsDiv.appendChild(div);
  });
}

function moveFunction(e) {
  console.log("moved to : (", e.clientX, ",", e.clientY, ")");
  x = e.clientX;
  y = e.clientY;
 
  context.lineTo(x-offsetX, y-offsetY);
  context.strokeStyle = selectedColor
  context.stroke();
  context.beginPath()
  context.moveTo(x-offsetX, y-offsetY );
 
}
function selectColor(e) {
  console.log(e);

  //i select current item 
  if (e.target.style.backgroundColor != "black")
    e.target.classList.add("selected");
  else
    e.target.classList.add("selected-black");

  // i unselect siblings
  siblings = Array.from(e.target.parentElement.children)
  siblings.forEach(sibling=>{
    if(e.target.style.backgroundColor != sibling.style.backgroundColor){
        sibling.classList.remove('selected')
         sibling.classList.remove('selected-black')
    }
    //i set colorh
    selectedColor = e.target.style.backgroundColor
  })
}

function clearCanvas(){
    console.log("clearing");
    
    context.clearRect(0, 0, canvas.width, canvas.height);

}

