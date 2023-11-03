import React, { useState, useEffect } from 'react';
import { fetchOpenAIMessages } from '../api/api';

const Tags = ({ selectedIdea }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tagsGenerated, setTagsGenerated] = useState([]);
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    const generateTags = async () => {
      if (selectedIdea) {
        setLoading(true);
        try {
          const prompt = `Generate SEO video tags for the idea: "${selectedIdea}". 
            Provide tags that enhance video SEO and improve discoverability for this specific topic. 
            Include relevant keywords and phrases to optimize reach and engagement.
            Limit the tags to 12 total.`;

          const tags = await fetchOpenAIMessages(prompt);
          setTagsGenerated(tags);
          setCopied(false);
          setLoading(false);
          setError(null);
        } catch (error) {
          console.error('Error:', error);
          setError(error);
          setLoading(false);
        }
      }
    };

    generateTags();
  }, [selectedIdea]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {error.message}
      </div>
    );
  }

  const copyToClipboard = () => {
    const tags = tagsGenerated.join(', ');
    navigator.clipboard.writeText(tags);
    setCopied(true);
  };

  return <section>
    <div className='flex flex-row items-center justify-between pb-2'>
    <span className='font-satoshi font-thin italic  ml-2'>Here are some tags for your new video idea! Make sure you copy them!</span>
    <button type='button' onClick={copyToClipboard} className={copied ? 'red_btn' : 'black_btn'}>
        {copied ? 'Copied!' : 'Copy'}
    </button>
    </div>
    <div className='tag_input max-w-xl '>
    <div className='flex flex-row flex-wrap gap-2 justify-center text-center'>
    {tagsGenerated.map((tag, index) => {
      return (
        <div key={index} className='tag'>
          {tag}
        </div>
      );
    })}
    </div>
    </div>

  </section>;
};

export default Tags;
