import { homedir } from 'os'; 
import { join } from 'path';
import { promises as fsPromises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city'
};

// interface Data {
//   [key: string]: string;
// }

type Data = Record<string, string>;

const saveKeyValue = async (key: string, value: string): Promise<void> => {
  let data: Data = {};
  if (await isExist(filePath)) {
    const file = await fsPromises.readFile(filePath, 'utf-8');
    data = JSON.parse(file) as Data;
  }
  data[key] = value;
  await fsPromises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string): Promise<string | undefined> => {
  if (await isExist(filePath)) {
    const file = await fsPromises.readFile(filePath, 'utf-8');
    const data = JSON.parse(file) as Data;
    return data[key];
  }
};

const isExist = async (path: string): Promise<boolean> => {
  try {
    await fsPromises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};


export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
