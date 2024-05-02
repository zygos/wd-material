import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;  // We'll use this for dates

public class Booking {
    private List<RoomType> roomTypes;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    public Booking() {
        this.roomTypes = new ArrayList<>();
    }

    public void addRoomType(RoomType roomType) {
        this.roomTypes.add(roomType);
    }

    // Getters and setters for checkInDate and checkOutDate

    public double calculateTotal() {
        double total = 0.0;
        int nights = calculateNights(); // Helper method

        for (RoomType roomType : roomTypes) {
            total += roomType.getNightlyRate() * nights;
        }

        return total;
    }

    private int calculateNights() {
        // ... Logic to calculate nights based on check-in/out dates
        return 0; // Placeholder, implement the calculation
    }
}