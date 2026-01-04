package parking;

import java.util.ArrayList;
import java.util.List;

public class ParkingLot {

    private final List<ParkingSpot> spots;

    public ParkingLot(int numberOfSpots) {
        spots = new ArrayList<>();
        for (int i = 1; i <= numberOfSpots; i++) {
            spots.add(new ParkingSpot(i));
        }
    }

    public boolean enterVehicle(int spotId) {
        ParkingSpot spot = findSpot(spotId);
        if (spot == null || spot.isOccupied()) {
            return false;
        }
        spot.occupy();
        return true;
    }

    public boolean exitVehicle(int spotId) {
        ParkingSpot spot = findSpot(spotId);
        if (spot == null || !spot.isOccupied()) {
            return false;
        }
        spot.free();
        return true;
    }

    public int getAvailableCount() {
        int count = 0;
        for (ParkingSpot spot : spots) {
            if (!spot.isOccupied()) {
                count++;
            }
        }
        return count;
    }

    private ParkingSpot findSpot(int id) {
        for (ParkingSpot spot : spots) {
            if (spot.getId() == id) {
                return spot;
            }
        }
        return null;
    }
    public int findNearestAvailableSpot() {
        for (ParkingSpot spot : spots) {
            if (!spot.isOccupied()) {
                return spot.getId(); // nearest = lowest ID
            }
        }
        return -1; // none available
    }
    public int findFirstAvailableSpot() {
        return findNearestAvailableSpot();
    }
}
