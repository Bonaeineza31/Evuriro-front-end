import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext, LanguageSelector } from '../src/Languages';
import doctorImage from '../images/Premium Photo _ Beautiful smiling female doctor stand in office.jpg';
import '../styles/welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Get the API URL from environment variables
  const API_URL = process.env.REACT_APP_API_URL || 'https://evuriro-backend.vercel.app';

  const content = {
    english: {
      welcome: 'Welcome Back!',
      getStarted: 'Get Started',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      haveAccount: 'Already have an account?',
      noAccount: "Don't have an account?",
      agreeTerms: 'I agree to the processing of Personal data',
      continueWith: 'Sign in with',
      guest: 'Continue as Guest',
      enterDetails: 'Enter personal details to your account',
      loggingIn: 'Logging in...',
      signingUp: 'Signing up...',
      errorOccurred: 'An error occurred'
    },
    french: {
      welcome: 'Bon Retour!',
      getStarted: 'Commencer',
      signIn: 'Se Connecter',
      signUp: "S'inscrire",
      email: 'E-mail',
      password: 'Mot de passe',
      fullName: 'Nom complet',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      haveAccount: 'Vous avez déjà un compte?',
      noAccount: "Vous n'avez pas de compte?",
      agreeTerms: 'J\'accepte le traitement des données personnelles',
      continueWith: 'Se connecter avec',
      guest: 'Continuer en tant qu\'invité',
      enterDetails: 'Entrez vos informations personnelles',
      loggingIn: 'Connexion en cours...',
      signingUp: 'Inscription en cours...',
      errorOccurred: 'Une erreur est survenue'
    },
    kinyarwanda: {
      welcome: 'Murakaza Neza!',
      getStarted: 'Tangira',
      signIn: 'Injira',
      signUp: 'Iyandikishe',
      email: 'Imeri',
      password: 'Ijambo ryibanga',
      fullName: 'Amazina yombi',
      rememberMe: 'Unyibuke',
      forgotPassword: 'Wibagiwe ijambo ryibanga?',
      haveAccount: 'Usanzwe ufite konti?',
      noAccount: "Nta konti ufite?",
      agreeTerms: 'Nemeye gutanga amakuru yanjye bwite',
      continueWith: 'Injira ukoresheje',
      guest: 'Komeza nk\'umushyitsi',
      enterDetails: 'Uzuza amakuru yawe bwite',
      loggingIn: 'Kwinjira...',
      signingUp: 'Kwiyandikisha...',
      errorOccurred: 'Habayeho ikosa'
    }
  };

  // Social login handler (placeholder)
  const handleSocialLogin = (platform) => {
    console.log(`Attempting to login with ${platform}`);
    // Implement actual social login logic with API
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies if your backend uses them
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign in');
      }
      
      // Store user data and token
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('preferredLanguage', language);
      
      // If the backend returns a token, store it
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // If the backend returns user data, store relevant info
      if (data.user) {
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('userName', data.user.fullName || '');
      }
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || text.errorOccurred);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !agreeToTerms) {
      setErrorMessage('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          fullName, 
          email, 
          password,
          language // Send preferred language to backend
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
      
      // Store user data and token
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', fullName);
      localStorage.setItem('preferredLanguage', language);
      
      // If the backend returns a token, store it
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // If the backend returns user data, store relevant info
      if (data.user) {
        localStorage.setItem('userId', data.user._id);
      }
      
      // Navigate to dashboard after successful registration
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.message || text.errorOccurred);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for guest login
  const handleGuestLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('preferredLanguage', language);
    navigate('/dashboard');
  };

  // Add effect to check if user is already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const text = content[language];

  return (
    <div className="welcome-container">
      <div className="language-selector-container">
        <LanguageSelector />
      </div>

      <div className="welcome-content">
        <div 
          className="left-section" 
          style={{
            backgroundImage: `linear-gradient(rgba(30, 87, 153, 0.8), rgba(30, 87, 153, 0.8)), url(${doctorImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="left-content">
            <h1>{text.welcome}</h1>
            <p>{text.enterDetails}</p>
            <div className="tab-buttons-mobile">
              <button 
                className={activeTab === 'signin' ? 'active' : ''} 
                onClick={() => setActiveTab('signin')}
              >
                {text.signIn}
              </button>
              <button 
                className={activeTab === 'signup' ? 'active' : ''} 
                onClick={() => setActiveTab('signup')}
              >
                {text.signUp}
              </button>
            </div>
            <button 
              onClick={handleGuestLogin} 
              className="guest-button"
            >
              {text.guest}
            </button>
          </div>
        </div>

        <div className="right-section">
          <div className="card">
            <div className="tab-buttons">
              <button 
                className={activeTab === 'signin' ? 'active' : ''} 
                onClick={() => setActiveTab('signin')}
              >
                {text.signIn}
              </button>
              <button 
                className={activeTab === 'signup' ? 'active' : ''} 
                onClick={() => setActiveTab('signup')}
              >
                {text.signUp}
              </button>
            </div>

            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            {activeTab === 'signin' ? (
              <form onSubmit={handleSignIn} className="signin-form">
                <div className="form-group">
                  <label htmlFor="email">{text.email}</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">{text.password}</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-options">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      disabled={isLoading}
                    />
                    <label htmlFor="rememberMe">{text.rememberMe}</label>
                  </div>
                  <a href="#" className="forgot-password">{text.forgotPassword}</a>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={isLoading}
                >
                  {isLoading ? text.loggingIn : text.signIn}
                </button>

                <div className="separator">
                  <span>or</span>
                </div>

                <div className="social-login">
                  <p>{text.continueWith}</p>
                  <div className="social-icons">
                    <button 
                      type="button"
                      className="social-btn facebook"
                      onClick={() => handleSocialLogin('facebook')}
                      disabled={isLoading}
                    >
                      <i className="facebook-icon"></i>
                    </button>
                    <button 
                      type="button"
                      className="social-btn google"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                    >
                      <i className="google-icon"></i>
                    </button>
                    <button 
                      type="button"
                      className="social-btn apple"
                      onClick={() => handleSocialLogin('apple')}
                      disabled={isLoading}
                    >
                      <i className="apple-icon"></i>
                    </button>
                  </div>
                </div>

                <p className="switch-form">
                  {text.noAccount} <button type="button" onClick={() => setActiveTab('signup')} disabled={isLoading}>{text.signUp}</button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="signup-form">
                <div className="form-group">
                  <label htmlFor="fullName">{text.fullName}</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signupEmail">{text.email}</label>
                  <input
                    type="email"
                    id="signupEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signupPassword">{text.password}</label>
                  <input
                    type="password"
                    id="signupPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="checkbox-group terms">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="agreeTerms">{text.agreeTerms}</label>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? text.signingUp : text.signUp}
                </button>

                <div className="separator">
                  <span>or</span>
                </div>

                <div className="social-login">
                  <p>{text.continueWith}</p>
                  <div className="social-icons">
                    <button 
                      type="button"
                      className="social-btn facebook"
                      onClick={() => handleSocialLogin('facebook')}
                      disabled={isLoading}
                    >
                      <i className="facebook-icon"></i>
                    </button>
                    <button 
                      type="button"
                      className="social-btn google" 
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                    >
                      <i className="google-icon"></i>
                    </button>
                    <button 
                      type="button"
                      className="social-btn apple"
                      onClick={() => handleSocialLogin('apple')}
                      disabled={isLoading}
                    >
                      <i className="apple-icon"></i>
                    </button>
                  </div>
                </div>

                <p className="switch-form">
                  {text.haveAccount} <button type="button" onClick={() => setActiveTab('signin')} disabled={isLoading}>{text.signIn}</button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;