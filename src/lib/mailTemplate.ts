export function generateEmailTemplate({
  title = "Notification",
  message = "",
  otp = "",
  validity = "10 minutes",
  ctaLabel = "Visit Ninja AI",
  ctaUrl = "https://ninja-ai.org",
}: {
  title?: string;
  message?: string;
  otp?: string;
  validity?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}) {
  return `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 450px;
      margin: auto;
      padding: 20px;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      background: #fafafa;
    ">
      <h2 style="color: #000; text-align: center; margin-top: 0;">
        ${title}
      </h2>

      <p style="font-size: 14px; color: #333;">
        ${message}
      </p>

      ${
        otp
          ? `
        <div style="
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          letter-spacing: 6px;
          padding: 10px 0;
          margin: 15px 0;
          background: #fff;
          border: 1px dashed #000;
          border-radius: 4px;
        ">
          ${otp}
        </div>
        <p style="font-size: 13px; color: #555;">
          This code is valid for <b>${validity}</b>.
        </p>
      `
          : ""
      }

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

      <p style="font-size: 12px; color: #666; text-align: center;">
        With gratitude,<br>
        <b>Ninja AI Team</b>
      </p>

      <p style="text-align: center; margin-top: 10px;">
        <a href="${ctaUrl}" 
           style="background: black; color: white; padding: 10px 18px; text-decoration: none; 
                  font-size: 12px; border-radius: 4px;">
          ${ctaLabel}
        </a>
      </p>
    </div>
  `;
}
