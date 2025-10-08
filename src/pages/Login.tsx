import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { SignJWT } from 'jose';

const JWT_SECRET = 'assitclass-dev-secret-2024';

export const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('admin@assitclass.com');
  const [role, setRole] = useState<'admin' | 'profesor' | 'estudiante'>('admin');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = '123';
      const secret = new TextEncoder().encode(JWT_SECRET);

      const token = await new SignJWT({ userId, role, email })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(secret);

      const user = { userId, email, role };

      login(token, user);
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Error al generar token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">AssitClass</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-400">Sistema de Reportes de Asistencia</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium mb-1">Rol</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
              >
                <option value="admin">Admin</option>
                <option value="profesor">Profesor</option>
                <option value="estudiante">Estudiante</option>
              </select>
            </div>

            <Button type="submit" className="w-full" isLoading={loading}>
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
