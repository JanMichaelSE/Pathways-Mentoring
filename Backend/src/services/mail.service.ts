import axios from "axios";

const FROM_ADDRESS = process.env.SENDGRID_FROM_ADDRESS ?? "";
const SENGRID_API_KEY = process.env.SENDGRID_API_KEY ?? "";
const EMAIL_SEND_URL = process.env.SENDGRID_EMAIL_SEND_URL ?? "";

async function sendResetPasswordEmail(toEmail: string, accessToken: string) {
  try {
    const RESET_PASSWORD_TEMPLATE_ID =
      process.env.RESET_PASSWORD_TEMPLATE_ID ?? "";
    const email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: RESET_PASSWORD_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: toEmail,
            },
          ],
          dynamic_template_data: {
            accessToken: accessToken,
          },
        },
      ],
      reply_to: {
        email: FROM_ADDRESS,
        name: "Reply",
      },
    };

    return axios({
      method: "post",
      url: EMAIL_SEND_URL,
      headers: {
        Authorization: `Bearer ${SENGRID_API_KEY}`,
      },
      data: email,
    });
  } catch (error) {
    throw error;
  }
}

export { sendResetPasswordEmail };
