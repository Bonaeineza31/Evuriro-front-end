import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Notify } from 'notiflix';
import { LanguageContext, LanguageSelector } from '../src/Languages';
import doctorImage from '../images/Premium Photo _ Beautiful smiling female doctor stand in office.jpg';
import '../styles/welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState('signin');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Setup React Hook Form
  const { 
    register: registerSignIn, 
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn }
  } = useForm();

  const { 
    register: registerSignUp, 
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp }
  } = useForm();

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

  // API URL
  const API_URL = 'https://evuriro-backend.vercel.app';

  // Updated sign-in handler with React Hook Form and Axios
  const onSubmitSignIn = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      console.log("Connecting to:", `${API_URL}/user/login`);
      
      const response = await axios.post(`${API_URL}/user/login`, {
        email: data.email,
        password: data.password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true // equivalent to credentials: 'include'
      });
      
      console.log("Login response:", response);
      
      const userToken = response.data;
      
      // Store user data and token
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('preferredLanguage', language);
      
      // If the backend returns a token, store it
      if (userToken.token) {
        localStorage.setItem('token', userToken.token);
      }
      
      // If the backend returns user data, store relevant info
      if (userToken.user) {
        localStorage.setItem('userId', userToken.user.id || userToken.user._id);
        localStorage.setItem('userName', userToken.user.name);
        localStorage.setItem('role', userToken.user.role);
      }
      
      Notify.success('Login Successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.message || text.errorOccurred;
      setErrorMessage(errorMsg);
      Notify.failure(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Updated sign-up handler with React Hook Form and Axios
  const onSubmitSignUp = async (data) => {
    if (!agreeToTerms) {
        setErrorMessage("Please agree to the terms");
        return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
        console.log("Sending signup request with data:", JSON.stringify(data, null, 2));

        const response = await axios.post(`${API_URL}/user/register`, {
            name: data.name,
            email: data.email,
            password: data.password,
            role: "patient"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });

        console.log("Register response:", response);

        Notify.success("Registration Successful");
        navigate("/dashboard");
    } catch (error) {
        console.error("Registration error:", error);
        console.error("Error response:", error.response?.data);
        setErrorMessage(error.response?.data?.message || "An error occurred");
        Notify.failure(error.response?.data?.message || "An error occurred");
    } finally {
        setIsLoading(false);
    }
};

  // Handler for social login (placeholder)
  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
  };

  // Handler for guest login
  const handleGuestLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('preferredLanguage', language);
    navigate('/login');
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
              <form onSubmit={handleSubmitSignIn(onSubmitSignIn)} className="signin-form">
                <div className="form-group">
                  <label htmlFor="email">{text.email}</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@mail.com"
                    disabled={isLoading}
                    {...registerSignIn('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid email format'
                      }
                    })}
                  />
                  {errorsSignIn.email && <span className="error-text">{errorsSignIn.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">{text.password}</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    {...registerSignIn('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  {errorsSignIn.password && <span className="error-text">{errorsSignIn.password.message}</span>}
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
              <form onSubmit={handleSubmitSignUp(onSubmitSignUp)} className="signup-form">
                <div className="form-group">
                  <label htmlFor="fullName">{text.fullName}</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    disabled={isLoading}
                    {...registerSignUp('name', { 
                      required: 'Full name is required'
                    })}
                  />
                  {errorsSignUp.name && <span className="error-text">{errorsSignUp.name.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="signupEmail">{text.email}</label>
                  <input
                    type="email"
                    id="signupEmail"
                    placeholder="example@mail.com"
                    disabled={isLoading}
                    {...registerSignUp('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid email format'
                      }
                    })}
                  />
                  {errorsSignUp.email && <span className="error-text">{errorsSignUp.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="signupPassword">{text.password}</label>
                  <input
                    type="password"
                    id="signupPassword"
                    placeholder="••••••••"
                    disabled={isLoading}
                    {...registerSignUp('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  {errorsSignUp.password && <span className="error-text">{errorsSignUp.password.message}</span>}
                </div>

                <div className="checkbox-group terms">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
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