package com.example.rental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RentalRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

      public boolean isCarAvailable(int carId, LocalDate fromDate, LocalDate toDate) {
        String sql = "SELECT COUNT(*) FROM rental WHERE car_id = ? AND NOT (to_date < ? OR from_date > ?)";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, carId, fromDate, toDate);
        return count == 0;
    }

 public List<LocalDate> findUnavailableDates(int carId) {
    String sql = "SELECT from_date, to_date FROM rental WHERE car_id = ?";
    List<LocalDate> unavailable = new ArrayList<>();
    jdbcTemplate.query(sql, new Object[]{carId}, (rs, rowNum) -> {
        LocalDate from = rs.getDate("from_date").toLocalDate();
        LocalDate to = rs.getDate("to_date").toLocalDate();
        for (LocalDate date = from; !date.isAfter(to); date = date.plusDays(1)) {
            unavailable.add(date);
        }
        return null; 
    });
    return unavailable.stream().distinct().toList();
}
    // Spara en ny bokning
    public void save(Rental rental) {
        String sql = "INSERT INTO rental (car_id, driver_name, personal_number, from_date, to_date, revenue) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                rental.getCarId(),
                rental.getDriverName(),
                rental.getPersonalNumber(),
                Date.valueOf(rental.getFromDate()),
                Date.valueOf(rental.getToDate()),
                rental.getRevenue()
        );
    }

    public List<Rental> findAll() {
        String sql = "SELECT id, car_id, driver_name, personal_number, from_date, to_date, revenue FROM rental";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new Rental(
                rs.getInt("id"),
                rs.getInt("car_id"),
                rs.getString("driver_name"),
                rs.getString("personal_number"),
                rs.getDate("from_date").toLocalDate(),
                rs.getDate("to_date").toLocalDate(),
                rs.getInt("revenue")
        ));
    }
}