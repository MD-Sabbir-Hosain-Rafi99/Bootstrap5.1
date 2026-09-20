
/* ==========================================================================
   Feature 7: Current Date & Time Using JavaScript (Banglish: Real-time clock update)
   ========================================================================== */
function updateLiveDateTime() {
    const now = new Date();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const formattedDate = now.toLocaleString('en-US', options);
    const timeElem = document.getElementById('liveDateTime');
    if (timeElem) {
        timeElem.innerText = formattedDate;
    }
}
// Prottek 1 second por por clock refresh hobe
setInterval(updateLiveDateTime, 1000);
updateLiveDateTime();

/* ==========================================================================
   Feature 9: Internal Pages Linking / Page Switching Function
   (Banglish: 7 ti page er moddhe click korle dynamic show/hide korar function)
   ========================================================================== */
function navigateTo(targetPageId) {
    // Shokol page section hide korbo
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // Target page show korbo
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Navbar menu active state update kora
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    const activeNavLink = document.getElementById('nav-' + targetPageId);
    if (activeNavLink) {
        activeNavLink.classList.add('active');
    }

    // Mobile menu open thakle automatically close korbo
    const navbarCollapse = document.getElementById('schoolNavbar');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        }
    }

    // Page change er por mathay scroll korbo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   Feature 3: Confirmation popup window when submit the login form
   (Banglish: Login form submit korle Bootstrap modal show korar logic)
   ========================================================================== */
function handleLoginSubmit(event) {
    event.preventDefault(); // Default reload stop korlam

    const username = document.getElementById('loginUsername').value.trim();
    const role = document.getElementById('loginRole').value;

    if (!username) {
        showToast("Please enter your User Name / ID!");
        return;
    }

    // Modal er value gulo set kora
    document.getElementById('confirmedUserName').innerText = username;
    document.getElementById('confirmedRole').innerText = role;
    document.getElementById('confirmedToken').innerText = Math.floor(10000 + Math.random() * 90000);

    // Modal trigger kora (Never using alert or confirm)
    const modalElement = document.getElementById('loginSuccessModal');
    const loginModal = new bootstrap.Modal(modalElement);
    loginModal.show();

    // Form clear kore deya
    document.getElementById('schoolLoginForm').reset();
}

// Password show / hide switch korar function
function togglePasswordVisibility() {
    const passInput = document.getElementById('loginPassword');
    const eyeIcon = document.getElementById('togglePassIcon');
    if (passInput.type === 'password') {
        passInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

/* ==========================================================================
   Result Page Function: Department Wise & Student ID Search
   (Banglish: Result check korar interactive logic)
   ========================================================================== */
function handleResultSearch(event) {
    event.preventDefault();
    const dept = document.getElementById('resultDept').value;
    const studentId = document.getElementById('resultStudentId').value.trim();
    const outputContainer = document.getElementById('resultOutputContainer');
    const resStudentName = document.getElementById('resStudentName');
    const resMetaInfo = document.getElementById('resMetaInfo');
    const resGpaBadge = document.getElementById('resGpaBadge');
    const resSubjectList = document.getElementById('resSubjectList');

    if (!dept || !studentId) {
        showToast("Please select department and provide Student ID!");
        return;
    }

    // Mock database data for demonstration
    const mockDatabase = {
        "101": {
            name: "MD. ARIFUL ISLAM", gpa: "5.00 (A+)", subjects: [
                { sub: "Bangla", full: 100, obt: 88, grade: "A+" },
                { sub: "English", full: 100, obt: 84, grade: "A+" },
                { sub: "Higher Math", full: 100, obt: 96, grade: "A+" },
                { sub: "Physics", full: 100, obt: 92, grade: "A+" },
                { sub: "Chemistry", full: 100, obt: 89, grade: "A+" }
            ]
        },
        "102": {
            name: "NUSRAT JAHAN SHANTA", gpa: "4.89 (A)", subjects: [
                { sub: "Accounting", full: 100, obt: 85, grade: "A+" },
                { sub: "Business Org", full: 100, obt: 78, grade: "A" },
                { sub: "Finance", full: 100, obt: 82, grade: "A+" },
                { sub: "English", full: 100, obt: 74, grade: "A" },
                { sub: "Bangla", full: 100, obt: 80, grade: "A+" }
            ]
        },
        "103": {
            name: "TANVIR HASAN", gpa: "5.00 (A+)", subjects: [
                { sub: "History", full: 100, obt: 89, grade: "A+" },
                { sub: "Civics", full: 100, obt: 91, grade: "A+" },
                { sub: "Economics", full: 100, obt: 86, grade: "A+" },
                { sub: "English", full: 100, obt: 85, grade: "A+" },
                { sub: "Bangla", full: 100, obt: 88, grade: "A+" }
            ]
        }
    };

    const studentData = mockDatabase[studentId] || {
        name: "STUDENT #" + studentId,
        gpa: "4.75 (A)",
        subjects: [
            { sub: "Bangla First Paper", full: 100, obt: 81, grade: "A+" },
            { sub: "English First Paper", full: 100, obt: 76, grade: "A" },
            { sub: dept + " Major 1", full: 100, obt: 85, grade: "A+" },
            { sub: dept + " Major 2", full: 100, obt: 80, grade: "A+" },
            { sub: "ICT & Digital Skills", full: 100, obt: 92, grade: "A+" }
        ]
    };

    // UI update kora
    resStudentName.innerText = studentData.name;
    resMetaInfo.innerText = `ID / Roll: ${studentId} | Department: ${dept} | Examination Year: 2026`;
    resGpaBadge.innerText = `GPA: ${studentData.gpa}`;

    let rowsHtml = '';
    studentData.subjects.forEach(item => {
        rowsHtml += `
                    <tr>
                        <td><strong>${item.sub}</strong></td>
                        <td>${item.full}</td>
                        <td class="text-primary fw-bold">${item.obt}</td>
                        <td><span class="badge ${item.grade === 'A+' ? 'bg-success' : 'bg-primary'}">${item.grade}</span></td>
                    </tr>
                `;
    });
    resSubjectList.innerHTML = rowsHtml;
    outputContainer.style.display = 'block';

    showToast("Result successfully retrieved for ID: " + studentId);
}

/* ==========================================================================
   Download mock notification helper
   (Banglish: Download click korle toast alert dekhano)
   ========================================================================== */
function downloadNoticePdf(fileName) {
    showToast(`Generating and downloading notice file: ${fileName}`);
}

function triggerHelpMessage() {
    showToast("Please visit school admin counter or email it@idealmodel.edu.bd for password reset.");
}

// Lightweight Toast Alert Function
function showToast(message) {
    const toastBody = document.getElementById('generalToastBody');
    const toastElem = document.getElementById('generalToast');
    if (toastBody && toastElem) {
        toastBody.innerText = message;
        const toast = new bootstrap.Toast(toastElem);
        toast.show();
    }
}
