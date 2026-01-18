package com.smartquiz.repository;

import com.smartquiz.model.UserStats;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserStatsRepository extends MongoRepository<UserStats, String> {
    Optional<UserStats> findByUserId(String userId);
}
