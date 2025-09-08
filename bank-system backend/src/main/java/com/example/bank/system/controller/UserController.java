package com.example.bank.system.controller;

import com.example.bank.system.model.Transaction;
import com.example.bank.system.model.User;
import com.example.bank.system.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestParam String username, @RequestParam String password) {
        User user = userService.signup(username, password);
        return ResponseEntity.ok(user);
    }


    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, HttpSession session) {
        Optional<User> user = userService.login(username, password);
        if (user.isPresent()) {
            session.setAttribute("user", user.get());
            return "Login successful! Welcome " + username;
        }
        return "Invalid credentials!";
    }

    @PostMapping("/deposit")
    public String deposit(@RequestParam double amount, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return "Please login first!";
        return userService.deposit(user, amount);
    }

    @PostMapping("/withdraw")
    public String withdraw(@RequestParam double amount, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return "Please login first!";
        return userService.withdraw(user, amount);
    }

    @GetMapping("/history")
    public List<Transaction> history(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return List.of();
        return userService.history(user);
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Logged out successfully!";
    }
}
