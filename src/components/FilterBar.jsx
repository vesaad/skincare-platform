export default function FilterBar({ onFilter }) {
  return (
    <div className="flex gap-3 mb-4 flex-wrap">
      <select
        onChange={(e) => onFilter((f) => ({ ...f, category: e.target.value }))}
        className="border p-2 rounded"
      >
        <option value="">Të gjitha kategoritë</option>
        <option value="moisturizer">Moisturizer</option>
        <option value="serum">Serum</option>
        <option value="cleanser">Cleanser</option>
        <option value="sunscreen">Sunscreen</option>
      </select>

      <select
        onChange={(e) => onFilter((f) => ({ ...f, skinType: e.target.value }))}
        className="border p-2 rounded"
      >
        <option value="">Të gjitha llojet e lëkurës</option>
        <option value="Dry">Dry</option>
        <option value="Oily">Oily</option>
        <option value="Combination">Combination</option>
        <option value="Normal">Normal</option>
        <option value="Sensitive">Sensitive</option>
      </select>
    </div>
  );
}
