import Database from 'better-sqlite3';
import path from 'path';

export async function post({ request }) {
  const dbPath = path.resolve('sqldatabase.db');
  const db = new Database(dbPath);

  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(JSON.stringify({
        isValid: false,
        message: 'Nombre de usuario o contraseña no proporcionados.',
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const user = db.prepare(query).get(username, password);

    if (user) {
      return new Response(JSON.stringify({
        isValid: true,
        message: 'Usuario válido',
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({
      isValid: false,
      message: 'Usuario no encontrado o credenciales incorrectas.',
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al validar el usuario:', error);
    return new Response(JSON.stringify({
      isValid: false,
      message: 'Error interno del servidor.',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}