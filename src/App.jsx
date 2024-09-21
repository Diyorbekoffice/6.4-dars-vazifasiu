import React, { useState, useRef, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [nat, setNat] = useState('uz');
  const [desc, setDesc] = useState('');
  const [users, setUsers] = useState([]);
  const [chec, setChec] = useState([]);

  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users'));
      if (storedUsers && Array.isArray(storedUsers)) {
        setUsers(storedUsers);
      }
    } catch (error) {
      console.error("LocalStorage'dan ma'lumot olishda xatolik yuz berdi:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error("LocalStorage'da ma'lumotni saqlashda xatolik yuz berdi:", error);
    }
  }, [users]);

  function handleChangeName(event) {
    setUserName(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangeNat(event) {
    setNat(event.target.value);
  }

  function handleChangeDesc(event) {
    setDesc(event.target.value);
  }

  function handleChangeChec(event) {
    const { value, checked } = event.target;
    if (checked) {
      setChec([...chec, value]);
    } else {
      setChec(chec.filter(num => num !== value));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!userName) {
      alert("Iltimos, username maydonini to'ldiring!");
      userNameRef.current.focus();
      return;
    }
    if (!email) {
      alert("Iltimos, email maydonini to'ldiring!");
      emailRef.current.focus();
      return;
    }
    if (!desc) {
      alert("Iltimos, izoh maydonini to'ldiring!");
      descRef.current.focus();
      return;
    }

    const userForm = {
      userName,
      email,
      nat,
      desc,
      chec,
      id: Date.now(),
    };

    setUsers([...users, userForm]);

    setUserName('');
    setEmail('');
    setNat('uz');
    setChec([]);
    setDesc('');
  }

  function handleDelete(userId) {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);

    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  return (
    <div className='user'>
      <form onSubmit={handleSubmit}>
        <input ref={userNameRef}
          onChange={handleChangeName}
          value={userName}
          type="text"
          placeholder="username..." />
        <input
          ref={emailRef}
          onChange={handleChangeEmail}
          value={email}
          type="email"
          placeholder="email..."
        />
        <select onChange={handleChangeNat} value={nat}>
          <option value="uz">O'zbek</option>
          <option value="rus">Rus</option>
          <option value="eng">Ingliz</option>
        </select>

        <div className="chec">
          <label htmlFor="uzbek">
            <input 
              type="checkbox" 
              name="chec" 
              id="uzbek"
              value="uzbek" 
              onChange={handleChangeChec}
              checked={chec.includes('uzbek')} />
            uzbek
          </label>
          <label htmlFor="russian">
            <input 
              type="checkbox" 
              name="chec" 
              id="russian"
              value="russian" 
              onChange={handleChangeChec}
              checked={chec.includes('russian')} />
            russian
          </label>
          <label htmlFor="english">
            <input 
              type="checkbox" 
              name="chec" 
              id="english"
              value="english" 
              onChange={handleChangeChec}
              checked={chec.includes('english')} />
            english
          </label>
        </div>

        <textarea
          ref={descRef}
          onChange={handleChangeDesc}
          value={desc}
          placeholder="enter description..."
          style={{ resize: 'none' }}
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <div className='card'>
        {users.map((user) => (
          <Card key={user.id} user={user} onDelete={() => handleDelete(user.id)} />
        ))}
      </div>
    </div>
  );
}

export default App;
