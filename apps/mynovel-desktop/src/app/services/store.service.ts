import * as path from 'path';
import { mkdirSync, existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { app } from 'electron';

export class Storage {

  private directory: string;
  
  constructor() {
    this.directory = path.join(app.getPath('userData'), 'storage');
    if (!existsSync(this.directory)) {
      mkdirSync(this.directory);
    }
  }

  public get(key: string): Promise<string> {
    return this.read(key);
  }

  public set(key: string, data: string): Promise<void> {
    return this.write(key, data);
  }

  private read(key: string): Promise<string> {
    return this.readFileByName(key)
        .then(f => JSON.parse(f.toString('utf8')))
        .catch(e => console.log('read error: ', e));
  }

  private readFileByName(key: string): Promise<Buffer> {
    return readFile(this.file(key))
        .catch(e => {
            console.log('readFileByName error: ', e);
            return this.writeEmptyFile(key)
                .then(() => readFile(this.file(key)));
        });
  }

  private write(key: string, data: string): Promise<void> {
    return writeFile(this.file(key), JSON.stringify(data)).catch(e => console.log('write error: ', e));
  }

  private writeEmptyFile(key: string): Promise<void> {
    return writeFile(this.file(key), '"[]"', { flag: 'wx' }).catch(e => console.log('writeEmptyFile error: ', e));
  }

  private file(key: string): string {
    console.log('path: ', this.directory);
    return path.join(this.directory, `${key}.json`);
  }

}