import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formField } from '@/constant/index.js';
import SiteLogo from '../assets/itoko.png'; // Import your logo image
import Button from './Button.jsx';

const Footer = () => {
  const [formData, setFormData] = useState({ email: '' });
  const emailField = formField.signup.find((field) => field.id === 'email');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <footer className='flex justify-center bg-black md:px-[10%]'> {/* Changed background color to white */}
      <div className='flex flex-col px-2 py-4 md:px-0 gap-4 w-full md:w-1/2 text-footerText'>
        <div className='flex justify-center items-center gap-4'>
          <span className='border border-t-0 border-l-0 border-b-0 border-r-footerText pr-4'>
            <Link to='/'>
              <img src={SiteLogo} alt="Site Logo" width='100' /> {/* Use your logo here */}
            </Link>
          </span>

          <div className='flex flex-col'>
            <p className='p'>for more</p>
            <p className='p'>information</p>
          </div>
        </div>
        <div>
          <p className='text-center my-4 font-medium md:font-semibold text-lg'>
            Subscribe to our Newsletter
          </p>
          <form className='flex gap-2 md:gap-4'>
            <input
              type={emailField.type}
              name={emailField.name}
              id={emailField.id}
              className='rounded-3xl py-2 px-6 h-12.5 w-3/5 md:w-4/5 outline-none bg-transparent border border-footerText'
              placeholder='Your Email'
              value={formData[emailField.name]}
              onChange={handleChange}
              required
            />
            <Button
              style={'bg-pantone-555c text-white h-12.5 w-2/5 rounded-full'}
              onClick={handleSubmit}>
              Subscribe
            </Button>
          </form>
        </div>
        <div className='flex mx-auto text-sm'>
          <p className='after:content-["|"] after:mx-2 '>Careers</p>
          <p className='after:content-["|"] after:mx-2 '>Privacy Policy</p>
          <p className=''>Terms & Conditions</p>
        </div>
        <p className='text-center m-0 text-sm'>
          &copy; 2024 Fabulous Oyedun {/* Updated copyright name */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
