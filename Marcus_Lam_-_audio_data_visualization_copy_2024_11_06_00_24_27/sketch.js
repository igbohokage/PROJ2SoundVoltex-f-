///fixed the images with chatgpt, thanks to chatgpt, we figured out how to do the rest 

let musics = [];
let selectedMusic;
let artwork;
let url;

function preload() {
  loadJSON("musics.json", (data) => {
    musics = data.musics;
  });
}

function setup() {
  background(75);
  createCanvas(550, 700);
  let dropdown = createSelect();
  dropdown.position(30, 100);
  dropdown.option("Select a song");

  if (musics.length > 0) {
    for (let music of musics) {
      dropdown.option(music.title, music.id);
    }
  }

  dropdown.changed(() => {
    let id = dropdown.value();
    selectedMusic = musics.find((m) => m.id === id);

    if (selectedMusic) {
      loadImage(
        selectedMusic.artwork,
        (img) => {
          artwork = img;
        },
        () => {}
      );

      if (url) {
        url.stop();
      }
      url = loadSound(
        selectedMusic.url,
        (url) => {
          url.play();
        },
        () => {}
      );
    }
  });
}

function draw() {
  fill(255);
  textSize(25);
  text(" Music Data\nVisualization", 250, height / 20);
  textSize(19);
  text("Press Shift for a random colored background\nPress Backspace for a gray background", 155, height / 7);

  noStroke();
  fill(50);
  rect(175, 150, 250, 500);
  rect(150, 175, 300, 450);
  ellipse(175, 175, 50);
  ellipse(425, 175, 50);
  ellipse(175, 625, 50);
  ellipse(425, 625, 50);
  
  fill(255)
  textSize(20)
  text("Apple Music", 245, 200);

  if (selectedMusic) {
    fill(255);
    textSize(30);
    text("Now Playing", 175, 515);
    textSize(20)
    text(`Title: ${selectedMusic.title}`, 175, 560);
    text(`Artist: ${selectedMusic.artist}`, 175, 585);
    text(`Release Year: ${selectedMusic.date}`,175, 610)

    if (artwork) {
      image(artwork, 175, 225, 250, 250);
    }
  }
}

function keyPressed(){
  if (keyCode === SHIFT) {
      background(random(255),random(255),random(255));
  } else if (keyCode === BACKSPACE) 
      background(95);

}