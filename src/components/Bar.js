import { useState, useEffect } from 'react';
import './Bar.css';

const Bars = ({ index, length, color, changeArray, disabled = false }) => {
  const [len, setLength] = useState(length);

  useEffect(() => {
    setLength(length);
  }, [length]);

  const colors = ['#3d5af1', '#ff304f', '#83e85a'];

  const barStyle = {
    background: colors[color] || colors[0],
    height: length,
    marginTop: 200 - length,
  };

  const textStyle = {
    position: 'relative',
    top: Math.floor(length / 2) - 10,
    width: length,
    left: -Math.floor(length / 2) + 11,
    background: 'transparent',
    border: 'none',
  };

  const modifiersStyle = {
    position: 'relative',
    top: length - 15,
  };

  const handleChange = (e) => {
    if (disabled) return;

    let val = e.target.value;
    if (val === '') {
      setLength(0);
      changeArray(index, 0);
      return;
    }

    val = parseInt(val, 10);
    if (Number.isNaN(val)) return;

    val = Math.max(0, Math.min(200, val));
    setLength(val);
    changeArray(index, val);
  };

  const increment = () => {
    if (disabled || len >= 200) return;
    setLength(len + 1);
    changeArray(index, len + 1);
  };

  const decrement = () => {
    if (disabled || len <= 0) return;
    setLength(len - 1);
    changeArray(index, len - 1);
  };

  return (
    <div className='bar' style={barStyle}>
      <input
        type='number'
        style={textStyle}
        value={len}
        className='text'
        onChange={handleChange}
        disabled={disabled}
      />
      <div className='quantity-nav'>
        <div
          className={`quantity-button quantity-up${disabled ? ' disabled' : ''}`}
          style={modifiersStyle}
          onClick={increment}
        >
          +
        </div>
        <div
          className={`quantity-button quantity-down${disabled ? ' disabled' : ''}`}
          style={modifiersStyle}
          onClick={decrement}
        >
          -
        </div>
      </div>
    </div>
  );
};

export default Bars;
