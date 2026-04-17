'use client';

import { nume } from '@/config/site';
import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  auth,
  googleProvider
} from '@/lib/firebaseClient';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { createUserProfile } from './userFunctions';

const AuthInput = ({
  label,
  type,
  placeholder,
  icon,
  value,
  onChange,
  required = true,
  name,
}) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <span className="input-icon">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="custom-input"
          required={required}
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </div>
  );
};

const ClientLogin = ({ type: initialType }) => {
  const [mode, setMode] = useState(initialType === "sign up" ? "sign up" : "sign in");
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const { user, loading } = useAuth();
  const nav = useRouter();

  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);



  const handleGoogleLogin = async () => {
    try {
      setError('');
      const result = await signInWithPopup(auth, googleProvider);

      await createUserProfile(result.user);

      console.log("Google login success:", result.user);
    } catch (error) {
      console.error("Google login error:", error.code, error.message);
      setError("Autentificarea cu Google a eșuat.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      return setError("Te rog introdu numele complet.");
    }

    if (signUpPassword.length < 6) {
      return setError("Parola trebuie să aibă cel puțin 6 caractere.");
    }

    if (signUpPassword !== confirmPassword) {
      return setError("Parolele nu coincid.");
    }

    try {
      setSubmitting(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );

      await updateProfile(userCredential.user, {
        displayName: fullName,
        logged_with: userCredential.user.providerId
      });
      await createUserProfile(userCredential.user, { fullName });

      console.log("Cont creat:", userCredential.user);
    } catch (error) {
      console.error("Sign up error:", error.code, error.message);

      switch (error.code) {
        case 'auth/email-already-in-use':
          setError("Există deja un cont cu acest email.");
          break;
        case 'auth/invalid-email':
          setError("Email invalid.");
          break;
        case 'auth/weak-password':
          setError("Parola este prea slabă.");
          break;
        default:
          setError("Nu am putut crea contul. Încearcă din nou.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setSubmitting(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPassword
      );

      console.log("Login reușit:", userCredential.user);
    } catch (error) {
      console.error("Sign in error:", error.code, error.message);

      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          setError("Email sau parolă incorectă.");
          break;
        case 'auth/invalid-email':
          setError("Email invalid.");
          break;
        default:
          setError("Nu am putut face autentificarea.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("User:", user);

    if (!loading && user) {
      nav.push("/");
    }
  }, [user, loading, nav]);

  const switchTo = (newMode) => {
    if (newMode === mode || animating) return;
    const dir = newMode === "sign up" ? "to-signup" : "to-signin";
    setDirection(dir);
    setAnimating(true);
    setError('');

    setTimeout(() => {
      setMode(newMode);
      setAnimating(false);
      setDirection(null);
    }, 420);
  };

  const panelClass = [
    'auth-panel',
    animating && direction === 'to-signup' ? 'slide-out-left' : '',
    animating && direction === 'to-signin' ? 'slide-out-right' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className='loginClientPage'>
      <div className='loginClientContainer'>
        <section>
          <div className='imageContent'>
            <h1>{nume}</h1>
            <h3>
              {mode === 'sign up'
                ? 'Începe-ți propria colecție de discuri.'
                : 'Redescoperă magia sunetului autentic.'}
            </h3>
            <div className="mode-dots">
              <button
                className={`mode-dot ${mode === 'sign in' ? 'active' : ''}`}
                onClick={() => switchTo('sign in')}
                aria-label="Sign In"
              />
              <button
                className={`mode-dot ${mode === 'sign up' ? 'active' : ''}`}
                onClick={() => switchTo('sign up')}
                aria-label="Sign Up"
              />
            </div>
          </div>
        </section>

        <div className="form-viewport">
          <div className={panelClass} key={mode}>
            {mode === "sign up" ? (
              <form onSubmit={handleSignUp}>
                <div className='authHeader'>
                  <h1>Pune muzica pe primul loc</h1>
                  <p>Creează un cont pentru a accesa colecții exclusive.</p>
                </div>

                <div>
                  <AuthInput
                    label="Nume complet"
                    type="text"
                    placeholder="ex. Ion Popescu"
                    icon={<FaUser />}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    name="fullName"
                  />
                  <AuthInput
                    label="Email"
                    type="email"
                    placeholder="nume@exemplu.com"
                    icon={<MdEmail />}
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    name="signUpEmail"
                  />
                  <AuthInput
                    label="Parolă"
                    type="password"
                    placeholder="••••••••"
                    icon={<FaLock />}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    name="signUpPassword"
                  />
                  <AuthInput
                    label="Confirmă parola"
                    type="password"
                    placeholder="••••••••"
                    icon={<FaLock />}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                  />
                </div>

                <div className="auth-options">
                  <label className="remember-me">
                    <input type="checkbox" required />
                    <span>Sunt de acord cu <a href="#">Termenii și Condițiile</a> site-ului.</span>
                  </label>
                </div>

                {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}

                <button className='login-btn' type='submit' disabled={submitting}>
                  {submitting ? 'Se creează...' : 'Creează cont'}
                </button>

                <div className='continue-with'>
                  <div className='line2' />
                  <p>Sau înregistrează-te cu</p>
                  <div className='line' />
                </div>

                <div className='continue_with_buttons'>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleGoogleLogin();
                    }}
                    className="continueGoogle-btn"
                    type="button"
                  >
                    <FcGoogle /> Google
                  </button>
                </div>

                <p style={{ textAlign: 'center', marginTop: 20 }}>
                  Ai deja un cont?{' '}
                  <button type="button" className="switch-link" onClick={() => switchTo('sign in')}>
                    Autentifică-te
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignIn}>
                <div className='authHeader'>
                  <h1>Bun venit înapoi!</h1>
                  <p>Conectează-te la contul tău</p>
                </div>

                <div>
                  <AuthInput
                    label="Email"
                    type="email"
                    placeholder="marinescu@email.com"
                    icon={<MdEmail />}
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    name="signInEmail"
                  />
                  <AuthInput
                    label="Parolă"
                    type="password"
                    placeholder="••••••••"
                    icon={<FaLock />}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    name="signInPassword"
                  />
                </div>

                <div className="auth-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Ține-mă minte</span>
                  </label>
                  <a href="/forgot-password" title="Recuperare parolă" className="forgot-link">
                    Ai uitat parola?
                  </a>
                </div>

                {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}

                <button className='login-btn' type='submit' disabled={submitting}>
                  {submitting ? 'Se conectează...' : 'Intră în cont'}
                </button>

                <div className='continue-with'>
                  <div className='line2' />
                  <p>Sau continuă cu</p>
                  <div className='line' />
                </div>

                <div className='continue_with_buttons'>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleGoogleLogin();
                    }}
                    className="continueGoogle-btn"
                    type="button"
                  >
                    <FcGoogle /> Google
                  </button>
                </div>

                <p style={{ textAlign: 'center', marginTop: 20 }}>
                  Nu ai cont?{' '}
                  <button type="button" className="switch-link" onClick={() => switchTo('sign up')}>
                    Înscrie-te
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;