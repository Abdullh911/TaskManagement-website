import {config} from "dotenv" 
config()
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: "" 
});
async function gpt(msg){
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": msg}],
      });
      return chatCompletion.choices[0].message.content;
}
export {gpt}