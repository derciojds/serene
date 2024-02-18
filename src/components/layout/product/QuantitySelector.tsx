export function QuantitySelector({ totalInventory }: { totalInventory: number }) {
  return (
    <div>
      <label className="fs-body-lg" htmlFor="quantity">
        Quantity
      </label>
      <span>
        <button type="button">+</button>
        <input
          required
          type="number"
          name="quantity"
          id="quantity"
          min="1"
          max={totalInventory}
          value={totalInventory === 0 ? 0 : 1}
        />
        <button type="button">-</button>
      </span>
    </div>
  );
}
