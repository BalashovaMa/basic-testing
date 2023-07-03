// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);

    expect(() => account.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const senderInitialBalance = 100;
    const recieverInitialBalance = 50;
    const senderAccount = getBankAccount(senderInitialBalance);
    const recieverAccount = getBankAccount(recieverInitialBalance);

    expect(() => {
      senderAccount.transfer(senderInitialBalance + 1, recieverAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);

    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);

    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawAmount = 50;
    const account = getBankAccount(initialBalance);

    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const senderInitialBalance = 100;
    const recieverInitialBalance = 70;
    const transferAmount = 30;
    const senderAccount = getBankAccount(senderInitialBalance);
    const recieverAccount = getBankAccount(recieverInitialBalance);

    senderAccount.transfer(transferAmount, recieverAccount);

    expect(recieverAccount.getBalance()).toBe(
      recieverInitialBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 50; // Specify the desired balance value

    const account = getBankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValue(balance);

    const received = await account.fetchBalance();
    expect(typeof received).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 200; // Specify the desired balance value

    const account = getBankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValue(balance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    // Mock fetchBalance() to always return null
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
