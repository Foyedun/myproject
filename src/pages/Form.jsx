import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formField } from '@/constant/index.js';
import { useLocationCust } from '@/customHook/useLocation.js';
import FormInput from '@/component/FormInput.jsx';
import FormImage from '@/component/FormImage.jsx';
import ConfirmationPopup from '@/component/ConfirmationPopup.jsx';


// TODO: fix form switching logic while field is been entered
const Form = () => {
  const initialLoginState = {
    user_name: '',
    password: '',
  };
  const initialRegisterState = {
    email: '',
    user_name: '',
    password: '',
  };
  const location = useLocationCust();
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('');
  const [rememberLogin, setRememberLogin] = useState(false);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [formData, setFormData] = useState(
    location.pathname === '/login' ? initialLoginState : initialRegisterState
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (typeof value == 'string') {
      setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === '/login') {
      const { email, remember_me, ...other } = formData;
      console.log({ remember_me: rememberLogin, ...other });
    }
    if (location.pathname === '/register') {
      const { remember_me, ...other } = formData;
      console.log({ ...other });
    }
  };

  const warningPopUp = () => {
    if (activeForm.trim() != '') {
      let finalCheck = '';
      const newObj = {};
      const res = Object.entries(formData).map(
        ([key, value]) => (newObj[key] = value)
      );

      finalCheck = res.filter((val) => val !== '').map((e) => e);

      if (finalCheck.length != 0) {
        setDisplayPopup(true);
        console.log(res);
      }
    }
    return;
  };

  const confirmPopup = (value) => {
    if (value === 'yes') {
      setFormData(initialLoginState || initialRegisterState);
      // setRememberLogin(!rememberLogin);
      // setFormData((prevData) => ({ ...prevData, remember_me: !rememberLogin }));
      setDisplayPopup(false);
      navigate(`/${activeForm}`); // redirect
    } else {
      setDisplayPopup(false);
    }
  };

  const rememberMe = () => {
    if (location.pathname === '/login') {
      setRememberLogin(!rememberLogin);
      setFormData((prevData) => ({ ...prevData, remember_me: !rememberLogin }));
    }
  };
  return (
    <div className='relative flex px-5 lg:p-10 lg:h-screen'>
      <FormImage location={location} />
      <div className='w-full lg:w-1/2 flex h-screen lg:h-auto items-center'>
        <div className=' flex flex-col px-2 w-full lg:w-4/5 mx-auto lg:h-4/5'>
          <LoginOrRegisterFormButtonSwitch
            setActiveForm={setActiveForm}
            warningPopUp={warningPopUp}
          />
          <form onSubmit={handleSubmit} className='my-4'>
            {location.pathname === '/login' && (
              <>
                {formField.login.map((field) => (
                  <FormInput
                    htmlFor={field.htmlFor}
                    labelText={field.labelText}
                    id={field.id}
                    placeHolder={field.placeHolder}
                    type={field.type}
                    name={field.name}
                    key={field.id}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                ))}
                <div className='flex justify-between items-center my-6'>
                  <label htmlFor='remember' className='flex items-center gap-1'>
                    <input
                      id='remember'
                      type='checkbox'
                      name='remember'
                      className='accent-green'
                      onChange={rememberMe}
                      checked={rememberLogin}
                    />
                    Remember me
                  </label>
                  <Link to='/reset-password'>
                    <span className='cursor-pointer hover:text-green'>
                      Forgotten Password?
                    </span>
                  </Link>
                </div>
              </>
            )}
            {location.pathname === '/register' &&
              formField.signup.map((field) => (
                <FormInput
                  htmlFor={field.htmlFor}
                  labelText={field.labelText}
                  id={field.id}
                  placeHolder={field.placeHolder}
                  type={field.type}
                  name={field.name}
                  key={field.id}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}

            <div className='flex justify-end w-full my-4'>
              {location.pathname === '/login' && (
                <button className='bg-green text-white rounded-full w-1/2 h-12.5'>
                  Login
                </button>
              )}
              {location.pathname === '/register' && (
                <button className='bg-green text-white rounded-full w-1/2 h-12.5'>
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {displayPopup && <ConfirmationPopup confirmPopup={confirmPopup} />}
    </div>
  );
};

export default Form;
