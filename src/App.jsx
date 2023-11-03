import { useState } from 'react';
import Hero from './components/Hero';
import Content from './components/Content';
import Tags from './components/Tags';

import './App.css';

const App = () => {
  const [selectedIdea, setSelectedIdea] = useState('');

  const handleSelectedIdea = (idea) => {
    setSelectedIdea(idea);
  };

  console.log('selectedIdea', selectedIdea)
  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <div className="app">
        <Hero />
        <Content onSelectedIdea={handleSelectedIdea} />
        {selectedIdea && <Tags selectedIdea={selectedIdea} />}
      </div>
    </main>
  );
};

export default App;
