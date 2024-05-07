import { Prisma, PrismaClient } from "@prisma/client";
import moment from "moment";
import nodemailer from "nodemailer";
import { OtpController } from "../controllers/otpController.js";

export const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * @param {string} email
 * @returns {boolean}
 */

export function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

/**
 * @returns {string}
 * */
export function getSecretToken() {
  return process.env.TOKEN_SECRET;
}

/**
 * @param {import("express").Request} req
 * */
export function getTokenFromHeader(req) {
  if (!req.headers.authorization) {
    return null;
  }
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  return token;
}

/**
 * @param {Error} error
 * @param {string} message
 * @returns {string}
 * */
export function debugError(error, message = "Internal server error") {
  if (process.env.NODE_ENV === "development") {
    return error.message;
  } else {
    return message;
  }
}

/**
 * @param {import("express").Request} req
 * @param {string[]} arg
 * @returns {string}
 * */
export function missingArgsFromReqBody(req, arg) {
  const missing = [];

  for (const a of arg) {
    if (!req.body[a]) {
      missing.push(a);
    }
  }

  return missing.join(", ");
}

/**
 * @param {string} str
 * @returns {string}
 * */
export function makeStringBetter(str) {
  return str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

/**
 * @param {string} date
 * @returns {string}
 * */
export function makeDateBetter(date) {
  return moment(date).calendar();
}

/**
 * @param {string} to
 * @param {string} userId
 * @returns {void}
 * */
export async function sendEmail(to, userId) {
  const otp = OtpController.generateOTP();

  // Create a 3min expiration time
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 3);

  try {
    transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to,
        subject: "Verification code",
        html: `
    <div
      style="
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <p>Your verification code is: <strong>${otp}</strong></p>

      <p>This email is sent due to login attempt at ${new Date().toLocaleString()}</p>
      <p>If you did not attempt to login, please ignore this email.</p>
    </div>

    <p style="font-size: 12px; color: #999; margin-top: 20px">
      This message is automatically generated. Do not reply to this email.
    </p>
      `,
      },
      (err, info) => {
        if (err) {
          console.error("Error Occured: " + err);
        } else {
          console.log(info);
        }
      },
    );

    await OtpController.create(otp, userId);
  } catch (error) {
    console.error(error);
  }
}

export function sendEmailVerification(to, tokenId) {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to,
      subject: "Email verification",
      html: `
    <div
      style="
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <p>Click the link below to verify your email:</p>

      <a href="${process.env.CLIENT_URL}/users/verify-email/${tokenId}" style="display: block; margin-top: 10px; color: #007bff; text-decoration: none;">
        Verify email
      </a>

      <p>This email is sent due to registration at ${new Date().toLocaleString()}</p>
      <p>If you did not register, please ignore this email.</p>
    </div>

    <p style="font-size: 12px; color: #999; margin-top: 20px">
      This message is automatically generated. Do not reply to this email.
    </p>
      `,
    },
    (err, info) => {
      if (err) {
        console.error("Error Occured: " + err);
      } else {
        console.log(info);
      }
    },
  );
}

/**
 * @param {string[]} users
 * @param {import("@prisma/client").News} news
 * @returns {void}
 * */
export function sendNewsToSubscribers(users, news) {
  transporter.sendMail({
    from: process.env.MAIL_USER,
    to: users.join(", "),
    subject: "Latest news",
    html: `
    <div
      style="
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <p>Here are the latest news:</p>

      <p>${news.title}</p>

      <p>This email is sent due to the latest news at ${new Date().toLocaleString()}</p>
      <p>If you do not want to receive these emails, <a href="${process.env.CLIENT_URL}/news/unsubscribe"></a></p>
    </div>
      `,
  });
}

export const resultSelectUser = {
  id: true,
  name: true,
  email: true,
  role: true,
  imageUrl: true,
  emailVerified: true,
};

export const resultSelectEvent = {
  id: true,
  title: true,
  description: true,
  date: true,
  location: true,
  imageUrl: true,
  categories: {
    select: {
      id: true,
      name: true,
    },
  },

  host: {
    select: {
      user: {
        select: resultSelectUser,
      },
    },
  },
  attendees: {
    select: resultSelectUser,
  },
};
