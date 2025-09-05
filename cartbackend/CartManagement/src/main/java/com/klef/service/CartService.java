package com.klef.service;

import java.util.List;

import com.klef.model.Cart;

public interface CartService {
    Cart addCart(Cart cart);
    List<Cart> getAllCarts();
    Cart getCartById(int id);
    Cart updateCart(Cart cart);
    void deleteCartById(int id);
}
