import axios from 'axios';

export async function fetchHTML(url: string): Promise<string> {
  const { data } = await axios.get(url);
  return data;
}
