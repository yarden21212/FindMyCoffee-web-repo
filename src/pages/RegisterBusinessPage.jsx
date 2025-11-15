// import { useState } from 'react';
// import axios from 'axios';
// import bgImage from "../assets/pictures/cup-with-beans-spreaded.png";
// import Header from '../components/Header';

// export default function RegisterPage() {
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [DOB, setDOB] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [businessName, setBusinessName] = useState('');
//   const [type, setType] = useState('');
//   const [title, setTitle] = useState('');
//   const [country, setCountry] = useState('');
//   const [city, setCity] = useState('');
//   const [street, setStreet] = useState('');
//   const [state, setState] = useState('');
//   const [priceLevel, setPriceLevel] = useState('');
//   const [vicinity, setVicinity] = useState('');
//   const [photo, setPhoto] = useState('');
//   const [gender, setGender] = useState(''); // '1' | '2' | '3'
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (submitting) return;

//     setError('');
//     setSuccess('');

//     // Basic client-side checks
//     if (!userName || !email || !DOB || !password || !confirmPassword || !firstName || !lastName || !businessName || !type || !title ||
//       !country || !city || !street || !state || !priceLevel || !gender) {
//       setError('Please fill in all red fields.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     //The gender is an enum with 3 options male(1), female(2), other(3), if none of them was chosen, then return error.
//     const genderInt = parseInt(gender, 10); //10 means to use the decimal base
//     if (Number.isNaN(genderInt)) {
//       setError('Please select a valid gender.');
//       return;
//     }

//     /* 
//       todo: Needs to check prefixes better, like .cmon. .hotmail, etc...
//       todo: Also needs to be checked if includes only 1 '@' symbol.

//       todo: Maybe I can validate the email it self with a specific library? Will save much work
//     */
//     if(!email.includes('@')){
//       setError('The email form is wrong, please check.')
//       return;
//     }

//     const newAccount = {
//       UserName: userName,
//       Email: email,
//       DOB, // "YYYY-MM-DD"
//       Password: password,
//       ConfirmPassword: confirmPassword,
//       FirstName: firstName,
//       LastName: lastName,
//       BusinessName: businessName,
//       Type: type,
//       Title: title,
//       Country: country,
//       City: city,
//       street: street,
//       State: state,
//       PriceLevel: priceLevel,
//       Vicinity: vicinity,
//       Gender: genderInt, // 1|2|3
//     };

//     try {
//       setSubmitting(true);
      
//       const res = await axios.post('/api/User/Register/RegisterUser', newAccount);

//       // 200/201 expected
//       if (res?.status === 200 || res?.status === 201) {
//         setSuccess('Registration successful!');

//         //Clean the page after successful registration 
//         setUserName('');
//         setEmail('');
//         setDOB('');
//         setPassword('');
//         setConfirmPassword('');
//         setFirstName('');
//         setLastName('');
//         setGender('');
//       } else {
//         setError('Unexpected server response.');
//       }
//     } catch (err) {
      
//       // Better visibility for what actually failed
//       console.error('Register error details:', {
//         code: err?.code,
//         message: err?.message,
//         status: err?.response?.status,
//         data: err?.response?.data,
//       });

//       const apiMsg =
//         err?.response?.data?.message ??
//         (typeof err?.response?.data === 'string' ? err.response.data : null) ??
//         (err?.code === 'ERR_NETWORK'
//           ? 'Cannot reach the API (proxy/certificate or server down).'
//           : null);

//       setError(apiMsg || 'Error registering user');
//     } finally {
//       setSubmitting(false);
//     }    
//   };

//   return (
//     <div>

//       <div className='bg-zinc-200  shadow-2xl'>
//         <Header />
//       </div>
      
