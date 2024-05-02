public class PercentagePromotion implements Promotion {
    private double percentage;
    private double minimumOrderValue;

    public PercentagePromotion(double minimumOrderValue, double percentage) {
        this.minimumOrderValue = minimumOrderValue;
        this.percentage = percentage;
    }

    @Override
    public boolean isApplicable(Order order) {
        return order.getTotal() >= minimumOrderValue;
    }

    @Override
    public double calculateDiscount(Order order) {
        return order.getTotal() * (percentage / 100);
    }
}