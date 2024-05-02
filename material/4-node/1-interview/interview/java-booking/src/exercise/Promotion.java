public interface Promotion {
    boolean isApplicable(Order order);
    double calculateDiscount(Order order);
}