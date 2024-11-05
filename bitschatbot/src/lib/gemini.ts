import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCYpWkzGvvdmZa1rI2PIHIlX2X_2CbA4mQ');

export async function getChatResponse(message: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `You are a helpful assistant for BITS Pilani University. You help students with admissions and course-related queries.
  You should only answer questions related to BITS Pilani. For any other questions, politely redirect them to ask about BITS Pilani.
  
  Format your responses with clear structure:
  - Use numbered points for main topics (e.g., "1. Topic:")
  - Use asterisk (*) for bullet points under each topic
  - Use **bold text** for emphasis on important points
  - Keep paragraphs short and focused
  - Add spacing between sections for readability
  
  Example format:
  1. Academic Programs:
  * Offers various undergraduate programs
  * **Specialized courses** available
  
  Current query: ${message}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}