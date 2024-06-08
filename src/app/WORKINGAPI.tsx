"use client"
import { useState } from 'react';

const Page = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const addUser = async () => {
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      console.log('User added:', data);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <div className="">
      <button onClick={fetchData}>Fetch Users</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default Page;
