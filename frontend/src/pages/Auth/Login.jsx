import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../store/auth.store';
import { loginUser } from '../../api/auth.api';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { user, token } = response.data;
      login(user, token);
      navigate('/');
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'An error occurred during login.');
    },
  });

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">LifeJourney</h1>
        <Card>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
          {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange(setEmail)}
              name="email"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword)}
              name="password"
              required
            />
            <Button type="submit" className="w-full" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <p className="text-center text-gray-600 mt-4 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
