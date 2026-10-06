# Sorting Algorithm Visualizer

An interactive web-based Sorting Algorithm Visualizer built with React.  
This project helps users understand how common sorting algorithms work through step-by-step visual animations.

## Features

- Visualize Bubble Sort
- Visualize Selection Sort
- Visualize Insertion Sort
- Visualize Merge Sort
- Visualize Quick Sort
- Start, Pause and Resume controls
- Adjustable animation speed
- Step-by-step sorting visualization
- Interactive array size controls
- Previous and Next step controls
- Safe animation controls to prevent conflicting actions
- Clean and simple user interface

## Algorithms

| Algorithm | Average Time Complexity | Worst Case |
|-----------|--------------------------|------------|
| Bubble Sort | O(n²) | O(n²) |
| Selection Sort | O(n²) | O(n²) |
| Insertion Sort | O(n²) | O(n²) |
| Merge Sort | O(n log n) | O(n log n) |
| Quick Sort | O(n log n) | O(n²) |

## How It Works

The visualizer generates an array of values and displays them as bars.

When an algorithm is started, the application visualizes its sorting process step by step. Comparisons, swaps, and sorted elements are represented through the animation.

Users can pause and resume the visualization and change the animation speed while the algorithm is running.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Material UI

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Onkar142/sorting-algorithm-visualizer.git

### 2. Navigate to the project folder

```bash
cd sorting-algorithm-visualizer

npm install --legacy-peer-deps
npm start

http://localhost:3000

sorting-algorithm-visualizer/
│
├── public/
│
├── src/
│   ├── algorithms/
│   │   ├── BubbleSort.js
│   │   ├── InsertionSort.js
│   │   ├── MergeSort.js
│   │   ├── QuickSort.js
│   │   └── SelectionSort.js
│   │
│   ├── components/
│   ├── styles/
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── package.json
├── package-lock.json
└── README.md
