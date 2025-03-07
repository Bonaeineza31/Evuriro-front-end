import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext,LanguageSelector } from '../src/Languages';
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
      enterDetails: 'Enter personal details to your account'
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
      enterDetails: 'Entrez vos informations personnelles'
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
      enterDetails: 'Uzuza amakuru yawe bwite'
    }
  };

  // Social login handler (placeholder)
  const handleSocialLogin = (platform) => {
    console.log(`Attempting to login with ${platform}`);
    // Implement actual social login logic
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign In:', { email, password, rememberMe });
    
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('preferredLanguage', language);
      
      navigate('/dashboard');
    } else {
      alert('Please enter valid credentials');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up:', { fullName, email, password, agreeToTerms });
    
    if (fullName && email && password && agreeToTerms) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', fullName);
      localStorage.setItem('preferredLanguage', language);
      
      navigate('/dashboard');
    } else {
      alert('Please fill all required fields');
    }
  };

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
                  />
                </div>

                <div className="form-options">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="rememberMe">{text.rememberMe}</label>
                  </div>
                  <a href="#" className="forgot-password">{text.forgotPassword}</a>
                </div>

                <button type="submit" className="submit-btn">{text.signIn}</button>

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
                    >
                      <i className="facebook-icon"></i>
                    </button>
                    <button 
                      type="button"
                      className="social-btn google"
                      onClick={() => handleSocialLogin('google')}
                    >
                      <i className="google-icon"></i>
                    </button>
                    <button 
                      type="button"
                      className="social-btn apple"
                      onClick={() => handleSocialLogin('apple')}
                    >
                      <i className="apple-icon"></i>
                    </button>
                  </div>
                </div>

                <p className="switch-form">
                  {text.noAccount} <button type="button" onClick={() => setActiveTab('signup')}>{text.signUp}</button>
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
                  />
                </div>

                <div className="checkbox-group terms">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                    required
                  />
                  <label htmlFor="agreeTerms">{text.agreeTerms}</label>
                </div>

                <button type="submit" className="submit-btn">{text.signUp}</button>

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
                    >
                      <i className="facebook-icon"></i>
                    </button>
                    <button 
                      type="button"
                      className="social-btn google" 
                      onClick={() => handleSocialLogin('google')}
                    >
                      <i className="google-icon"></i>
                    </button>
                    <button 
                      type="button"
                      className="social-btn apple"
                      onClick={() => handleSocialLogin('apple')}
                    >
                      <i className="apple-icon"></i>
                    </button>
                  </div>
                </div>

                <p className="switch-form">
                  {text.haveAccount} <button type="button" onClick={() => setActiveTab('signin')}>{text.signIn}</button>
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