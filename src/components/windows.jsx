import '../App.css';
import PropTypes from 'prop-types';

function Windows({ canvasSize, numberOfWindows }) {
  return (
    <div>
      {[...Array(numberOfWindows)].map((_, i) => {
        const size = canvasSize + (canvasSize / 25) * (2 * i);
        return (
          <div
            className="window-container"
            style={{
              width: size,
              height: size,
            }}
            key={i}
          >
            <div className="text-container">
              <p style={{ position: 'absolute', top: 0, left: 0 }}>
                Post-Artem © 2024
              </p>
              <p style={{ position: 'absolute', bottom: 0, right: 0 }}>
                by <a href="https://e-kezia.com" target="_blank" rel="noreferrer">@ekezia</a>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Windows;

Windows.propTypes = {
  canvasSize: PropTypes.number.isRequired,
  numberOfWindows: PropTypes.number.isRequired,
}
