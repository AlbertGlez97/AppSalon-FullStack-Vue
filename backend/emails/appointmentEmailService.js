import { createTransporter } from "../config/nodemailer.js";

export async function sendEmailNewAppointment({ date, time }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  // Enviar el correo electrónico
  const info = await transporter.sendMail({
    from: "AppSalon <no-reply@appsalon.com>",
    to: "admin@appsalon.com",
    subject: "AppSalon - Nueva Cita",
    text: "AppSalon - Nueva Cita",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #4F46E5; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">AppSalon</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hola <strong>Admin</strong>, tienes una nueva cita</p>
          <p style="font-size: 16px; color: #333;">La cita será: ${date} a las ${time}</p>         
        </div>
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} AppSalon. Todos los derechos reservados.
        </div>
      </div>
    </div>
  `,
  });
}

export async function sendEmailUpdateAppointment({ date, time }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  // Enviar el correo electrónico
  const info = await transporter.sendMail({
    from: "AppSalon <no-reply@appsalon.com>",
    to: "admin@appsalon.com",
    subject: "AppSalon - Cita Actualizada",
    text: "AppSalon - Cita Actualizada",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #4F46E5; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">AppSalon</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hola <strong>Admin</strong>, un usuario a modificado una cita </p>
          <p style="font-size: 16px; color: #333;">La nueva cita será: ${date} a las ${time}</p>         
        </div>
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} AppSalon. Todos los derechos reservados.
        </div>
      </div>
    </div>
  `,
  });
}

export async function sendEmailDeleteAppointment({ date, time }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  // Enviar el correo electrónico
  const info = await transporter.sendMail({
    from: "AppSalon <no-reply@appsalon.com>",
    to: "admin@appsalon.com",
    subject: "AppSalon - Cita Cancelada",
    text: "AppSalon - Cita Cancelada",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #4F46E5; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">AppSalon</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hola <strong>Admin</strong>, un usuario a cancelado una cita </p>
          <p style="font-size: 16px; color: #333;">La cita estaba programada para: ${date} a las ${time}</p>         
        </div>
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} AppSalon. Todos los derechos reservados.
        </div>
      </div>
    </div>
  `,
  });
}