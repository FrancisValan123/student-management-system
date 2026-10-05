const API = '/api';

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const student = {
    rollNo: document.getElementById('rollNo').value,
    name: document.getElementById('name').value,
    marks: document.getElementById('marks').value,
    grade: document.getElementById('grade').value || '-'
  };

  const res = await fetch(`${API}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });

  const data = await res.json();
  if (res.ok) {
    e.target.reset();
    loadStudents();
  } else {
    alert(data.error);
  }
});

async function loadStudents(view = 'array') {
  const url = view === 'linked' ? `${API}/students/linked` : `${API}/students`;
  const res = await fetch(url);
  const students = await res.json();
  renderTable(students);

  document.getElementById('btnArray').classList.toggle('active', view === 'array');
  document.getElementById('btnLinked').classList.toggle('active', view === 'linked');
}

function renderTable(students) {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';
  if (students.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#94a3b8;">No records</td></tr>';
    return;
  }
  students.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.rollNo}</td>
      <td>${s.name}</td>
      <td>${s.marks}</td>
      <td>${s.grade}</td>
      <td><button class="delete-btn" onclick="deleteStudent(${s.rollNo})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteStudent(rollNo) {
  if (!confirm(`Delete student with Roll No ${rollNo}?`)) return;
  await fetch(`${API}/students/${rollNo}`, { method: 'DELETE' });
  loadStudents();
}

async function searchStudent() {
  const rollNo = document.getElementById('searchRoll').value;
  const algo = document.getElementById('searchAlgo').value;
  const resultDiv = document.getElementById('searchResult');

  if (!rollNo) {
    resultDiv.className = 'error';
    resultDiv.textContent = 'Please enter a Roll No.';
    return;
  }

  const res = await fetch(`${API}/search?rollNo=${rollNo}&algo=${algo}`);
  const data = await res.json();

  if (data.data) {
    resultDiv.className = 'success';
    resultDiv.innerHTML = `
      ✅ Found: <b>${data.data.name}</b> (Roll ${data.data.rollNo}) —
      Marks: ${data.data.marks}, Grade: ${data.data.grade}<br>
      <small>Algorithm: ${data.algorithm} | Comparisons: ${data.comparisons}</small>
    `;
  } else {
    resultDiv.className = 'error';
    resultDiv.innerHTML = `❌ Not found. <small>Comparisons: ${data.comparisons}</small>`;
  }
}

async function sortStudents() {
  const key = document.getElementById('sortKey').value;
  const algo = document.getElementById('sortAlgo').value;
  const statsDiv = document.getElementById('sortStats');

  const res = await fetch(`${API}/sort?algo=${algo}&key=${key}`);
  const data = await res.json();

  renderTable(data.sorted);

  statsDiv.className = 'info';
  statsDiv.innerHTML = `
    📊 Sorted by <b>${key}</b> using <b>${algo} sort</b>
    ${data.swaps !== 'N/A' ? ` — Swaps: ${data.swaps}` : ''}
  `;
}

loadStudents();