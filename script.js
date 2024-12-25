// Store members and attendance in memory
let gymMembers = [];
let attendanceRecords = [];

// DOM elements
const addMemberForm = document.getElementById('add-member-form');
const membersList = document.getElementById('members');
const attendanceForm = document.getElementById('attendance-form');
const attendanceDate = document.getElementById('attendance-date');
const attendanceMemberSelect = document.getElementById('attendance-member');
const attendanceSheet = document.getElementById('attendance-sheet');

// Function to render member list
function renderMembers() {
    membersList.innerHTML = '';
    gymMembers.forEach((member, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${member.name} (${member.email}) 
                        <button onclick="removeMember(${index})">Remove</button>`;
        membersList.appendChild(li);
    });

    // Update attendance member select options
    updateAttendanceMemberSelect();
}

// Function to update the select dropdown for attendance
function updateAttendanceMemberSelect() {
    attendanceMemberSelect.innerHTML = '';
    gymMembers.forEach((member, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = member.name;
        attendanceMemberSelect.appendChild(option);
    });
}

// Function to add a new member
addMemberForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    gymMembers.push({ name, email });

    renderMembers();
    
    // Reset form fields
    addMemberForm.reset();
});

// Function to remove a member
function removeMember(index) {
    gymMembers.splice(index, 1);
    renderMembers();
}

// Function to mark attendance
attendanceForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const date = attendanceDate.value;
    const memberIndex = attendanceMemberSelect.value;

    if (date && memberIndex !== "") {
        const member = gymMembers[memberIndex];
        attendanceRecords.push({ date, name: member.name, status: 'Present' });

        renderAttendanceSheet();
        attendanceForm.reset();
    }
});

// Function to render attendance sheet
function renderAttendanceSheet() {
    const tbody = attendanceSheet.querySelector('tbody');
    tbody.innerHTML = '';

    attendanceRecords.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${record.date}</td>
            <td>${record.name}</td>
            <td>${record.status}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Initial render
renderMembers();
