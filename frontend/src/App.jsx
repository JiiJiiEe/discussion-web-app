import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ThreadList from './components/threadList';
import ThreadPage from './components/threadPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Forum01</h1>
        </header>

        <main>
          <Routes>
            {/* Route for the list of threads */}
            <Route exact path="/" element={<ThreadList />} />

            {/* Route for viewing posts in a specific thread */}
            <Route path="/threads/:threadId" element={<ThreadPage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
