import { nume } from '@/config/site';
import React from 'react';
import './LoginPage.css'
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const AuthInput = ({ label, type, placeholder, icon, required = true }) => {
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
        />
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <div className='loginClientContainer'>
      <section>
        {/* <img src='/assets/image.png'/> */}
        <div className='imageContent'>
          <h1>{nume}</h1>
          <h3>Redescoperă magia sunetului autentic.</h3>
        </div>
      </section>
      <form>
        <div className='authHeader'>
          <h1>Bun venit înapoi!</h1>
          <p>Conectează-te la contul tău</p>
        </div>
        <div>
          <AuthInput label={"Email"} type={"email"} placeholder={"marinescu@email.com"} icon={<MdEmail />} />
          <AuthInput label={"Parolă"} type={"password"} placeholder={"••••••••"} icon={<FaLock />} />
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
        <button className='login-btn' type='submit'>Intră în cont</button>
        <div className='continue-with'>
          <div className='line2' />
          <p>Sau continuă cu</p>
          <div className='line' />
        </div>
        <div className='continue_with_buttons'>
          <button className="continueGoogle-btn"><FcGoogle /> Google</button>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20 }}>Nu ai cont? <a href='/user/login?type=sign up'>Înscrie-te</a></p>
      </form>
    </div>
  )
}

const SignUp = () => {
  return (
    <div className='loginClientContainer'>
      <section>
        {/* <img src='/assets/image.png'/> */}
        <div className='imageContent'>
          <h1>{nume}</h1>
          <h3>Începe-ți propria colecție de discuri.</h3>
        </div>
      </section>
      <form>
        <div className='authHeader'>
          <h1>Pune muzica pe primul loc</h1>
          <p>Creează un cont pentru a accesa colecții exclusive.</p>
        </div>
        <div>
          <AuthInput label={"Nume complet"} type={"text"} placeholder={"ex. Ion Popescu"} icon={<MdEmail />} />
          <AuthInput label={"Email"} type={"email"} placeholder={"nume@exemplu.com"} icon={<MdEmail />} />
          <AuthInput label={"Parolă"} type={"password"} placeholder={"••••••••"} icon={<FaLock />} />
          <AuthInput label={"Confirmă parola"} type={"password"} placeholder={"••••••••"} icon={<FaLock />} />
        </div>
        <div className="auth-options">
          <label className="remember-me">
            <input type="checkbox" required/>
            <span>Sunt de acord cu <a>Termenii și Condițiile</a> site-ului.</span>
          </label>
        </div>
        <button className='login-btn' type='submit'>Creează cont</button>
        <div className='continue-with'>
          <div className='line2' />
          <p>Sau înregistrează-te cu</p>
          <div className='line' />
        </div>
        <div className='continue_with_buttons'>
          <button className="continueGoogle-btn"><FcGoogle /> Google</button>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20 }}>Ai deja un cont? <a href='/user/login?type=sign in'>Autentifică-te</a></p>
      </form>
    </div>
  )
}

const ClientLogin = ({ type }) => {
  return (
    <div className='loginClientPage'>
      {
        type === "sign up" ? <SignUp /> : <Login />
      }
    </div>
  );
}

export default ClientLogin;
