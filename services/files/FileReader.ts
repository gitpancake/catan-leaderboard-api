import { readFileSync } from 'fs';

export class FileReader {
	fileString: string;

	constructor(filePath: string, format: BufferEncoding = 'utf-8') {
		this.fileString = readFileSync(filePath, format);
	}

	readFile() {
		return this.fileString;
	}
}
