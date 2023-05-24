const audioClips = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
  // {
  //   keyCode: 75,
  //   keyTrigger: "K",
  //   id: "Chord-1",
  //   url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  // },
  // {
  //   keyCode: 76,
  //   keyTrigger: "L",
  //   id: "Chord-2",
  //   url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  // },
  // {
  //   keyCode: 186,
  //   keyTrigger: ";",
  //   id: "Chord-3",
  //   url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  // },
  // {
  //   keyCode: 90,
  //   keyTrigger: "Z",
  //   id: "Shaker",
  //   url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  // },
  // {
  //   keyCode: 88,
  //   keyTrigger: "X",
  //   id: "Open-HH",
  //   url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  // },
  // {
  //   keyCode: 67,
  //   keyTrigger: "C",
  //   id: "Closed-HH",
  //   url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  // },
  // {
  //   keyCode: 77,
  //   keyTrigger: "M",
  //   id: "Punchy-Kick",
  //   url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  // },
  // {
  //   keyCode: 188,
  //   keyTrigger: ",",
  //   id: "Side-Stick",
  //   url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  // },
  // {
  //   keyCode: 190,
  //   keyTrigger: ".",
  //   id: "Snare",
  //   url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  // },
];

function App() {
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(1);
  const [currentInterval, setCurrentInterval] = React.useState(null);

  const resetSpeed = () => {
    setSpeed(1);
  };

  const playRecording = () => {
    if (currentInterval) {
      clearInterval(currentInterval);
    }

    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      if (index < recordArray.length) {
        const audioTag = document.getElementById(recordArray[index]);
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        index++;
      } else {
        clearInterval(interval);
        setCurrentInterval(null);
      }
    }, (1 / speed) * 300);

    setCurrentInterval(interval);
  };

  return (
    <div id="drum-machine" className="min-vh-100 text-white">
      <div className="text-center">
        <h2>Drum Machine</h2>
        <div className="key-container">
          {generatePads(audioClips, volume, setRecording)}
        </div>
        <h4>Volume</h4>
        <input
          type="range"
          step="0.01"
          onChange={(e) => setVolume(e.target.value)}
          value={volume}
          max="1"
          min="0"
          className="w-50"
        />
        <h3 id="display">{recording}</h3>
        {recording && (
          <>
            <button onClick={playRecording} className="btn btn-success">
              Play
            </button>
            <button
              onClick={() => setRecording("")}
              className="btn btn-warning"
            >
              Clear
            </button>
            <button
              onClick={() => {
                clearInterval(currentInterval);
                setCurrentInterval(null);
              }}
              className="btn btn-danger"
            >
              Stop
            </button>
            <br></br>
            <h3>Playback Speed {speed}x</h3>
            <input
              type="range"
              step="0.01"
              onChange={(e) => setSpeed(e.target.value)}
              value={speed}
              max="1.5"
              min="0.1"
              className="w-50"
            />
            <br></br>
            <button onClick={resetSpeed} className="btn btn-primary">
              Reset Speed
            </button>
          </>
        )}
      </div>
    </div>
  );
}
function generatePads(clips, volume, setRecording) {
  return clips.map((clip) => (
    <Pad
      key={clip.id}
      clip={clip}
      volume={volume}
      setRecording={setRecording}
    />
  ));
}

function Pad({ clip, volume, setRecording }) {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording((prev) => prev + clip.keyTrigger + " ");
  };

  return (
    <div
      id="drum-pad"
      onClick={playSound}
      className={`btn btn-secondary p-4 m-3 ${active && "btn-warning"}`}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
