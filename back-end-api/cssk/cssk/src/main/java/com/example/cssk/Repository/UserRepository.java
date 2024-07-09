package com.example.cssk.Repository;


import com.example.cssk.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, Long> {
    User findByUserId(Long userId);
    User deleteUserByUserId(Long userId);

    boolean existsByUserId(Long userId);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

    List<User> findByRole(Integer role);

    User findByUsername(String username);

    User findBySecretKey(String secretKey);

    User findByEmail(String email);

    User findTopByOrderByUserIdDesc();

    List<User> findUsersByRole(Integer role);

    List<User> findAllByRole(Integer role);
    List<User> findAll();

    List<User> findAllByDisableFalse();
    List<User> findAllByOrderByUserIdDesc();
    List<User> findAllByDisableFalseAndRole(Integer role);


}