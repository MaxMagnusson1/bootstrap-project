// filepath: src/main/java/com/example/rental/CarRepository.java
package com.example.rental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class CarRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Car> findAll() {
        return jdbcTemplate.query(
            "SELECT id, name, price_per_day FROM car",
            (rs, rowNum) -> new Car(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getInt("price_per_day")
            )
        );
    }
}