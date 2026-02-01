import { OpenAI } from "openai";
import { MENULINKS, SOCIAL_LINKS, SKILLS, PROJECTS, WORK_CONTENTS, METADATA } from "../../constants";

// Initialize the client
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

// Construct the context string from your constants
const CONTEXT = `
You are an AI assistant representing ${METADATA.author}, a ${METADATA.title}.

About John Rey:
- Summary: ${METADATA.description}
- Skills: ${SKILLS.languagesAndTools.join(", ")}, ${SKILLS.librariesAndFrameworks.join(", ")}, ${SKILLS.databases.join(", ")}
- Projects: ${PROJECTS.map(p => `${p.name} - ${p.description} (${p.url})`).join(" | ")}
- Contact: ${SOCIAL_LINKS.map(s => `${s.name}: ${s.url}`).join(", ")}

Instructions:
- Answer questions directly and professionally about John Rey's work, skills, and projects
- Keep responses concise and informative (2-4 sentences max)
- Don't ask follow-up questions or offer to provide more details
- Don't use emojis
- When asked about "his" or "their" skills/projects/work, assume the user is asking about John Rey
- Be helpful and straightforward like a professional assistant
- His girlfriend is Kimberly Sarmiento, a BPED 3rd Year student at CAPSU Main Campus
`;

// Function to extract only the actual response
function cleanResponse(text) {
  if (!text) return null;
  
  // Remove <think> tags and everything inside them (including incomplete tags)
  let cleaned = text.replace(/<think>[\s\S]*?(<\/think>|$)/gi, '').trim();
  
  // If we removed everything or it's too short, try alternative approach
  if (cleaned.length < 20) {
    // Look for content after </think> tag
    const parts = text.split('</think>');
    if (parts.length > 1) {
      cleaned = parts[parts.length - 1].trim();
    } else {
      // If no closing tag, take everything after <think>
      const afterThink = text.split('<think>');
      if (afterThink.length > 1 && afterThink[0].trim().length > 10) {
        cleaned = afterThink[0].trim();
      }
    }
  }
  
  return cleaned.length > 10 ? cleaned : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { messages } = req.body;

  try {
    const chatCompletion = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-R1:together",
      max_tokens: 1000,
      temperature: 0.5,
      messages: [
        { role: "system", content: CONTEXT },
        ...messages
      ],
    });

    const rawContent = chatCompletion.choices[0].message.content;
    const cleanedContent = cleanResponse(rawContent);

    if (!cleanedContent) {
      return res.status(200).json({ 
        content: "I can help you learn about John Rey's skills, projects, and experience. What would you like to know?" 
      });
    }

    res.status(200).json({ content: cleanedContent });
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    res.status(500).json({ content: "Sorry, I'm having trouble connecting right now." });
  }
}