//       <div className="min-h-screen bg-amber-100 flex items-center justify-center p-4">
//         {/* CARD */}
//         <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="grid md:grid-cols-2">
//             {/* Left (image) */}
//             <div className="hidden md:block relative">
//               <img
//                 src={bgImage}
//                 alt="Coffee cup and beans"
//                 className="h-full w-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/5" />
//             </div>

            
//             {/* Right (form) */}
//             <div className="p-8">
//               <p className="text-lg font-semibold">Create your account</p>
//               <p className="text-xs text-gray-400 mb-5">FindMyCoffee</p>

//               {error ? (
//                 <div
//                   className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
//                   role="alert"
//                   aria-live="assertive"
//                 >
//                   {error}
//                 </div>
//               ) : success ? (
//                 <div
//                   className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
//                   role="status"
//                   aria-live="polite"
//                 >
//                   {success}
//                 </div>
//               ) : null}

//               <form onSubmit={handleSubmit} noValidate className="space-y-4">
//                 {/* First & Last */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
//                   <div>
//                     <label htmlFor="firstName" className="text-gray-500 text-sm mb-1">
//                       First name
//                     </label>
//                     <input
//                       id="firstName"
//                       name="firstName"
//                       type="text"
//                       autoComplete="given-name"
//                       placeholder="e.g. Guy"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       className="w-full h-9 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-400"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="lastName" className="text-gray-500 text-sm mb-1">
//                       Last name
//                     </label>
//                     <input
//                       id="lastName"
//                       name="lastName"
//                       type="text"
//                       autoComplete="family-name"
//                       placeholder="e.g. Beans"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       className="w-full h-9 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-400"
//                     />
//                   </div>
//                 </div>

//                 {/* Username */}
//                 <div className="mt-5">
//                   <label htmlFor="username" className="block text-sm text-gray-500 mb-1">
//                     Username
//                   </label>
//                   <input
//                     id="username"
//                     name="userName"
//                     type="text"
//                     autoComplete="username"
//                     placeholder="e.g. coffee_lover"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="mt-5">
//                   <label htmlFor="email" className="block text-sm text-gray-500 mb-1">
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     placeholder="anonymous@mail.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
//                   />
//                 </div>

//                 {/* Password & Confirm */}
//                 <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
//                   <div>
//                     <label htmlFor="password" className="text-gray-500 text-sm mb-1">
//                       Password
//                     </label>
//                     <input
//                       inputSegment
//                       id="password"
//                       name="password"
//                       type="password"
//                       autoComplete="new-password"
//                       placeholder="Type your password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full h-9 border border-gray-300 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-zinc-400"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="confirmPassword" className="text-gray-500 text-sm mb-1">
//                       Confirm Password
//                     </label>
//                     <input
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       type="password"
//                       autoComplete="new-password"
//                       placeholder="Confirm password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       className="w-full h-9 border border-gray-300 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-zinc-400"
//                     />
//                   </div>
//                 </div>

//                 {/* Date & Gender */}
//                 <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
//                   <div>
//                     <label htmlFor="dob" className="text-gray-500 text-sm">
//                       Date
//                     </label>
//                     <input
//                       id="dob"
//                       name="dob"
//                       type="date"
//                       autoComplete="bday"
//                       value={DOB}
//                       onChange={(e) => setDOB(e.target.value)}
//                       className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="gender" className="text-gray-500 text-sm">
//                       Gender
//                     </label>
//                     <select
//                       id="gender"
//                       name="gender"
//                       value={gender}
//                       onChange={(e) => setGender(e.target.value)}
//                       className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     >
//                       <option value="">Select</option>
//                       <option value="1">Male</option>
//                       <option value="2">Female</option>
//                       <option value="3">Other</option>
//                     </select>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className={`mt-14 w-full rounded-lg px-4 py-2.5 text-white font-medium max-w-md mx-auto block focus:outline-none focus:ring-2 cursor-pointer ${
//                     submitting
//                       ? 'bg-amber-700 cursor-not-allowed opacity-80'
//                       : 'bg-amber-900 hover:bg-amber-700 active:bg-amber-500'
//                   } focus:ring-amber-500`}
//                 >
//                   {submitting ? 'Signing up…' : 'Sign up'}
//                 </button>
//               </form>
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// }

