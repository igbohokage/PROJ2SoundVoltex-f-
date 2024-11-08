///fixed the images with chatgpt, thanks to chatgpt, we figured out how to do the rest 
let musics = [];
let selectedMusic;
let artwork;
let url;
let amplitude; 

let bgColor = 75; 

function preload() {
  loadJSON("musics.json", (data) => {
    musics = data.musics;
  });
}

function setup() {
  createCanvas(650, 700);
  let dropdown = createSelect();
  dropdown.position(50, 100);
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

      amplitude = new p5.Amplitude(); 
      background(bgColor); 
    }
  });
}

function draw() {
  background(bgColor); 
  
  fill(255);
  textSize(25);
  noStroke(); 
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
  
  fill(255);
  textSize(20);
  textFont('Courier New')
  text("Apple Music", 245, 200);

  if (selectedMusic) {
    fill(255);
    textSize(30);
    text("Now Playing", 210, 515);
    textSize(20);
    text(`Title: ${selectedMusic.title}`, 175, 560);
    text(`Artist: ${selectedMusic.artist}`, 175, 585);
    text(`Release Year: ${selectedMusic.date}`, 175, 610);

    if (artwork) {
      image(artwork, 175, 225, 250, 250);
    }
    
    if (url && url.isPlaying()) {
      drawWaveform();
    }
  }
}

function drawWaveform() {
  let level = amplitude.getLevel();  
  let waveHeight = map(level, 0, 1, 0, height);  
  stroke(50, 150, 255); 
  strokeWeight(3);
  noFill();

  beginShape();
  for (let x = 0; x < width; x++) {
    let y = waveHeight * sin(TWO_PI * x / width * 8);  
    vertex(x, height / 2 + y);  
  }
  endShape();
}

function keyPressed() {
  if (keyCode === SHIFT) {
    bgColor = color(random(255), random(255), random(255));  
  } else if (keyCode === BACKSPACE) {
    bgColor = color(95);  
  }
}
