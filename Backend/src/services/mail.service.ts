import axios from "axios";

const FROM_ADDRESS = "pathways.mentoring@outlook.com";
const SENGRID_API_KEY = process.env.SENDGRID_API_KEY ?? "";
const EMAIL_SEND_URL = "https://api.sendgrid.com/v3/mail/send";
const RESET_PASSWORD_TEMPLATE_ID = "d-b93007c3d5ec4969aa37328c721b183d";

async function sendResetPasswordEmail(toEmail: string, accessToken: string) {
  try {
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
