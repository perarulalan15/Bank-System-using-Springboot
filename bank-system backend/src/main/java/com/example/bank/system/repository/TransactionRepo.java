package com.example.bank.system.repository;

import com.example.bank.system.model.Transaction;
import com.example.bank.system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}
