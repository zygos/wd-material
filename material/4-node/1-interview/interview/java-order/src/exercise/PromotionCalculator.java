import java.util.List;

public class PromotionCalculator {
    private List<Promotion> promotions;

    public PromotionCalculator(List<Promotion> promotions) {
        this.promotions = promotions;
    }

    public double calculateBestDiscount(Order order) {
        double bestDiscount = 0.0;

        for (Promotion promotion : promotions) {
            if (promotion.isApplicable(order)) {
                double currentDiscount = promotion.calculateDiscount(order);
                bestDiscount = Math.max(bestDiscount, currentDiscount);
            }
        }

        return bestDiscount;
    }
}