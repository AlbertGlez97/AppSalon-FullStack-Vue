import { createTransporter } from "../config/nodemailer.js";

export async function sendEmailVerification( { name, email, token } ) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  // Enviar el correo electrónico
  const info = await transporter.sendMail({
  from: 'AppSalon <no-reply@appsalon.com>',
  to: email,
  subject: "AppSalon - Confirma tu cuenta",
  text: "AppSalon - Confirma tu cuenta",
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #4F46E5; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">AppSalon</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hola <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #333;">Gracias por registrarte en <strong>AppSalon</strong>. Para finalizar tu registro, por favor confirma tu cuenta haciendo clic en el siguiente botón:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">
              Confirmar cuenta
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} AppSalon. Todos los derechos reservados.
        </div>
      </div>
    </div>
  `
});

}
