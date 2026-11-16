// Tab Switcher
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.glass-card').forEach(card => card.classList.add('hidden'));

        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.remove('hidden');
    });
});

// --- (a) Session & Usage Duration ---
const loginForm = document.getElementById('loginForm');
const activeSessionBox = document.getElementById('activeSessionBox');
const logoutSummaryBox = document.getElementById('logoutSummaryBox');
const sessionHeader = document.getElementById('sessionHeader');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('usernameInput').value.trim();
    const now = new Date();

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('startTimestamp', Date.now());

    document.getElementById('greetingHeading').textContent = `Hello, ${username}!`;
    document.getElementById('startTimeText').textContent = now.toLocaleTimeString('en-IN');

    sessionHeader.classList.remove('hidden');
    loginForm.classList.add('hidden');
    logoutSummaryBox.classList.add('hidden');
    activeSessionBox.classList.remove('hidden');
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    const username = sessionStorage.getItem('username') || 'Guest';
    const start = Number(sessionStorage.getItem('startTimestamp') || Date.now());
    const elapsed = Math.floor((Date.now() - start) / 1000);

    const hrs = String(Math.floor(elapsed / 3600)).padStart(2, '0');
    const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');

    sessionStorage.clear();

    document.getElementById('thankYouHeading').textContent = `Thank You, ${username}!`;
    document.getElementById('usageDurationText').textContent = `Duration of Usage: ${hrs} hrs : ${mins} mins : ${secs} secs`;

    sessionHeader.classList.add('hidden');
    activeSessionBox.classList.add('hidden');
    logoutSummaryBox.classList.remove('hidden');
});

document.getElementById('backToLoginBtn').addEventListener('click', () => {
    loginForm.reset();
    logoutSummaryBox.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// --- (b) Date, Time & Day ---
document.getElementById('getDateTimeBtn').addEventListener('click', () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    document.getElementById('valDate').textContent = now.toLocaleDateString('en-GB').replace(/\//g, '-');
    document.getElementById('valTime').textContent = now.toLocaleTimeString('en-IN');
    document.getElementById('valDay').textContent = days[now.getDay()];
    document.getElementById('clockGrid').classList.remove('hidden');
});

// --- (c) Age Verification ---
document.getElementById('ageVerifyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('visitorName').value.trim();
    const age = Number(document.getElementById('visitorAge').value);
    const authBanner = document.getElementById('authBanner');

    if (age < 18) {
        authBanner.textContent = `Hello ${name}, you are not authorized to visit the site`;
        authBanner.className = 'auth-banner auth-denied';
    } else {
        authBanner.textContent = 'Welcome to this site';
        authBanner.className = 'auth-banner auth-granted';
    }
    authBanner.classList.remove('hidden');
});