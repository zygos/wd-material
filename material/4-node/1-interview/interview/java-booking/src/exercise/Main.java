import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // create Order
        Order order = new Order();
        order.addProduct(new Product("A", 50));
        order.addProduct(new Product("B", 30));
        order.addProduct(new Product("C", 20));

        // list of possible promotions
        List<Promotion> promotions = new ArrayList<>();
        promotions.add(new FixedPromotion(80, 20));
        promotions.add(new PercentagePromotion(100, 15));

        // calculator
        PromotionCalculator calculator = new PromotionCalculator(promotions);
        double discount = calculator.calculateBestDiscount(order);

        // demo result
        System.out.println("Order total: " + order.getTotal());
        System.out.println("Discount: " + discount);
        System.out.println("Final price: " + (order.getTotal() - discount));
    }
}
