package com.example.bank.system.service;

import com.example.bank.system.model.Transaction;
import com.example.bank.system.model.User;
import com.example.bank.system.repository.TransactionRepo;
import com.example.bank.system.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final TransactionRepo transactionRepo;

    // Signup
    // Signup
    public User signup(String username, String password) {
        if (userRepo.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setAccountNumber(generateAccountNumber());
        user.setBalance(0.0); // initialize with 0 balance
        userRepo.save(user);

        return user; // return full user including accountNumber
    }


    // Login
    public Optional<User> login(String username, String password) {
        Optional<User> user = userRepo.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }

    // Deposit
    public String deposit(User user, double amount) {
        user.setBalance(user.getBalance() + amount);
        userRepo.save(user);

        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setType("DEPOSIT");
        tx.setAmount(amount);
        transactionRepo.save(tx);

        return "Deposited " + amount + " successfully! Balance: " + user.getBalance();
    }

    // Withdraw
    public String withdraw(User user, double amount) {
        if (user.getBalance() < amount) {
            return "Insufficient funds!";
        }
        user.setBalance(user.getBalance() - amount);
        userRepo.save(user);

        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setType("WITHDRAW");
        tx.setAmount(amount);
        transactionRepo.save(tx);

        return "Withdrew " + amount + " successfully! Balance: " + user.getBalance();
    }

    // History
    public List<Transaction> history(User user) {
        return transactionRepo.findByUser(user);
    }

    private String generateAccountNumber() {
        Random random = new Random();
        return String.valueOf(10000000 + random.nextInt(90000000));
    }
}
