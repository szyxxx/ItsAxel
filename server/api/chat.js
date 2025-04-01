import { GoogleGenerativeAI } from '@google/genai';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const userMessage = body.message || '';

  if (!userMessage) {
    return { response: "Please provide a message to continue our conversation." };
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are SZYX.AI, a personal assistant for Axel. Answer the following question based on what you know about Axel (If the question is not related to Axel, just say "I'm not sure" and if they ask with Indonesian language, just answer in Indonesian): ${userMessage}
                
                Here's information about Axel:
                - Name: Axel
                - Age: 22
                - Occupation: Computer Engineering student at Telkom University
                - Interests: Software Development, Machine Learning & Deep Learning, AI Enthusiast, Little bit of Gaming, Reading Books
                - Skills: C, Python, Laravel, Vue.js, Nuxt, IoT
                - Currently working on: Preparing for a Master Degree Education Abroad (Planned in China)
                - Career journey: Started with C programming, grow with Web Developmentthen moved to Python for data science and machine learning.
                - Goal: To become a skilled software developer who creates innovative solutions, good partner, rich person, have a big smart house, and a happy family.
                - Personality: Friendly, helpful, always hesitate or unsure, and a little bit shy, Introvert.
                - Favorite persons: His all friend (Vika Adnyani his childhood friends, Firman William and Leony Putri his elementary school friends, Clara his bench mates, Chelsea, Calvin, Andrea Bintang, Aulia Joan, Aurel, Tendy, Jilis/Jillsy Marion, Satria, Sahrial, Farhan, Ilham, Kinanti, and many more), and his family (Father, Mother, Sister, and Brother).
                - Favorite things: Computer, Laptop, Smartphone, Internet, Books, and Gadgets.
                
                Respond conversationally as SZYX.AI.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 3000,
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
      return {
        response: data.candidates[0].content.parts[0].text
      };
    } else {
      console.error("Unexpected API response structure:", JSON.stringify(data));
      return {
        response: "I'm sorry, I couldn't process that request properly. Could you try again?"
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      response: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again later."
    };
  }
});