import { promises as fs } from 'fs';
import path from 'path';

export async function readJsonFile<T>(filePath: string): Promise<T | null> {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as T;
    } catch (error) {
        console.error(`Error reading file from ${filePath}:`, error);
        return null;
    }
}

export async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
    try {
        const dir = path.dirname(filePath);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing file to ${filePath}:`, error);
    }
}