//no use
export default function CarCard({ car }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 15,
        borderRadius: 10,
        width: 300,
      }}
    >
      <img
        src={car.image}
        alt={car.model}
        style={{ width: "100%", borderRadius: 10 }}
      />
      <h3>{car.brand} {car.model}</h3>
      <p>Year: {car.year}</p>
      <p>Mileage: {car.mileage} km</p>
      <p style={{ fontWeight: "bold" }}>${car.price}</p>
    </div>
  );
}
