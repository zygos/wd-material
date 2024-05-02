/**
You're working on the e-commerce platform's checkout system. The marketing team often runs various promotions, and the system needs a flexible way to calculate the best applicable discount for each order.

Design and implement a solution to calculate and apply the most suitable discount to an order.  Consider the following requirements:

- An order consists of a list of products, each with a price.
- Several promotion types might exist (e.g., percentage discount, fixed-amount discount). Each promotion can have applicability rules (e.g., minimum order value). Only one promotion can be applied to an order.
- If multiple promotions are applicable, the one resulting in the greatest discount for the customer should be chosen.
*/

import java.util.ArrayList;
import java.util.List;

public class HotelBookingSystem {
    public static void main(String[] args) {
        // Create a booking
        Booking booking = new Booking();
        booking.addRoomType(new RoomType("Standard", 100)); // 100 per night
        booking.addRoomType(new RoomType("Deluxe", 150));

        // List of possible promotions (we'll add some examples later)
        List<Promotion> promotions = new ArrayList<>();

        // Promotion calculator (needs adaptation for hotel scenarios)
        PromotionCalculator calculator = new PromotionCalculator(promotions); 
        double discount = calculator.calculateBestDiscount(booking);

        // Demo result (will be adapted once we have real promotions)
        System.out.println("Booking total: " + booking.calculateTotal());
        System.out.println("Discount: " + discount);
        System.out.println("Final price: " + (booking.calculateTotal() - discount));
    }
}
