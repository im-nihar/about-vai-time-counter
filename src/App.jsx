import confetti from "canvas-confetti";
import Timer from "./Timer";
import "./App.css";

function App() {
  // var duration =  500;
  // var end = Date.now() + duration;

  // (function frame() {
  //   // launch a few confetti from the left edge
  //   confetti({
  //     particleCount: 7,
  //     angle: 60,
  //     spread: 55,
  //     origin: { x: 0 },
  //   });
  //   // and launch a few from the right edge
  //   confetti({
  //     particleCount: 7,
  //     angle: 120,
  //     spread: 55,
  //     origin: { x: 1 },
  //   });

  //   // keep going until we are out of time
  //   if (Date.now() < end) {
  //     requestAnimationFrame(frame);
  //   }
  // })();

  function renderConfetti() {
    confetti({
      particleCount: 22,
      startVelocity: 10,
      spread: 360,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2,
      },
    });
  }

  return (
    <>
      <div>
        <div onClick={() => renderConfetti()}>
          <Timer />
        </div>
      </div>
    </>
  );
}

export default App;
