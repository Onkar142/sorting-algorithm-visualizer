import React, { Component } from 'react';
import Bar from './components/Bar';
import Form from './components/Form';

import BubbleSort from './algorithms/BubbleSort';
import MergeSort from './algorithms/MergeSort';
import QuickSort from './algorithms/QuickSort';
import InsertionSort from './algorithms/InsertionSort';
import SelectionSort from './algorithms/SelectionSort';

import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forward from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import Pause from '@material-ui/icons/PauseCircleOutline';
import RotateLeft from '@material-ui/icons/RotateLeft';

import './styles/RiseUpText/RiseUpText.css';
import { riseText } from './styles/RiseUpText/RiseUpText';
import './App.css';

class App extends Component {
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    barCount: 10,
    delay: 300,
    algorithm: 'Bubble Sort',
    isPlaying: false,
    isPaused: false,
  };

  ALGORITHMS = {
    'Bubble Sort': BubbleSort,
    'Merge Sort': MergeSort,
    'Quick Sort': QuickSort,
    'Insertion Sort': InsertionSort,
    'Selection Sort': SelectionSort,
  };

  timerId = null;
  animationToken = 0;

  componentDidMount() {
    window.addEventListener('load', riseText);
    this.generateBars();
  }

  componentWillUnmount() {
    window.removeEventListener('load', riseText);
    this.clearTimer();
    this.animationToken += 1;
  }

  clearTimer = () => {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  };

  scheduleNextStep = () => {
    this.clearTimer();

    if (!this.state.isPlaying || this.state.isPaused) return;

    const token = this.animationToken;
    const delay = this.state.delay;

    this.timerId = setTimeout(() => {
      if (token !== this.animationToken || !this.state.isPlaying || this.state.isPaused) return;

      const nextStep = this.state.currentStep + 1;
      const lastStep = this.state.arraySteps.length - 1;

      if (nextStep > lastStep) {
        this.finishAnimation();
        return;
      }

      this.setState(
        {
          array: this.state.arraySteps[nextStep] || this.state.array,
          colorKey: this.state.colorSteps[nextStep] || this.state.colorKey,
          currentStep: nextStep,
        },
        () => {
          if (nextStep >= this.state.arraySteps.length - 1) {
            this.finishAnimation();
          } else {
            this.scheduleNextStep();
          }
        }
      );
    }, delay);
  };

  startAnimation = () => {
    if (this.state.isPlaying) return;

    if (this.state.currentStep >= this.state.arraySteps.length - 1) {
      return;
    }

    this.animationToken += 1;
    this.setState(
      { isPlaying: true, isPaused: false },
      this.scheduleNextStep
    );
  };

  pauseAnimation = () => {
    if (!this.state.isPlaying) return;

    this.animationToken += 1;
    this.clearTimer();
    this.setState({ isPlaying: false, isPaused: true });
  };

  resumeAnimation = () => {
    if (!this.state.isPaused) return;

    this.animationToken += 1;
    this.setState({ isPlaying: true, isPaused: false }, this.scheduleNextStep);
  };

  finishAnimation = () => {
    this.clearTimer();
    this.animationToken += 1;
    this.setState({ isPlaying: false, isPaused: false });
  };

  resetAnimation = () => {
    this.animationToken += 1;
    this.clearTimer();
    this.setState({ isPlaying: false, isPaused: false, currentStep: 0 }, () => {
      this.generateBars();
    });
  };

  changeAlgorithm = (e) => {
    if (this.state.isPlaying || this.state.isPaused) return;

    this.clearTimer();
    this.clearColorKey();

    this.setState(
      {
        algorithm: e.target.value,
        currentStep: 0,
        arraySteps: [this.state.arraySteps[0] || this.state.array.slice()],
      },
      () => this.generateSteps()
    );
  };

  clearColorKey = () => {
    const blankKey = new Array(this.state.barCount).fill(0);
    this.setState({ colorKey: blankKey, colorSteps: [blankKey] });
  };

  stepBack = () => {
    if (this.state.isPlaying || this.state.isPaused) return;

    const previousStep = this.state.currentStep - 1;
    if (previousStep < 0) return;

    this.setState({
      array: this.state.arraySteps[previousStep] || this.state.array,
      colorKey: this.state.colorSteps[previousStep] || this.state.colorKey,
      currentStep: previousStep,
    });
  };

  stepForward = () => {
    if (this.state.isPlaying || this.state.isPaused) return;

    const nextStep = this.state.currentStep + 1;
    if (nextStep >= this.state.arraySteps.length) return;

    this.setState({
      array: this.state.arraySteps[nextStep] || this.state.array,
      colorKey: this.state.colorSteps[nextStep] || this.state.colorKey,
      currentStep: nextStep,
    });
  };

  generateSteps = () => {
    const array = this.state.array.slice();
    const steps = this.state.arraySteps.slice(0, 1);
    const colorSteps = this.state.colorSteps.length
      ? [this.state.colorSteps[0].slice()]
      : [new Array(array.length).fill(0)];

    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

    this.setState({
      arraySteps: steps,
      colorSteps,
      currentStep: 0,
      array: steps[0] || array,
      colorKey: colorSteps[0] || new Array(array.length).fill(0),
    });
  };

  generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  generateBars = () => {
    this.clearTimer();
    this.animationToken += 1;

    const barCount = this.state.barCount;
    const arr = [];

    for (let i = 0; i < barCount; i++) {
      arr.push(this.generateRandomNumber(50, 200));
    }

    const blankKey = new Array(barCount).fill(0);

    this.setState(
      {
        array: arr,
        arraySteps: [arr.slice()],
        colorKey: blankKey,
        colorSteps: [blankKey.slice()],
        currentStep: 0,
        isPlaying: false,
        isPaused: false,
      },
      () => this.generateSteps()
    );
  };

  changeArray = (index, value) => {
    if (this.state.isPlaying || this.state.isPaused) return;

    const array = this.state.array.slice();
    array[index] = Math.max(0, Math.min(200, value));

    const blankKey = new Array(array.length).fill(0);
    this.setState(
      {
        array,
        arraySteps: [array.slice()],
        colorKey: blankKey,
        colorSteps: [blankKey.slice()],
        currentStep: 0,
      },
      () => this.generateSteps()
    );
  };

  changeBarCount = (e) => {
    if (this.state.isPlaying || this.state.isPaused) return;

    this.setState(
      { barCount: parseInt(e.target.value, 10) },
      this.generateBars
    );
  };

  changeSpeed = (e) => {
    const delay = parseInt(e.target.value, 10);

    this.setState({ delay }, () => {
      // Speed remains available while playing. Restart only the next single timer.
      if (this.state.isPlaying && !this.state.isPaused) {
        this.scheduleNextStep();
      }
    });
  };

  render() {
    const { isPlaying, isPaused, arraySteps, currentStep } = this.state;
    const controlsLocked = isPlaying || isPaused;
    const canStepBack = !controlsLocked && currentStep > 0;
    const canStepForward = !controlsLocked && currentStep < arraySteps.length - 1;
    const finished = arraySteps.length > 0 && currentStep >= arraySteps.length - 1;

    const barsDiv = (this.state.array || []).map((value, index) => (
      <Bar
        key={index}
        index={index}
        length={value}
        color={this.state.colorKey[index] || 0}
        changeArray={this.changeArray}
        disabled={controlsLocked}
      />
    ));

    let playButton;
    if (finished && !controlsLocked) {
      playButton = (
        <button className='controller' onClick={this.resetAnimation} title='Reset'>
          <RotateLeft />
        </button>
      );
    } else if (isPaused) {
      playButton = (
        <button className='controller' onClick={this.resumeAnimation} title='Resume'>
          <Play />
        </button>
      );
    } else if (isPlaying) {
      playButton = (
        <button className='controller' onClick={this.pauseAnimation} title='Pause'>
          <Pause />
        </button>
      );
    } else {
      playButton = (
        <button className='controller' onClick={this.startAnimation} title='Start'>
          <Play />
        </button>
      );
    }

    return (
      <div className='app'>
        <h1 className='page-header_title risetext'>
          <span className='page-header_title-main enclose'>Sorting Visualizer</span>
        </h1>

        <div className='frame'>
          <div className='barsDiv container card'>{barsDiv}</div>
        </div>

        <div className='control-pannel'>
          <div className='control-buttons'>
            <button
              className='controller'
              onClick={this.stepBack}
              disabled={!canStepBack}
              title='Previous step'
            >
              <Backward />
            </button>
            {playButton}
            <button
              className='controller'
              onClick={this.stepForward}
              disabled={!canStepForward}
              title='Next step'
            >
              <Forward />
            </button>
          </div>
        </div>

        <div className='pannel'>
          <Form
            formLabel='Algorithms'
            values={['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Insertion Sort', 'Selection Sort']}
            labels={['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Insertion Sort', 'Selection Sort']}
            currentValue={this.state.algorithm}
            onChange={this.changeAlgorithm}
            disabled={controlsLocked}
          />
          <Form
            formLabel='Items'
            values={[10, 15, 20, 25, 30]}
            labels={[10, 15, 20, 25, 30]}
            currentValue={this.state.barCount}
            onChange={this.changeBarCount}
            disabled={controlsLocked}
          />
          <Form
            formLabel='Speed'
            values={[500, 400, 300, 200, 100]}
            labels={['1x', '2x', '3x', '4x', '5x']}
            currentValue={this.state.delay}
            onChange={this.changeSpeed}
            disabled={false}
          />
        </div>
      </div>
    );
  }
}

export default App;
