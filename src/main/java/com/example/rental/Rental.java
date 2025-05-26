package com.example.rental;

import java.time.LocalDate;

public class Rental {
    private int id;
    private int carId;
    private String driverName;
    private String personalNumber;
    private LocalDate fromDate;
    private LocalDate toDate;
    private int revenue;

    public Rental() {}

    public Rental(int id, int carId, String driverName, String personalNumber, LocalDate fromDate, LocalDate toDate, int revenue) {
        this.id = id;
        this.carId = carId;
        this.driverName = driverName;
        this.personalNumber = personalNumber;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.revenue = revenue;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getCarId() { return carId; }
    public void setCarId(int carId) { this.carId = carId; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public String getPersonalNumber() { return personalNumber; }
    public void setPersonalNumber(String personalNumber) { this.personalNumber = personalNumber; }

    public LocalDate getFromDate() { return fromDate; }
    public void setFromDate(LocalDate fromDate) { this.fromDate = fromDate; }

    public LocalDate getToDate() { return toDate; }
    public void setToDate(LocalDate toDate) { this.toDate = toDate; }

    public int getRevenue() { return revenue; }
    public void setRevenue(int revenue) { this.revenue = revenue; }
}