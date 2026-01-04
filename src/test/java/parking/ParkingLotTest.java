package parking;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ParkingLotTest {

    @Test
    void vehicleEntryMarksSpotOccupied() {
        ParkingLot lot = new ParkingLot(5);

        assertTrue(lot.enterVehicle(1));
        assertEquals(4, lot.getAvailableCount());
    }

    @Test
    void cannotEnterOccupiedSpot() {
        ParkingLot lot = new ParkingLot(3);

        assertTrue(lot.enterVehicle(1));
        assertFalse(lot.enterVehicle(1)); // already occupied
    }

    @Test
    void vehicleExitFreesSpot() {
        ParkingLot lot = new ParkingLot(2);

        assertTrue(lot.enterVehicle(1));
        assertTrue(lot.exitVehicle(1));
        assertEquals(2, lot.getAvailableCount());
    }

    @Test
    void cannotExitEmptySpot() {
        ParkingLot lot = new ParkingLot(2);

        assertFalse(lot.exitVehicle(1)); // can't exit if not occupied
        assertEquals(2, lot.getAvailableCount());
    }

    @Test
    void invalidSpotIdReturnsFalse() {
        ParkingLot lot = new ParkingLot(2);

        assertFalse(lot.enterVehicle(99));
        assertFalse(lot.exitVehicle(99));
        assertEquals(2, lot.getAvailableCount());
    }
}
