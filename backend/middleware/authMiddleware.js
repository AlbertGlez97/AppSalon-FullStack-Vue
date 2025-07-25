import jwt from 'jsonwebtoken'; // Importar la librería jsonwebtoken
import User from '../models/User.js'; // Importar el modelo de usuario

const authMiddleware = async (req , res, next ) => {

    if(!req.headers.authorization) {
        const error = new Error("Token no válido o inexistente");
        return res.status(403).json({
            msg: error.message,
        });
    }else {
        // Extraer el token del encabezado de autorización
        const token = req.headers.authorization.split(' ')[1];

        try {
            // Verificar el token y obtener el ID del usuario
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
           
            // Buscar el usuario por su ID
            req.user = await User.findById(decoded.id).select('-password -verified -token -__v'); // Excluir el campo de contraseña, verificación y token del resultado

            next(); // Continuar con la siguiente función de middleware o controlador
        } catch (error) {
            console.error("Error al verificar el token:", error);
            return res.status(403).json({
                msg: "Token no válido",
            });
        }
    }
}

export default authMiddleware;