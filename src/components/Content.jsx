import { useState, useEffect } from "react";
import { fetchOpenAIMessages } from "../api/api";

import { copy, linkIcon, loader, tick } from "../assets";

const Content = ({ onSelectedIdea }) => {
  const [videoIdea, setVideoIdea] = useState({
    userInput: "",
    summary: "",
  });
  const [allVideoideas, setAllVideoideas] = useState([]);
  const [copied, setCopied] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const prompt = `Generate 8 concise video concepts for a YouTube channel about ${videoIdea.userInput}. 
  Keep each idea under 80 characters or 10 words for quick and engaging concepts.`;
  

  const fetchVideoIdeas = async () => {
    setLoading(true);
    try {
      const messages = await fetchOpenAIMessages(prompt);
      setAllVideoideas(messages);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const videoIdeasFromLocalStorage = JSON.parse(localStorage.getItem("videoIdeas"));

    if (videoIdeasFromLocalStorage) {
      setAllVideoideas(videoIdeasFromLocalStorage);
    }
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVideoIdeas();
  };

  const handleCopy = (copyUserInput) => {
    setCopied(copyUserInput);
    onSelectedIdea(copyUserInput);
    navigator.clipboard.writeText(copyUserInput);
  };
  return (
    <section className="mt-16 w-full max-w-xl ">
      {/* Search */}
      <div className="flex flex-col w-full gap-2 ">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="text"
            placeholder="What is your content about?"
            value={videoIdea.userInput}
            onChange={(e) =>
              setVideoIdea({ ...videoIdea, userInput: e.target.value })
            }
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browser URL history  */}

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto ">
          {allVideoideas.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setVideoIdea(item)}
              className={`link_card ${copied === item && "active"}`}
            >
              <div className="copy_btn">
                <img
                  src={copied === item ? tick : copy}
                  onClick={() => handleCopy(item)}
                  alt="copy-icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className={`flex-1 font-satoshi font-medium text-sm truncate ${copied === item ? "text-white font-bold" : "text-black"}`}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {loading ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn&apos;t supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          videoIdea.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Video <span className="blue-gradient">Idea</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {videoIdea.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Content;
