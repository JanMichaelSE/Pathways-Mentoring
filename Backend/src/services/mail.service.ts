import { IMentor } from "./../types/index.d";
import axios from "axios";

const FROM_ADDRESS = process.env.PATHWAYS_ADDRESS ?? "";
const SENGRID_API_KEY = process.env.SENDGRID_API_KEY ?? "";
const EMAIL_SEND_URL = process.env.SENDGRID_EMAIL_SEND_URL ?? "";

async function sendResetPasswordEmail(toEmail: string, accessToken: string) {
  try {
    const RESET_PASSWORD_TEMPLATE_ID = process.env.RESET_PASSWORD_TEMPLATE_ID ?? "";
    const _email = {
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

async function sendContactFormEmail(
  name: string,
  topic: string,
  phone: string,
  email: string,
  message: string
) {
  try {
    const CONTACT_US_TEMPLATE_ID = process.env.CONTACT_US_TEMPLATE_ID ?? "";
    const CONTACT_US_ADDRESS = process.env.CONTACT_US_ADDRESS ?? "";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: CONTACT_US_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: CONTACT_US_ADDRESS,
            },
          ],
          dynamic_template_data: {
            name: name,
            topic: topic,
            phone: phone,
            email: email,
            message: message,
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

async function sendRequestMentorshipEmail(toEmail: string, studentName: string, studentId: string) {
  try {
    const REQUEST_MENTORSHIP_TEMPLATE_ID = process.env.REQUEST_MENTORSHIP_TEMPLATE_ID ?? "";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: REQUEST_MENTORSHIP_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: toEmail,
            },
          ],
          dynamic_template_data: {
            name: studentName,
            studentId: studentId,
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

async function sendAcceptedMentorshipEmail(toEmail: string, mentorName: string) {
  try {
    const ACCEPTED_MENTORSHIP_TEMPLATE_ID = process.env.ACCEPTED_MENTORSHIP_TEMPLATE_ID ?? "";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: ACCEPTED_MENTORSHIP_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: toEmail,
            },
          ],
          dynamic_template_data: {
            name: mentorName,
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

async function sendCanceledMentorshipEmail(toEmail: string, name: string, studentName: string) {
  try {
    const CANCELED_MENTORSHIP_TEMPLATE_ID = process.env.CANCELED_MENTORSHIP_TEMPLATE_ID ?? "";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: CANCELED_MENTORSHIP_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: toEmail,
            },
          ],
          dynamic_template_data: {
            name: name,
            studentName: studentName,
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

async function sendRequestMentorAccessEmail(mentorId: string, mentor: IMentor) {
  try {
    const REQUEST_MENTOR_ACCESS_TEMPLATE_ID = process.env.REQUEST_MENTOR_ACCESS_TEMPLATE_ID ?? "";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: REQUEST_MENTOR_ACCESS_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: FROM_ADDRESS,
            },
          ],
          dynamic_template_data: {
            mentorId: mentorId,
            name: mentor.name,
            department: mentor.department,
            phone: mentor.phone,
            email: mentor.email,
            facultyStatus: mentor.facultyStatus,
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

async function sendApprovedMentorAccessEmail(toEmail: string) {
  try {
    const APPROVED_MENTOR_ACCESS_TEMPLATE_ID = process.env.APPROVED_MENTOR_ACCESS_TEMPLATE_ID ?? "";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: APPROVED_MENTOR_ACCESS_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: toEmail,
            },
          ],
          dynamic_template_data: {},
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

async function sendSubmitRecordEmail(toEmail: string, studentName: string, recordId: string) {
  try {
    const SUBMIT_RECORD_TEMPLATE_ID = process.env.SUBMIT_RECORD_TEMPLATE_ID ?? "";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: SUBMIT_RECORD_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: toEmail,
            },
          ],
          dynamic_template_data: {
            studentName: studentName,
            recordId: recordId,
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

async function sendRecordApprovedEmail(toEmail: string, mentorName: string) {
  try {
    const RECORD_APPROVED_TEMPLATE_ID = process.env.RECORD_APPROVED_TEMPLATE_ID ?? "";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: RECORD_APPROVED_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: toEmail,
            },
          ],
          dynamic_template_data: {
            mentorName: mentorName,
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

async function sendRecordRejectedEmail(toEmail: string, mentorName: string) {
  try {
    const RECORD_REJECTED_TEMPLATE_ID = process.env.RECORD_REJECTED_TEMPLATE_ID ?? "";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Pathways Mentoring",
      },
      template_id: RECORD_REJECTED_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: toEmail,
            },
          ],
          dynamic_template_data: {
            mentorName: mentorName,
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
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

export {
  sendResetPasswordEmail,
  sendContactFormEmail,
  sendRequestMentorshipEmail,
  sendAcceptedMentorshipEmail,
  sendCanceledMentorshipEmail,
  sendRequestMentorAccessEmail,
  sendApprovedMentorAccessEmail,
  sendSubmitRecordEmail,
  sendRecordApprovedEmail,
  sendRecordRejectedEmail,
};
