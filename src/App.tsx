import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import StoryScreen from './screens/StoryScreen/StoryScreen';
import Header from './components/Header/Header';
import { NewsProvider } from './context/HomeContext';
import './App.css';

const App = () => (
  <Router>
    <NewsProvider>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="*" element={<HomeScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/story/:id" element={<StoryScreen />} />
          </Routes>
        </div>
      </div>
    </NewsProvider>
  </Router>
);

export default App;
