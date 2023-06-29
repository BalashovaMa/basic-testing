import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

import path from 'path';
import mockFs from 'mock-fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers(); // Use the fake timers provided by Jest
  });

  afterAll(() => {
    jest.useRealTimers(); // Restore the real timers
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn(); // Create a mock function for the callback
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    const numIntervals = 3;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    for (let i = 0; i < numIntervals; i++) {
      jest.runOnlyPendingTimers();
      expect(callback).toHaveBeenCalledTimes(i + 1);
    }
  });
});

describe('readFileAsynchronously', () => {
  beforeAll(() => {
    mockFs({
      'path/to/file.txt': 'Mock file content',
    });
  });

  afterAll(() => {
    mockFs.restore();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'file.txt';

    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistent.txt';

    /* const existsSyncSpy = jest.spyOn(existsSync).mockReturnValue(false); */

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'existing.txt';
    const mockFileContent = 'Mock file content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    const readFileSpy = jest.spyOn(fs.promises, 'readFile');
    readFileSpy.mockResolvedValue(mockFileContent);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(mockFileContent);
  });
});
