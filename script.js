// Minimal interactive behavior for the template
document.addEventListener('DOMContentLoaded', () => {
  // placeholder sample data
  const sampleRequests = [
    { id: 'r1', student: 'Jamie Lee', reason: 'Anxiety after exam', urgency: 'high', message: 'Feels overwhelmed and skipping class.' },
    { id: 'r2', student: 'Alex P.', reason: 'Friend conflict', urgency: 'medium', message: 'Argument with peer — wants to talk.' },
    { id: 'r3', student: 'Taylor S.', reason: 'Schedule change', urgency: 'low', message: 'Requests schedule advice.' },
    { id: 'r4', student: 'Morgan K.', reason: 'Crisis', urgency: 'high', message: 'Expresses thoughts of self-harm.' }
  ];

  const grid = document.getElementById('requestsGrid');
  const filterSelect = document.getElementById('filterSelect');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  function groupByUrgency(requests) {
    const groups = { high: [], medium: [], low: [] };
    requests.forEach(r => {
      if (groups[r.urgency]) groups[r.urgency].push(r);
    });
    return groups;
  }

  function renderRequests(filter = 'all') {
    const groups = groupByUrgency(sampleRequests);
    grid.innerHTML = '';

    const order = ['high', 'medium', 'low'];
    order.forEach(key => {
      if (filter !== 'all' && filter !== key) return;

      const card = document.createElement('section');
      card.className = 'card';
      const h = document.createElement('h4');
      h.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} urgency`;
      const count = document.createElement('div');
      count.className = 'count';
      count.textContent = `${groups[key].length} request(s)`;
      card.appendChild(h);
      card.appendChild(count);

      groups[key].forEach(req => {
        const item = document.createElement('div');
        item.className = 'request';
        item.tabIndex = 0;
        item.dataset.id = req.id;

        const title = document.createElement('div');
        title.innerHTML = `<strong>${req.student}</strong> — <span class="meta">${req.reason}</span>`;
        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.innerHTML = `<span class="urgency ${key}">${key.toUpperCase()}</span> • ${req.message.slice(0,60)}...`;

        item.appendChild(title);
        item.appendChild(meta);

        item.addEventListener('click', () => openModal(req));
        item.addEventListener('keypress', (e) => { if (e.key === 'Enter') openModal(req); });

        card.appendChild(item);
      });

      grid.appendChild(card);
    });
  }

  // Modal behavior
  const emailModal = document.getElementById('emailModal');
  const modalBody = document.getElementById('modalBody');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeModalBtn = document.getElementById('closeModal');

  function openModal(request) {
    modalBody.innerHTML = `
      <p><strong>Student:</strong> ${escapeHtml(request.student)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(request.reason)}</p>
      <p><strong>Urgency:</strong> <span class="urgency ${request.urgency}">${request.urgency.toUpperCase()}</span></p>
      <hr/>
      <p>${escapeHtml(request.message)}</p>
    `;
    emailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    emailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalBackdrop.addEventListener('click', closeModal);
  closeModalBtn.addEventListener('click', closeModal);

  // simple XSS-avoid helper for demo
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Filter control
  filterSelect.addEventListener('change', (e) => {
    renderRequests(e.target.value);
  });

  // Calendar placeholder navigation (no calendar implemented yet)
  document.getElementById('calendarLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Calendar view will open here (placeholder).');
  });

  // Sign-in placeholder
  document.getElementById('signInBtn').addEventListener('click', () => {
    alert('Sign-in flow will be implemented here (placeholder).');
  });

  // Action buttons in modal (placeholders)
  document.getElementById('scheduleBtn').addEventListener('click', () => {
    alert('Open scheduling UI (placeholder).');
  });
  document.getElementById('sendBtn').addEventListener('click', () => {
    alert('Send email flow (placeholder).');
  });

  // initial render
  renderRequests();
});
