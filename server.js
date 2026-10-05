const express = require('express');
const path = require('path');
const { LinkedList } = require('./structures/linkedList');
const { linearSearch, binarySearch } = require('./structures/searching');
const { bubbleSort, selectionSort, mergeSort } = require('./structures/sorting');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let studentArray = [];
const studentList = new LinkedList();

// Add student
app.post('/api/students', (req, res) => {
  const { rollNo, name, marks, grade } = req.body;

  if (!rollNo || !name || marks === undefined) {
    return res.status(400).json({ error: 'Roll No, Name, and Marks are required' });
  }

  if (studentArray.find(s => s.rollNo === Number(rollNo))) {
    return res.status(409).json({ error: 'Roll No already exists' });
  }

  const student = {
    rollNo: Number(rollNo),
    name,
    marks: Number(marks),
    grade: grade || '-'
  };

  studentArray.push(student);
  studentList.insertAtTail(student);

  res.json({ message: 'Student added', student });
});

app.get('/api/students', (req, res) => {
  res.json(studentArray);
});

app.get('/api/students/linked', (req, res) => {
  res.json(studentList.toArray());
});

app.delete('/api/students/:rollNo', (req, res) => {
  const rollNo = Number(req.params.rollNo);
  const arrIdx = studentArray.findIndex(s => s.rollNo === rollNo);

  if (arrIdx === -1) return res.status(404).json({ error: 'Not found' });

  studentArray.splice(arrIdx, 1);
  studentList.delete(rollNo);
  res.json({ message: 'Deleted' });
});

app.get('/api/search', (req, res) => {
  const rollNo = Number(req.query.rollNo);
  const algo = req.query.algo || 'linear';

  let result;
  if (algo === 'binary') {
    const sorted = mergeSort(studentArray, 'rollNo');
    result = binarySearch(sorted, rollNo);
  } else {
    result = linearSearch(studentArray, rollNo);
  }

  res.json({ ...result, algorithm: algo });
});

app.get('/api/sort', (req, res) => {
  const algo = req.query.algo || 'merge';
  const key = req.query.key || 'rollNo';

  let result;
  if (algo === 'bubble') result = bubbleSort(studentArray, key);
  else if (algo === 'selection') result = selectionSort(studentArray, key);
  else result = { sorted: mergeSort(studentArray, key), swaps: 'N/A' };

  res.json({ sorted: result.sorted, algorithm: algo, swaps: result.swaps });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});