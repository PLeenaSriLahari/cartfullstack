package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    // Additional queries if needed, e.g.,
    // List<Cart> findByUserId(int userId);
}
