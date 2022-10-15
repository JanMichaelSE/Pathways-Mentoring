import { Request, Response } from "express";
import { sendContactFormEmail } from "../../services/mail.service";
import { handleBadRequestResponse, handleErrorResponse } from "../../utils/helpers";

async function httpSendContactFormEmail(req: Request, res: Response) {
  try {
    const name = req.body.name;
    const topic = req.body.topic;
    const phone = req.body.phone;
    const email = req.body.email;
    const message = req.body.message;

    if (!name || !topic || !phone || !email || !message) {
      return handleBadRequestResponse(
        "Can't send contact us form until all required fields are provided.",
        res
      );
    }

    let formattedName = name.replace(";", "");
    await sendContactFormEmail(formattedName, topic, phone, email, message);

    return res.status(200).json({ status: 200, message: "Contact Us Form Email has been sent." });
  } catch (error) {
    return handleErrorResponse("send contact form submission email", error, res);
  }
}

export { httpSendContactFormEmail };
