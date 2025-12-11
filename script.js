let selectedReason = "";
let selectedUrgency = "";

function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function chooseReason(reason) {
  selectedReason = reason;
  goToPage('page2');
}

function chooseUrgency(level) {
  selectedUrgency = level;
  goToPage('page3');
}

function sendEmail(counselorEmail) {
  const reason = selectedReason || "I need academic or personal support.";
  const urgency = selectedUrgency || "Moderate";
  const subject = "Support Request from Student";

  // Use properly encoded body text for universal compatibility
  const body = `Hello,

I would like to reach out for support.

Reason: ${reason}
Urgency: ${urgency}

Thank you,
[YOUR NAME AND GRADE]`;

  // Use a mailto: link so it opens the user’s Gmail app or Gmail web compose window
  const mailtoLink = `mailto:${encodeURIComponent(counselorEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  try {
    // Try direct navigation (works with mobile Safari + Chrome + Gmail app)
    window.location.href = mailtoLink;
  } catch (e) {
    // If blocked or not working (like Replit iframe), show a fallback message
    const fallback = document.getElementById("popupFallback") || document.createElement("div");
    fallback.id = "popupFallback";
    fallback.style.margin = "18px 12px";
    fallback.style.padding = "12px";
    fallback.style.borderRadius = "8px";
    fallback.style.background = "#fff3f3";
    fallback.style.color = "#a00";
    fallback.style.display = "block";
    fallback.innerHTML = `
      <p>Couldn’t open Gmail automatically.</p>
      <p>Please click the link below to open it manually:</p>
      <a href="${mailtoLink}" target="_blank" style="background:#d33;color:#fff;padding:10px 14px;border-radius:6px;text-decoration:none;">Open Email</a>
    `;
    document.body.appendChild(fallback);
  }
}
