import React from 'react';
import Home from './pages/Home';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <MyProvider>
      <Home />
    </MyProvider>
  );
}
export default App;
