import OpenAI from 'openai';

// Create a mock AI response when no API key is available
const mockAIResponse = async (message: string) => {
  const responses = [
    "I understand. Could you tell me more about that?",
    "That's interesting! How does that make you feel?",
    "I see. What are your thoughts on this?",
    "Thank you for sharing. Is there anything specific you'd like to discuss?",
    "I appreciate your perspective. Would you like to explore this further?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export async function generateAIResponse(message: string) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('OpenAI API key not found, using mock responses');
    return mockAIResponse(message);
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return mockAIResponse(message);
  }
}