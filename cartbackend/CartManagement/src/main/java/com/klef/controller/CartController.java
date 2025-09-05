package com.klef.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.model.Cart;
import com.klef.service.CartService;



@RestController
@RequestMapping("/cartapi/")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;
    
    @GetMapping("/")
    public String home() {
        return "Cart Management API is running";
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addCart(@RequestBody Cart cart) {
        Cart savedCart = cartService.addCart(cart);
        return new ResponseEntity<>(savedCart, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getCartById(@PathVariable int id) {
        Cart cart = cartService.getCartById(id);
        if (cart != null) {
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cart with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCart(@RequestBody Cart cart) {
        Cart existing = cartService.getCartById(cart.getId());
        if (existing != null) {
            Cart updatedCart = cartService.updateCart(cart);
            return new ResponseEntity<>(updatedCart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Cart with ID " + cart.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCart(@PathVariable int id) {
        Cart existing = cartService.getCartById(id);
        if (existing != null) {
            cartService.deleteCartById(id);
            return new ResponseEntity<>("Cart with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Cart with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
