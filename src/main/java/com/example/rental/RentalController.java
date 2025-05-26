package com.example.rental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalRepository rentalRepository;

    @PostMapping
    public ResponseEntity<?> createRental(@RequestBody Rental rental) {
        // Check if the car is available for the requested period
        boolean available = rentalRepository.isCarAvailable(
            rental.getCarId(),
            rental.getFromDate(),
            rental.getToDate()
        );
        if (!available) {
            return ResponseEntity.status(409).body("Car is already rented during this period.");
        }
        rentalRepository.save(rental);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    @GetMapping("/availability")
    public List<LocalDate> getUnavailableDates(@RequestParam int carId) {
        return rentalRepository.findUnavailableDates(carId);
    }
}