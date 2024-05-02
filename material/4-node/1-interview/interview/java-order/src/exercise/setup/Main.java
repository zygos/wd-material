/**
You're working on the e-commerce platform's checkout system. The marketing team often runs various promotions, and the system needs a flexible way to calculate the best applicable discount for each order.

Design and implement a solution to calculate and apply the most suitable discount to an order.  Consider the following requirements:

- An order consists of a list of products, each with a price.
- Several promotion types might exist (e.g., percentage discount, fixed-amount discount). Each promotion can have applicability rules (e.g., minimum order value). Only one promotion can be applied to an order.
- If multiple promotions are applicable, the one resulting in the greatest discount for the customer should be chosen.
*/

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // create Order
        Order order = new Order();
        order.addProduct(new Product("A", 50));
        order.addProduct(new Product("B", 30));
        order.addProduct(new Product("C", 20));

        // TODO: Calculate discount instead of a hard coded value.
        // Discount should be calculated based on the available promotions:
        // - percentage discount of 15% for orders over €100,
        // - fixed discount of €20 for orders over €80.
        // Your solution should be flexible enough to allow adding more promotions in the future.
        double discount = 10;

        // demo result
        System.out.println("Order total: " + order.getTotal());
        System.out.println("Discount: " + discount);
        System.out.println("Final price: " + (order.getTotal() - discount));
    }
}
