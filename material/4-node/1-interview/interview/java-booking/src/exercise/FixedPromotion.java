public class FixedPromotion implements Promotion {
    private double discountAmount;
    private double minimumOrderValue;

    public FixedPromotion(double minimumOrderValue, double discountAmount) {
        this.minimumOrderValue = minimumOrderValue;
        this.discountAmount = discountAmount;
    }

    @Override
    public boolean isApplicable(Order order) {
        return order.getTotal() >= minimumOrderValue;
    }

    @Override
    public double calculateDiscount(Order order) {
        return discountAmount;
    }
}