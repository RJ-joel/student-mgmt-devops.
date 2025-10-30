const api = '/students';

async function fetchStudents(){
  const r = await fetch(api);
  const data = await r.json();
  const list = document.getElementById('list');
  if(!data.length) {
    list.innerHTML = '<div class="card">No students yet (shows []).</div>';
    return;
  }
  list.innerHTML = data.map(s => `<div class="card"><b>${s.name}</b> — ${s.dept} — CGPA: ${s.cgpa}</div>`).join('');
}

document.getElementById('addForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const name = document.getElementById('name').value;
  const dept = document.getElementById('dept').value;
  const cgpa = parseFloat(document.getElementById('cgpa').value);
  await fetch(api, {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({name, dept, cgpa})
  });
  document.getElementById('name').value = '';
  document.getElementById('dept').value = '';
  document.getElementById('cgpa').value = '';
  await fetchStudents();
});

fetchStudents();
