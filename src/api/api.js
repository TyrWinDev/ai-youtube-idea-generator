import axios from "axios";

export const fetchOpenAIMessages = async (prompt) => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const url = "https://api.openai.com/v1/chat/completions";

    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const apiResponse = response.data.choices[0].message.content;

    const separatedMessages = apiResponse
      .split("\n")
      .filter((message) => message.trim() !== "");

    const filteredMessages = separatedMessages.map((message) =>
      message.replace(/^\d+\.\s/, "")
    );

    return filteredMessages;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
