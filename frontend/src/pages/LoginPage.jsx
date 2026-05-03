import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/usersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { Sparkles, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // If the user was redirected here from checkout, we send them back after login
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // If the user is already logged in, redirect them
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // 1. Call the backend
      const res = await login({ email, password }).unwrap();
      // 2. Save user to Redux and LocalStorage
      dispatch(setCredentials({ ...res }));
      // 3. Redirect
      navigate(redirect);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Sparkles className="mx-auto h-10 w-10 text-[#E5A3B8]" />
        <h2 className="mt-6 text-center text-3xl font-serif font-bold tracking-tight text-[#333333]">
          Connexion à votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Ou{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-medium text-[#E5A3B8] hover:text-[#333333] transition-colors">
            créer un compte client
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-xl sm:rounded-sm sm:px-10 border border-gray-100">
          
          <form className="space-y-6" onSubmit={submitHandler}>
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-500 p-3 text-sm rounded-sm text-center border border-red-100">
                {error?.data?.message || 'Une erreur est survenue'}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 uppercase tracking-widest text-xs">
                Adresse Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-[#E5A3B8] focus:outline-none focus:ring-[#E5A3B8] sm:text-sm transition-colors"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 uppercase tracking-widest text-xs">
                Mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-[#E5A3B8] focus:outline-none focus:ring-[#E5A3B8] sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-500 hover:text-[#E5A3B8] transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center items-center gap-2 rounded-sm border border-transparent bg-[#333333] py-4 px-4 text-sm font-medium uppercase tracking-widest text-white shadow-sm hover:bg-[#E5A3B8] hover:text-[#333333] transition-all disabled:opacity-50"
              >
                {isLoading ? 'Connexion...' : 'Se Connecter'} <ArrowRight size={18} />
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;