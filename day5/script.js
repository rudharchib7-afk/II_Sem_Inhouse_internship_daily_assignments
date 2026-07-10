
      const firstNames = ['Aarav', 'Aditi', 'Aniket', 'Bhavya', 'Chaitanya', 'Deepika', 'Eshaan', 'Fiza', 'Gaurav', 'Harini', 'Ishaan', 'Jhanvi', 'Kunal', 'Lavanya', 'Manan', 'Naina', 'Ojaswi', 'Parth', 'Rhea', 'Sahil', 'Tanvi', 'Udit', 'Vaishnavi', 'Waseem', 'Yashvi', 'Zainab', 'Arjun', 'Bhoomika', 'Chetan', 'Diksha', 'Eklavya', 'Farah', 'Girish', 'Himanshu', 'Ira', 'Jayant', 'Kavya', 'Lalit', 'Mira', 'Nitesh', 'Om', 'Pranav', 'Qamar', 'Ritika', 'Sanya', 'Tarun', 'Urvi', 'Veda', 'Wahid', 'Xena', 'Yuvan', 'Zoya', 'Aman', 'Bharat', 'Cynthia', 'Dev', 'Esha', 'Farhan', 'Geet', 'Hina', 'Ishita', 'Jasmine', 'Kiaan', 'Lina', 'Mihir', 'Neha', 'Oorja', 'Pooja', 'Rohan', 'Sakshi', 'Tushar', 'Uma', 'Vikram', 'Winnie', 'Yamini', 'Zubair'];
      const lastNames = ['Sharma', 'Verma', 'Rao', 'Singh', 'Patel', 'Iyer', 'Khan', 'Noor', 'Malhotra', 'Nair', 'Bhatia', 'Mehta', 'Joshi', 'Desai', 'Kapoor', 'Sethi', 'Tiwari', 'Dubey', 'Agarwal', 'Mehra', 'Arora', 'Bansal', 'Rao', 'Ali', 'Chopra', 'Malik', 'Sinha', 'Das', 'Kumar', 'Gupta', 'Mishra', 'Qureshi', 'Menon', 'Dey', 'Thakur', 'Reddy', 'Nanda', 'Soni', 'Kulkarni', 'Jain', 'Shah', 'Gupta', 'Bhat', 'Saxena', 'Lodha', 'Madan', 'Kaur', 'Vats', 'Pande', 'Khan', 'Kohli', 'Bose', 'Rastogi', 'Vora', 'Srinivasan', 'Mohan', 'Ahuja', 'Tandon', 'Mittal', 'Dutta', 'Sengupta', 'Bhardwaj'];
      const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'IT', 'Biotech', 'Aerospace', 'Chemistry', 'Electrical', 'Mathematics', 'Physics', 'Commerce', 'Business Admin', 'Psychology', 'Data Science', 'Communication', 'Architecture', 'Marketing', 'Law', 'Animation', 'Design', 'Finance', 'History', 'Political Science', 'English', 'Public Health', 'Robotics', 'Environmental Science', 'Pharma', 'Journalism', 'Mining', 'Hospitality', 'Nursing', 'Agriculture', 'Marine Biology', 'Software Engineering', 'Biochemistry', 'Renewable Energy', 'Food Technology', 'Operations'];
      const cities = ['Noida', 'Delhi', 'Pune', 'Jaipur', 'Ahmedabad', 'Bengaluru', 'Lucknow', 'Hyderabad', 'Chandigarh', 'Kochi', 'Mumbai', 'Surat', 'Nagpur', 'Vadodara', 'Bhopal', 'Indore', 'Kanpur', 'Patna', 'Ranchi', 'Amritsar', 'Gurugram', 'Faridabad', 'Mysuru', 'Aligarh', 'Jalandhar', 'Srinagar', 'Raipur', 'Shimla', 'Dehradun', 'Vijayawada', 'Jamshedpur', 'Kolkata', 'Trivandrum', 'Coimbatore', 'Puducherry', 'Warangal', 'Mangalore', 'Bhubaneswar', 'Udaipur', 'Siliguri'];
      const batches = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15'];

      const studentData = Array.from({ length: 120 }, (_, index) => {
        const firstName = firstNames[index % firstNames.length];
        const lastName = lastNames[(index * 3 + 5) % lastNames.length];
        const department = departments[index % departments.length];
        const batch = batches[index % batches.length];
        const city = cities[(index * 7 + 3) % cities.length];
        return {
          name: `${firstName} ${lastName}`,
          rollNumber: `R${String(index + 1).padStart(3, '0')}`,
          collegeId: `C${1000 + index + 1}`,
          batch,
          department,
          email: `${firstName.toLowerCase()}${lastName.toLowerCase()}${index + 1}@example.com`,
          phone: `+91 98765 ${String(10000 + index).slice(-5)}`,
          address: `${city}, India`,
          cgpa: (7.8 + ((index * 7) % 14) / 10).toFixed(1)
        };
      });

      const state = {
        search: '',
        field: 'all',
        expanded: new Set(),
      };

      const grid = document.getElementById('studentGrid');
      const searchInput = document.getElementById('searchInput');
      const filterSelect = document.getElementById('filterSelect');
      const resultsCount = document.getElementById('resultsCount');
      const visibleCount = document.getElementById('visibleCount');
      const themeToggle = document.getElementById('themeToggle');

      function matches(student, query, field) {
        const term = query.trim().toLowerCase();
        if (!term) return true;
        if (field === 'name') return student.name.toLowerCase().includes(term);
        if (field === 'rollNumber') return student.rollNumber.toLowerCase().includes(term);
        if (field === 'collegeId') return student.collegeId.toLowerCase().includes(term);
        if (field === 'batch') return student.batch.toLowerCase().includes(term);
        return [student.name, student.rollNumber, student.collegeId, student.batch, student.department, student.email]
          .join(' ')
          .toLowerCase()
          .includes(term);
      }

      function renderStudents() {
        const filtered = studentData.filter(student => matches(student, state.search, state.field));
        resultsCount.textContent = `${studentData.length} total`;
        visibleCount.textContent = `${filtered.length} visible`;

        if (!filtered.length) {
          grid.innerHTML = '<div class="empty">No students matched your search. Try a different keyword or filter.</div>';
          return;
        }

        grid.innerHTML = filtered.map(student => `
          <article class="student-card">
            <div class="card-top">
              <div>
                <div class="student-name">${student.name}</div>
                <div class="meta">${student.department} • ${student.batch}</div>
              </div>
              <span class="badge">${student.rollNumber}</span>
            </div>
            <div class="summary">
              <div class="summary-item"><span>College ID</span><strong>${student.collegeId}</strong></div>
              <div class="summary-item"><span>CGPA</span><strong>${student.cgpa}</strong></div>
            </div>
            <div class="actions">
              <button class="toggle-btn" data-id="${student.rollNumber}" type="button">${state.expanded.has(student.rollNumber) ? 'Hide Details' : 'View Details'}</button>
            </div>
            ${state.expanded.has(student.rollNumber) ? `
              <div class="details">
                <div class="details-grid">
                  <div><div class="label">Email</div><div class="value">${student.email}</div></div>
                  <div><div class="label">Phone</div><div class="value">${student.phone}</div></div>
                  <div><div class="label">Address</div><div class="value">${student.address}</div></div>
                  <div><div class="label">Batch</div><div class="value">${student.batch}</div></div>
                </div>
              </div>` : ''}
          </article>
        `).join('');
      }

      searchInput.addEventListener('input', (event) => {
        state.search = event.target.value;
        renderStudents();
      });

      filterSelect.addEventListener('change', (event) => {
        state.field = event.target.value;
        renderStudents();
      });

      grid.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-id]');
        if (!button) return;
        const id = button.getAttribute('data-id');
        if (state.expanded.has(id)) {
          state.expanded.delete(id);
        } else {
          state.expanded.add(id);
        }
        renderStudents();
      });

      function applyTheme(theme) {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      }

      function initTheme() {
        const saved = localStorage.getItem('student-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = saved || (prefersDark ? 'dark' : 'light');
        applyTheme(initialTheme);
      }

      themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('student-theme', current);
        applyTheme(current);
      });

      initTheme();
      renderStudents();

